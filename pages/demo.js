import Widgets from "./components/Widgets";
import React from "react";

const Demo = () => {
  return (
    <div>
      <Widgets type="user"></Widgets>
      <Widgets type="earning"></Widgets>
      <Widgets type="balance" />
      <Widgets type="order"></Widgets>
    </div>
  );
};

export default Demo;
