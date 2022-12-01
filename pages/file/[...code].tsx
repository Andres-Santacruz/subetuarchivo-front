import CryptoJS from "crypto-js";
import { useState } from "react";
import { GetServerSideProps } from "next";
import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import Lottie from "lottie-react";
import VisalizadorArabe from "../../components/VisalizadorArabe";
import downloadLottie from "../../public/assets/imgs/lotties/downloading.json";
import notFound from "../../public/assets/imgs/lotties/404.json";
import expired from "../../public/assets/imgs/lotties/expired.json";
import { axiosUseGetFile } from "../../api/axiosRequests";

type Prop = {
  data: string[];
  code: string;
  status: "notFound" | "expired" | "ok";
};

const ReadFilePage = ({ data, code, status }: Prop) => {

  const FILES = data.map((url) => {
    const name = url.split("__")[1];
    return {
      uri: url,
      name,
    };
  });

  const [nameFile, setNameFile] = useState(FILES?.[0]?.name);
  const [urlFile, setUrlFile] = useState(FILES?.[0]?.uri);

  const downloadFile = (url: string, name: string) => {
    const downURL = url.split("/upload");
    let urlNoExtension = "";
    const nameArr = name.split(".");

    if (nameArr.length >= 2) {
      urlNoExtension = nameArr.slice(0, nameArr.length - 1).join("");
    } else {
      urlNoExtension = nameArr[0];
    }
    const newURL = `${downURL[0]}/upload//fl_attachment:${urlNoExtension}/${downURL[1]}`;
    window.open(newURL);
  };

  if(status === "expired") {
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
            <Text fontSize="lg">
              Tu archivo expiró, si deseas recuperarlo debes $
            </Text>
            <Lottie animationData={expired} style={{ width: "100%" }} />
          </Stack>
        </Container>
      </Box>
    );
  }

  if (FILES.length === 0) {
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
    <Box /* height={"80vh"} */ bg={"transparent"} p={10}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 1, lg: 3, sm: 1 }}
        spacing={{ base: 4, lg: 12 }}
        height="full"
      >
        <Stack
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 4 }}
          maxW={{ lg: "lg" }}
          align={"center"}
          justifyContent="space-evenly"
          bg={"gray.50"}
          boxShadow="xl"
        >
          <Heading mb={4} as="h4" size="md">
            Encontramos tu archivo 🥳
          </Heading>
          <Lottie animationData={downloadLottie} style={{ width: "70%" }} />
          <Stack>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              size="lg"
              marginBottom={2}
              onClick={() => downloadFile(urlFile, nameFile)}
            >
              Descargar
            </Button>
            <Button
              marginTop={8}
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              size="lg"
              variant="outline"
            >
              Imprimir
            </Button>
          </Stack>
        </Stack>
        <Stack
          gridColumnStart={{
            base: "inherit",
            lg: 2,
            sm: "inherit",
            md: "inherit",
          }}
          gridColumnEnd={{
            base: "inherit",
            lg: 4,
            sm: "inherit",
            md: "inherit",
          }}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 4 }}
          align={"center"}
          bg={"gray.50"}
          boxShadow="xl"
        >
          <Tabs isFitted variant="enclosed" width="full">
            <TabList overflowX="scroll" overflowY="hidden">
              {FILES.map(({ name, uri }) => (
                <Tab
                  key={name}
                  onClick={() => {
                    setUrlFile(uri);
                    setNameFile(name);
                  }}
                  _selected={{
                    backgroundColor: "gray.200",
                  }}
                >
                  <Text fontSize="xs" color="blue.800">
                    {name}
                  </Text>
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {FILES.map((file) => (
                <TabPanel key={file.uri}>
                  <VisalizadorArabe file={file.uri} name={file.name} />
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
          {/* {FILES.map((file) => (
                    <DocViewer
                      key={file.uri}
                      documents={[
                        {
                          uri: file.uri,
                        },
                      ]}
                      pluginRenderers={DocViewerRenderers}
                    />
                  ))} */}
          {/* <iframe
                    src={
                      "https://view.officeapps.live.com/op/embed.aspx?src=https:%2F%2Fres.cloudinary.com%2Fdoew0fu5d%2Fraw%2Fupload%2Fv1%2Fmedia%2FDIAPOSITIVAS_INSTITUCIONALES_uo4ej3.pptx"
                    }
                  /> */}
        </Stack>
      </Container>
    </Box>
  );
};

interface IRes {
  code: string;
  data: string[];
  status: "expired" | "notFound" | "ok";
}

interface IRedirect {
  redirect: { 
    destination: string; 
    permanent: boolean 
  };
}

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
  const bytes = CryptoJS.AES.decrypt(url, "fcbarcelona");
  const originalText = bytes.toString(CryptoJS.enc.Utf8);

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

  if (!success || !urls) {

    return {
      props: {
        code: originalText,
        data: [],
        status: message === "file expired" ? "expired" : "notFound",
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
