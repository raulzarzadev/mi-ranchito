import { H1, H3 } from '@cmps/H'
import Modal from '@cmps/Modal/Modal'
import P from '@cmps/P/P'
import useCows from '@raiz/src/hooks/useCows'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'

export default function CowsDasboard() {
  const { getCows } = useCows()
  const [cows, setCows] = useState(undefined)
  const [loading, setLoading] = useState(true)
console.log(cows)
  const upcommingEvents = cows
    ?.map((cow) => {
      const cowInfo = { id: cow.id, earring: cow.earring, nickname: cow.name }
      const nextEvents = cow.lastEvent?.nextEvents.map((evt) => {
        return { ...evt, cow: cowInfo }
      })
      return nextEvents
    })
    .flat()
    .sort((a, b) => a.date - b.date)

  console.log(upcommingEvents)
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

  if (loading) return 'Cargando...'

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

  const monthEvents = upcommingEvents?.reduce((acc, item, i, arr) => {
    const month = monthsNames[item.date.getMonth()]
    const events = arr.filter(
      (evt) => evt?.date?.getMonth() === item.date.getMonth()
    )
    const servicios = events.filter((evt) => evt.type === 'serv')
    const partos = events.filter((evt) => evt.type === 'parto')
    const gestantes = events.filter(
      (evt) =>
        evt.type === 'palp' || evt.type === 'next_serv' || evt.type === 'secado'
    )

    if (acc?.find((evt) => evt.month === month)) return [...acc]
    return [
      ...acc,
      {
        month,
        events: {
          servicios,
          partos,
          gestantes,
        },
      },
    ]
  }, [])

  /*   const Feb = monthEvents.find((month) => month.month === 'Feb')
  console.log(Feb.events.filter((evt) => evt.type === 'serv'))
 */
  const rows = [
    { title: 'Partos', type: 'partos' },
    { title: 'Servicios', type: 'servicios' },
    { title: 'Gestantes', type: 'gestantes' },
  ]
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
          <div className={styles.dash_grid}>
            <div className={styles.grid_row}>
              <div className={styles.grid_title}>Evts / Mes</div>
              {rows.map((row, i) => (
                <div key={i} className={styles.grid_title}>
                  {row.title}
                </div>
              ))}
            </div>
            {/*    <div className={styles.grid_row}>
              <div className={styles.grid_title}>ene</div>
              <div className={styles.grid_cell}>5</div>
              <div className={styles.grid_cell}>7</div>
            </div> */}

            {monthEvents?.map((month, i) => (
              <Month
                key={i}
                rows={rows}
                events={month.events}
                title={month.month}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

const Month = ({ events, title, rows }) => {
  return (
    <div className={styles.grid_row}>
      <div className={styles.grid_title}>{title}</div>
      {rows.map((row, i) => (
        <>
          <div
            onClick={() => {
              // setModalInfo(events[row.type])
              // setOpenModal(!openModal)
            }}
            key={i}
            className={styles.grid_cell}
          >
            {events[row.type].length}
          </div>
        </>
      ))}
      {/* <Modal
        title="Detalles "
        open={openModal}
        handleOpen={() => setOpenModal(!openModal)}
      >
        
        <H3></H3>
        <div className={styles.upcoming_grid}>
          {events.map((evt, i) => (
            <div key={i} className={styles.upcoming_event}>
              <div>{`Arete : ${evt.cow.earring} - ${evt.cow.nickname}`}</div>
              <div>
                {`Evento : ${evt.label} `}
                <em>{evt.type}</em>
                <div>
                  <div>{evt.formatDate}</div>
                  <em>{evt.fromNow}</em>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Modal> */}
    </div>
  )
}
