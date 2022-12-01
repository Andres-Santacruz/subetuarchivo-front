import { GetServerSideProps } from "next";
import Content from "../components/Content";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { codeId } = query;


  if (typeof codeId === "string" && !/^[A-Za-z0-9]*$/.test(codeId)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (codeId === undefined || codeId?.length !== 6) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default function WithCodeId() {
  return <Content />;
}
