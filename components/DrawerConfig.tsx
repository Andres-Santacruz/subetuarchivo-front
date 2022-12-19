import { Drawer, DrawerOverlay } from "@chakra-ui/react";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import ContentConfigFile from "./ContentConfigFile";

export type IConfig = {
  password?: string;
  time?: number;
};

interface IDrawerConfig {
  onClose: () => void;
  isOpen: boolean;
  btnRef: MutableRefObject<null>;
  setConfig: Dispatch<SetStateAction<IConfig | undefined>>;
  config: {
    password?: string;
    time?: number;
  } | undefined;
}

export const DrawerConfig = ({
  onClose,
  isOpen,
  btnRef,
  setConfig,
  config
}: IDrawerConfig) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
      size="sm"
    >
      <DrawerOverlay />
      <ContentConfigFile onClose={onClose} setConfig={setConfig} config={config} />
    </Drawer>
  );
};
