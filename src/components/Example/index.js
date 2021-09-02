import React from "react";

const Example = ({msg = ""}) => {
  return msg ? <div>{msg}</div> : null;
};

export default Example;
