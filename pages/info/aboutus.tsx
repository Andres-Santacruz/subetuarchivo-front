import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";

import { ReactElement } from "react";
import { InfoIcon, WarningTwoIcon, StarIcon } from "@chakra-ui/icons";
import OwnHead from "../../components/OwnHead";

const SEO = {
  title: "Sobre nosotros — Subetuarchivo ",
  description: "Conoce al equipo de subeturachivo, nuestra misión y visión",
  url: "/info/aboutus",
  imgName: "home.png",
};

interface FeatureProps {
  text: string;
  iconBg: string;
  icon?: ReactElement;
}

const Feature = ({ text, icon, iconBg }: FeatureProps) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  );
};

export default function SplitWithImage() {
  return (
    <>
      <OwnHead
        title={SEO.title}
        description={SEO.description}
        imgName={SEO.imgName}
        url={SEO.url}
      />

      <Container maxW={"7xl"} py={12} backgroundColor="white" rounded="2xl">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Text
              textTransform={"uppercase"}
              color={"blue.400"}
              fontWeight={600}
              fontSize={"sm"}
              bg={useColorModeValue("blue.50", "blue.900")}
              p={2}
              alignSelf={"flex-start"}
              rounded={"md"}
            >
              Nostros
            </Text>
            <Heading>SubeTuArchivo</Heading>
            <Text color={"gray.500"} fontSize={"lg"}>
              Bienvenido a nuestra empresa, somos un equipo de desarrolladores
              apasionados que se dedican a crear soluciones innovadoras para
              mejorar la forma en que compartimos y accedemos a la información.
            </Text>
            <Text color={"gray.500"} fontSize={"lg"}>
              Nuestro producto estrella es Subetuarchivo, una plataforma de
              compartición de archivos segura y fácil de usar que permite a los
              usuarios compartir y acceder a sus archivos desde cualquier lugar.
            </Text>
            Subetuarchivo está diseñada para ser intuitiva y fácil de usar, con
            un enfoque en la privacidad y la seguridad de los datos de nuestros
            usuarios. Nos esforzamos por ofrecer la mejor experiencia posible a
            nuestros clientes, y estamos comprometidos con el desarrollo
            continuo de nuestra plataforma para adaptarnos a las necesidades
            cambiantes de nuestros usuarios.
            <Text color={"gray.500"} fontSize={"lg"}>
              Estamos emocionados de ofrecer nuestra solución Subetuarchivo a
              individuos y empresas de todo el mundo, y esperamos trabajar
              juntos para mejorar la forma en que compartimos y accedemos a la
              información. ¡Gracias por visitar nuestra página y esperamos
              conectarnos pronto
            </Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue("gray.100", "gray.700")}
                />
              }
            >
              <Feature
                icon={<Icon as={InfoIcon} color={"yellow.500"} w={5} h={5} />}
                iconBg={useColorModeValue("yellow.100", "yellow.900")}
                text={"Innovación"}
              />
              <Feature
                icon={<Icon as={StarIcon} color={"green.500"} w={5} h={5} />}
                iconBg={useColorModeValue("green.100", "green.900")}
                text={"Desarrollo"}
              />
              <Feature
                icon={
                  <Icon as={WarningTwoIcon} color={"purple.500"} w={5} h={5} />
                }
                iconBg={useColorModeValue("purple.100", "purple.900")}
                text={"Seguridad"}
              />
            </Stack>
          </Stack>
          <Flex>
            <Image
              rounded={"md"}
              alt={"feature image"}
              src={
                "https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              }
              objectFit={"cover"}
            />
          </Flex>
        </SimpleGrid>
      </Container>
    </>
  );
}
