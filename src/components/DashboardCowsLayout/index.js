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

  const monthsNames = [
    { month: 'Ene', label: 'Enero' },
    { month: 'Feb', label: 'Febrero' },
    { month: 'Mar', label: 'Marzo' },
    { month: 'Abr', label: 'Abril' },
    { month: 'May', label: 'Mayo' },
    { month: 'Jun', label: 'Junio' },
    { month: 'Jul', label: 'Julio' },
    { month: 'Ago', label: 'Agosto' },
    { month: 'Sep', label: 'Septiempre' },
    { month: 'Oct', label: 'Octubre' },
    { month: 'Nov', label: 'Noviembre' },
    { month: 'Dic', label: 'Diciembre' },
  ]

  const eventsByMonth = monthsNames.map((month, i) => {
    return { month, events: formatEvts?.filter(({ evt }) => evt.month === i) }
  })

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
              <div className={styles.grid_title}>Gestantes</div>
              <div className={styles.grid_title}>Partos</div>
              <div className={styles.grid_title}>Servicios</div>
              <div className={styles.grid_title}>Secados</div>
              <div className={styles.grid_title}>Celos</div>
            </div>
            <div className={styles.dash_body}>
              {eventsByMonth.map(({ month, events }) => (
                <Month key={month} events={events} month={month} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const Month = ({ events, month }) => {
  const partos = events?.filter(({ evt }) => evt.type === 'parto')
  const servicios = events?.filter(
    ({ evt }) => evt.type === 'serv' || evt.type === 'next_serv'
  )
  const secas = events?.filter(({ evt }) => evt.type === 'seca')
  const celos = events?.filter(({ evt }) => evt.type === 'celo')
  const gestantes = events?.filter(({ evt }) => evt.type === 'serv')
  const lactantes = events?.filter(({ evt }) => evt.type === 'parto')
  const [info, setInfo] = useState({})
  const [openModal, setOpenModal] = useState(false)
  console.log(info)
  const handleClick = (evts) => {
    setInfo(evts)
    setOpenModal(true)
  }

  return (
    <div className={styles.grid_row}>
      <div className={styles.grid_title}>{month.month}</div>
      <Cell
        meta={{ month, type: 'gestantes' }}
        evts={gestantes}
        handleClick={handleClick}
      />
      <Cell
        meta={{ month, type: 'partos' }}
        evts={partos}
        handleClick={handleClick}
      />
      <Cell
        meta={{ month, type: 'servicios' }}
        evts={servicios}
        handleClick={handleClick}
      />
      <Cell
        meta={{ month, type: 'secas' }}
        evts={secas}
        handleClick={handleClick}
      />
      <Cell
        meta={{ month, type: 'celos' }}
        evts={celos}
        handleClick={handleClick}
      />
      <Modal
        title="Detalles "
        open={openModal}
        handleOpen={() => setOpenModal(!openModal)}
      >
        <div className={styles.modal}>
          <H3>{`${info.meta?.type} de ${info.meta?.month?.label}`} </H3>
          <div className={styles.upcoming_grid}>
            {!info.events?.length && <P3>No hay eventos</P3>}
            {info.events?.map(({ evt, earring, name }, i) => (
              <div key={i} className={styles.upcoming_event}>
                {console.log(evt)}
                <div>
                  Arete :{earring} {name}
                </div>
                Fecha :<div>{evt.formatDate}</div>
                <div>{evt.fromNow}</div>
                <div>{evt.comets}</div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  )
}

const Cell = ({ evts = [], handleClick, meta }) => (
  <div
    className={styles.grid_cell}
    onClick={() => handleClick({ meta, events: evts })}
  >
    {evts.length}
  </div>
)
