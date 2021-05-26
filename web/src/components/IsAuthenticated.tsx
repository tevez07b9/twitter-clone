import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Redirect } from "react-router";

const ME_QUERY = gql`
  {
    me {
      id
    }
  }
`;

interface Props {
  children?: React.ReactNode;
}

const IsAuthenticated = ({ children }: Props) => {
  const { loading, error, data } = useQuery(ME_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !data.me) {
    return <Redirect to={{ pathname: "/landing" }} />;
  }

  return <>{children}</>;
};

export default IsAuthenticated;
