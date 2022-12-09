import { ChangeEvent, useEffect, useMemo, useState, useRef } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link as LinkChackra,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/router";
import Link from "next/link";
import { emailRegex } from "../../helpers";
import { useRegister } from "../../hooks/useFetch";
import Recaptcha from "../../components/Recaptcha";
import ReCAPTCHA from "react-google-recaptcha";

type ITypeParam = "name" | "surname" | "email" | "password" | "password2";

export default function Register() {
  const { user, signIn } = useAuth();
  const toast = useToast();

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [register, { data, error, loading }] = useRegister();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    password2: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isOkButton, setIsOkButton] = useState(false);
  const [errorCaptcha, setErrorCaptcha] = useState(false);

  useEffect(() => {
    console.log("user", user);
    if (user) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      if (data.success && data.user) {
        signIn({
          token: data.user.token,
          user: data.user,
        });
        router.push("/");
      } else {
        toast({
          title: "Error al registrarse",
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
        title: "Error al registrarse",
        description: (error as any).message,
        status: "error",
        duration: 8000,
        isClosable: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  const isValidEmail = useMemo(() => {
    if (form.email === "") return true;
    return emailRegex.test(form.email);
  }, [form.email]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: ITypeParam
  ) => {
    setForm((prev) => ({
      ...prev,
      [`${type}`]: e.target.value,
    }));
  };

  useEffect(() => {
    const isOk =
      form.password.length > 3 &&
      emailRegex.test(form.email) &&
      form.password === form.password2 &&
      form.name.length >= 3 &&
      form.surname.length >= 3;
    setIsOkButton(isOk);
  }, [
    form.email,
    form.name.length,
    form.password,
    form.password2,
    form.surname.length,
  ]);

  const handleSubmit = () => {
    if(!recaptchaRef.current?.getValue()){
      return setErrorCaptcha(true);
    }
    register({
      email: form.email,
      password: form.password,
      name: form.name,
      surname: form.surname,
    });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      // bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Registrate
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              Para disfrutar de nuevas funcionalidades 👌
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="name" isRequired>
                    <FormLabel>Nombre</FormLabel>
                    <Input
                      type="text"
                      value={form.name}
                      onChange={(e) => handleInputChange(e, "name")}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="surname" isRequired>
                    <FormLabel>Apellido</FormLabel>
                    <Input
                      type="text"
                      value={form.surname}
                      onChange={(e) => handleInputChange(e, "surname")}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired isInvalid={!isValidEmail}>
                <FormLabel>Correo Electrónico</FormLabel>
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleInputChange(e, "email")}
                />
                {!isValidEmail && (
                  <FormHelperText color="red.400" fontSize="xs">
                    Correo electrónico no válido
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl
                id="password"
                isRequired
                isInvalid={form.password !== form.password2}
              >
                <FormLabel>Contraseña</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => handleInputChange(e, "password")}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl
                id="password2"
                isRequired
                isInvalid={form.password !== form.password2}
              >
                <FormLabel>Confirma contraseña</FormLabel>
                <Input
                  type="password"
                  value={form.password2}
                  onChange={(e) => handleInputChange(e, "password2")}
                />
                {form.password !== form.password2 && (
                  <FormHelperText color="red.400" fontSize="xs">
                    Las contraseñas no coinciden
                  </FormHelperText>
                )}
              </FormControl>
              <Stack
                spacing={4}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Recaptcha
                  setErrorCaptcha={setErrorCaptcha}
                  ref={recaptchaRef}
                />
                {errorCaptcha && (
                  <Text fontSize="smaller" color="red.400">
                    Acepta el recaptcha para continuar
                  </Text>
                )}
              </Stack>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={handleSubmit}
                  disabled={!isOkButton || loading}
                  isLoading={loading}
                >
                  Registrarse
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  ¿Ya tienes cuenta?{" "}
                  <Link href="/users/login" passHref>
                    <LinkChackra color={"blue.400"}>Iniciar sesión</LinkChackra>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Flex>
  );
}
