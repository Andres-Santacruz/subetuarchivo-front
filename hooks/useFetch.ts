import { useCallback, useState } from "react";
import { axiosUseGenerateOtp, axiosUseUploadFile } from "../api/axiosRequests";

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

export const useGenerateOtp = (): [(email: string) => Promise<void>, IUseGenOtp] => {
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

export const useUploadFile = (): [(data: IData) => Promise<void>, IUseUpload] => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IDataUpload | null>(null);
  const [error, setError] = useState<unknown>(null);

  const uploadFile = useCallback(async (data: IData) => {
    const {email, files, validationId, config} = data

      setLoading(true);
      const res = await axiosUseUploadFile({
        email,
        files,
        otpVerify: validationId.toString(),
        password: config?.password,
        time: config?.time
      });
      setData(res);
      setLoading(false);
      if(!res.success){
        setError(res);
      }
    
  }, []);

  return [uploadFile, { data, loading, error }];
};
