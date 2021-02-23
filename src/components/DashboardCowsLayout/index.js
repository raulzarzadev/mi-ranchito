import { H1, H3 } from '@cmps/H'
import Modal from '@cmps/Modal/Modal'
import { P3 } from '@cmps/P'
import P from '@cmps/P/P'
import useCows from '@raiz/src/hooks/useCows'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'

export default function CowsDasboard() {
  const { getCows } = useCows()
  const [cows, setCows] = useState(undefined)

  useEffect(() => {
    getCows()
      .then((res) => setCows(res))
      .catch((err) => console.log(err))
  }, [])

  const [events, setEvents] = useState([])

  const formatEvts = cows
    ?.reduce((acc, cow) => {
      if (!cow.lastEvent) return [...acc]
      const cowInfo = { id: cow.id, earring: cow.earring, name: cow.name }
      const cowEvents = cow.lastEvent.nextEvents.map((evt) => {
        const month = evt.date.getMonth()
        return { ...cowInfo, evt: { ...evt, month } }
      })
      return [...acc, cowEvents]
    }, [])
    .flat()
    .sort((a, b) => b.evt.date - a.evt.date)
    .filter(({ evt }) => evt.date.getYear() === new Date().getYear())

  console.log(formatEvts)

  /* 
  
  {
    earring:47,
    upcomignEvents:[
      {}
    ]
  }
  */

  const monthsNames = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ]

  /*   
  const Feb = monthEvents.find((month) => month.month === 'Feb')
  console.log(Feb.events.filter((evt) => evt.type === 'serv'))
 */

  const eventsByMonth = monthsNames.map((month, i) => {
    return { month, events: formatEvts?.filter(({ evt }) => evt.month === i) }
  })

  console.log(eventsByMonth)

  return (
    <>
      <Head>
        <title>admin / Vacas </title>
      </Head>
      <div className={styles.cows_dasboard}>
        <H1>Vacas</H1>
        <H3>Estadisticas</H3>
        <div>
          <P>Vacas registradas: {cows?.length}</P>
          <P>Eventos: {formatEvts?.length}</P>
          <div className={styles.dash_grid}>
            <div className={styles.grid_row}>
              <div className={styles.grid_cell}>Evts/Mes</div>
              <div className={styles.grid_title}>Partos</div>
              <div className={styles.grid_title}>Servicios</div>
              <div className={styles.grid_title}>Secados</div>
              <div className={styles.grid_title}>Celos</div>
            </div>
            <div className={styles.dash_body}>
              {eventsByMonth.map(({ month, events }) => (
                <Month key={month} events={events} title={month} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const Month = ({ events, title }) => {
  /*  if (events?.length === 0)
    return <div className={styles.grid_title}>{title}</div>
 */
  const partos = events?.filter(({ evt }) => evt.type === 'parto')
  const servicios = events?.filter(
    ({ evt }) => evt.type === 'serv' || evt.type === 'next_serv'
  )
  const secas = events?.filter(({ evt }) => evt.type === 'seca')
  const celos = events?.filter(({ evt }) => evt.type === 'celo')

  console.log(partos, servicios)

  const [info, setInfo] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const handleClick = (evts) => {
    setInfo(evts)
    setOpenModal(true)
  }
  return (
    <div className={styles.grid_row}>
      <div className={styles.grid_title}>{title}</div>
      <Cell evts={partos} handleClick={handleClick} />
      <Cell evts={servicios} handleClick={handleClick} />
      <Cell evts={secas} handleClick={handleClick} />
      <Cell evts={celos} handleClick={handleClick} />
      <Modal
        title="Detalles "
        open={openModal}
        handleOpen={() => setOpenModal(!openModal)}
      >
        <div className={styles.modal}>
          <H3>Eventos del mes </H3>
          <div className={styles.upcoming_grid}>
            {!info.length && <P3>No hay eventos</P3>}
            {info?.map(({ evt, earring, name }, i) => (
              <div key={i} className={styles.upcoming_event}>
                <div>
                  Arete : {earring} {name}
                </div>
                Evento :
                <div>
                  {evt.label} <em>{evt.type}</em>
                </div>
                <div>{evt.formatDate}</div>
                <div>{evt.fromNow}</div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  )
}

const Cell = ({ evts = [], handleClick }) => (
  <div className={styles.grid_cell} onClick={() => handleClick(evts)}>
    {evts.length}
  </div>
)
