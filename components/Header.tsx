import {
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  DeleteIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Stack,
  Text,
  Link as LinkChakra,
  useColorModeValue,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../hooks/useAuth";
import { Logo } from "./Logo";

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Ayuda",
    href: "/help/use",
    children: [
      {
        label: "Subir archivos",
        subLabel: "Descubre como compartir y proteger tus archivos",
        href: "/help/use#upload",
      },
      {
        label: "Ver archivos",
        subLabel: "Obten los archivos que te compartierón",
        href: "/help/use#download",
      },
    ],
  },
  /*   {
    label: "Find Work",
    children: [
      {
        label: "Job Board",
        subLabel: "Find your dream design job",
        href: "/",
      },
      {
        label: "Freelance Projects",
        subLabel: "An exclusive list for contract work",
        href: "/",
      },
    ],
  }, */
  {
    label: "Tarifas",
    href: "/info/pricing",
  },
  {
    label: "Empresa",
    href: "/info/aboutus",
  },
];

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link href={href ?? "/"} passHref>
      <LinkChakra
        role={"group"}
        display={"block"}
        p={2}
        rounded={"md"}
        _hover={{ bg: useColorModeValue("blue.50", "gray.900") }}
      >
        <Stack direction={"row"} align={"center"}>
          <Box>
            <Text
              color="blue.800"
              transition={"all .3s ease"}
              _groupHover={{ color: "blue.800" }}
              fontWeight={800}
            >
              {label}
            </Text>
            <Text fontSize={"sm"} color="blue.700">
              {subLabel}
            </Text>
          </Box>
          <Flex
            transition={"all .3s ease"}
            transform={"translateX(-10px)"}
            opacity={0}
            _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
            justify={"flex-end"}
            align={"center"}
            flex={1}
          >
            <Icon color={"blue.900"} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </LinkChakra>
    </Link>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Link href={href ?? "/"}>
          <a>
            <Text
              fontWeight={600}
              color={useColorModeValue("gray.600", "gray.200")}
            >
              {label}
            </Text>
          </a>
        </Link>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} href={child.href ?? "/"} passHref>
                <LinkChakra py={2}>{child.label}</LinkChakra>
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue("white", "gray.200");
  const linkHoverColor = useColorModeValue("whiteAlpha.600", "green");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                p={2}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                <Link href={navItem.href ?? "/"}>{navItem.label}</Link>
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};
const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const Header = () => {
  const { user, logOut } = useAuth();
  const { isOpen, onToggle } = useDisclosure();
  const router = useRouter();

  const handleLogout = () => {
    logOut();
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("transparent", "white")}
        color={useColorModeValue("white", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 10 }}
        // borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto", s: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>

        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link href="/">
            <a>
              <Logo width={120} height={90} />
            </a>
          </Link>
        </Flex>
        <Flex display={{ base: "none", md: "flex" }} ml={10} align="center">
          <DesktopNav />
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
            ml={10}
          ></Stack>
        </Flex>
        <Flex>
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            {user ? (
              <Menu>
                <MenuButton
                  rounded="full"
                  cursor="pointer"
                >
                  <Avatar
                    margin="none"
                    size="sm"
                    bg="blue.200"
                    name={user.name}
                    src=""
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem color="blackAlpha.800">Hola, {user.name}</MenuItem>
                  <MenuDivider />
                  <MenuItem color="blue.300" onClick={handleLogout}>
                    Salir <DeleteIcon color="blue.300" marginLeft={2} />
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                fontSize={"sm"}
                fontWeight={600}
                color={"blue.400"}
                bg="white"
                onClick={() => router.push("/users/login")}
              >
                Iniciar sesión
              </Button>
            )}
          </Stack>
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

export default Header;
