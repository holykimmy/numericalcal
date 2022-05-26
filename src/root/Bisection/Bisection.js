import React, { useState } from "react";
import Inputbisection from "./Inputbisection.js";
import { Table, Layout, Button } from "antd";
import Draw from "./Draw.js";
let id = 0;
function Bisection() {
  const columns = [
    {
      title: "Iteration",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Xl",
      dataIndex: "xl",
      key: "xl",
    },
    {
      title: "Xr",
      dataIndex: "xr",
      key: "xr",
    },
    {
      title: "Error",
      dataIndex: "error",
      key: "error",
    },
  ];
  const [posts, setPost] = useState([]);
  const [value, setValue] = useState({
    xl: "",
    xr: "",
    fx: " ",
  });
  function clear() {
    setPost([]);
    setValue([]);
  }
  function addvalue(a, b, c) {
    setValue({ xl: a, xr: b, fx: c });
    addpost(a, b, 0);
  }
  function addpost(xl, xr, error) {
    posts.push({ xl: xl, xr: xr, error: error, number: id, key: id });
    id += 1;
  }
  return (
    <>
      <h1 style={{ margin: "1%", fontSize: "56px" }}>Bisection</h1>
      <Layout style={{ background: "white" }}>
        <div id="graph">
          <Inputbisection addvalue={addvalue} addpost={addpost} />
          <Button onClick={() => clear()}>Clear</Button>
          <Draw fx={value.fx} />
          {posts.length !== 0 && <Table columns={columns} dataSource={posts} />}
        </div>
      </Layout>
    </>
  );
}
export default Bisection;
