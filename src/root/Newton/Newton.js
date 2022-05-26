import React, { useState } from "react";
import Inputfalse from "./Inputnewton.js";
import { Table, Layout, Button } from "antd";
import Drawf from "./Draw.js";
let id = 0;
function Newton() {
  const columns = [
    {
      title: "Iteration",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Xk",
      dataIndex: "xk",
      key: "xk",
    },
    {
      title: "Xk1",
      dataIndex: "xk1",
      key: "xk1",
    },
    {
      title: "Error",
      dataIndex: "error",
      key: "error",
    },
  ];
  const [posts, setPost] = useState([]);
  const [value, setValue] = useState({
    x: "",
    fx: "",
  });
  function clear() {
    setPost([]);
    setValue([]);
  }
  function addvalue(a, c) {
    setValue({ x: a, fx: c });
  }
  function addpost(x, xold, error) {
    posts.push({ xk: x, xk1: xold, error: error, number: id, key: id });
    id += 1;
  }
  return (
    <>
      <h1 style={{ margin: "1%", fontSize: "56px" }}>Newton Raphson</h1>
      <Layout style={{ background: "white" }}>
        <div>
          <Inputfalse addvalue={addvalue} addpost={addpost} />
          <Button onClick={() => clear()}>Clear</Button>
          <Drawf fx={value.fx} />
          {posts.length !== 0 && <Table columns={columns} dataSource={posts} />}
        </div>
      </Layout>
    </>
  );
}
export default Newton;
