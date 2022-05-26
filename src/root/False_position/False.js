import React, { useState } from "react";
import Inputfalse from "./Inputfalse.js";
import { Table, Layout, Button } from "antd";
import Drawf from "./Drawf.js";
let id = 0;
function False() {
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
    fx: "",
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
    <div>
      <h1 style={{ margin: "1%", fontSize: "56px" }}>False Position</h1>
      <Layout style={{ background: "white" }}>
        <div id="graph">
          <Inputfalse addvalue={addvalue} addpost={addpost} />
          <Button onClick={() => clear()}>Clear</Button>
          <Drawf fx={value.fx} />
          {posts.length !== 0 && <Table columns={columns} dataSource={posts} />}
        </div>
      </Layout>
    </div>
  );
}
export default False;
