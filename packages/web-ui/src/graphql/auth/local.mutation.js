import gql from 'graphql-tag';

export const Login = gql`
  mutation login($credentials: Credentials!) {
    result(input: $credentials)
      @rest(type: "BasicResult" path: "auth/login" method: "POST") {
        error
        message
      }
  }
`;
export const Logout = gql`
  mutation logout($options: String!) {
    result(input: $options)
      @rest(type: "BasicResult" path: "auth/logout" method: "POST") {
        error
        message
      }
  }
`;