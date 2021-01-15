import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TableSortLabel, Typography } from "@material-ui/core";
import { formatEvent } from "../../utils";

const useStyles = makeStyles({
  table: {
    minWidth: 150,
  },
  cell: {
    textAlign: "center",
    padding: 0,
    width: 50,
  },
});

export default function EventTable({
  title,
  events,
  hideEarring,
}) {
  const classes = useStyles();
  const [sortBy, setSortBy] = useState("event");
  const rows = events.map((event) => formatEvent(event));

  const handleSortBy = (title) => {
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

  /*   const handleSortBySub = (title) => {
    if (title === sortBy) {
      setSortBy(`next-event-${title}-reverse`);
      rows.sort((a, b) => {
        if (a.nextEvent[title] < b.nextEvent[title]) return 1;
        if (a.nextEvent[title] > b.nextEvent[title]) return -1;
      });
    } else {
      setSortBy(`next-event-${title}`);
      rows.sort((a, b) => {
        if (a.nextEvent[title] > b.nextEvent[title]) return 1;
        if (a.nextEvent[title] < b.nextEvent[title]) return -1;
      });
    }
  }; */

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6">{title}</Typography>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {!hideEarring && (
              <TableCell className={classes.cell}>
                <div
                  onClick={() => handleSortBy("earring")}
                  style={{ fontWeight: sortBy === "earring" ? 800 : 500 }}
                >
                  Arete
                </div>
              </TableCell>
            )}
            <TableCell className={classes.cell}>
              <div
                onClick={() => handleSortBy("event")}
                style={{ fontWeight: sortBy === "event" ? 800 : 500 }}
              >
                Evento
              </div>
            </TableCell>
            <TableCell className={classes.cell} align="right">
              <div
                onClick={() => handleSortBy("date")}
                style={{ fontWeight: sortBy === "date" ? 800 : 500 }}
              >
                Fecha
              </div>
            </TableCell>
            <TableCell className={classes.cell} align="right">
              <div
                onClick={() => handleSortBy("label")}
                style={{
                  fontWeight: sortBy === "next-event-label" ? 800 : 500,
                }}
              >
                Rvisar
              </div>
            </TableCell>
            <TableCell className={classes.cell} align="right">
              <div
                onClick={() => handleSortBy("date")}
                style={{ fontWeight: sortBy === "next-event-date" ? 800 : 500 }}
              >
                Fecha
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              {!hideEarring && (
                <TableCell className={classes.cell} component="th" scope="row">
                  {row.earring}
                </TableCell>
              )}
              <TableCell className={classes.cell} component="th" scope="row">
                {row.event}
              </TableCell>
              <TableCell className={classes.cell} align="right">
                {row.formatDate}
              </TableCell>
              <TableCell className={classes.cell} align="right">
                {row.nextEvent.label}
              </TableCell>
              <TableCell className={classes.cell} align="right">
                {row.nextEvent.formatDate}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
