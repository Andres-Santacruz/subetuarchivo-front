import { ReactNode } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  List,
  ListItem,
  ListIcon,
  Button,
  Container,
  
} from "@chakra-ui/react";
// import { CheckCircle } from "../../components/icons/CheckCircle";
import { CheckCircleIcon as CheckCircle } from "@chakra-ui/icons";

function PriceWrapper({ children }: { children: ReactNode }) {
  return (
    <Box
      mb={4}
      shadow="base"
      borderWidth="1px"
      alignSelf={{ base: "center", lg: "flex-start" }}
      borderColor={useColorModeValue("gray.200", "gray.500")}
      borderRadius={"xl"}
      maxWidth={"xs"}
    >
      {children}
    </Box>
  );
}

export default function Pricing() {
const router = useRouter();
  return (
    <Container maxW={"7xl"} my={10} backgroundColor="white" borderRadius="xl">
      <VStack mt={20} spacing={2} textAlign="center">
        <Heading as="h1" fontSize="4xl">
          El plan perfecto para ti
        </Heading>
        <Text fontSize="lg" color={"gray.500"}>
          Empieza totalmente gratis, sube y comparte tus archivos.
        </Text>
      </VStack>
      <Stack
        direction={{ base: "column", md: "row" }}
        textAlign="center"
        justify="center"
        spacing={{ base: 4, lg: 10 }}
        py={10}
      >
        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              FREE
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                $
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                0
              </Text>
              <Text fontSize="3xl" color="gray.500">
                /mensual
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue("gray.50", "gray.700")}
            py={4}
            borderBottomRadius={"xl"}
          >
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={CheckCircle} color="green.500" />
                Comparte tus archivos.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircle} color="green.500" />1 día de acceso a
                tus archivos.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircle} color="green.500" />
                5M para compartir tus archivos sin registrarte.
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
              <Button w="full" colorScheme="red" variant="outline" onClick={()=>router.push('/')}>
                Probar ahora
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>

        <PriceWrapper>
          <Box position="relative">
            <Box
              position="absolute"
              top="-16px"
              left="50%"
              style={{ transform: "translate(-50%)" }}
            >
              <Text
                textTransform="uppercase"
                bg={useColorModeValue("red.300", "red.700")}
                px={3}
                py={1}
                color={useColorModeValue("gray.900", "gray.300")}
                fontSize="sm"
                fontWeight="600"
                rounded="xl"
              >
                Más popular
              </Text>
            </Box>
            <Box py={4} px={12}>
              <Text fontWeight="500" fontSize="2xl">
                Registrarte
              </Text>
              <HStack justifyContent="center">
                <Text fontSize="3xl" fontWeight="600">
                  $
                </Text>
                <Text fontSize="5xl" fontWeight="900">
                  0
                </Text>
                <Text fontSize="3xl" color="gray.500">
                  /mensual
                </Text>
              </HStack>
            </Box>
            <VStack
              bg={useColorModeValue("gray.50", "gray.700")}
              py={4}
              borderBottomRadius={"xl"}
            >
              <List spacing={3} textAlign="start" px={12}>
                <ListItem>
                  <ListIcon as={CheckCircle} color="green.500" />
                  Comparte archivos cuantas veces quieras.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircle} color="green.500" />
                  Hasta 7 día de acceso a tus archivos.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircle} color="green.500" />
                  10M para compartir tus archivos sin registrarte.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircle} color="green.500" />
                  Añade clave privada a tus archivos.
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircle} color="green.500" />
                  Agrega configuración adicional a tu archivo.
                </ListItem>
              </List>
              <Box w="80%" pt={7}>
                <Button w="full" colorScheme="red">
                  Probar ahora
                </Button>
              </Box>
            </VStack>
          </Box>
        </PriceWrapper>

        <PriceWrapper>
          <Box py={4} px={12}>
            <Text fontWeight="500" fontSize="2xl">
              Premium
            </Text>
            <HStack justifyContent="center">
              <Text fontSize="3xl" fontWeight="600">
                $
              </Text>
              <Text fontSize="5xl" fontWeight="900">
                2
              </Text>
              <Text fontSize="3xl" color="gray.500">
                /mensual
              </Text>
            </HStack>
          </Box>
          <VStack
            bg={useColorModeValue("gray.50", "gray.700")}
            py={4}
            borderBottomRadius={"xl"}
          >
            <List spacing={3} textAlign="start" px={12}>
              <ListItem>
                <ListIcon as={CheckCircle} color="green.500" />
                Comparte archivos cuantas veces quieras.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircle} color="green.500" />
                Hasta 1 mes de acceso a tus archivos.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircle} color="green.500" />
                10G para compartir tus archivos sin registrarte.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircle} color="green.500" />
                Añade clave privada a tus archivos.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircle} color="green.500" />
                Agrega configuración adicional a tu archivo.
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircle} color="green.500" />
                Accede a archivos vencidos
              </ListItem>
            </List>
            <Box w="80%" pt={7}>
              <Button w="full" colorScheme="red" variant="outline">
                Probar ahora
              </Button>
            </Box>
          </VStack>
        </PriceWrapper>
      </Stack>
    </Container>
  );
}

