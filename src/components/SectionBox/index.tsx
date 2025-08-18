import React, { ReactNode } from "react";
import "./style.css";

type SectionBoxProps = {
  children: ReactNode;
};

const SectionBox: React.FC<SectionBoxProps> = ({ children }) => {
  return <div className="section-box">{children}</div>;
};

export default SectionBox;
