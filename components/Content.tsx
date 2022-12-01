import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import ClientOnly from "./ClientOnly";
import { FormUploadFile } from "./FormUploadFile";
import { SearchCode } from "./SearchCode";

const Content = () => {

  const [codeReady, setCodeReady] = useState<string | undefined>(undefined)

  return (
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
  );
};

export default Content;
