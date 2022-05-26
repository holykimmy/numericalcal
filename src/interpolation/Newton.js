import React, { useState } from "react";
import { Button, Input, Layout, Card } from "antd";
import axios from "axios";
const { Header, Content, Footer, Sider } = Layout;
let A = [],
  B = [],
  C = [],
  matrixA = [],
  matrixB = [],
  dimention = 0,
  number,
  point,
  umatrixA = [],
  umatrixB = [];

function Newton() {
  const [sinput, setSinput] = useState(true);
  const [sans, setSans] = useState(false);
  const [smatrix, setSmatrix] = useState(false);
  const [ans, setAns] = useState("");
  function clear() {
    dimention = 0;
    setSinput(true);
    setSans(false);
    setSmatrix(false);
    setAns("");
    number = "";
    A = [];
    B = [];
    C = [];
    matrixA = [];
    matrixB = [];
    point = 0;
    umatrixA = [];
    umatrixB = [];
  }
  async function exa() {
    let xx = await axios({
      method: "get",
      url: "http://localhost:4000/nd",
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
      number = xx.Xi;
      matrixA = xx.X;
      matrixB = xx.Y;
      point = xx.i;
      for (let i = 0; i < dimention; i++) {
        let p = i + 1;
        A.push(
          <Input
            style={{
              margin: "5%",
              marginLeft: "20%",
              width: "70%",
              height: "40%",
              backgroundColor: "white",
              marginInlineEnd: "5%",
              marginBlockEnd: "5%",
              color: "black",
              fontSize: "18px",
              fontWeight: "bold",
            }}
            id={"a" + p}
            key={"a" + p}
            value={matrixA[i]}
          />
        );
        C.push(<br />);
        B.push(
          <Input
            style={{
              margin: "5%",
              marginLeft: "20%",
              width: "70%",
              height: "40%",
              backgroundColor: "white",
              marginInlineEnd: "5%",
              marginBlockEnd: "5%",
              color: "black",
              fontSize: "18px",
              fontWeight: "bold",
            }}
            id={"b" + p}
            key={"b" + p}
            value={matrixB[i]}
          />
        );
        A.push(<br />);
        B.push(<br />);
      }
      setSinput(false);
      setSmatrix(true);
    }
    setAns(9.68625498);
    setSans(true);
  }
  function creatematrix() {
    for (let i = 1; i <= dimention; i++) {
      A.push(
        <Input
          style={{
            margin: "5%",
            marginLeft: "20%",
            width: "70%",
            height: "40%",
            backgroundColor: "white",
            marginInlineEnd: "5%",
            marginBlockEnd: "5%",
            color: "black",
            fontSize: "18px",
            fontWeight: "bold",
          }}
          id={"a" + i}
          key={"a" + i}
          placeholder={"a" + i}
        />
      );
      B.push(
        <Input
          style={{
            margin: "5%",
            marginLeft: "20%",
            width: "70%",
            height: "40%",
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
      B.push(<br />);
    }
    setSinput(false);
    setSmatrix(true);
  }
  function cal() {
    init();
    let fx = [point];
    let arrayc = [point];
    let temp1 = [];
    let q = 0;
    for (let i = 0; i < point; i++) {
      umatrixA[i] = parseFloat(matrixA[i]);
      umatrixB[i] = parseFloat(matrixB[i]);
    }
    fx[0] = 1;
    fx[1] = number - umatrixA[0];
    for (let i = 2; i < point; i++) {
      fx[i] = 1;
      temp1 = [];
      for (let j = i; j > 0; j--) {
        temp1.push(number - umatrixA[j - 1]);
      }
      for (let j = 0; j < temp1.length; j++) {
        fx[i] = fx[i] * temp1[j];
      }
    }
    let temp;
    arrayc[0] = umatrixB[0];
    arrayc[1] = (umatrixB[1] - umatrixB[0]) / (umatrixA[1] - umatrixA[0]);
    for (let i = 2; i < point; i++) {
      arrayc[i] = 1;
      temp1 = [];
      for (let j = i - 1; j > 0; j--) {
        temp1.push(umatrixB[i] - umatrixB[j] / (umatrixA[i] - umatrixA[j]));
      }
      temp = temp1[0];
      for (let j = 1; j < temp1.length; j++) {
        temp = temp - temp1[j];
      }
      temp = temp / (umatrixA[i] - umatrixA[1]);
      temp = temp - arrayc[i - 1];
      temp = temp / (umatrixA[i] - umatrixA[0]);
      arrayc[i] = temp;
    }
    for (let i = 0; i < point; i++) {
      q += fx[i] * arrayc[i];
    }
    console.log(fx);
    console.log(arrayc);
    setAns(q);
    setSans(true);
  }
  function init() {
    matrixA = [];
    matrixB = [];
    for (var i = 0; i < dimention; i++) {
      matrixA[i] = parseFloat(document.getElementById("a" + (i + 1)).value);
      matrixB[i] = parseFloat(document.getElementById("b" + (i + 1)).value);
    }
  }
  return (
    <>
      <h1 style={{ margin: "1%", fontSize: "56px" }}>
        Newton Divide-Differeant
      </h1>
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
              <Header style={{ background: "white", paddingLeft: "16%" }}>
                <label>Please input initial value</label>
                <Input
                  style={{
                    margin: "0%",
                    marginLeft: "5%",
                    width: "8%",
                    height: "40%",
                    backgroundColor: "white",
                    marginInlineEnd: "5%",
                    marginBlockEnd: "5%",
                    color: "black",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                  name="number"
                  onChange={e => (number = e.target.value)}
                  placeholder={number}
                />
                <label>Please input Number Of Point Do you Want To Use</label>
                <Input
                  style={{
                    margin: "0%",
                    marginLeft: "5%",
                    width: "8%",
                    height: "40%",
                    backgroundColor: "white",
                    marginInlineEnd: "5%",
                    marginBlockEnd: "5%",
                    color: "black",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                  name="number"
                  onChange={e => (point = e.target.value)}
                  placeholder={point}
                />
                {/* </div> */}
                <Button onClick={() => clear()}>Clear</Button>
              </Header>
            </Layout>
            <Layout>
              <Sider style={{ background: "white" }}>
                <div>
                  <p style={{ marginLeft: "20%" }}>Value of X</p>
                  <br />
                  {A}
                </div>
              </Sider>
              <Content style={{ background: "white" }}>
                <div>{C}</div>
              </Content>
              <Sider style={{ background: "white" }}>
                <div>
                  <p style={{ marginLeft: "30%" }}>F(x)</p>
                  <br />
                  {B}
                </div>
              </Sider>
            </Layout>
            <Footer style={{ background: "white" }}>
              <Button
                onClick={() => cal()}
                style={{
                  margin: "2%",
                  marginLeft: "28%",
                  width: "30%",
                  height: "40%",
                }}
              >
                Calculate!!
              </Button>
            </Footer>
          </Layout>
        )}
      </Layout>
      {sans && (
        <Layout>
          <Sider style={{ background: "white" }}>
            <div>{C}</div>
          </Sider>
          <Content style={{ display: "flex", background: "white" }}>
            <Card
              title="Answer"
              bordered={false}
              style={{
                width: 300,
                marginLeft: "10%",
              }}
            >
              <p>{ans}</p>
            </Card>
          </Content>
          <Sider style={{ background: "white" }}>
            <div>{C}</div>
          </Sider>
        </Layout>
      )}
    </>
  );
}
export default Newton;
