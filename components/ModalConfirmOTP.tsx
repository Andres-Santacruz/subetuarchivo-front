// import { useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { SetStateAction, useState } from "react";
/* import { VERIFY_OTP } from "../constant/graphql/mutations";
import { IResponseVerify } from "../constant/types/interfaces";
import { useUploadFile } from "../hooks/useFetch"; */

interface PropsModal {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  isLoadingBtnModal: boolean;
  onUpFile: (codeVerify: number) => Promise<void>;
  email: string;
}

const ModalConfirmOTP = ({
  isOpen,
  setIsOpen,
  isLoadingBtnModal,
  onUpFile,
  email,
}: PropsModal) => {
  /*  const [verifyOTP, { data, error, loading }] =
    useMutation<IResponseVerify>(VERIFY_OTP); */
  // const [uploadFile, {data, error, loading}] = useUploadFile();
  const toast = useToast();
  const [pinInput, setPinInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (pinInput.length === 4) {
      setIsLoading(true);
      // envio el codigo y el correo aca abajo
      try {
        await onUpFile(Number(pinInput));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        toast({
          title: "Error",
          description: "No se pudo verificar el codigo, vuelva a intentarlo",
          status: "error",
          duration: 8000,
          isClosable: true,
        });
      }
      /* await verifyOTP({
        variables: {
          data: {
            otp: Number(pinInput),
            email,
          },
        },
      }); */
      // await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirma tu archivo</ModalHeader>
        <ModalCloseButton />
        <ModalBody justifyContent="center" alignItems="center" display="flex">
          <Box>
            <Text>Digita el código que te llego al correo</Text>
            <Box
              marginTop={4}
              alignItems="center"
              display="flex"
              justifyContent="center"
            >
              <PinInput
                otp
                size="lg"
                autoFocus
                onComplete={(e) => setPinInput(e)}
              >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleContinue}
            isLoading={isLoadingBtnModal || isLoading}
            disabled={pinInput.length !== 4 || isLoading}
          >
            Continuar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalConfirmOTP;
