import { Btn1 } from '@cmps/Btns'
import { H1, H2, H3 } from '@cmps/H'
import Modal from '@cmps/Modal/Modal'
import { P3 } from '@cmps/P'
import ROUTES from '@raiz/constants/ROUTES'
import useCows from '@raiz/src/hooks/useCows'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'

export default function CowsDasboard() {
  const { getCows } = useCows()
  const [cows, setCows] = useState(undefined)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getCows()
      .then((res) => {
        setLoading(false)
        setCows(res)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
      })
  }, [])

  const formatEvts = cows
    ?.reduce((acc, cow) => {
      if (!cow.lastEvent) return [...acc]
      const cowInfo = {
        id: cow.id,
        earring: cow.earring,
        name: cow.name,
        statuses: cow.statuses,
      }
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

  const gestantes = cows?.filter((cow) => cow?.statuses?.includes('gestante'))
  const lactantes = cows?.filter((cow) => cow?.statuses?.includes('lactante'))
  const lactAndGest = cows?.filter(
    (cow) =>
      cow?.statuses?.includes('lactante') && cow?.statuses?.includes('gestante')
  )
  if (loading) return <div className="center">{`Cargando...`}</div>

  return (
    <div className="center">
      <Head>
        <title>admin / Vacas </title>
      </Head>
      <div className={styles.cows_dasboard}>
        <div>
          <H1>Estado actual del ganado: </H1>
          <div className={styles.grid_stats}>
            <StatusItem
              icon={'/assets/icons/cows.svg'}
              alt="cows"
              data={cows}
            />
            <StatusItem
              icon={'/assets/icons/pregnant.svg'}
              alt="gestatnes"
              data={gestantes}
            />
            <StatusItem
              icon={'/assets/icons/milk.svg'}
              alt="lactantes"
              data={lactantes}
            />
            <StatusItem
              icon={'/assets/icons/pregAndMilk.svg'}
              alt="cows"
              data={lactAndGest}
            />
          </div>

          <H1>Eventos por mes </H1>
          <div className={styles.dash_grid}>
            <div className={styles.grid_row}>
              <div className={styles.grid_cell}>Evts/Mes</div>
              <div className={styles.grid_title}>Partos</div>
              <div className={styles.grid_title}>Servicios</div>
              <div className={styles.grid_title}>Secados</div>
              <div className={styles.grid_title}>Celos</div>
            </div>
            <div className={styles.dash_body}>
              {eventsByMonth.map(({ month, events }, i) => (
                <Month key={i} events={events} month={month} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Month = ({ events, month }) => {
  const secas = events?.filter(({ evt }) => evt.type === 'seca')
  const celos = events?.filter(({ evt }) => evt.type === 'celo')
  const partos = events?.filter(({ evt }) => evt.type === 'parto')
  const servicios = events?.filter(
    ({ evt }) => evt.type === 'serv' || evt.type === 'next_serv'
  )

  const [info, setInfo] = useState({})
  const [openModal, setOpenModal] = useState(false)
  const handleClick = (evts) => {
    setInfo(evts)
    setOpenModal(true)
  }

  return (
    <div className={styles.grid_row}>
      <div className={styles.grid_title}>{month.month}</div>

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

const StatusItem = ({ icon, alt, data = [] }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.stats_item} onClick={() => setOpen(!open)}>
      <img key={icon} src={icon} alt={alt} className={styles.stats_icon} />
      <H2>{data?.length}</H2>
      <Modal open={open} handleOpen={() => setOpen(!open)}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '90%',
            maxHeight: '60vh',
          }}
        >
          {data.map((cow) => (
            <div
              key={cow.id}
              style={{
                border: '1px solid',
                margin: '8px',
                padding: '8px',
                borderRadius: '8px',
              }}
            >
              vaca: {cow.earring} <div>status:</div>
              {cow.statuses.map((status) => (
                <div key={status}>{status}</div>
              ))}
              <Btn1 label="Detalles" href={`${ROUTES.cowDetails}/${cow.id}`} />
            </div>
          ))}
        </div>
      </Modal>
    </div>
  )
}
