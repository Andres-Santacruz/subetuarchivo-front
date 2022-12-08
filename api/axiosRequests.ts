import axiosApi from "./fileApi";

interface IPropsLogin {
  email: string;
  password: string;
}

interface IPropsRegister extends IPropsLogin {
  name: string;
  surname: string;
}

interface User {
  token: string;
  email: string;
  name: string;
}

interface IResLogin {
  message: string;
  user: User | null;
  success: boolean;
}

interface IResGetFile {
  message: string;
  success: boolean;
  urls: string[] | null;
}

interface IResGenOtp {
  message: string;
  success: boolean;
}

interface IPropsUpload {
  otpVerify: string;
  email: string;
  files: File[];
  password?: string | undefined;
  time?: number | undefined;
}

interface IResUpload {
  info: string | null;
  message: string;
  success: boolean;
}

interface IResGenLink {
  message: string;
  url: string | null;
  success: boolean;
}

interface IParamResetPass {
  token: string;
  userId: string;
  password: string;
}

interface IResResetPass {
  message: string;
  success: boolean;
}

export const axiosUseLogin = async ({ email, password }: IPropsLogin) => {
  const { data } = await axiosApi.post<IResLogin>("/login", {
    email,
    password,
  });

  return { ...data };
};

export const axiosUseRegister = async ({
  email,
  password,
  name,
  surname
}: IPropsRegister) => {
  const { data } = await axiosApi.post<IResLogin>("/register", {
    email,
    password,
    name,
    surname
  });

  return { ...data };
};

export const axiosUseGetFile = async (code: string) => {
  const { data } = await axiosApi.post<IResGetFile>("/getfile", {
    code,
  });

  return { ...data };
};

export const axiosUseGenerateOtp = async (email: string) => {
  const { data } = await axiosApi.post<IResGenOtp>("/genotp", {
    email,
  });

  return { ...data };
};

export const axiosUseUploadFile = async ({
  otpVerify,
  email,
  files,
  password,
  time
}: IPropsUpload) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("otpVerify", otpVerify);
  
  files.forEach((file, index) => {
    formData.append(`file${index}`, file);
  });
  
  if(password){
    formData.append("password", password);
  }
  if (time) {
    formData.append("time", time.toString());
  }

  const { data } = await axiosApi.post<IResUpload>("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return { ...data };
};

export const axiosGenLinkResetPass = async (email: string)=>{
  const { data } = await axiosApi.post<IResGenLink>(
    "/generate-reset-password",
    {
      email,
    }
  );

  return {...data}
}

export const axiosResetPassword = async ({token, userId, password }:IParamResetPass) => {
  const {data} = await axiosApi.post<IResResetPass>("/reset", {
    token,
    userId,
    password
  });

  return { ...data}
}
