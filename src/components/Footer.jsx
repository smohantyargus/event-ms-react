import React from "react";

const styleFooter = {
  marginTop: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Footer = () => {
  return (
    <div style={styleFooter}>
      <p style={{ paddingBottom: "0", marginBottom: "0" }}>
        © 2023 Argusoft | All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
