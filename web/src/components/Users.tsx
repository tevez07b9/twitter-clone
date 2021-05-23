import { gql, useQuery } from "@apollo/client";
import React from "react";

type User = {
  name: string;
  id: number;
  email: string;
};

const USERS_QUERY = gql`
  query getUsers {
    users {
      id
      name
      email
    }
  }
`;

export default function Users() {
  const { loading, error, data } = useQuery(USERS_QUERY);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div>
      {data.users.map((user: User) => (
        <p>{user.name}</p>
      ))}
    </div>
  );
}
