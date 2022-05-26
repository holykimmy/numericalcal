import React from "react";
import Graph from "../../component/Graph.js";
import PropTypes from 'prop-types';
function Drawf({fx}){
    return <Graph xx = {fx}/>
}
Drawf.propTypes = {
    fx: PropTypes.string.isRequired
  };
export default Drawf;