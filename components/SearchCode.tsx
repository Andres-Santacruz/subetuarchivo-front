import {
  Button,
  Checkbox,
  Heading,
  HStack,
  // Image,
  Input,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import AES from "crypto-js/aes";
import Lottie from "lottie-react";
import otp from "../public/assets/imgs/lotties/otp.json";

export const SearchCode = (): JSX.Element => {
  const router = useRouter();

  const [value, setValue] = useState(["", "", "", "", "", ""]);
  const [isChecked, setIsChecked] = useState(false);
  const toast = useToast();

  const inputsRef = useRef<HTMLInputElement[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const onChangeValuePin = (value: string, index: number) => {
    setValue((pre) => {
      const newValue = [...pre];
      newValue[index] = value;
      return newValue;
    });
  };

  const onChangeInput = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    if (value.length === 1 && /^[A-Za-z0-9]*$/.test(value)) {
      onChangeValuePin(value, index);
      if (index < 5) {
        changeFocusInput(index + 1);
      }
    }
  };

  const changeFocusInput = (index: number) => {
    const ref = inputsRef.current[index];
    if (ref) {
      ref.focus();
    }
  };

  const onKeydownInput = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const { code } = event.nativeEvent;
    if (code === "KeyE" && index > 1) {
      event.preventDefault();
      return;
    }
    if (code !== "Backspace") return;

    if (value[index] === "") {
      changeFocusInput(index - 1);
    } else {
      onChangeValuePin("", index);
    }
  };

  const handleSearchFile = async () => {
    /* setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast({
      title: "No se encontró un archivo",
      description: "Prueba otro código para encontrar tu archivo.",
      status: "error",
      duration: 5000,
      isClosable: true,
    }); */
    setIsLoading(true);
    const code = value.join("");

    if (code.length === 6) {
      const url = AES.encrypt(code, "fcbarcelona").toString();
      router.push(`/file/${url}`);
    }
  };

  const handlePasteEvent = (
    event: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const text = event.clipboardData.getData("text");
    for (let i = index; i < 6; i++) {
      if (text[i] !== " " && text[i] !== undefined && text[i] !== "") {
        onChangeValuePin(text[i], i);
      }
    }
  };

  useEffect(() => {
    const { codeId } = router.query;

    if (codeId?.length !== 6) return;

    if (typeof codeId === "string") {
      const arr = codeId.split("");
      arr.forEach((el, i) => {
        onChangeValuePin(el, i);
      });
    }
  }, [router.query]);

  return (
    <Stack
      bg={"gray.50"}
      rounded={"xl"}
      p={{ base: 4, sm: 6, md: 8 }}
      spacing={{ base: 8 }}
      maxW={{ lg: "lg" }}
      align={"center"}
      boxShadow="xl"
    >
      <Lottie animationData={otp} style={{ maxHeight: "200px" }} />;
      <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
        Ingresa tu código
      </Heading>
      <Text
        fontSize={{ base: "sm", sm: "md" }}
        color={useColorModeValue("gray.800", "gray.400")}
      >
        Obten el archivo ingrsando el código.
      </Text>
      <HStack>
        <Input
          textTransform="uppercase"
          placeholder="A"
          ref={(el) => {
            if (el) inputsRef.current[0] = el;
          }}
          onChange={(evt) => onChangeInput(evt, 0)}
          value={value[0]}
          onKeyDown={(evt) => onKeydownInput(evt, 0)}
          onPaste={(e) => handlePasteEvent(e, 0)}
          _placeholder={{ opacity: 0.3, color: "gray.500" }}
          paddingInlineStart={{ base: 0, sm: 0, xs: 0, md: 0, lg: 0 }}
          textAlign="center"
        />
        <Input
          textTransform="uppercase"
          placeholder="A"
          ref={(el) => {
            if (el) inputsRef.current[1] = el;
          }}
          onChange={(evt) => onChangeInput(evt, 1)}
          value={value[1]}
          onKeyDown={(evt) => onKeydownInput(evt, 1)}
          onPaste={(e) => handlePasteEvent(e, 1)}
          _placeholder={{ opacity: 0.3, color: "gray.500" }}
          paddingInlineStart={{ base: 0 }}
          textAlign="center"
        />
        <Input
          placeholder="9"
          ref={(el) => {
            if (el) inputsRef.current[2] = el;
          }}
          onChange={(evt) => onChangeInput(evt, 2)}
          value={value[2]}
          onKeyDown={(evt) => onKeydownInput(evt, 2)}
          onPaste={(e) => handlePasteEvent(e, 2)}
          _placeholder={{ opacity: 0.3, color: "gray.500" }}
          type="number"
          paddingInlineStart={{ base: 0 }}
          textAlign="center"
        />
        <Input
          placeholder="9"
          ref={(el) => {
            if (el) inputsRef.current[3] = el;
          }}
          onChange={(evt) => onChangeInput(evt, 3)}
          value={value[3]}
          onKeyDown={(evt) => onKeydownInput(evt, 3)}
          onPaste={(e) => handlePasteEvent(e, 3)}
          _placeholder={{ opacity: 0.3, color: "gray.500" }}
          type="number"
          paddingInlineStart={{ base: 0 }}
          textAlign="center"
        />
        <Input
          placeholder="9"
          ref={(el) => {
            if (el) inputsRef.current[4] = el;
          }}
          onChange={(evt) => onChangeInput(evt, 4)}
          value={value[4]}
          onKeyDown={(evt) => onKeydownInput(evt, 4)}
          onPaste={(e) => handlePasteEvent(e, 4)}
          _placeholder={{ opacity: 0.3, color: "gray.500" }}
          type="number"
          paddingInlineStart={{ base: 0 }}
          textAlign="center"
        />
        <Input
          placeholder="9"
          ref={(el) => {
            if (el) inputsRef.current[5] = el;
          }}
          onChange={(evt) => onChangeInput(evt, 5)}
          value={value[5]}
          onKeyDown={(evt) => onKeydownInput(evt, 5)}
          onPaste={(e) => handlePasteEvent(e, 5)}
          _placeholder={{ opacity: 0.3, color: "gray.500" }}
          type="number"
          paddingInlineStart={{ base: 0 }}
          textAlign="center"
        />

        {/* <PinInput
          type="alphanumeric"
          size={{base: "sm", lg:"lg", md: "lg", sm:"sm", xs: "sm"}}
          placeholder=""
          value={value}
          onChange={setValue}
          // isDisabled
        >
          <PinInputField backgroundColor={"white"} />
          <PinInputField backgroundColor={"white"} />
          <PinInputField backgroundColor={"white"} />
          <PinInputField backgroundColor={"white"} />
          <PinInputField backgroundColor={"white"} />
          <PinInputField backgroundColor={"white"} />
        </PinInput> */}
      </HStack>
      <Stack spacing={6}>
        <Checkbox
          isRequired
          isChecked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        >
          Acepto terminos y condiciones
        </Checkbox>
        <Button
          bg={"blue.400"}
          color={"white"}
          _hover={{
            bg: "blue.500",
          }}
          isLoading={isLoading}
          loadingText="Buscando..."
          isDisabled={Boolean(!isChecked || value.includes("") || isLoading)}
          onClick={() => handleSearchFile()}
        >
          Ver archivo
        </Button>
      </Stack>
    </Stack>
  );
};
