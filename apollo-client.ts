import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
const client = new ApolloClient({
  // uri: "https://arabetransfer.herokuapp.com/api",
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: "https://arabetransfer.herokuapp.com/api"
  })
});

export default client;
