// import { useMutation } from "@apollo/client";
import {
  PlusSquareIcon,
} from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Checkbox,
  CloseButton,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
/* import { UPLOAD_FILES } from "../constant/graphql/mutations";
import { IResponseUpload } from "../constant/types/interfaces"; */
import { emailRegex } from "../helpers";
import { useGenerateOtp, useUploadFile } from "../hooks/useFetch";
import { DrawerConfig } from "./DrawerConfig";
import { DropzoneForm } from "./DropzoneForm";
import { IconSetting } from "./IconSetting";
import ModalConfirmOTP from "./ModalConfirmOTP";
import ModalSucces from "./ModalSucces";
// import {} from '../assets/imgs/files/audio.png'
const getImageFile = (file: File): string => {
  const { type } = file;
  if (type.includes("image/")) return URL.createObjectURL(file);
  if (type.includes("audio/")) return "./assets/imgs/files/audio.png";
  if (type.includes("text/")) return "./assets/imgs/files/file.png";
  if (type.includes("video/")) return "./assets/imgs/files/video.png";
  if (
    type.includes(
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
  )
    return "./assets/imgs/files/word.png";
  if (type.includes("application/pdf")) return "./assets/imgs/files/pdf.png";
  if (type.includes("application/x-msdownload"))
    return "./assets/imgs/files/tuerca.png";

  return "./assets/imgs/files/box.png";
};

type IConfig = {
  password?: string;
  time?: number; 
}
type configAdd = {
  files: File[];
  email: string;
  validationId: number;
  config?: IConfig | undefined;
};

export const FormUploadFile = ({
  setCodeReady,
  codeReady,
}: {
  setCodeReady: React.Dispatch<SetStateAction<string | undefined>>;
  codeReady: string | undefined;
}): JSX.Element => {
  const [generateOtp, { data, loading, error }] = useGenerateOtp();
  
  /* const [
    uploadFile,
    { data: dataUpload, error: errorUpload, loading: loadingUpload },
  ] = useMutation<IResponseUpload>(UPLOAD_FILES, {}); */

  const [
    uploadFile,
    { data: dataUpload, error: errorUpload, loading: loadingUpload },
  ] = useUploadFile();

  const toast = useToast();

  const { onOpen, onClose, isOpen } = useDisclosure();
  const btnRef = useRef(null);

  const [isChecked, setIsChecked] = useState(false);
  const [isLoadingBtnModal, setIsLoadingBtnModal] = useState(false);
  const [isLoadingOTP, setIsLoadingOTP] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenSucces, setIsModalOpenSucces] = useState(false);
  const [email, setEmail] = useState("");
  const [filesUploaded, setFilesUploaded] = useState<File[]>([]);
  const [keyAcorrdination, setKeyAcorrdination] = useState<string>("key1");

  // para cambiar
  const [config, setConfig] = useState<IConfig>({});

  const [isOkButton, setIsOkButton] = useState(false);

  const isValidEmail = useMemo(() => {
    if (email === "") return true;
    return emailRegex.test(email);
  }, [email]);

  const handleDeleteFile = (file: File) => {
    setFilesUploaded((prevFile) =>
      prevFile.filter(
        (fileElement) =>
          fileElement.lastModified !== file.lastModified &&
          fileElement.name !== file.name
      )
    );
  };

  const handleGeneradeOTP = async () => {
    if (emailRegex.test(email)) {
      setIsLoadingOTP(true);
      // enviar email con OTP
      await generateOtp(email);
      setIsLoadingOTP(false);
    }
  };

  useEffect(() => {
    console.log("data otp", data);
    if(data){
      if (data.success) {
        setIsModalOpen(true);
      } else if (!data.success) {
        console.log("error erorr", error);
        console.log("error otp", data.message);
        toast({
          title: "No se pudo crear codigo OTP",
          description: data.message ,
          status: "error",
          duration: 8000,
          isClosable: true,
        });
      }
    }
  }, [data, error, toast]);

  useEffect(() => {
    console.log('dataUpload', dataUpload);
    if(dataUpload){
      if (dataUpload.success && dataUpload.info) {
        setCodeReady(dataUpload.info); // rta code finish
        setIsModalOpenSucces(true);
      } else if (!dataUpload.success || errorUpload) {
        toast({
          title: "No se pudo subir el archivo",
          description: dataUpload.message || (errorUpload as any).message,
          status: "error",
          duration: 8000,
          isClosable: true,
        });
      }
    }
  }, [dataUpload, setCodeReady, toast, errorUpload]);

  const onUpFile = useCallback(
    async (codeVerify: number | undefined) => {
      if (
        codeVerify &&
        isChecked &&
        filesUploaded /* .length > 0  */ &&
        emailRegex.test(email)
      ) {
        setIsLoadingOTP(true);
        setIsLoadingBtnModal(true);
        const sendData: configAdd = {
          files: filesUploaded,
          email,
          validationId: codeVerify,
        };
        if (config) {
          sendData.config = config;
        }
        // enviar archivo y todo
        await uploadFile(sendData);
        // await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoadingOTP(false);
        setIsLoadingBtnModal(false);

        setIsModalOpen(false);
      }
    },
    [email, filesUploaded, isChecked, uploadFile, config]
  );

  useEffect(() => {
    if (isChecked && filesUploaded.length > 0 && emailRegex.test(email)) {
      setIsOkButton(true);
    } else {
      setIsOkButton(false);
    }
  }, [email, filesUploaded, isChecked]);

  useEffect(() => {
    if (filesUploaded.length === 0) {
      setKeyAcorrdination((state) => state.concat("a"));
    }
  }, [filesUploaded]);

  return (
    <>
      <Stack
        bg={"gray.50"}
        rounded={"xl"}
        p={{ base: 4, sm: 6, md: 8 }}
        spacing={{ base: 8 }}
        maxW={{ lg: "lg" }}
        boxShadow="xl"
      >
        <Stack spacing={4}>
          <Heading
            color={"gray.800"}
            lineHeight={1.1}
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
          >
            Sube tus archivos
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              !
            </Text>
          </Heading>
          <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
            Comparte tus archivos con los demás, genera un código unico para
            encontrar facilmente tus archivos
          </Text>
        </Stack>

        <FormControl isRequired isInvalid={!isValidEmail}>
          <FormLabel>Correo electrónico</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormHelperText>
            Recibirás un código para poder subir tu archivo
          </FormHelperText>
        </FormControl>

        <DropzoneForm setFilesUploaded={setFilesUploaded} />

        {/* <input type="file" onChange={(ev)=>{
          if(ev?.target?.files?.[0]){
            setFilesUploaded(ev.target.files);
            console.log('vea su files pas', filesUploaded)
          }
        }} /> */}
        <Accordion key={keyAcorrdination} allowToggle>
          <AccordionItem isDisabled={filesUploaded.length === 0}>
            <Box flex="1" textAlign="center">
              <AccordionButton
                _expanded={{ bg: "#2b6cb0", color: "white" }}
                alignContent="center"
              >
                <Text fontSize="lg" pl={4}>
                  Ver mis archivos
                  <Badge
                    ml="2"
                    colorScheme="blue"
                    rounded="full"
                    fontSize="0.55em"
                  >
                    {filesUploaded.length}
                  </Badge>
                </Text>
                <AccordionIcon ml={1} mt={1} />
              </AccordionButton>
            </Box>
            <AccordionPanel
              visibility={filesUploaded.length === 0 ? "hidden" : "inherit"}
            >
              <TableContainer
                css={{
                  "&::-webkit-scrollbar": {
                    height: "5px",
                  },
                  "&::-webkit-scrollbar-track": {
                    height: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#2b6cb0",
                    borderRadius: "24px",
                  },
                }}
              >
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Archivo</Th>
                      <Th>Nombre</Th>
                      <Th> </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {filesUploaded.map((file, i) => (
                      <Tr key={file.type + i}>
                        <Td>
                          <Image
                            boxSize="40px"
                            objectFit="cover"
                            src={getImageFile(file)}
                            alt="Dan Abramov"
                          />
                        </Td>
                        <Td
                          whiteSpace="nowrap"
                          maxWidth={{
                            base: "36",
                            lg: "56",
                            md: "20",
                            sm: "10",
                          }}
                          textOverflow="ellipsis"
                          overflowX="hidden"
                          maxW="3"
                        >
                          {file.name}
                        </Td>
                        <Td>
                          <CloseButton
                            onClick={() => handleDeleteFile(file)}
                            size="sm"
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <HStack>
          <Checkbox
            isRequired
            isChecked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            flex={1}
          >
            Acepto terminos y condiciones
          </Checkbox>
          <Tooltip label="Configuraciones adicionales">
            <IconButton
              ref={btnRef}
              onClick={onOpen}
              variant="outline"
              aria-label="Add config"
              /* <SettingsIcon
                color={config.length > 0 ? "orange.300" : "black"}
              /> */
              icon={
                <IconSetting config={config} />
              }
            />
          </Tooltip>
        </HStack>

        <Button
          type="button"
          onClick={handleGeneradeOTP}
          mt={6}
          colorScheme="teal"
          leftIcon={<PlusSquareIcon />}
          isLoading={isLoadingOTP}
          isDisabled={!isOkButton}
        >
          Subir archivo
        </Button>
      </Stack>

      <DrawerConfig
        onClose={onClose}
        isOpen={isOpen}
        btnRef={btnRef}
        setConfig={setConfig}
      />

      <ModalConfirmOTP
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        isLoadingBtnModal={isLoadingBtnModal}
        onUpFile={onUpFile}
        email={email}
      />
      <ModalSucces
        isModalOpenSucces={isModalOpenSucces}
        setIsModalOpenSucces={setIsModalOpenSucces}
        codeReady={codeReady}
      />
    </>
  );
};
