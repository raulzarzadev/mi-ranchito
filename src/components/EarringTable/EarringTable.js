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
import { Btn1, Btn2 } from '@cmps/Btns'
import useCows from 'src/hooks/useCows'
import LastEventView from '@cmps/LastEventView'
import Modal from '@cmps/Modal/Modal'
import { P1, P3 } from '@cmps/P'
import { H2 } from '@cmps/H'
import ROUTES from '@raiz/constants/ROUTES'

function RowDetails({ row }) {
  const { removeCow } = useCows()
  const handleDeleteCow = () => {
    removeCow(row.id).then((res) => console.log(res))
  }
  const [deleteModal, setDeleteModal] = useState()

  const handleOpenDeleteModal = () => {
    setDeleteModal(!deleteModal)
  }
  const { lastEvent, statuses } = row
  return (
    <div>
      <div className={styles.links_box}>
        <div className="box-1">
          <Btn2 onClick={handleOpenDeleteModal}>Eliminar</Btn2>
        </div>
        <div className="box-1">
          <Btn1 href={`${ROUTES.newEvent}?cowId=${row.id}`}>Nuevo Evento</Btn1>
        </div>
        <div className="box-1">
          <Btn1 href={`${ROUTES.cowDetails}/${row.id}`}>Detalles</Btn1>
        </div>
      </div>
      <div className="center">
        <div className="box-1">
          <P3>Status</P3>
          {statuses?.map((status) => (
            <H2 key={status}>{status}</H2>
          ))}
        </div>
      </div>
      <LastEventView lastEvent={lastEvent} />
      <Modal open={deleteModal} handleOpen={handleOpenDeleteModal}>
        <div style={{ maxWidth: '200px' }}>
          <P1 primary>
            Eliminaras esta vaca y todos los eventos relacionados con esta.
          </P1>
          <P1 strong>¿Estas seguro?</P1>
          <div className={styles.modal_actions}>
            <Btn2 label="Eliminar" onClick={() => handleDeleteCow(row.id)} />
            <Btn1 label="Cancelar" />
          </div>
        </div>
      </Modal>
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
          {row.registry}
        </TableCell>
        <TableCell padding="none" align="center">
          {/* {row.lastEvent?.label || '-'} */}
          {row.statuses.map((status) => (
            <div key={status}>{status}</div>
          ))}
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
    <div className={styles.cows_page}>
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
                  align="left"
                  onClick={() => handleSortRowsBy('birth')}
                  style={{ fontWeight: sortBy === 'birth' ? 800 : 500 }}
                >
                  Registro
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
    </div>
  )
}
