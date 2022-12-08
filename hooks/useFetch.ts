import { useCallback, useState } from "react";
import {
  axiosGenLinkResetPass,
  axiosResetPassword,
  axiosUseGenerateOtp,
  axiosUseLogin,
  axiosUseRegister,
  axiosUseUploadFile,
} from "../api/axiosRequests";

interface IDataGenOtp {
  message: string;
  success: boolean;
}
interface IDataUpload {
  message: string;
  success: boolean;
  info: string | null;
}

interface IUseGenOtp {
  data: IDataGenOtp | null;
  loading: boolean;
  error: unknown;
}
interface IUseUpload {
  data: IDataUpload | null;
  loading: boolean;
  error: unknown;
}

interface IConfig {
  time?: number;
  password?: string;
}
interface IData {
  files: File[];
  email: string;
  validationId: number;
  config?: IConfig | undefined;
}

interface IDataLogin {
  email: string;
  password: string;
}
interface IUserLogin {
  token: string;
  email: string;
  name: string;
}
interface IDataLoginRes {
  message: string;
  user: IUserLogin | null;
  success: boolean;
}
interface IUseLogin {
  data: IDataLoginRes | null;
  loading: boolean;
  error: unknown;
}

interface IDataRegister {
  email: string;
  password: string;
  name: string;
  surname: string;
}
interface IUseRegister {
  data: IDataLoginRes | null;
  loading: boolean;
  error: unknown;
}
interface IDataRegisterRes {
  message: string;
  user: IUserLogin | null;
  success: boolean;
}


interface IDataGenLink {
  message: string;
  url: string | null;
  success: boolean;
};
interface IResUseGenLink {
  data: IDataGenLink | null;
  loading: boolean;
  error: unknown;
};

interface IGenLinkParams {
  email: string;
};

interface IResetPassParams {
  token: string;
  userId: string;
  password: string;
}
interface IDataResetPass {
  message: string;
  success: boolean;
}
interface IResUseResetPass {
  data: IDataResetPass | null;
  loading: boolean;
  error: unknown;
}

export const useGenerateOtp = (): [
  (email: string) => Promise<void>,
  IUseGenOtp
] => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IDataGenOtp | null>(null);
  const [error, setError] = useState<unknown>(null);

  const generateOtp = useCallback(async (email: string) => {
    try {
      setLoading(true);
      const res = await axiosUseGenerateOtp(email);
      setData(res);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  }, []);

  return [generateOtp, { data, loading, error }];
};

export const useUploadFile = (): [
  (data: IData) => Promise<void>,
  IUseUpload
] => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IDataUpload | null>(null);
  const [error, setError] = useState<unknown>(null);

  const uploadFile = useCallback(async (data: IData) => {
    const { email, files, validationId, config } = data;

    setLoading(true);
    const res = await axiosUseUploadFile({
      email,
      files,
      otpVerify: validationId.toString(),
      password: config?.password,
      time: config?.time,
    });
    setData(res);
    setLoading(false);
    if (!res.success) {
      setError(res);
    }
  }, []);

  return [uploadFile, { data, loading, error }];
};

export const useLogin = (): [
  (data: IDataLogin) => Promise<void>,
  IUseLogin
] => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IDataLoginRes | null>(null);
  const [error, setError] = useState<unknown>(null);

  const login = useCallback(async ({ email, password }: IDataLogin) => {
    try {
      setLoading(true);
      const res = await axiosUseLogin({ email, password });
      setLoading(false);
      setData(res);
    } catch (error) {
      setError(error);
    }
  }, []);

  return [login, { data, error, loading }];
};

export const useRegister = (): [
  (data: IDataRegister) => Promise<void>,
  IUseRegister
] => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IDataRegisterRes | null>(null);
  const [error, setError] = useState<unknown>(null);

  const register = useCallback(async ({ email, password, name, surname }: IDataRegister) => {
    try {
      setLoading(true);
      const res = await axiosUseRegister({ email, password, name, surname });
      setLoading(false);
      setData(res);
    } catch (error) {
      setError(error);
    }
  }, []);

  return [register, { data, error, loading }];
};

export const useGenLinkResetPass = (): [(param: IGenLinkParams)=>Promise<void>, IResUseGenLink] => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IDataGenLink | null>(null);
  const [error, setError] = useState<unknown>(null);

  const genLinkResetPass = useCallback(async ({email}: IGenLinkParams)=>{
    try {
      setLoading(true);
      const res = await axiosGenLinkResetPass(email);
      setLoading(false);
      setData(res);
    } catch (error) {
      setError(error);
    }
  }, [])

  return [genLinkResetPass, { data, error, loading }];
}

export const useResetPass = (): [(param: IResetPassParams)=>Promise<void>, IResUseResetPass] => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IDataResetPass | null>(null);
  const [error, setError] = useState<unknown>(null);

  const resetPass = useCallback(async ({token, userId, password}: IResetPassParams)=>{
    try {
      setLoading(true);
      const res = await axiosResetPassword({ token, userId, password });
      setLoading(false);
      setData(res);
    } catch (error) {
      setError(error);
    }
  }, [])

  return [resetPass, { data, error, loading }];
}
