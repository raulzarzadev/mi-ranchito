import React, { useState } from "react";
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
import moment from "moment";

function Row({ row, events }) {
  const [open, setOpen] = React.useState(false);

  const eventByEarring = events.filter(
    (event) => event.earring === row.earring
  );

  const lastEvent = eventByEarring.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
  });

  return (
    <React.Fragment>
      <TableRow>
        <TableCell padding="none" style={{ width: 30 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell padding="none" component="th" scope="row">
          <div style={{ maxWidth: 80 }}>
            <Typography noWrap>
              {row.earring} {row.name}
            </Typography>
          </div>
        </TableCell>
        <TableCell padding="none" align="left">
          {moment(row.birth).fromNow(true)}
          {/* TODO cambiar por moment y mostrar edad */}
        </TableCell>
        <TableCell padding="none" align="center">
          {lastEvent[0]?.label || "-"}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          padding="none"
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <EventTable
                events={eventByEarring}
                // title="Historai por Arete"
                hideEarring
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function EerringTable({ earrings, events }) {
  const [sortBy, setSortBy] = useState("earring");
  const rows = earrings;

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
    <div style={{ margin: "0 auto" }}>
      <TableContainer component={Paper}>
        <h3>Aretes Registrados</h3>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <td></td>
              <TableCell
                padding="none"
                onClick={() => handleSortRowsBy("earring")}
                style={{ fontWeight: sortBy === "earring" ? 800 : 500 }}
              >
                Arete{" "}
                <span
                  style={{
                    fontWeight: 500,
                    fontStyle: "italic",
                    fontSize: ".75rem",
                  }}
                >
                  (nombre)
                </span>
              </TableCell>
              <TableCell
                padding="none"
                align="center"
                onClick={() => handleSortRowsBy("birth")}
                style={{ fontWeight: sortBy === "birth" ? 800 : 500 }}
              >
                Edad
              </TableCell>
              <TableCell
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
              <Row key={i} row={row} events={events} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
