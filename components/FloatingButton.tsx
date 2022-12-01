import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { WhatsAppIcon } from "./icons/WhatsAppIcon";

const FloatingButton = () => {
  return (
    <Box
      position="fixed"
      bottom="6"
      zIndex="docked"
      right="6"
      width="14"
      height="14"
      rounded="full"
    >
      <Menu closeOnSelect={false}>
        <MenuButton
          rounded="full"
          as={IconButton}
          background="transparent"
          aria-label="WhatsApp"
          icon={<WhatsAppIcon />}
          w="full"
          h="full"
        />
        <MenuList minWidth="240px">
          <MenuItem icon={<AddIcon />} command="⌘T">
            New Tab
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default FloatingButton;
