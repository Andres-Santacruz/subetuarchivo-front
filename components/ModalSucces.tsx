import { CopyIcon } from "@chakra-ui/icons";
import {
  Modal,
  Text,
  ModalOverlay,
  Box,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React, { SetStateAction } from "react";

interface PropsModal {
  isModalOpenSucces: boolean;
  setIsModalOpenSucces: React.Dispatch<SetStateAction<boolean>>;
  codeReady: string | undefined;
}

const ModalSucces = ({
  isModalOpenSucces,
  setIsModalOpenSucces,
  codeReady,
}: PropsModal) => {
  const toast = useToast();
  const hanldeCopyToClipboard = () => {
    if (codeReady) {
      navigator.clipboard.writeText(codeReady);
      toast({
        title: "Copiado!",
        description: "Código copiado en portapapeles",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <Modal
      isOpen={isModalOpenSucces}
      onClose={() => setIsModalOpenSucces(false)}
      size="md"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tu código de archivo</ModalHeader>
        <ModalCloseButton />
        <ModalBody justifyContent="center" alignItems="center" display="flex">
          <Box>
            {codeReady ? (
              <Text fontSize="6xl">{codeReady.toUpperCase()}</Text>
            ) : (
              <Text>No hay código</Text>
            )}
          </Box>
        </ModalBody>
        <ModalFooter display="flex" alignItems="center" gap={2}>
          <Button variant="ghost" onClick={() => setIsModalOpenSucces(false)}>
            Aceptar
          </Button>
          <Button
            colorScheme="blue"
            mr={3}
            leftIcon={<CopyIcon />}
            onClick={hanldeCopyToClipboard}
          >
            Copiar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalSucces;
