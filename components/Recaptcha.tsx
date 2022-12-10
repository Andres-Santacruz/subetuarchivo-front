import React, { Dispatch, SetStateAction, forwardRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface IPropsRecaptcha {
  setErrorCaptcha: Dispatch<SetStateAction<boolean>>;
  isInVisble?: string;
}

const Recaptcha = forwardRef<ReCAPTCHA, IPropsRecaptcha>(
  ({ setErrorCaptcha, isInVisble }, ref) => {

    const onChangeRecaptcha = (token: string | null) => {
      setErrorCaptcha(!Boolean(token));
    };    

    return (
      <>
        <ReCAPTCHA
          ref={ref}
          sitekey={
            process.env.NEXT_PUBLIC_RECAPTCHA_KEY ||
            "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          }
          onChange={onChangeRecaptcha}
          size={isInVisble ? "invisible" : undefined}
        />
      </>
    );
  }
);

Recaptcha.displayName = "Recaptcha";

export default Recaptcha;
