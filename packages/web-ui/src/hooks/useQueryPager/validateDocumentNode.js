export const validateDocumentNode = (GraphQLQuery) => {
    const definition = GraphQLQuery.definitions[0];
    console.log("definition", definition);

    // Ensure the query has the correct structure
    if (definition.kind !== 'OperationDefinition') {
        throw new Error('Invalid GraphQL Pager Query passed to useQueryPager()');
    }

    // Get the query key from the definition
    const key = definition.name?.value;

    if (!key) {
        throw new Error('Could not find the query definition\'s key.');
    }

    const params = [];

    // Check if the query has variable definitions
    if (!definition.variableDefinitions) {
        throw new Error('Your pager query has no variables defined.');
    }

    // Iterate over each variable definition and handle types
    for (const variable of definition.variableDefinitions) {
        const varName = variable.variable.name.value;
        const varType = variable.type;

        // Handle NamedType (e.g., String, Int, Object)
        if (varType.kind === 'NamedType') {
            const typeName = varType.name.value;
            if (typeName === 'Int') {
                params.push({
                    type: 'number',
                    key: varName,
                });
            } else if (typeName === 'String') {
                params.push({
                    type: 'string',
                    key: varName,
                });
            } else if (typeName === 'Object') {
                params.push({
                    type: 'object',
                    key: varName,
                });
            } else {
                console.error(`Unhandled NamedType: ${typeName}`);
            }
        }
        // Handle NonNullType + ListType + NamedType (for arrays)
        else if (varType.kind === 'NonNullType' && varType.type.kind === 'ListType' &&
            varType.type.type.kind === 'NamedType') {
            const listTypeName = varType.type.type.name.value;
            if (listTypeName === 'String') {
                params.push({
                    type: 'array', // Treat it as an array type
                    key: varName,
                });
            } else {
                console.error(`Unhandled ListType: ${listTypeName}`);
            }
        }
        // Handle NonNullType + NamedType (for simple non-nullable types)
        else if (varType.kind === 'NonNullType' && varType.type.kind === 'NamedType') {
            const typeName = varType.type.name.value;
            if (['Int', 'String', 'Object'].includes(typeName)) {
                params.push({
                    type: typeName.toLowerCase(),
                    key: varName,
                });
            } else {
                console.error(`Unhandled NonNull NamedType: ${typeName}`);
            }
        } else {
            console.error(`Unhandled variable type: ${varType.kind}`);
        }
    }

    return {
        key,
        params,
    };
};
