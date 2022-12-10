import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link as LinkChakra,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Lottie from "lottie-react";
import VisalizadorArabe from "../../components/VisalizadorArabe";
import downloadLottie from "../../public/assets/imgs/lotties/downloading.json";
import notFound from "../../public/assets/imgs/lotties/404.json";
import expired from "../../public/assets/imgs/lotties/expired.json";
import { axiosUseGetFile } from "../../api/axiosRequests";
import Link from "next/link";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { IDataGetFileProt, useGetFileProtected } from "../../hooks/useFetch";
import ViewFiles from "../../components/ViewFiles";

type Prop = {
  data: string[];
  code: string;
  status: "notFound" | "expired" | "ok" | "protected";
};

const ReadFilePage = ({ data, code, status }: Prop) => {
  const FILES = data.map((url) => {
    const name = url.split("__")[1];
    return {
      uri: url,
      name,
    };
  });

  const toast = useToast();

  const [nameFile, setNameFile] = useState(FILES?.[0]?.name);
  const [urlFile, setUrlFile] = useState(FILES?.[0]?.uri);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState("");
  const [errorForm, setErrorForm] = useState(false);

  const [getFileProtected, { data: dataHook, error, loading }] =
    useGetFileProtected();

  const [dataPrint, setDataPrint] = useState<IDataGetFileProt | null>(null);

  useEffect(() => {
    if (password.length !== 4 && password.length !== 0) {
      setErrorForm(true);
    } else {
      setErrorForm(false);
    }
  }, [password]);

  useEffect(() => {
    if (dataHook) {
      if (dataHook.success && dataHook.urls) {
        setDataPrint(dataHook);
        const FILES_RES = dataHook.urls.map((url) => {
          const name = url.split("__")[1];
          return {
            uri: url,
            name,
          };
        });
        setNameFile(FILES_RES?.[0]?.name);
        setUrlFile(FILES_RES?.[0]?.uri);
        toast({
          title: "Archivo encontrado",
          description: dataHook.message,
          status: "success",
          duration: 8000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Error al buscar archivo",
          description: dataHook.message,
          status: "error",
          duration: 8000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
    if (error) {
      toast({
        title: "Error buscar archivo(s)",
        description: (error as any).message,
        status: "error",
        duration: 8000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [dataHook, error, toast]);

  const hanldeClickGetFile = () => {
    if (password.length === 4) {
      getFileProtected(code, password);
    }
  };

  

  if (dataPrint && dataPrint.urls) {

    const FILES_RES = dataPrint.urls.map((url) => {
      const name = url.split("__")[1];
      return {
        uri: url,
        name,
      };
    });

    return (
      <ViewFiles
        FILES={FILES_RES}
        nameFile={nameFile}
        setNameFile={setNameFile}
        setUrlFile={setUrlFile}
        urlFile={urlFile}
      />
    );
  }

  if (status === "expired") {
    return (
      <Box bg={"gray.50"} backgroundColor="transparent" width="100%" mt={8}>
        <Container
          /* as={SimpleGrid} */
          width="100%"
          height="full"
          justifyContent="center"
          p={1}
        >
          <Stack
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 4 }}
            // maxW='xl'
            align={"center"}
            // justifyContent="space-evenly"
            bg={"gray.50"}
            maxW="5xl"
            boxShadow="xl"
          >
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
              Archivo expirado
            </Heading>
            <Text fontSize={{ base: "sm", sm: "md" }} color={"gray.800"}>
              Tu archivo ha caducado, si deseas recuperarlo debes ser usuario{" "}
              <Link href="/info/pricing" passHref>
                <LinkChakra color="yellow.500">PREMIUM 👑</LinkChakra>
              </Link>
            </Text>
            <Lottie animationData={expired} style={{ width: "100%" }} />
          </Stack>
        </Container>
      </Box>
    );
  }

  if (status === "protected") {
    return (
      <Box bg={"gray.50"} backgroundColor="transparent" width="100%" mt={8}>
        <Container
          /* as={SimpleGrid} */
          width="100%"
          height="full"
          justifyContent="center"
          p={1}
        >
          <Stack
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 4 }}
            // maxW='xl'
            align={"center"}
            // justifyContent="space-evenly"
            bg={"gray.50"}
            maxW="5xl"
            boxShadow="xl"
          >
            <Stack
              spacing={8}
              w={"full"}
              maxW={"md"}
              bg="white"
              rounded={"xl"}
              boxShadow={"lg"}
              p={8}
              my={8}
            >
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
                Archivo protegido
              </Heading>
              <Text fontSize={{ base: "sm", sm: "md" }} color={"gray.800"}>
                Si deseas ver este contido debes ingresar una contraseña.
              </Text>
              <FormControl>
                <FormLabel>Ingresa constraseña</FormLabel>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={showPassword ? "text" : "password"}
                    placeholder="Ingresa una contraseña"
                    maxLength={4}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                <FormHelperText>
                  La contraseña debe ser de 4 caracteres.
                </FormHelperText>
                {errorForm && (
                  <FormHelperText color="red.400" fontSize="sm">
                    Número no válido
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
                  disabled={password.length !== 4 || loading}
                  isLoading={loading}
                  onClick={hanldeClickGetFile}
                >
                  Ver archivo
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Box>
    );
  }

  if (FILES.length === 0 || status === "notFound") {
    return (
      <Box bg={"gray.50"} backgroundColor="transparent" width="100%" mt={8}>
        <Container
          /* as={SimpleGrid} */
          width="100%"
          height="full"
          justifyContent="center"
          p={1}
        >
          <Stack
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 4 }}
            // maxW='xl'
            align={"center"}
            // justifyContent="space-evenly"
            bg={"gray.50"}
            maxW="5xl"
            boxShadow="xl"
          >
            <Text fontSize="lg">No se encontró ningun archivo archivo 😞</Text>
            <Lottie animationData={notFound} style={{ width: "100%" }} />
          </Stack>
        </Container>
      </Box>
    );
  }

  return (
    <ViewFiles FILES={FILES} nameFile={nameFile} setNameFile={setNameFile} setUrlFile={setUrlFile} urlFile={urlFile} />
  );
};

interface IRes {
  code: string;
  data: string[];
  status: "expired" | "notFound" | "ok" | "protected";
}

interface IRedirect {
  redirect: {
    destination: string;
    permanent: boolean;
  };
}

type IMessg =
  | "file expired"
  | "File protected, required password"
  | "files not found"
  | "Password invalid"
  | "find"
  | "code is not valid"
  | "code is required";

export const getServerSideProps: GetServerSideProps<IRes | IRedirect> = async ({
  query,
}) => {
  const { code } = query;

  if (!code) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const url = typeof code === "object" ? code.join("/") : code;
  const bytes = CryptoJS.AES.decrypt(url, process.env.SECRET_KEY as string);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  

  /* const value = CryptoJS.enc.Hex.parse(url).toString();
  const key = CryptoJS.enc.Hex.parse("fcbarcelona1234567890lucasvalenciahenao");
  // const key = CryptoJS.enc.Hex.parse(process.env.SECRET_KEY as string);
  const ivvar = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");
  const decryptedStringHex = CryptoJS.AES.decrypt(value, key, {
    iv: ivvar,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.NoPadding,
  });
  const originalText = decryptedStringHex.toString();

  console.log("orginaText", originalText); */

  if (originalText === "") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  /* if (typeof codeId === "string" && !/^[A-Za-z0-9]*$/.test(codeId)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } */

  /* const { data } = await client.query<IResponseGetFile>({
    query: GET_FILES,
    variables: {
      codeFile: originalText.toUpperCase(),
    },
  });
 */

  const { urls, success, message } = await axiosUseGetFile(
    originalText.toUpperCase()
  );

  const msgInfo = message as IMessg;

  if (!success || !urls) {
    if (msgInfo === "file expired") {
      return {
        props: {
          code: originalText,
          data: [],
          status: "expired",
        },
      };
    }

    if (msgInfo === "File protected, required password") {
      return {
        props: {
          code: originalText,
          data: [],
          status: "protected",
        },
      };
    }

    return {
      props: {
        code: originalText,
        data: [],
        status: "notFound",
      },
    };
  }

  return {
    props: {
      code: originalText,
      data: urls,
      status: "ok",
    },
  };
};

export default ReadFilePage;
