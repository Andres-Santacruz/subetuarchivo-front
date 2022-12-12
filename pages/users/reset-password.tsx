import { useEffect, useMemo, useState, useRef } from "react";
import { useRouter } from "next/router";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { emailRegex } from "../../helpers";
import { useAuth } from "../../hooks/useAuth";
import { useGenLinkResetPass } from "../../hooks/useFetch";
import Recaptcha from "../../components/Recaptcha";
import OwnHead from "../../components/OwnHead";

const SEO = {
  title: "Reestablece contraseña — Subetuarchivo ",
  description:
    "Reestablece tu contraseña para volver a acceder a tu cuenta en subetuarchivo",
  url: "/users/reset-password",
  imgName: "login.png",
};

export default function ForgotPasswordForm(): JSX.Element {
  const { user } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [genLinkResetPass, { data, error, loading }] = useGenLinkResetPass();
  const [email, setEmail] = useState("");
  const [errorCaptcha, setErrorCaptcha] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (data) {
      if (data.success) {
        toast({
          title: "Revisa tu correo",
          description: data.message,
          status: "success",
          duration: 8000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Error al generar Link",
          description: data.message,
          status: "error",
          duration: 8000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
    if (error) {
      toast({
        title: "Error al generar Link",
        description: (error as any).message,
        status: "error",
        duration: 8000,
        isClosable: true,
        position: "top-right",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  const isValidEmail = useMemo(() => {
    if (email === "") return true;
    return emailRegex.test(email);
  }, [email]);

  const hanldeClick = () => {
    try {
      const token = recaptchaRef.current?.getValue();
      if (!token) {
        setErrorCaptcha(true);
        return;
      }
    } catch (error) {
      recaptchaRef.current?.reset();
      if(typeof window !== "undefined"){
        window.location.reload();
      }
      return toast({
        title: "¡Error!",
        description: "Por favor recarga la página",
        status: "error",
        duration: 8000,
        isClosable: true,
        position: "top-right",

      });
    }
    if (isValidEmail) {
      genLinkResetPass({ email });
    }
  };

  useEffect(() => {
    const clean = recaptchaRef.current;
    return () => {
      if (clean) {
        clean.reset();
      }
    };
  }, []);

  return (
    <>
      <OwnHead
        title={SEO.title}
        description={SEO.description}
        imgName={SEO.imgName}
        url={SEO.url}
      />

      <Flex
        minH={"80vh"}
        align={"center"}
        justify={"center"}
        // bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={8}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={8}
          my={8}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            ¿Olvidaste tu contraseña?
          </Heading>
          <Text
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            Te enviaremos un correo electrónico con un link para restablecer tu
            contraseña
          </Text>
          <FormControl id="email">
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <Stack
            spacing={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Recaptcha setErrorCaptcha={setErrorCaptcha} ref={recaptchaRef} />
            {errorCaptcha && (
              <Text fontSize="smaller" color="red.400">
                Acepta el recaptcha para continuar
              </Text>
            )}
          </Stack>
          <Stack spacing={6}>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              disabled={!isValidEmail || email.length === 0 || loading}
              isLoading={loading}
              onClick={hanldeClick}
            >
              Restablecer contraseña
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
