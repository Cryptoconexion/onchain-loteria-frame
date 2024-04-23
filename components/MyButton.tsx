// components/MyButton.js

import React from "react";
import Link from "next/link";

const MyButton = ({ children, href }) => {
  return (
    <Link href={href} passHref>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {children}
      </button>
    </Link>
  );
};

export default MyButton;
