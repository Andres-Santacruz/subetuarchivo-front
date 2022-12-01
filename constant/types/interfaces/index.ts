export interface CreateOtp {
  error: string | null;
  success: boolean;
  otp: number | null;
}
//-------------------------------------
export interface IresGenerateOTP {
  createOtp: CreateOtp;
  errors?: Error[];
}

 export interface Location {
   line: number;
   column: number;
 }

 export interface Error {
   message: string;
   locations: Location[];
 }

export interface IResponseVerify {
  verifyOtp: VerifyOtp;
}

export interface VerifyOtp {
  verify: boolean;
  idValidation: number;
}
// -----------------------------------
/* export interface IResponseUpload {
  data: DataUpload;
} */

export interface IResponseUpload {
  uploadFile: UploadFile;
}

export interface UploadFile {
  success: boolean;
  error: string;
  fileInfo: FileInfo | null;
}

export interface FileInfo {
  code: string;
  expirationDate: Date;
  fileSet: FileSet;
}

export interface FileSet {
  edges: Edge[];
}

export interface Edge {
  node: Node;
}

export interface Node {
  file: string;
  name: string;
}

// ----------------------------------------------

export interface IResponseGetFile {
  getFile: GetFile[] | null;
}
export interface GetFile {
  file: string;
  name: string;
}

// -------------------USERCONTEXT-------------------------- //

export interface AuthContextProp {
  token: string | null;
  user: IUsuario | null;
  signIn: (signInData: ISignInProps) => void;
  logOut: () => void;
  removeError: () => void;
}

export interface IUsuario {
  name?: string;
  /*   email: string;
  uid: string;
  img?: string;
  lastname?: string; */
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface AuthStateProp {
  token: string | null;
  user: IUsuario | null;
};

export interface ISignInProps {
  token: string;
  user: IUsuario;
}
