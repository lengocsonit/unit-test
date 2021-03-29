import React from "react";
import { CircularProgress } from "@material-ui/core";
import { withStyles, createStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

const Composer = () => {
  const handleOnchange = () => {
    return "OK";
  };
  return (
    <div>
      <CircularProgress size={24} />
      <TextField
        id="standard-basic"
        label="Standard"
        onChange={handleOnchange}
        value=""
      />
    </div>
  );
};

export default Composer;
