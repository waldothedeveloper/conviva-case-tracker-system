import React from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_TICKETS_PER_COMPANY = gql`
  query GET_TICKETS_PER_COMPANY($id: String!) {
    getTicketsByCompany(id: $id) {
      priority
      status
      ticketNumber
      title
    }
  }
`;

export default function GetTicketsPerCompany(sendData) {
  const [selectedCompany, setSelectedCompany] = React.useState({});
  // console.log("selectedCompany: ", selectedCompany);

  const [getTicketsPerCompany, { called, loading, data, error }] = useLazyQuery(
    GET_TICKETS_PER_COMPANY,
    { variables: { id: selectedCompany.id } }
  );

  React.useEffect(() => {
    if (selectedCompany.id !== undefined) {
      getTicketsPerCompany({ variables: { id: selectedCompany.id } });
    }
  }, [selectedCompany, getTicketsPerCompany]);

  React.useEffect(() => {
    if (selectedCompany.id !== undefined && data !== undefined) {
      sendData([{ data, loading, error, called }, selectedCompany]);
    }
  }, [
    selectedCompany,
    data,
    called,
    error,
    loading,
    getTicketsPerCompany,
    sendData
  ]);

  return setSelectedCompany;
}
