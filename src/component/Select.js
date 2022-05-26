import React from "react";
import Bisection from "../root/Bisection/Bisection.js";
import False from "../root/False_position/False.js";
import Onepoint from "../root/onepoint/Onepoint.js";
import Taylor from "../root/Taylor/Taylor.js";
import Newton from "../root/Newton/Newton.js";
import Seacant from "../root/Seacant/Seacant.js";
import Cramer from "../linear/cramer/Cramer.js";
import Gausseli from "../linear/gauss_eli/Gausseli.js";
import Gaussjor from "../linear/gauss_jordan/Gaussjor.js";
import Lu from "../linear/LU/Lu.js";
import Jacobi from "../linear/jacobi/Jacobi.js";
import Gaussseidel from "../linear/gauss-seidel/Gauss_seidel.js";
import Conjugate from "../linear/conjugate/Conjugate.js";
import Spline from "../interpolation/Sp.js";
import Newtons from "../interpolation/Newton.js";
import Lagrange from "../interpolation/Lagrange.js";
function Select(props) {
  if (props.value === "1") {
    return <Bisection />;
  } else if (props.value === "2") {
    return <False />;
  } else if (props.value === "3") {
    return <Onepoint />;
  } else if (props.value === "4") {
    return <Taylor />;
  } else if (props.value === "5") {
    return <Newton />;
  } else if (props.value === "17") {
    return <Seacant />;
  } else if (props.value === "6") {
    return <Cramer />;
  } else if (props.value === "7") {
    return <Gausseli />;
  } else if (props.value === "8") {
    return <Gaussjor />;
  } else if (props.value === "9") {
    return <Lu />;
  } else if (props.value === "10") {
    return <Jacobi />;
  } else if (props.value === "11") {
    return <Gaussseidel />;
  } else if (props.value === "12") {
    return <Conjugate />;
  } else if (props.value === "15") {
    return <Spline />;
  } else if (props.value === "13") {
    return <Newtons />;
  } else if (props.value === "14") {
    return <Lagrange />;
  } else {
    return <p></p>;
  }
}
export default Select;
