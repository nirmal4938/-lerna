import gql from "graphql-tag";
import { UserFragment } from "./user.fragments";

export const UpdateUser = gql`
  mutation update_user($user: User!, $id: Int!) {
    update_user(input: $user, id: $id) @rest(
      type: "User" path: "users/{args.id}" method: "PATCH"
    ) {
      ...user
    }
  }
  ${UserFragment}
`;