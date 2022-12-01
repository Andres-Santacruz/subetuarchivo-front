import { gql } from "@apollo/client";

export const GET_FILES = gql`
  query getFile($codeFile: String!) {
    getFile(codeFile: $codeFile) {
      file
      name
    }
  }
`;