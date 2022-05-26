import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, Button, Layout } from "antd";
const { Content } = Layout;
const math = require("mathjs");
function Inputtaylor({ addvalue, addpost }) {
  const [x, setX] = useState("");
  const [fx, setFx] = useState("");
  const [x0, setX0] = useState("");
  const [number, setNumber] = useState("");
  function onChangex(e) {
    setX(e.target.value);
  }
  function onChangefx(e) {
    setFx(e.target.value);
  }
  function onChangex0(e) {
    setX0(e.target.value);
  }
  function onChangenumber(e) {
    setNumber(e.target.value);
  }
  function onSubmit() {
    addvalue(x, x0, fx);
    cal(x, x0, fx);
  }
  function cal(x, x0, fx) {
    let i = 0,
      y,
      error;
    let sum = 0;
    let node1 = math.parse(fx);
    let code1 = node1.compile();
    let scope1 = {
      x: x,
    };
    let trueerr = code1.evaluate(scope1);
    let scope = {
      x: x0,
    };
    while (i < number) {
      code1 = node1.compile();
      y = code1.evaluate(scope);
      sum = sum + (math.pow(x - x0, i) / math.factorial(i)) * y;
      error = math.abs(trueerr - sum);
      addpost(sum, error);
      i += 1;
      node1 = math.derivative(node1, "x");
    }
    setX("");
    setFx("");
    setX0("");
  }
  return (
    <div className="Input">
      <div className="Input__header"></div>
      <Content style={{ background: "white" }}>
        <Input
          style={{
            margin: "0%",
            width: "11%",
            height: "40%",
            backgroundColor: "white",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "black",
            fontSize: "18px",
            fontWeight: "bold",
          }}
          className="Input__field"
          type="text"
          placeholder="Please in put X"
          onChange={onChangex}
        />
        <Input
          style={{
            margin: "0%",
            width: "11%",
            height: "40%",
            backgroundColor: "white",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "black",
            fontSize: "18px",
            fontWeight: "bold",
          }}
          className="Input__field"
          type="text"
          placeholder="Please in put X0"
          onChange={onChangex0}
        />
        <Input
          style={{
            margin: "0%",
            width: "11%",
            height: "40%",
            backgroundColor: "white",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "black",
            fontSize: "18px",
            fontWeight: "bold",
          }}
          className="Input__field"
          type="text"
          placeholder="Please in put FX"
          onChange={onChangefx}
        />
        <Input
          style={{
            margin: "0%",
            width: "11%",
            height: "40%",
            backgroundColor: "white",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "black",
            fontSize: "18px",
            fontWeight: "bold",
          }}
          className="Input__field"
          type="text"
          placeholder="Please in put Number"
          onChange={onChangenumber}
        />
        <Button
          style={{
            margin: "0%",
          }}
          onClick={onSubmit}
        >
          Calculate
        </Button>
      </Content>
    </div>
  );
}

Inputtaylor.propTypes = {
  addvalue: PropTypes.func.isRequired,
  addpost: PropTypes.func.isRequired,
};
export default Inputtaylor;
