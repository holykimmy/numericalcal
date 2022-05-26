import React from "react";
import Graph from "../../component/Graph.js";
import PropTypes from 'prop-types';
function Draw({fx}){
    return <Graph xx = {fx}/>
}
Draw.propTypes = {
    fx: PropTypes.string.isRequired
  };
export default Draw;