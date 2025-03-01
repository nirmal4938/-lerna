// apolloClient.js
import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from "@apollo/client";
import { RestLink } from "apollo-link-rest";
import { setContext } from "apollo-link-context";
import { augmentHeaders } from "./utils/http";
import { convertToFormData } from "./utils/convertToFormData";

// Authorization headers function
const authLink = setContext(async (_, { headers }) => {
  try {
    const augmentedHeaders = await augmentHeaders(headers || {});
    return { headers: augmentedHeaders };
  } catch (error) {
    console.error("Error augmenting headers:", error);
    return { headers };
  }
});
const loggingLink = new ApolloLink((operation, forward) => {
  console.log("Intercepted operation:");
  console.log("Operation name:", operation.operationName);
  console.log("Variables:", operation.variables);
  console.log("Context:", operation.getContext());
  
  return forward(operation).map((response) => {
    console.log("Response received:", response);
    return response;
  });
});

// RestLink configuration for REST API
const restLink = new RestLink({
  uri: "https://node2025-1.onrender.com/api/", // Replace with your actual API URL
  bodySerializers: {
    fileEncode: async (data, headers) => {
      console.log("Inside fileEncode");
      console.log("Data passed to fileEncode:", data);
      headers.set("Accept", "*/*");
      headers.delete("Content-Type"); // Let the browser set the correct boundary
      await augmentHeaders(headers); // Ensure headers are augmented properly
      const formData = convertToFormData(data);
      console.log("Form Data: ", formData);
      return { body: formData, headers };
    },
  },
  credentials: "include", // Include credentials for CORS requests
});

// InMemoryCache setup for Apollo Client
const cache = new InMemoryCache();

// Apollo Client instance
export const client = new ApolloClient({
  cache,
  link: ApolloLink.from([authLink,loggingLink, restLink]),
  connectToDevTools: true, // Enables Apollo DevTools integration
});

