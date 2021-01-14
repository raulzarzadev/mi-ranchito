import React from "react";
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

function createData(earring, name, age, lastEvent) {
  return {
    earring,
    name,
    age,
    lastEvent,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
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
              {row.earring} {row.name}
            </Typography>
          </div>
        </TableCell>
        <TableCell className={classes.cell} padding="none" align="right">
          {row.age}
        </TableCell>
        <TableCell className={classes.cell} padding="none" align="right">
          {row.lastEvent}
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
              <EventTable />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData("11", "pinta", "2 años ", "parto"),
  createData("129", "Guera", "2 años ", "parto"),
  createData("2", "avi", "2 años ", "parto"),
  createData("5", "vaca", "2 años ", "parto"),
  createData("7fa", "vaca", "2 años ", "parto"),
];

export default function CollapsibleTable() {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
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
            >
              Arete (nombre)
            </TableCell>
            <TableCell
              className={classes.cell}
              className={classes.cell}
              padding="none"
              align="center"
            >
              Edad
            </TableCell>
            <TableCell
              className={classes.cell}
              className={classes.cell}
              padding="none"
              align="center"
            >
              Ultimo Evento
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
