import React from "react";

const like = (props) => {
  let classes = "fa fa-heart";
  if (props.liked) classes += "-o";
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="false"
    ></i>
  );
};

export default like;