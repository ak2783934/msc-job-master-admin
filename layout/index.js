import Navbar from "./Navbar";
import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Changa:wght@300&family=Rochester&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <div className="flex-grow">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
