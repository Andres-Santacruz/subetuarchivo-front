import Link from "next/link";
import {
  Box,
  Button,
  Container,
  Link as LinkChakra,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <Button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  );
};

const Footer = () => {
  return (
    <Box
      bg={useColorModeValue("transparent", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader>Compañia</ListHeader>
            <Link href="/info/aboutus" passHref>
              <LinkChakra
                role={"group"}
                display={"block"}
                p={2}
                _hover={{ textDecoration: "underline" }}
              >
                Nostros
              </LinkChakra>
            </Link>
            <Link href="/info/pricing" passHref>
              <LinkChakra
                role={"group"}
                display={"block"}
                p={2}
                _hover={{ textDecoration: "underline" }}
              >
                Tarifas
              </LinkChakra>
            </Link>
          </Stack>

          {/*           <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Link href={"#"}>Help Center</Link>
            <Link href={"#"}>Safety Center</Link>
            <Link href={"#"}>Community Guidelines</Link>
          </Stack> */}

          <Stack align={"flex-start"}>
            <ListHeader>Legal</ListHeader>
            <Link href="/legal/terms" passHref>
              <LinkChakra
                role={"group"}
                display={"block"}
                p={2}
                _hover={{ textDecoration: "underline" }}
              >
                Términos y servicios
              </LinkChakra>
            </Link>
            {/*             <Link href={"#"}>Cookies Policy</Link>
            <Link href={"#"}>Privacy Policy</Link>
            <Link href={"#"}>Law Enforcement</Link> */}
          </Stack>

          {/*          <Stack align={"flex-start"}>
            <ListHeader>Install App</ListHeader>
            <p>
              AppStoreBadge <br />
              PlayStoreBadge
            </p>
          </Stack> */}
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ md: "space-between" }}
          align={{ md: "center" }}
        >
          <Text>© 2022 Subetuarchivo. Todos los derechos reservados</Text>
          {/* <Stack direction={"row"} spacing={6}>
            <SocialButton label={"Twitter"} href={"#"}>
              Tw
            </SocialButton>
            <SocialButton label={"YouTube"} href={"#"}>
              Yt
            </SocialButton>
            <SocialButton label={"Instagram"} href={"#"}>
              Ig
            </SocialButton>
          </Stack> */}
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;
