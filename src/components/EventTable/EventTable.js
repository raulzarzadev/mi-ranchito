import React, { useEffect, useState } from "react";
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
import SelectedTitle from "../SelectedTitle";

const useStyles = makeStyles({
  table: {
    minWidth: 150,
  },
  cell: {
    textAlign: "center",
    padding: 0,
    width: 50,
    padding: 0,
  },
});

export default function EventTable({ title, events, hideEarring }) {
  const classes = useStyles();
  const [sortBy, setSortBy] = useState("date");
  const handleSortBy = (title) => {
    if (title === sortBy) {
      setSortBy(`${title}-reverse`);
      events.sort((a, b) => {
        if (a[title] < b[title]) return 1;
        if (a[title] > b[title]) return -1;
      });
    } else {
      setSortBy(title);
      events.sort((a, b) => {
        if (a[title] > b[title]) return 1;
        if (a[title] < b[title]) return -1;
      });
    }
  };

  const handleSortBySub = (title) => {
    if (title === sortBy) {
      setSortBy(`${title}-reverse`);

      events.sort((a, b) => {
        if (a.nextEvent[title] < b.nextEvent[title]) return 1;
        if (a.nextEvent[title] > b.nextEvent[title]) return -1;
      });
    } else {
      setSortBy(`${title}`);

      events.sort((a, b) => {
        if (a.nextEvent[title] > b.nextEvent[title]) return 1;
        if (a.nextEvent[title] < b.nextEvent[title]) return -1;
      });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6">{title}</Typography>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {!hideEarring && (
              <TableCell className={classes.cell}>
                <SelectedTitle
                  onClick={() => handleSortBy("earring")}
                  selected={sortBy === "earring"}
                  title="Arete"
                />
              </TableCell>
            )}
            <TableCell className={classes.cell}>
              <SelectedTitle
                onClick={() => handleSortBy("event")}
                selected={sortBy === "event"}
                title="Evento"
              />
            </TableCell>
            <TableCell className={classes.cell} align="right">
              <SelectedTitle
                onClick={() => handleSortBy("date")}
                selected={sortBy === "date"}
                title="Fecha"
              />
            </TableCell>
            <TableCell className={classes.cell} align="right">
              <SelectedTitle
                onClick={() => handleSortBySub("label")}
                selected={sortBy === "label"}
                title="Revisar"
              />
            </TableCell>
            <TableCell className={classes.cell} align="right">
              <SelectedTitle
                onClick={() => handleSortBySub("date")}
                selected={sortBy === "date"}
                title="Fecha"
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event, i) => (
            <EventRow key={i} event={event} hideEarring={hideEarring} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const EventRow = ({ event, hideEarring }) => {
  return (
    <TableRow>
      {!hideEarring && (
        <TableCell component="th" scope="row">
          {event.earring}
        </TableCell>
      )}
      <TableCell component="th" scope="row">
        {event.event}
      </TableCell>
      <TableCell padding="none" align="right">
        {event.formatDate}
      </TableCell>
      <TableCell padding="none" align="right">
        {event.nextEvent.label}
      </TableCell>
      <TableCell padding="none" align="right">
        {event.nextEvent.formatDate}
      </TableCell>
    </TableRow>
  );
};
