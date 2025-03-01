// import { ApolloClient, InMemoryCache } from '@apollo/client';
import { defaultDataIdFromObject, InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { RestLink } from 'apollo-link-rest';
import { ApolloLink } from 'apollo-link';
import { onError } from '@apollo/client/link/error';

// Define a custom link to intercept the response
const responseInterceptorLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
      console.log('Original Response:', response);
  
      // Verify and log the response structure
      if (response && response.data) {
        console.log('Valid Response Data:', response.data);
      } else {
        console.warn('Invalid Response Structure:', response);
      }
  
      return response;
    });
  });

// Define the REST link with the backend URL
const restLink = new RestLink({
    uri: 'http://localhost:4000/api/', // Your Express server endpoint
    customFetch: async (uri, options) => {
        // Dynamically add headers
        const updatedHeaders = {
            ...options.headers, // Ensure existing headers are retained
            'Content-Type': 'application/json', // Specifies JSON content
            // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Add auth token
            'Accept': 'application/json', // Inform server of JSON response
            'X-Custom-Header': 'YourCustomHeaderValue', // Example custom header
        };

        // Update the options object with headers
        options.headers = updatedHeaders;

        // Debug logs
        console.log('Final Request URI:', uri);
        console.log('Request Options:', options); // Logs headers, method, etc.

        // Proceed with the fetch request
        return fetch(uri, options);
    },
});
// Error handling
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        console.log('GraphQL Errors:', graphQLErrors);
    }
    if (networkError) {
        console.log('Network Error:', networkError);
    }
});

// Set up Apollo Client with the intercepting link
// const client = new ApolloClient({
//     link: ApolloLink.from([ errorLink, restLink]),
//     cache: new InMemoryCache({
//       addTypename: false, // Optional if your schema doesn't use __typename
//     }),
//   });
const authLink = new ApolloLink((operation, forward) => {
    // Add Authorization header dynamically
    const token = localStorage.getItem('authToken'); // Get token from local storage or another source
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    }));
  
    return forward(operation);
  });

  const cache = new InMemoryCache({
    dataIdFromObject: (object) => {
      switch (object.__typename) {
        case 'SuggestedPersonalDataCategory':
          return `SPDC:${object.name}-${object.count}`;
        case 'UserOrganization':
          return `UserOrganization:${object.user_id}-${object.organization_id}-${object.role_id}`;
        case 'PRFile':
          return `PRFile:${object.md5}-${object.path}`; // Path is incase same file uploaded to multiple systems
        case 'OrganizationRolePermission':
          return `OrganizationRolePermission:${object.organization_id}-${object.role_id}-${object.permission_id}`;
        case 'SystemTemplate':
          return `SystemTemplate:${object.name}`;
        default:
          return defaultDataIdFromObject(object);
      }
    },
  });
export const client = new ApolloClient({
    cache, // Use the defined cache
    link: ApolloLink.from([authLink, restLink]), // Combine links in order
  });
//   client.cache.reset();
export default client;
