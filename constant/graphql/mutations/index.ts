import { gql } from "@apollo/client";

export const GENERATE_OTP = gql`
  mutation createOTP($email: String!) {
    createOtp(email: $email) {
      error
      success
      otp
    }
  }
`;

export const VERIFY_OTP = gql`
  mutation verifyOTP($data: VerifyOTPInput!) {
    verifyOtp(data: $data) {
      verify
      idValidation
    }
  }
`;

export const UPLOAD_FILES = gql`
  mutation uploadFile($data: FileUploadInput!){
    uploadFile(data: $data){
      success 
      error 
      fileInfo{
        code 
        expirationDate 
        fileSet{
          edges{
            node{
              file 
              name
            }
          }
        }
      }
    }
  }
`;
