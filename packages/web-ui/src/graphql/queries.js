import gql from "graphql-tag";

export const GET_DEVICE_HISTORY = gql`
  query get_all_history(
    $filter: String,
    $sort: Object,
    $offset: Int,
    $limit: Int
  ) {
    get_all_history(
      filter: $filter,
      sort: $sort,
      offset: $offset,
      limit: $limit
    ) 
    @rest(type: "DeviceHistory", path: "device-history?{args}") {
      rows @type(name: "DeviceHistory") {
        _id
        device_id
        device_type
        timestamp
        metadata
        data
      }
      count
    }
  }
`;
