import { gql } from "apollo-server-express";

const typeDefs = gql`
  type UserType {
    success: Boolean!
    message: String!
    user: User
  }
  type User {
    firstName: String
    lastName: String
    email: String
    createdAt: String
  }
  type Query {
    user: UserType
  }
`;

export default typeDefs;
