/* eslint-disable react-hooks/exhaustive-deps */
import {useRouter} from "next/router"
import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import FilesFloating from "./FilesFloating";
import FloatingButton from "./FloatingButton";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: JSX.Element }) => {
  const router = useRouter();
  const { signIn } = useAuth();
  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (userStorage && token) {
      const user = JSON.parse(userStorage);
      signIn({
        token,
        user,
      });
      router.push('/');
    }
  }, []);

  return (
    <div>
      <Flex direction="column" scrollBehavior="smooth">
        <Header />
        <FilesFloating path="../assets/imgs/files/" />
        {children}
        <FloatingButton />
        <Footer />
      </Flex>
    </div>
  );
};

export default Layout;
