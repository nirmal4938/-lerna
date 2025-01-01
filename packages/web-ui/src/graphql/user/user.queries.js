import gql from "graphql-tag";

export const GetUsers = gql`
  query get_users($limit: Int!, $offset: Int!, $sort: Object!) {
    get_users(limit: $limit, offset: $offset, sort: $sort)
      @rest(type: "UsersPaged", path: "users?{args}") {
        rows @type(name: "User") {
          id
          first_name
          last_name
          email
          phone
          enabled
          role @type(name: "Role") {
            id
            name
          }
        }
        count
    }
  }
`;