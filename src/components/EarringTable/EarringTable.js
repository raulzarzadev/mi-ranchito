import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import EventTable from "../EventTable";
import { EARRINGS, EVENTS } from "../HARD_DATA";

const DATA = EARRINGS;

const useStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
      padding: 4,
    },
    cell: {
      width: 60,
    },
  },
});

function Row({ row }) {
  const [open, setOpen] = React.useState(false);
  const [events] = useState(EVENTS);
  const classes = useStyles();
  const eventsByEarring = events.filter(
    (event) => event.earring === row.earring
  );
  return (
    <React.Fragment>
      <TableRow>
        <TableCell className={classes.cell} padding="none">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          className={classes.cell}
          padding="none"
          component="th"
          scope="row"
        >
          <div style={{ maxWidth: 80 }}>
            <Typography noWrap>
              {row.earring} {row.nickName}
            </Typography>
          </div>
        </TableCell>
        <TableCell className={classes.cell} padding="none" align="right">
          {row.birth}
          {/* TODO cambiar por moment y mostrar edad */}
        </TableCell>
        <TableCell className={classes.cell} padding="none" align="right">
          {row.lastEvent || "pendiente"}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          className={classes.cell}
          padding="none"
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <EventTable  events={eventsByEarring} title="Historai por Arete" hideEarring/>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function EerringTable() {
  const classes = useStyles();
  const [sortBy, setSortBy] = useState("earring");
  const rows = DATA;

  const handleSortRowsBy = (title) => {
    if (title === sortBy) {
      setSortBy(`${title}-reverse`);
      rows.sort((a, b) => {
        if (a[title] < b[title]) return 1;
        if (a[title] > b[title]) return -1;
      });
    } else {
      setSortBy(title);
      rows.sort((a, b) => {
        if (a[title] > b[title]) return 1;
        if (a[title] < b[title]) return -1;
      });
    }
  };

  return (
    <div style={{ width: 300 }}>
      <TableContainer component={Paper}>
        <h4>Aretes Registrados</h4>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell
                className={classes.cell}
                className={classes.cell}
                padding="none"
              />
              <TableCell
                className={classes.cell}
                className={classes.cell}
                padding="none"
                onClick={() => handleSortRowsBy("earring")}
                style={{ fontWeight: sortBy === "earring" ? 800 : 500 }}
              >
                Arete (nombre)
              </TableCell>
              <TableCell
                className={classes.cell}
                className={classes.cell}
                padding="none"
                align="center"
                onClick={() => handleSortRowsBy("birth")}
                style={{ fontWeight: sortBy === "birth" ? 800 : 500 }}
              >
                Edad
              </TableCell>
              <TableCell
                className={classes.cell}
                className={classes.cell}
                padding="none"
                align="center"
                onClick={() => handleSortRowsBy("lastEvent")}
                style={{ fontWeight: sortBy === "lastEvent" ? 800 : 500 }}
              >
                Ultimo Evento
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <Row key={i} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
