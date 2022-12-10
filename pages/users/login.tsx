import Link from "next/link";
import { useRouter } from "next/router";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link as LinkChakra,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormHelperText,
  InputRightElement,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { emailRegex } from "../../helpers";
import { useAuth } from "../../hooks/useAuth";
import { useLogin } from "../../hooks/useFetch";

type ITag = "email" | "password";

const Login = () => {
  const router = useRouter();

  const { signIn, user } = useAuth();
  const toast = useToast();
  const [isOkButton, setIsOkButton] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const [login, { data, loading, error }] = useLogin();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
          title: "Error al iniciar sessión",
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
        title: "Error al iniciar sessión",
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

  useEffect(() => {
    if (form.password.length > 3 && emailRegex.test(form.email)) {
      setIsOkButton(true);
    } else {
      setIsOkButton(false);
    }
  }, [form.email, form.password]);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>, tag: ITag) => {
    setForm((prev) => ({ ...prev, [`${tag}`]: e.target.value }));
  };

  const handleSubmit = () => {
    login({
      email: form.email,
      password: form.password,
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
          <Stack align={"center"} margin="8">
            <Heading fontSize={"4xl"}>Inicia sesión</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              ¿No tienes cuenta?{" "}
              <Link href="/users/register" passHref>
                <LinkChakra color={"blue.400"}>Regsitrate ✌️</LinkChakra>
              </Link>
            </Text>
          </Stack>
          <Stack spacing={4}>
            <FormControl id="email" isInvalid={!isValidEmail}>
              <FormLabel>Correo electrónico</FormLabel>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => onChangeInput(e, "email")}
              />
              {!isValidEmail && (
                <FormHelperText color="red.400" fontSize="xs">
                  Correo electrónico no válido
                </FormHelperText>
              )}
            </FormControl>

            <FormControl id="password">
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => onChangeInput(e, "password")}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <ViewOffIcon color="blue.500" />
                    ) : (
                      <ViewIcon color="blue.500" />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Recuerdame</Checkbox>
                <Link href="/users/reset-password" passHref>
                  <LinkChakra color={"blue.400"}>
                    ¿Olvido su contraseña?
                  </LinkChakra>
                </Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                disabled={!isOkButton || loading}
                onClick={handleSubmit}
                isLoading={loading}
              >
                Iniciar sesión
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
export default Login;
