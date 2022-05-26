import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import React from "react";
import Select from "./Select.js";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "0",
      x: "9999",
    };
    this.onClick = this.onClick.bind(this);
  }
  onClick(event) {
    this.setState({
      x: event.key,
    });
  }

  render() {
    return (
      <Layout style={{ padding: "0%" }}>
        <Header className="header">
          <div className="logo" />
          <p
            className="head"
            style={{
              color: "white",
              // padding:"10%"
            }}
          >
            Numerical Method
          </p>
        </Header>
        <Content style={{ padding: "0%" }}>
          <Layout className="site-layout-background" style={{ padding: "0%" }}>
            <Sider className="site-layout-background" width={200}>
              <Menu mode="inline" style={{ height: "100%" }}>
                <SubMenu key="root" title="Root of Equation">
                  <Menu.Item key="1" onClick={this.onClick}>
                    Bisection
                  </Menu.Item>
                  <Menu.Item key="2" onClick={this.onClick}>
                    False Position
                  </Menu.Item>
                  <Menu.Item key="3" onClick={this.onClick}>
                    One Point Iteration
                  </Menu.Item>
                  <Menu.Item key="4" onClick={this.onClick}>
                    Taylor
                  </Menu.Item>
                  <Menu.Item key="5" onClick={this.onClick}>
                    Newton Raphson
                  </Menu.Item>
                  <Menu.Item key="17" onClick={this.onClick}>
                    Secant
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="linear" title="Linear Algebra">
                  <Menu.Item key="6" onClick={this.onClick}>
                    Cramer's Rule
                  </Menu.Item>
                  <Menu.Item key="7" onClick={this.onClick}>
                    Gauss Elimination
                  </Menu.Item>
                  <Menu.Item key="8" onClick={this.onClick}>
                    Gauss Jordan
                  </Menu.Item>
                  <Menu.Item key="9" onClick={this.onClick}>
                    LU Decomposition
                  </Menu.Item>
                  <Menu.Item key="10" onClick={this.onClick}>
                    Jacobi
                  </Menu.Item>
                  <Menu.Item key="11" onClick={this.onClick}>
                    Gauss-Seidel
                  </Menu.Item>
                  <Menu.Item key="12" onClick={this.onClick}>
                    Conjugate Gradient
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title="Interpolation">
                  <Menu.Item key="13" onClick={this.onClick}>
                    Newton's Divide-Differences
                  </Menu.Item>
                  <Menu.Item key="14" onClick={this.onClick}>
                    Lagrange Polynomials
                  </Menu.Item>
                  <Menu.Item key="15" onClick={this.onClick}>
                    Spline Interpolation
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" title="Regresstion">
                  <Menu.Item key="18" onClick={this.onClick}>
                    Linear
                  </Menu.Item>
                  <Menu.Item key="19" onClick={this.onClick}>
                    Multiple Linear
                  </Menu.Item>
                  <Menu.Item key="20" onClick={this.onClick}>
                    Polynomial Linear
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content
              style={{ padding: "0 24px", minHeight: 280, background: "white" }}
            >
              <Select value={this.state.x} />
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: "center", background: "white" }}></Footer>
      </Layout>
    );
  }
}

export default Test;
