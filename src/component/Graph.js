import React from "react";
import functionPlot from "function-plot";
import { Button } from "antd";
function Graph({ xx }) {
  function x() {
    let width = 400;
    let height = 500;
    functionPlot({
      target: "#tt",
      width,
      height,
      yAxis: { domain: [-1, 9] },
      grid: true,
      data: [
        {
          fn: xx,
        },
      ],
    });
  }
  return (
    <div className="App">
      <Button onClick={x}>Draw</Button>
      <div id="tt"></div>
    </div>
  );
}
export default Graph;
