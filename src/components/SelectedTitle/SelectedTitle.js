import { makeStyles } from "@material-ui/core";
import { Title } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
  selectedTitle: {
    background: "#eee",
    textAlign: "center",
    //padding: "0 4px",
    cursor: "pointer",
  },
}));

export default function SelectedTitle({ title, selected, onClick }) {
  const classes = useStyles();
  return (
    <div
      onClick={onClick}
      style={{ fontWeight: selected ? 700 : 400 }}
      className={classes.selectedTitle}
    >
      {title}
    </div>
  );
}
