import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, Button, Layout } from "antd";
const { Content } = Layout;
const math = require("mathjs");
function Inputnewton({ addvalue, addpost }) {
  const [x, setX] = useState("");
  const [x1, setX1] = useState("");
  const [fx, setFx] = useState("");
  function onChangex(e) {
    setX(e.target.value);
  }
  function onChangefx(e) {
    setFx(e.target.value);
  }
  function onChangeX1(e) {
    setX1(e.target.value);
  }
  function onSubmit() {
    addvalue(x, x1, fx);
    cal(x, x1, fx);
  }
  function cal(x, x1, fx) {
    let error = 1;
    let x2;
    let node1 = math.parse(fx);
    let code1 = node1.compile();
    while (error > 0.000001) {
      let scopex = {
        x: x,
      };
      let scopx1 = {
        x: x1,
      };
      let sum = (x1 - x) / (code1.evaluate(scopx1) - code1.evaluate(scopex));
      x2 = x - code1.evaluate(scopex) * sum;
      x = x1;
      x1 = x2;
      error = math.abs((x1 - x) / x1);
      error = error.toFixed(6);
      addpost(x, x1, error);
    }
    setX("");
    setX1("");
    setFx("");
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
          placeholder="Please in put X1"
          onChange={onChangeX1}
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
          placeholder="Please in put Fx"
          onChange={onChangefx}
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

Inputnewton.propTypes = {
  addvalue: PropTypes.func.isRequired,
  addpost: PropTypes.func.isRequired,
};
export default Inputnewton;
