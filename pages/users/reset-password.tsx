import { useEffect, useMemo, useState, useRef, LegacyRef } from "react";
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
    if(!recaptchaRef.current?.getValue()){
      setErrorCaptcha(true);
      return;
    }
    if (isValidEmail) {
      genLinkResetPass({ email });
    }
  };

  const onChangeRecaptcha = (token: string | null) => {
    console.log("token", token);
    console.log('vea -->',recaptchaRef.current?.getValue())
  };

  return (
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
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={
              process.env.RECAReCAPTCHA_KEY ||
              "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            }
            onChange={onChangeRecaptcha}
            // size="invisible"
          />
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
  );
}
