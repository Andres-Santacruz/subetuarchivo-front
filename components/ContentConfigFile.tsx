import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
} from "@chakra-ui/react";
import { IConfig } from "./DrawerConfig";
import { useAuth } from "../hooks/useAuth";
import { getTimeNumber, numberFormaTime } from "../helpers";

interface IPropContent {
  setConfig: Dispatch<SetStateAction<IConfig | undefined>>;
  onClose: () => void;
  config: {
    password?: string;
    time?: number;
  } | undefined;
}

interface IForm {
  password: string;
  numberTime: number | string;
  select: "hh" | "mm" | "dd" | "";
}

type ITypeParam = "password" | "select" | "numberTime";

type IEvent = ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>;

const ContentConfigFile = ({ setConfig, onClose, config }: IPropContent) => {
  const { user } = useAuth();

  const [form, setForm] = useState<IForm>({
    password: config?.password || "",
    numberTime: config?.time ? getTimeNumber(Number(config.time)).getTime : "",
    select: config?.time ? getTimeNumber(Number(config.time)).getFormat : "",
  });

  const [errorForm, setErrorForm] = useState({
    password: false,
    numberTime: false,
  });

  useEffect(() => {
    const numberTime = Number(form.numberTime);
    if ((numberTime < 0 || numberTime >= 60) && form.select === "mm") {
      setErrorForm((prev) => ({
        ...prev,
        numberTime: true,
      }));
    } else if ((numberTime < 0 || numberTime >= 24) && form.select === "hh") {
      setErrorForm((prev) => ({
        ...prev,
        numberTime: true,
      }));
    } else if ((numberTime < 0 || numberTime > 7) && form.select === "dd") {
      setErrorForm((prev) => ({
        ...prev,
        numberTime: true,
      }));
    } else {
      setErrorForm((prev) => ({
        ...prev,
        numberTime: false,
      }));
    }
    if (form.password.length < 4 && form.password.length !== 0) {
      setErrorForm((prev) => ({
        ...prev,
        password: true,
      }));
    } else {
      setErrorForm((prev) => ({
        ...prev,
        password: false,
      }));
    }
  }, [form.numberTime, form.password, form.select]);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const hanldeChangeInput = (e: IEvent, type: ITypeParam) => {
    setForm((prev) => ({
      ...prev,
      [`${type}`]: e.target.value,
    }));
  };

  const handleClickAddConfig = () => {
    const isOkForm =
      Boolean(Number(form.numberTime)) &&
      Boolean(form.password) &&
      Boolean(form.select);

    if (
      isOkForm &&
      form.select &&
      !errorForm.numberTime &&
      !errorForm.password
    ) {
      const time = numberFormaTime(Number(form.numberTime), form.select);

      setConfig({
        password: form.password,
        time,
      });
      onClose();
    }
  };

  if (!user) {
    return (
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader fontSize="3xl">Configuración extra</DrawerHeader>

        <DrawerBody>
          <Alert status="warning">
            <AlertIcon />
            <AlertTitle>¡Inicia sesión</AlertTitle>
            <AlertDescription>para accede a la configuración!</AlertDescription>
          </Alert>

          <Stack mt={10}>
            <FormControl>
              <FormLabel color="gray.400">
                Protege tu archivo con una constraseña
              </FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type="password"
                  placeholder="Ingresa una contraseña"
                  maxLength={4}
                  isDisabled
                />
              </InputGroup>
              <FormHelperText color="gray.300">
                Solo las personas que tengan esta contraseña podran ver tu
                archivo.
              </FormHelperText>
            </FormControl>

            <FormControl mt={6}>
              <FormLabel color="gray.400">
                Decide cuánto durará tu archivo
              </FormLabel>
              <InputGroup>
                <Input
                  pr="4.5rem"
                  type="number"
                  placeholder="Ingresa el timepo"
                  isDisabled
                />
                <Select placeholder="hh/mm/ss" isDisabled>
                  {" "}
                </Select>
              </InputGroup>
            </FormControl>
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancelar
          </Button>
          <Button colorScheme="blue" isDisabled>
            Añadir configuración
          </Button>
        </DrawerFooter>
      </DrawerContent>
    );
  }

  return (
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
              value={form.password}
              onChange={(e) => hanldeChangeInput(e, "password")}
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
            Solo las personas que tengan esta contraseña podran ver tu archivo.
          </FormHelperText>
          {errorForm.password && (
            <FormHelperText color="red.400" fontSize="sm">
              Número no válido
            </FormHelperText>
          )}
        </FormControl>

        <FormControl mt={6}>
          <FormLabel>Decide cuánto durará tu archivo</FormLabel>
          <InputGroup>
            <Input
              pr="4.5rem"
              type="number"
              placeholder="Ingresa el tiempo"
              value={form.numberTime}
              onChange={(e) => hanldeChangeInput(e, "numberTime")}
            />
            <Select
              placeholder="mm/hh/dd"
              onChange={(e) => hanldeChangeInput(e, "select")}
              value={form.select}
            >
              <option value="mm">Minutos(s)</option>
              <option value="hh">Hora(s)</option>
              <option value="dd">Día(s)</option>
            </Select>
          </InputGroup>
          {errorForm.numberTime && (
            <FormHelperText color="red.400" fontSize="sm">
              Tiempo no válido
            </FormHelperText>
          )}
        </FormControl>
      </DrawerBody>

      <DrawerFooter>
        <Button variant="outline" mr={3} onClick={onClose}>
          Cancelar
        </Button>
        <Button
          colorScheme="blue"
          onClick={handleClickAddConfig}
          isDisabled={errorForm.numberTime || errorForm.password || !Boolean(form.select)}
        >
          Añadir configuración
        </Button>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default ContentConfigFile;
