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
import styles from './styles.module.css'
import BtnLink from '@cmps/BtnLink/BtnLink'
import { Btn1, Btn2 } from '@cmps/Btns'
import useCows from 'src/hooks/useCows'
import { H3 } from '@cmps/H'
import { P1 } from '@cmps/P'

function RowDetails({ row }) {
  const { removeCow } = useCows()
  const handleDeleteCow = () => {
    removeCow(row.id).then((res) => console.log(res))
  }
  const upcommingEvents = row.lastEvent.nextEvents
  return (
    <div>
      <div className={styles.links_box}>
        <Btn1 href={`/dashboard-cows/cow/${row.id}`}>Detalles</Btn1>
        <Btn2 onClick={handleDeleteCow}>Eliminar</Btn2>
      </div>
      {console.log(row)}
      <div className={styles.lastEvent_row}>
        <div>
          <H3>Ultimo Evento</H3>
          <div style={{ display: 'flex' }}>
            <div style={{ margin: '8px', textAlign: 'center' }}>
              {row.lastEvent.label}
              <div>
                <em>{row.lastEvent.type}</em>
              </div>
            </div>

            <div style={{ margin: '8px', textAlign: 'center' }}>
              {row.lastEvent.formatDate}{' '}
              <div>
                <em>{row.lastEvent.fromNow}</em>
              </div>
            </div>

            <div style={{ margin: '8px', textAlign: 'center' }}>
              {`Comentarios`}
              <div>
                <em>
                  {row.lastEvent.eventOption} , {row.lastEvent.coments}
                </em>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.lastEvent_row}>
        <div>
          <H3>{`Proximos Eventos`}</H3>
          {console.log(upcommingEvents)}
          <div style={{ display: 'flex' }}>
            {upcommingEvents.map((event, i) => (
              <div key={i} style={{ margin: '8px', textAlign: 'center' }}>
                <P1>{event.label} </P1>
                <em>{event.type}</em>
                <div>
                  <P1>{event.formatDate}</P1> <em>{event.fromNow}</em>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({ row = [] }) {
  const [open, setOpen] = React.useState(false)
  return (
    <React.Fragment>
      <TableRow>
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
        <TableCell padding="none" align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon fontSize="large" />
            ) : (
              <KeyboardArrowDownIcon fontSize="large" />
            )}
          </IconButton>
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
            <Box margin={1}></Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default function EerringTable({ title, earrings }) {
  const [sortBy, setSortBy] = useState('earring')
  const [rows, setRows] = useState([])

  useEffect(() => {
    if (earrings) {
      setRows(earrings)
    }
  }, [earrings])

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

  return (
    <>
      <TableContainer component={Paper}>
        <h3>{title}</h3>
        {rows.length === 0 ? (
          <h4>Aun no hay aretes creados</h4>
        ) : (
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
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
                  style={{
                    fontWeight: sortBy === 'lastEventLabel' ? 800 : 500,
                  }}
                >
                  Estatus
                </TableCell>
                <TableCell padding="checkbox" align="center">
                  ver
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <Row key={`${row.id}${i}`} row={row} />
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </>
  )
}
