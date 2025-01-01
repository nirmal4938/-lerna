// import { ApolloClient, InMemoryCache } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { RestLink } from 'apollo-link-rest';
import { ApolloLink } from 'apollo-link';
import { onError } from '@apollo/client/link/error';

// Define a custom link to intercept the response
const responseInterceptorLink = new ApolloLink((operation, forward) => {
    return forward(operation).map((response) => {
        // Log the response from the server
        console.log('Original Response:', response);

        // Modify the response (for example, filter out some fields)
        if (response.data && response.data.deviceHistory) {
            const modifiedData = response.data.deviceHistory.map((device) => ({
                _id: device._id, // Keep only _id for example
                __typename: 'DeviceHistory',
            }));

            // Log the modified data
            console.log('Modified Response:', modifiedData);

            // Return the modified response data
            // response.data.deviceHistory = modifiedData;
        }

        // Return the modified response
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
            'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Add auth token
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
const client = new ApolloClient({
    link: ApolloLink.from([responseInterceptorLink, errorLink, restLink]), // Chain the links
    cache: new InMemoryCache(),
    addTypename: false,
});

export default client;
