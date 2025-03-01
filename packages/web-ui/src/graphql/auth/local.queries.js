// import gql from 'graphql-tag';
// import { gql } from "@apollo/client";
import { gql } from '@apollo/client';

export const GetAuthenticated = gql`
  query status {
    result @rest(type: "[BasicResult]", path: "auth/status") {
      error
      payload
    }
  }
`;
export const GetAuthenticationStrategies = gql`
  query strategies($domain: String) {
    result(domain: $domain) 
      @rest(type: "AuthenticationStrategies", path: "auth/strategies/{args.domain}") {
        local
        azure
        strategies
      }
  }
`;
