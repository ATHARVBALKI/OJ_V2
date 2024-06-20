import React from "react";
import { useLocation } from "react-router-dom";
import CodeEditor from "./CodeEditor";

const Singleproblem = () => {
  const location = useLocation();
  const problemid = String(location.pathname.split("/").at(-1));

  return (
    <div style={{  height:"[100%]" , backgroundColor: "#0f0a19", color: "gray", padding: "32px 24px" }}>
      <CodeEditor problemid={problemid} />
    </div>
  );
};

export default Singleproblem;
