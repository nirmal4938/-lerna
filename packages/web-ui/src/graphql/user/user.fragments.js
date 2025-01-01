import gql from 'graphql-tag';

export const UserFragment = gql`
  fragment user on User {
    id
    first_name
    last_name
    email
    phone
    require_mfa
    god_mode
    enabled
    role_id
    role @type(name: "Role") {
      id
      name
    }
    subsidiaries @type(name: "SubOrganization") {
      id
      name
    }
  }
`;
