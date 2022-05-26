import React, { useState } from "react";
import { Table, Button, Input, Layout } from "antd";
import axios from "axios";
const { Header, Content, Sider } = Layout;
const math = require("mathjs");
let A = [],
  B = [],
  X = [],
  matrixA = [],
  matrixB = [],
  matrixX = [],
  round = 0,
  dimention,
  ch = true,
  calculate = true,
  cherror = true;
function Gauss_seidel() {
  const [sinput, setSinput] = useState(true);
  const [sans, setSans] = useState(false);
  const [smatrix, setSmatrix] = useState(false);
  const [ans, setAns] = useState([]);
  const columns = [
    {
      title: "Iteration",
      dataIndex: "Iteration",
      key: "Iteration",
    },
    {
      title: "X",
      dataIndex: "x",
      key: "x",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "Oldvalue",
      dataIndex: "oldvalue",
      key: "oldvalue",
    },
    {
      title: "Error",
      dataIndex: "error",
      key: "error",
    },
  ];
  function clear() {
    dimention = 0;
    setSinput(true);
    setSans(false);
    setSmatrix(false);
    setAns([]);
    A = [];
    B = [];
    matrixA = [];
    matrixB = [];
    round = 0;
    X = [];
    matrixX = [];
    calculate = true;
    cherror = true;
  }
  function creatematrix() {
    for (let i = 1; i <= dimention; i++) {
      for (let j = 1; j <= dimention; j++) {
        A.push(
          <Input
            style={{
              margin: "0%",
              marginLeft: "5%",
              width: "6%",
              height: "9%",
              backgroundColor: "white",
              marginInlineEnd: "5%",
              marginBlockEnd: "5%",
              color: "black",
              fontSize: "18px",
              fontWeight: "bold",
            }}
            id={"a" + i + "" + j}
            key={"a" + i + "" + j}
            placeholder={"a" + i + "" + j}
          />
        );
      }
      X.push(
        <Input
          style={{
            marginLeft: "5%",
            width: "30%",
            height: "9%",
            backgroundColor: "white",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "black",
            fontSize: "18px",
            fontWeight: "bold",
            margin: "15%",
          }}
          id={"x" + i}
          key={"x" + i}
          placeholder={"x" + i}
        />
      );
      B.push(
        <Input
          style={{
            marginLeft: "5%",
            width: "30%",
            height: "9%",
            backgroundColor: "white",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "black",
            fontSize: "18px",
            fontWeight: "bold",
            margin: "15%",
          }}
          id={"b" + i}
          key={"b" + i}
          placeholder={"b" + i}
        />
      );
      A.push(<br />);
      X.push(<br />);
      B.push(<br />);
    }
    setSinput(false);
    setSmatrix(true);
  }
  function chzero() {
    while (calculate) {
      let row = 0;
      for (let i = 0; i < dimention; i++) {
        if (matrixA[i][i] === 0) {
          console.log("1");
          row = i;
          console.log("row ", row);
          break;
        }
        if (i === dimention - 1) {
          calculate = false;
        }
      }
      for (let i = dimention - 1; i >= 0; i--) {
        if (calculate === false) {
          break;
        }
        if (matrixA[i][row] !== 0) {
          console.log("matrixabefore ", matrixA);
          console.log("matrixbbefore ", matrixB);
          let temp = 0;
          temp = matrixB[row];
          matrixB[row] = matrixB[i];
          matrixB[i] = temp;
          for (let j = 0; j < dimention; j++) {
            temp = 0;
            console.log("2");
            temp = matrixA[row][j];
            matrixA[row][j] = matrixA[i][j];
            matrixA[i][j] = temp;
          }
          console.log("matrixafter ", matrixA);
          console.log("matrixbafter ", matrixB);
          break;
        }
      }
      console.log("calculate", calculate);
    }
    console.log(matrixA);
    console.log(matrixB);
    return;
  }
  function cal() {
    init();
    chzero();
    let error;
    let sum;
    let tranform = JSON.parse(JSON.stringify(matrixA));
    let tranform1 = JSON.parse(JSON.stringify(matrixB));
    let tranform2 = JSON.parse(JSON.stringify(matrixX));
    let allans = tranform2;
    // while (round < 100) {
    while (cherror) {
      for (let i = 0; i < dimention; i++) {
        // row
        sum = tranform1[i];
        for (let j = 0; j < dimention; j++) {
          if (i !== j) {
            sum = sum - tranform[i][j] * allans[j];
          }
        }
        sum = sum / tranform[i][i];
        sum = sum.toFixed(6);

        error = math.abs((sum - allans[i]) / sum);
        error = error.toFixed(6);
        ans.push({
          x: "X" + i,
          value: sum,
          Iteration: round + 1,
          oldvalue: allans[i],
          error: error,
        });
        allans[i] = sum;
        sum = 0;
      }
      if (error < 0.000001) {
        cherror = false;
      }
      round++;
    }
    setSans(true);
  }
  function init() {
    for (var i = 0; i < dimention; i++) {
      matrixA[i] = [];
      for (var j = 0; j < dimention; j++) {
        matrixA[i][j] = parseFloat(
          document.getElementById("a" + (i + 1) + "" + (j + 1)).value
        );
      }
      matrixB[i] = parseFloat(document.getElementById("b" + (i + 1)).value);
      matrixX[i] = parseFloat(document.getElementById("x" + (i + 1)).value);
    }
  }
  async function exa() {
    let xx = await axios({
      method: "get",
      url: "http://localhost:4000/gaussseidel",
    })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return undefined;
      });
    console.log(xx);
    if (xx !== undefined) {
      let y = xx.col;
      dimention = y;
      matrixA = xx.A;
      matrixB = xx.B;
      matrixX = xx.X;
      console.log(matrixA);
      console.log(matrixB);
      console.log(matrixX);
      for (let i = 0; i < dimention; i++) {
        for (let j = 0; j < dimention; j++) {
          A.push(
            <Input
              style={{
                margin: "0%",
                marginLeft: "5%",
                width: "6%",
                height: "9%",
                backgroundColor: "white",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "black",
                fontSize: "18px",
                fontWeight: "bold",
              }}
              id={"a" + (i + 1) + "" + (j + 1)}
              key={"a" + (i + 1) + "" + (j + 1)}
              value={matrixA[i][j]}
            />
          );
        }
        A.push(<br />);
        X.push(
          <Input
            style={{
              marginLeft: "5%",
              width: "30%",
              height: "9%",
              backgroundColor: "white",
              marginInlineEnd: "5%",
              marginBlockEnd: "5%",
              color: "black",
              fontSize: "18px",
              fontWeight: "bold",
              margin: "15%",
            }}
            id={"x" + (i + 1)}
            key={"x" + (i + 1)}
            value={matrixX[i]}
          />
        );
        B.push(
          <Input
            style={{
              marginLeft: "5%",
              width: "30%",
              height: "9%",
              backgroundColor: "white",
              marginInlineEnd: "5%",
              marginBlockEnd: "5%",
              color: "black",
              fontSize: "18px",
              fontWeight: "bold",
              margin: "15%",
            }}
            id={"b" + (i + 1)}
            key={"b" + (i + 1)}
            value={matrixB[i]}
          />
        );
        X.push(<br />);
        B.push(<br />);
      }
      setSinput(false);
      setSmatrix(true);
      console.log(matrixA);
      console.log(matrixB);
    }
  }
  return (
    <>
      <h1 style={{ margin: "1%", fontSize: "56px" }}>Gauss Seidel</h1>
      <Layout style={{ background: "white", padding: "0%" }}>
        {sinput && (
          <div>
            <Input
              style={{
                margin: "0%",
                marginTop: "5%",
                marginLeft: "5%",
                width: "30%",
                height: "40%",
                backgroundColor: "white",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "black",
                fontSize: "18px",
                fontWeight: "bold",
              }}
              name="dimention"
              onChange={e => (dimention = e.target.value)}
            />
            <Button onClick={() => creatematrix()}>Create Matrix</Button>
            <Button onClick={() => exa()}>Example</Button>
          </div>
        )}
        {smatrix && (
          <Layout style={{ marginLeft: "10%" }}>
            <Layout>
              <Header style={{ background: "white", paddingLeft: "18%" }}>
                <Button onClick={() => cal()}>Calculate</Button>
                <Button onClick={() => clear()} style={{ marginLeft: "2%" }}>
                  Clear
                </Button>
              </Header>
            </Layout>
            <Layout>
              <Content style={{ background: "white" }}>
                <div>
                  <p style={{ marginLeft: "22%" }}>Metrix A</p>
                  <br />
                  {A}
                </div>
              </Content>
              <Sider style={{ background: "white" }}>
                <p style={{ marginLeft: "20%" }}>Metrix X</p>
                <br />
                <div>{X}</div>
              </Sider>
              <Sider style={{ background: "white" }}>
                <div>
                  <p style={{ marginLeft: "30%" }}>Metrix B</p>
                  <br />
                  {B}
                </div>
              </Sider>
            </Layout>
          </Layout>
        )}

        {ch && sans && (
          <div>
            <Table columns={columns} dataSource={ans} />
          </div>
        )}
      </Layout>
    </>
  );
}
export default Gauss_seidel;
