import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  FormHelperText,
  DrawerFooter,
} from "@chakra-ui/react";
import { Dispatch, MutableRefObject, SetStateAction, useState } from "react";

type IConfig = {
  password?: string;
  time?: number;
};

interface IDrawerConfig {
  onClose: () => void;
  isOpen: boolean;
  btnRef: MutableRefObject<null>;
  setConfig: Dispatch<SetStateAction<IConfig>>;
};

export const DrawerConfig = ({
  onClose,
  isOpen,
  btnRef,
  setConfig,
}: IDrawerConfig) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size="sm"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Configuración</DrawerHeader>

        <DrawerBody>
          <FormControl>
            <FormLabel>Protege tu archivo con una constraseña</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa una contraseña"
                maxLength={4}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <ViewOffIcon color="blue.500" />
                  ) : (
                    <ViewIcon color="blue.500" />
                  )}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormHelperText>
              Solo las personas que tengan esta contraseña podran ver tu
              archivo.
            </FormHelperText>
          </FormControl>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={()=>{
            alert('hohla');
            setConfig({password: "hola"});
            onClose();
            }}>Añadir configuración</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
