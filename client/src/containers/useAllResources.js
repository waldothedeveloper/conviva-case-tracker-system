import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_ALL_RESOURCES = gql`
  query GET_ALL_RESOURCES {
    getAllResources {
      FirstName
      LastName
      id
    }
  }
`;

export default function useAllResources() {
  // const [resource, setResource] = React.useState([]);

  const [loadAllResources, { called, data, loading, error }] = useLazyQuery(
    GET_ALL_RESOURCES
  );
  // console.log("data: ", data);
  return [{ called, loading, data, error }, loadAllResources];
}
