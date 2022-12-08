import { ChangeEvent, useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { useResetPass } from "../../hooks/useFetch";
import { useRouter } from "next/router";

type ITypeParam = "password" | "password2";

export default function ResetPassword({ data, status }: IRes): JSX.Element {
  const toast = useToast();
  const router = useRouter();
  const [resetPass, { data: dataRes, error, loading }] = useResetPass();
  const [form, setForm] = useState({
    password: "",
    password2: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isOkButton, setIsOkButton] = useState(false);

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
      form.password2.length > 3 &&
      form.password2 === form.password &&
      Boolean(data?.token) &&
      Boolean(data?.userId) &&
      status === "ok";

    setIsOkButton(isOk);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.password, form.password2]);

  const handleClick = () => {
    if (isOkButton && data?.token && data.userId) {
      resetPass({
        password: form.password,
        token: data.token,
        userId: data.userId,
      });
    }
  };

  useEffect(() => {
    if (dataRes) {
      if (dataRes.success) {
        toast({
          title: "Contraseña actualizada",
          description: dataRes.message,
          status: "error",
          duration: 8000,
          isClosable: true,
          position: "top-right",
        });
        router.push('/users/login')
      } else {
        toast({
          title: "Error al registrarse",
          description: dataRes.message,
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
        position: "top-right",
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRes, error]);

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"sm"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Nueva contraseña
        </Heading>
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
                onClick={() => setShowPassword((showPassword) => !showPassword)}
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
        <Stack spacing={6}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            isLoading={loading}
            isDisabled={!isOkButton || loading}
            onClick={handleClick}
          >
            Reestablecer
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}

interface IDataRes {
  token: string;
  userId: string;
}

interface IRes {
  data: IDataRes | null;
  status: "expired" | "notFound" | "ok";
}

interface IRedirect {
  redirect: {
    destination: string;
    permanent: boolean;
  };
}

interface IQueryProps extends ParsedUrlQuery {
  token: string;
  id: string;
}

export const getServerSideProps: GetServerSideProps<
  IRes | IRedirect,
  IQueryProps
> = async ({ query }) => {
  const { id, token } = query as IQueryProps;

  if (!id || !token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      data: {
        token,
        userId: id,
      },
      status: "ok",
    },
  };
};
