import { Box, Heading, Text, Button } from "@chakra-ui/react";
import Link from "next/link";
import Lottie from "lottie-react";
import notFound from "../public/assets/imgs/lotties/page404.json";

export default function NotFound() {
  return (
    <Box
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={10}
      px={6}
      minHeight="50vh"
    >
      <Box>
        <Lottie animationData={notFound} style={{ width: "100%", height: "100%" }} />
      </Box>
      <Text fontSize="18px" mb={2} mt={-10}>
        Page Not Found
      </Text>
      <Text color={"gray.500"} mb={6}>
        The page you&rsquo;re looking for does not seem to exist
      </Text>

      <Link href="/">
        <a>
          <Button
            colorScheme="teal"
            bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
            color="white"
            variant="solid"
          >
            Go to Home
          </Button>
        </a>
      </Link>
    </Box>
  );
}
