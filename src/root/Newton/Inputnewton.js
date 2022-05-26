import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, Button, Layout } from "antd";
const { Content } = Layout;
const math = require("mathjs");

function Inputnewton({ addvalue, addpost }) {
  const [x, setX] = useState("");
  const [fx, setFx] = useState("");
  function onChangex(e) {
    setX(e.target.value);
  }
  function onChangefx(e) {
    setFx(e.target.value);
  }
  function onSubmit() {
    addvalue(x, fx);
    cal(x, fx);
  }
  function cal(x, fx) {
    let xold,
      error = 1;
    let node1 = math.parse(fx);
    let code1 = node1.compile();
    let x3 = math.derivative(node1, "x");
    let code2 = x3.compile();
    while (error > 0.000001) {
      xold = x;
      let scope = {
        x: x,
      };
      x = parseFloat(-1 * (code1.evaluate(scope) / code2.evaluate(scope)));
      console.log(xold);
      console.log(x);
      xold = parseFloat(xold);
      x = xold + x;
      console.log("after" + x);
      error = math.abs((x - xold) / x);
      error = error.toFixed(7);
      addpost(xold, x, error);
    }
    setX("");
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
          placeholder="Please in put Initial number"
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
