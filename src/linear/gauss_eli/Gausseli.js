import React, { useState } from "react";
import { Table, Button, Input, Layout } from "antd";
import axios from "axios";
const { Header, Content } = Layout;
let A = [],
  B = [],
  matrixA = [],
  matrixB = [],
  dimention;
function Gausseli() {
  const [sinput, setSinput] = useState(true);
  const [sans, setSans] = useState(false);
  const [smatrix, setSmatrix] = useState(false);
  const [ans, setAns] = useState([]);
  const columns = [
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
      B.push(
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
          id={"b" + i}
          key={"b" + i}
          placeholder={"b" + i}
        />
      );
      A.push(<br />);
    }
    setSinput(false);
    setSmatrix(true);
  }
  function cal() {
    init();
    let tranform = JSON.parse(JSON.stringify(matrixA));
    let tranform1 = JSON.parse(JSON.stringify(matrixB));
    for (let i = 0; i < dimention; i++) {
      // column
      for (let j = dimention - 1; j > i; j--) {
        tranform1[j] =
          tranform1[j] - (tranform1[i] / tranform[i][i]) * tranform[j][i];
        let y = tranform[j][i];
        for (let k = 0; k < dimention; k++) {
          let sum = tranform[j][k] - (tranform[i][k] / tranform[i][i]) * y;
          tranform[j][k] = sum;
        }
      }
    }
    let X = new Array(dimention);
    X[dimention - 1] = Math.round(
      tranform1[dimention - 1] / tranform[dimention - 1][dimention - 1]
    ); //find Xn
    for (let i = dimention - 2; i >= 0; i--) {
      //find Xn-1 to X1
      var sum = tranform1[i];
      for (let j = i + 1; j < dimention; j++) {
        sum = sum - tranform[i][j] * X[j];
      }
      X[i] = Math.round(sum / tranform[i][i]);
    }
    for (let i = 0; i < dimention; i++) {
      ans.push({ x: "x" + i, value: X[i], number: i, key: i });
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
    }
  }
  async function exa() {
    let xx = await axios({
      method: "get",
      url: "http://localhost:4000/gausselim",
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
      console.log(matrixA);
      console.log(matrixB);
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
        B.push(
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
            id={"b" + (i + 1)}
            key={"b" + (i + 1)}
            value={matrixB[i]}
          />
        );
      }
      setSinput(false);
      setSmatrix(true);
      console.log(matrixA);
      console.log(matrixB);
    }
  }
  return (
    <>
      <h1 style={{ margin: "1%", fontSize: "56px" }}>Gauss Elimination</h1>
      <Layout style={{ background: "white", padding: "0%" }}>
        {sinput && (
          <div>
            <lable style={{ paddingbottom: "5%" }}>
              Please input Diemention
            </lable>
            <br />
            <Input
              style={{
                margin: "0%",
                margintop: "5%",
                width: "20%",
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
          <Layout
            style={{
              background: "white",
            }}
          >
            <Header style={{ background: "white", marginLeft: "2%" }}>
              <Button onClick={() => cal()}>Calculate</Button>
              <Button onClick={() => clear()} style={{ marginLeft: "2%" }}>
                Clear
              </Button>
            </Header>
            <Content style={{ background: "white" }}>
              <h style={{ margin: "21.5%", fontSize: "26px" }}>MatrixA</h>
              <br />
              {A}
              <br />
              <h style={{ margin: "21.5%", fontSize: "26px" }}>MatrixB</h>
              <br />
              {B}
            </Content>
          </Layout>
        )}
        {sans && (
          <div>
            <Table columns={columns} dataSource={ans} />
          </div>
        )}
      </Layout>
    </>
  );
}
export default Gausseli;
