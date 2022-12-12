import {
  Box,
  Stack,
  HStack,
  Heading,
  Text,
  VStack,
  Container,
  Icon,
  Link,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import OwnHead from "../../components/OwnHead";
// import { CheckCircle } from "../../components/icons/CheckCircle";

const SEO = {
  title: "Términos y condiciones — Subetuarchivo ",
  description:
    "Terminos y condiciones de subetuarchivo.com, al usar nuestro sitio web, aceptas los términos y condiciones",
  url: "/legal/terms",
  imgName: "home.png",
};

export default function Terms() {
  return (
    <>
      <OwnHead
        title={SEO.title}
        description={SEO.description}
        imgName={SEO.imgName}
        url={SEO.url}
      />
      <Container maxW={"7xl"} my={10} backgroundColor="white" borderRadius="xl">
        <VStack mt={20} spacing={2} textAlign="center">
          <Heading as="h1" fontSize="4xl">
            Términos y servicios
          </Heading>
          <Text fontSize="lg" color={"gray.500"}>
            Diciembre 2022 ･{" "}
            <Link
              href="/assets/files/terms.pdf"
              target="_blank"
              rel="noopener noreferrer"
              _hover={{
                textDecoration: "underline",
              }}
            >
              Download PDF
            </Link>
          </Text>
        </VStack>
        <Stack
          direction={{ base: "column", md: "row" }}
          justify="center"
          spacing={{ base: 4, lg: 10 }}
          py={10}
          px={4}
        >
          <VStack paddingTop="10px" spacing="2" alignItems="flex-start">
            <Text as="p" fontSize="lg">
              Subetuarchivo ofrece herramientas, tales como:
            </Text>
            <HStack align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>
                  Un servicio para compartir archivos.
                </Text>
              </VStack>
            </HStack>
            <HStack align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>
                  Un servicio que le permite almacenar, organizar, compartir y
                  recibir contenido de múltiples fuentes
                </Text>
              </VStack>
            </HStack>
            <HStack align={"top"}>
              <Box color={"green.400"} px={2}>
                <Icon as={CheckIcon} />
              </Box>
              <VStack align={"start"}>
                <Text fontWeight={600}>
                  Un servicio que le permite presentar sus ideas,
                  características y funcionalidades adicionales.
                </Text>
              </VStack>
            </HStack>
            <Text as="p" fontSize="lg">
              Los Servicios se le pueden proporcionar en línea, en forma de
              aplicaciones móviles y/o de escritorio y/o se pueden integrar en
              un servicio de terceros.
            </Text>
            <Text as="p" fontSize="lg">
              Los Servicios le permiten cargar, enviar, almacenar, compartir,
              recibir, recopilar, capturar y/o visualizar sus ideas, textos,
              gráficos, videos, datos, información, archivos, presentaciones u
              otro contenido, incluido el contenido de terceros utilizado por
              usted. (juntos: “Contenido”). Usted conserva todos los derechos y
              la responsabilidad por todo el Contenido.
            </Text>
            <Text as="p" fontSize="lg">
              Al acceder y compartir archivos con Subetuarchivo, usted confirma
              que esta de acuerdo y sujeto a los términos de servicios
              contenidos en lo términos y condiciones que se describen a
              continuación. Estos términos se aplican a todo el sitio web y a
              cualquier correo electrónico u otro tipo de comunicación entre
              usted y Subetuarchivo.
            </Text>

            <Text as="p" fontSize="lg">
              En ninguna circunstancia el equipo de Subetuarchivo será
              responsable de ningún daño directo, indirecto, especial,
              incidental o consecuente, que incluye, entre otros, la perdida de
              datos o ganancias que surjan del uso o la incapacidad de usar, lo
              materiales de este sitio, incluso si el equipo de Subetuarchivo o
              un representante autorizado han sido informado de la posibilidad
              de tales daños.
            </Text>
            <Text as="p" fontSize="lg">
              Si su uso de materiales de este sitio resulta en la necesidad de
              servicios, reparación o corrección de equipos o datos, usted asume
              los costos de los mismos.
            </Text>

            <Text as="p" fontSize="lg">
              Solo se le permite usar los Servicios cuando tiene 16 años o más.
            </Text>
            <Text as="p" fontSize="lg">
              Subetuarchivo no será responsable de ningún resultado que pueda
              ocurrir durante el curso de luso de nuestros recursos. Nos
              reservamos el derecho de cambiar los precios y revisar la política
              de uso de recursos en cualquier momento.
            </Text>
            <VStack paddingTop="20px" spacing="2" alignItems="flex-start">
              <Heading as="h2">Licencia</Heading>
              <Text as="p" fontSize="lg">
                Subetuarchivo le otorga una licencia revocable, no exclusiva,
                intransferible y limitada para descargar, instalar y usar la
                plataforma estrictamente de acuerdo con los términos de este
                Acuerdo.
              </Text>
              <Text as="p" fontSize="lg">
                Estos Términos y condiciones son un contrato entre usted y
                Subetuarchivo (referidos en estos Términos y condiciones como
                &quot;Subetuarchivo&quot;, &quot;nosotros&quot;, o
                &quot;nuestro&quot;), el proveedor del sitio web de
                Subetuarchivo y los servicios accesibles desde el sitio web de
                Subetuarchivo (que se denominan colectivamente en estos Términos
                y condiciones como el &quot;Servicio de Subetuarchivo&quot;).
              </Text>
              <Text as="p" fontSize="lg">
                Usted acepta estar sujeto a estos Términos y condiciones. Si no
                está de acuerdo con estos Términos y condiciones, no utilice el
                Servicio Subetuarchivo. En estos Términos y condiciones,
                &quot;usted&quot; se refiere tanto a usted como individuo como a
                la entidad que representa. Si viola cualquiera de estos Términos
                y condiciones, nos reservamos el derecho de cancelar su cuenta o
                bloquear el acceso a su cuenta sin previo aviso.
              </Text>
            </VStack>

            <VStack paddingTop="20px" spacing="2" alignItems="flex-start">
              <Heading as="h2">Definiciones y términos clave</Heading>
              <Text as="p" fontSize="lg">
                Para ayudar a explicar las cosas de la manera más clara posible
                en estos Términos y Condiciones, cada vez que se hace referencia
                a cualquiera de estos términos, se definen estrictamente como:
              </Text>
              <Text as="p" fontSize="lg">
                <b>Cookie:</b> pequeña cantidad de datos generados por un sitio
                web y guardados por su navegador web. Se utiliza para
                identificar su navegador, proporcionar análisis, recordar
                información sobre usted, como su preferencia de idioma o
                información de inicio de sesión.
              </Text>
              <Text as="p" fontSize="lg">
                <b>Compañía:</b> cuando estos términos mencionan
                &quot;Compañía&quot;, &quot;nosotros&quot;, &quot;nos&quot; o
                &quot;nuestro&quot;, se refiere a Subetuarchivo que es
                responsable de su información en virtud de estos Términos y
                Condiciones.
              </Text>
              <Text as="p" fontSize="lg">
                <b>Plataforma:</b> sitio web de Internet, aplicación web o
                aplicación digital de cara al público de Subetuarchivo.
              </Text>
              <Text as="p" fontSize="lg">
                <b>País:</b> donde se encuentra Subetuarchivo o los propietarios
                / fundadores de Subetuarchivo en este caso es Colombia.
              </Text>
              <Text as="p" fontSize="lg">
                <b>Dispositivo:</b> cualquier dispositivo conectado a Internet,
                como un teléfono, tablet, computadora o cualquier otro
                dispositivo que se pueda usar para visitar Subetuarchivo y usar
                los servicios.
              </Text>
              <Text as="p" fontSize="lg">
                <b>Servicio:</b> se refiere al servicio brindado por
                Subetuarchivo como se describe en los términos relativos (si
                están disponibles) y en esta plataforma.
              </Text>
              <Text as="p" fontSize="lg">
                <b>Terceros:</b> se refiere a anunciantes, patrocinadores de
                concursos, socios promocionales y de marketing, y otros que
                brindan nuestro contenido o cuyos productos o servicios que
                creemos que pueden interesarle.
              </Text>
              <Text as="p" fontSize="lg">
                <b>Sitio web:</b> el sitio de Subetuarchivo, al que se puede
                acceder a través de esta URL: subetuarchivo.com.
              </Text>
              <Text as="p" fontSize="lg">
                <b>Usted:</b> una persona o entidad que está registrada con
                Subetuarchivo para utilizar los Servicios.
              </Text>
            </VStack>

            <VStack paddingTop="20px" spacing="2" alignItems="flex-start">
              <Heading as="h2">Cookies</Heading>
              <Text as="p" fontSize="lg">
                Subetuarchivo utiliza &quot;cookies&quot; para identificar las
                áreas de nuestro sitio web que ha visitado. Una cookie es una
                pequeña porción de datos que su navegador web almacena en su
                computadora o dispositivo móvil. Usamos cookies para mejorar el
                rendimiento y la funcionalidad de nuestra plataforma, pero no
                son esenciales para su uso. Sin embargo, sin estas cookies, es
                posible que ciertas funciones, como los videos, no estén
                disponibles o se le solicitará que ingrese sus datos de inicio
                de sesión cada vez que visite la plataforma, ya que no podríamos
                recordar que había iniciado sesión anteriormente. La mayoría de
                los navegadores web se pueden configurar para desactivar el uso
                de cookies. Sin embargo, si desactiva las cookies, es posible
                que no pueda acceder a la funcionalidad de nuestro sitio web
                correctamente o en absoluto. Nunca colocamos información de
                identificación personal en cookies.
              </Text>
            </VStack>

            <VStack paddingTop="20px" spacing="2" alignItems="flex-start">
              <Heading as="h2">
                Cambios en nuestros Términos y Condiciones
              </Heading>
              <Text as="p" fontSize="lg">
                Usted reconoce y acepta que Subetuarchivo puede dejar de
                brindarle (de forma permanente o temporal) el Servicio (o
                cualquier función dentro del Servicio) a usted o a los usuarios
                en general, a discreción exclusiva de Subetuarchivo, sin previo
                aviso. Puede dejar de utilizar el Servicio en cualquier momento.
                No es necesario que informe específicamente a Subetuarchivo
                cuando deje de usar el Servicio. Usted reconoce y acepta que, si
                Subetuarchivo deshabilita el acceso a su cuenta, es posible que
                no pueda acceder al Servicio, los detalles de su cuenta o
                cualquier archivo u otro material contenido en su cuenta.
              </Text>
              <Text as="p" fontSize="lg">
                Si decidimos cambiar nuestros Términos y condiciones,
                publicaremos esos cambios en esta página y / o actualizaremos la
                fecha de modificación de los Términos y condiciones a
                continuación.
              </Text>
            </VStack>

            <VStack paddingTop="20px" spacing="2" alignItems="flex-start">
              <Heading as="h2">Modificaciones a nuestra plataforma</Heading>
              <Text as="p" fontSize="lg">
                Subetuarchivo se reserva el derecho de modificar, suspender o
                interrumpir, temporal o permanentemente, la plataforma o
                cualquier servicio al que se conecte, con o sin previo aviso y
                sin responsabilidad ante usted.
              </Text>
            </VStack>

            <VStack paddingTop="20px" spacing="2" alignItems="flex-start">
              <Heading as="h2">Actualizaciones a nuestra plataforma</Heading>
              <Text as="p" fontSize="lg">
                Subetuarchivo puede, de vez en cuando, proporcionar mejoras a
                las características / funcionalidad de la plataforma, que pueden
                incluir parches, corrección de errores, actualizaciones, mejoras
                y otras modificaciones (“Actualizaciones”).
              </Text>
              <Text as="p" fontSize="lg">
                Las actualizaciones pueden modificar o eliminar ciertas
                características y / o funcionalidades de la plataforma. Usted
                acepta que Subetuarchivo no tiene la obligación de (1)
                proporcionar Actualizaciones, o (i) continuar proporcionándole o
                habilitando características y / o funcionalidades particulares
                de la plataforma.
              </Text>
              <Text as="p" fontSize="lg">
                Además, acepta que todas las Actualizaciones (¡) se considerarán
                una parte integral de la plataforma y (ii) estarán sujetas a los
                términos y condiciones de este Acuerdo.
              </Text>
            </VStack>

            <VStack paddingTop="20px" spacing="2" alignItems="flex-start">
              <Heading as="h2">
                Aviso de infracción de derechos de autor
              </Heading>
              <Text as="p" fontSize="lg">
                Si usted es propietario de los derechos de autor o el agente de
                dicho propietario y cree que cualquier material de nuestra
                plataforma constituye una infracción de sus derechos de autor,
                comuníquese con nosotros y proporcione la siguiente información:
                (a) una firma física o electrónica del propietario de los
                derechos de autor o una persona autorizada para actuar en su
                nombre; (b) identificación del material que se alega infringe;
                (c) su información de contacto, incluida su dirección, número de
                teléfono y un correo electrónico; (d) una declaración suya de
                que cree de buena fe que el uso del material no está autorizado
                por los propietarios de los derechos de autor; y € la
                declaración de que la información en la notificación es precisa
                y, bajo pena de perjurio, usted está autorizado a actuar en
                nombre del propietario.
              </Text>
            </VStack>

            <VStack paddingTop="20px" spacing="2" alignItems="flex-start">
              <Heading as="h2">Propiedad intelectual</Heading>
              <Text as="p" fontSize="lg">
                La plataforma y todo su contenido, características y
                funcionalidad (que incluyen, entre otros, toda la información,
                software, texto, pantallas, imágenes, video y audio, y el
                diseño, selección y disposición de los mismos), son propiedad de
                Subetuarchivo, sus licenciantes u otros proveedores de dicho
                material y están protegidos por Colombia y leyes internacionales
                de derechos de autor, marcas registradas, patentes, secretos
                comerciales y otras leyes de propiedad intelectual o derechos de
                propiedad. El material no puede ser copiado, modificado,
                reproducido, descargado o distribuido de ninguna manera, en su
                totalidad o en parte, sin el permiso previo expreso por escrito
                de Subetuarchivo, a menos que y excepto que se indique
                expresamente en estos Términos y Condiciones. Se prohíbe
                cualquier uso no autorizado del material.
              </Text>
            </VStack>
          </VStack>
        </Stack>
      </Container>
    </>
  );
}
