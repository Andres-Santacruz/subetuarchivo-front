import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import ClientOnly from "./ClientOnly";
import { FormUploadFile } from "./FormUploadFile";
import OwnHead from "./OwnHead";
import { SearchCode } from "./SearchCode";

const SEO = {
  title: "Subetuarchivo — Comparte tus archivos",
  description:
    "Puedes compartir archivos con todas las personas de una manera sencilla, genera un código y accede a tu archivo desde cualquier parte del mundo.",
  url: "/",
  imgName: "home.png",
};

const Content = () => {

  const [codeReady, setCodeReady] = useState<string | undefined>(undefined)

  return (
    <>
      <OwnHead
        title={SEO.title}
        description={SEO.description}
        imgName={SEO.imgName}
        url={SEO.url}
      />
      <Box position={"relative"}>
        <Container
          as={SimpleGrid}
          maxW={"7xl"}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 20 }}
          px={{ base: 10 }}
        >
          <SearchCode />
          <ClientOnly>
            <FormUploadFile setCodeReady={setCodeReady} codeReady={codeReady} />
          </ClientOnly>
        </Container>
      </Box>
    </>
  );
};

export default Content;
