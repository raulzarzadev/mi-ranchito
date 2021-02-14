import React, { useEffect, useState } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'
import SelectedTitle from '@cmps/SelectedTitle'

import styles from './style.module.css'
import EventModal from '@cmps/EventModal/EventModal'

export default function EventTable({
  title,
  events = [],
  hideEarring,
  upcomingEvents,
}) {
  const [sortBy, setSortBy] = useState(upcomingEvents ? 'next-date' : 'date')

  const handleSortBy = (title) => {
    if (title === sortBy) {
      setSortBy(`${title}-reverse`)
      events.sort((a, b) => {
        if (a[title] < b[title]) return 1
        if (a[title] > b[title]) return -1
        return 0
      })
    } else {
      setSortBy(title)
      events.sort((a, b) => {
        if (a[title] > b[title]) return 1
        if (a[title] < b[title]) return -1
        return 0
      })
    }
  }

  const handleSortBySub = (title) => {
    if (`next-${title}` === sortBy) {
      setSortBy(`next-${title}-reverse`)
      events.sort((a, b) => {
        if (a.nextEvent[title] < b.nextEvent[title]) return 1
        if (a.nextEvent[title] > b.nextEvent[title]) return -1
        return 0
      })
    } else {
      setSortBy(`next-${title}`)
      events.sort((a, b) => {
        if (a.nextEvent[title] > b.nextEvent[title]) return 1
        if (a.nextEvent[title] < b.nextEvent[title]) return -1
        return 0
      })
    }
  }

  if (events.length === 0) return <h5>Esta vaca aun no tiene eventos</h5>

  return (
    <>
      <TableContainer component={Paper}>
        <Typography variant="h6">{title}</Typography>

        <Table className={styles.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {!hideEarring && (
                <TableCell className={styles.cell}>
                  <SelectedTitle
                    onClick={() => handleSortBy('earring')}
                    selected={sortBy === 'earring'}
                    title="Arete"
                  />
                </TableCell>
              )}
              <>
                <TableCell className={styles.cell}>
                  <SelectedTitle
                    onClick={() => handleSortBy('label')}
                    selected={sortBy === 'label'}
                    title="Evento"
                  />
                </TableCell>
                <TableCell className={styles.cell} align="right">
                  <SelectedTitle
                    onClick={() => handleSortBy('date')}
                    selected={sortBy === 'date'}
                    title="Creado"
                  />
                </TableCell>
              </>
              {upcomingEvents && (
                <>
                  <TableCell className={styles.cell} align="right">
                    <SelectedTitle
                      onClick={() => handleSortBySub('label')}
                      selected={sortBy === 'next-label'}
                      title="Revisar"
                    />
                  </TableCell>
                  <TableCell className={styles.cell} align="right">
                    <SelectedTitle
                      onClick={() => handleSortBySub('date')}
                      selected={sortBy === 'next-date'}
                      title="Fecha"
                    />
                  </TableCell>
                </>
              )}
              <TableCell padding="none" width="40px" align="right">
                Acción
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event, i) => (
              <EventRow
                key={event.id}
                color={i}
                event={event}
                hideEarring={hideEarring}
                upcomingEvents={upcomingEvents}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

const EventRow = ({
  event,
  hideEarring,
  upcomingEvents,
  handleOpenEventDetails,
}) => {
  const [eventModal, setEventModal] = useState(false)
  const handleEventModal = () => {
    setEventModal(!eventModal)
  }
  const nextEventDate =
    Date.parse(new Date(event?.nextEvent?.date)) / (3600 * 24 * 1000)
  const today = Date.parse(new Date()) / (3600 * 24 * 1000)

  const [color, setColor] = useState('yellow')

  useEffect(() => {
    if (nextEventDate - today < 1) return setColor('red')
    if (nextEventDate - today > 10) return setColor('green')
  }, [])

  return (
    <>
      <TableRow
        className={styles.event_row}
        // style={{ backgroundColor: color % 2 !== 0 && 'transparent' }}
      >
        {!hideEarring && (  
          <TableCell component="th" scope="row" align="center" padding="none">
            {event.earring}
          </TableCell>
        )}
        <>
          <TableCell padding="none" component="th" scope="row" align="center">
            {event.label}
          </TableCell>
          <TableCell padding="none" align="center">
            {event.fromNow}
          </TableCell>
        </>
        {upcomingEvents && (
          <>
            <TableCell padding="none" align="center">
              {event.nextEvent.label}
            </TableCell>
            <TableCell padding="none" align="center" >
              <div
                style={{
                  width: '15px',
                  borderRadius: '50%',
                  height: '15px',
                  backgroundColor: color,
                  margin: '0 auto',
                }}
              ></div>
              {event.nextEvent.fromNow}
            </TableCell>
          </>
        )}
        <TableCell padding="none" align="center">
          <div onClick={handleEventModal}>ver</div>

          <EventModal
            event={event}
            open={eventModal}
            handleOpen={handleEventModal}
          />
        </TableCell>
      </TableRow>
    </>
  )
}
