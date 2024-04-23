// components/RootLayout.js or pages/_app.js

import React from "react";
import Navbar from "@components/Navbar"; // Adjust the path based on your file structure

const RootLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default RootLayout;
