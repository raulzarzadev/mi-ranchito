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

const useStyles = makeStyles({
  table: {
    minWidth: 150,
  },
  cell: {
    padding: 0,
    width: 50,
  },
});

function createData(event, date, nextEvent, nextDate) {
  return { event, date, nextEvent, nextDate };
}

const rows = [
  createData("celo ", "2 ago", "parto", "05 jul"),
  createData("servicio ", "12 sep", "celo", "12 sep"),
  createData("parto", "19 oct", "servico", "19 ago"),
  createData("celo", "22 nov", "parto", "30 dic"),
  createData("servicio", "30 ene", "servico", "15 feb"),
];

export default function DenseTable({ earringData }) {
  const classes = useStyles();
  const [sortBy, setSortBy] = useState("event");

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

  return (
    <TableContainer component={Paper}>
      <Typography variant="h6">Información</Typography>
      Leche: 40 L Foto: [] Madre: 33A Padre: Muñe mas info
      <Typography variant="h6">Historial</Typography>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
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
                onClick={() => handleSortBy("nextEvent")}
                style={{ fontWeight: sortBy === "nextEvent" ? 800 : 500 }}
              >
                Rvisar
              </div>
            </TableCell>
            <TableCell className={classes.cell} align="right">
              <div
                onClick={() => handleSortBy("nextDate")}
                style={{ fontWeight: sortBy === "nextDate" ? 800 : 500 }}
              >
                Fecha
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell className={classes.cell} component="th" scope="row">
                {row.event}
              </TableCell>
              <TableCell className={classes.cell} align="right">
                {row.date}
              </TableCell>
              <TableCell className={classes.cell} align="right">
                {row.nextEvent}
              </TableCell>
              <TableCell className={classes.cell} align="right">
                {row.nextDate}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
