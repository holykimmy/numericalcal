import React, { useState } from "react";
import Inputonepoint from "./Inputonepoint.js";
import { Table, Layout, Button } from "antd";
import Draw from "./Draw.js";
let id = 0;
function Onepoint() {
  const columns = [
    {
      title: "Iteration",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "X",
      dataIndex: "x",
      key: "x",
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
  function addvalue(a, c) {
    setValue({ x: a, fx: c });
    addpost(a, 0);
  }
  function clear() {
    setPost([]);
    setValue([]);
  }
  function addpost(x, error) {
    posts.push({ x: x, error: error, number: id, key: id });
    id += 1;
  }
  return (
    <>
      <h1 style={{ margin: "1%", fontSize: "56px" }}>Onepoint Iteration</h1>
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
export default Onepoint;
