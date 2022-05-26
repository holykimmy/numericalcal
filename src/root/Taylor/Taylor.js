import React, { useState } from "react";
import Inputonepoint from "./Inputtaylor.js";
import { Table, Button, Layout } from "antd";
import Draw from "./Draw.js";
let id = 0;
function Taylor() {
  const columns = [
    {
      title: "Iteration",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Sum",
      dataIndex: "sum",
      key: "sum",
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
    x0: "",
    fx: " ",
  });
  function clear() {
    setPost([]);
    setValue([]);
  }
  function addvalue(a, b, c) {
    setValue({ x: a, x0: b, fx: c });
    // addpost(a,0)
  }
  function addpost(sum, error) {
    posts.push({ sum: sum, error: error, number: id, key: id });
    id += 1;
  }
  return (
    <>
      <h1 style={{ margin: "1%", fontSize: "56px" }}>Taylor</h1>
      <Layout style={{ background: "white" }}>
        <div id="graph">
          <Inputonepoint addvalue={addvalue} addpost={addpost} />
          <Button onClick={() => clear()}>Clear</Button>
          <Draw fx={value.fx} />
          {posts.length !== 0 && <Table columns={columns} dataSource={posts} />}
        </div>
      </Layout>
    </>
  );
}
export default Taylor;
