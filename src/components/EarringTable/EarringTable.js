import React, { useEffect, useState } from 'react'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import EventTable from '@cmps/EventTable'
import useCows from '@raiz/src/hooks/useCows'
import styles from './styles.module.css'
import L from '@cmps/L/L'

function RowDetails({ row }) {
  return (
    <div>
        <L href={`/dashboard-cows/newEvent?earring=${row.earring}`}>
          Nuevo Evento
        </L>
      <span style={{ display: 'flex', justifyContent: 'space-around' }}>
        <h5>Ultimo Evento: </h5>
        <h6>
          {row.lastEvent?.label}{' '}
          <em>{row.lastEvent?.type || row.lastEvent?.event}</em>
        </h6>
        <h6>{row.lastEvent?.fromNow}</h6>
      </span>
      <Box></Box>
      <h5>Proximos Eventos: </h5>
      <div className={styles.upcomming_display}>
        {row?.upcomingEvents?.map((next, i) => (
          <div key={i} className={styles.upcomming_event}>
            <div>{next.label || next.type || next.event}</div>
            <div>{next.fromNow}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Row({ row = [] }) {
  const [open, setOpen] = React.useState(false)
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
          {row.age}
        </TableCell>
        <TableCell padding="none" align="center">
          {row?.lastEvent?.label || '-'}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          padding="none"
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <RowDetails row={row} />
            <Box margin={1}>
              <EventTable
                events={row.events}
                // title="Historai por Arete"
                hideEarring
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default function EerringTable({ title }) {
  const { cows } = useCows()
  const rows = cows
  const [sortBy, setSortBy] = useState('earring')
  console.log(rows[0])

  const handleSortRowsBy = (title) => {
    if (title === sortBy) {
      setSortBy(`${title}-reverse`)
      rows.sort((a, b) => {
        if (a[title] < b[title]) return 1
        if (a[title] > b[title]) return -1
        return 0
      })
    } else {
      setSortBy(title)
      rows.sort((a, b) => {
        if (a[title] > b[title]) return 1
        if (a[title] < b[title]) return -1
        return 0
      })
    }
  }

  // TODO no funciona el sort otra vez

  return (
    <div style={{ margin: '0 auto' }}>
      <TableContainer component={Paper}>
        <h3>{title}</h3>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <td></td>
              <TableCell
                padding="none"
                onClick={() => handleSortRowsBy('earring')}
                style={{ fontWeight: sortBy === 'earring' ? 800 : 500 }}
              >
                Arete{' '}
                <span
                  style={{
                    fontWeight: 500,
                    fontStyle: 'italic',
                    fontSize: '.75rem',
                  }}
                >
                  (nombre)
                </span>
              </TableCell>
              <TableCell
                padding="none"
                align="center"
                onClick={() => handleSortRowsBy('birth')}
                style={{ fontWeight: sortBy === 'birth' ? 800 : 500 }}
              >
                Edad
              </TableCell>
              <TableCell
                padding="none"
                align="center"
                onClick={() => handleSortRowsBy('lastEventLabel')}
                style={{ fontWeight: sortBy === 'lastEventLabel' ? 800 : 500 }}
              >
                Ultimo Evento
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
