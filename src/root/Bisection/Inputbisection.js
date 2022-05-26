
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, Button, Layout } from "antd";
import "../../styles.css";

const { Content } = Layout;
const math = require("mathjs");
function Inputbisection({ addvalue, addpost }) {
  const [xl, setXl] = useState("");
  const [xr, setXr] = useState("");
  const [fx, setFx] = useState("");
  function onChangexl(e) {
    setXl(e.target.value);
  }
  function onChangexr(e) {
    setXr(e.target.value);
  }
  function onChangefx(e) {
    setFx(e.target.value);
  }
  function onSubmit() {
    addvalue(xl, xr, fx);
    cal(xl, xr, fx);
  }

  function cal(xl1, xr1, fx) {
    let fxr,
      fxm,
      xm,
      oldxm,
      error = 0;
    const node1 = math.parse(fx);
    const code1 = node1.compile();
    let xl = parseFloat(xl1);
    let xr = parseFloat(xr1);
    xm = (xr + xl) / 2;

    xl = parseFloat(xl);
    xr = parseFloat(xr);
    let scope2 = {
      x: xr,
    };
    fxr = code1.evaluate(scope2);
    let scope3 = {
      x: xm,
    };
    fxm = code1.evaluate(scope3);
    let sum;
    sum = fxm * fxr;
    if (sum > 0) {
      xr = xm;
    } else {
      xl = xm;
    }
    error = 1;
    while (error > 0.000001) {
      oldxm = xm;
      let scope2 = {
        x: xr,
      };
      fxr = code1.evaluate(scope2);
      xm = (xr + xl) / 2;
      let scope3 = {
        x: xm,
      };
      fxm = code1.evaluate(scope3);
      sum = fxm * fxr;
      if (sum > 0) {
        xr = xm;
      } else {
        xl = xm;
      }
      xl = parseFloat(xl);
      xr = parseFloat(xr);
      error = math.abs((xm - oldxm) / xm);
      error = error.toFixed(6);
      addpost(xl, xm, error);
    }
    setXl("");
    setXr("");
    setFx("");
  }

  return (
    <div className="Input">
      <div className="Input__header"></div>
      <Content style={{ background: "white" }}>
        <Input
          className="Input__field"
          type="text"
          placeholder="Please in put Xl"
          onChange={onChangexl}
        />
        <Input
          className="Input__field"
          type="text"
          placeholder="Please in put XR"
          onChange={onChangexr}
        />
        <Input
          className="Input__field"
          type="text"
          placeholder="Please in put FX"
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

Inputbisection.propTypes = {
  addvalue: PropTypes.func.isRequired,
  addpost: PropTypes.func.isRequired,
};
export default Inputbisection;
