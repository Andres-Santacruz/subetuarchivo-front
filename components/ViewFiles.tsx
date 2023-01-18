import {
  Container,
  SimpleGrid,
  Stack,
  Heading,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Box,
} from "@chakra-ui/react";
import Lottie from "lottie-react";
import React, { Dispatch, SetStateAction } from "react";
import VisalizadorArabe from "./VisalizadorArabe";
import downloadLottie from "../public/assets/imgs/lotties/downloading.json";

interface IFILES {
  uri: string;
  name: string;
}

interface IPropViewFile {
  urlFile: string;
  nameFile: string;
  setUrlFile: Dispatch<SetStateAction<string>>;
  setNameFile: Dispatch<SetStateAction<string>>;
  FILES: IFILES[];
}

const ViewFiles = ({ urlFile, nameFile, setUrlFile, setNameFile, FILES }: IPropViewFile) => {
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
{/*             <Button
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
            </Button> */}
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

export default ViewFiles;
