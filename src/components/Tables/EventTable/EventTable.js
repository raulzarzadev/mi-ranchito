import { fromNow } from '@raiz/src/utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import s from './styles.module.css'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

export default function EventsTable({ events = [] }) {
  const [sortBy, setSortBy] = useState('')
  const [eventsSorted, setEventsSorted] = useState([])
  const router = useRouter()
  const {
    query: { sort },
  } = router
  useEffect(()=>{
    sort && setSortBy(sort)
  },[sort])

  const handleSortBy = (field) => {
    let sorting
    if (field === sortBy) {
      sorting = `${field}_REVERSE`
    } else {
      sorting = field
    }

    router.push(`?sort=${sorting}`)
    setSortBy(sorting)
  }

  useEffect(() => {
    // Extract the sort title for use inside the event
    const title = sortBy.split('_')[0]
    let sorted
    if (sortBy.includes('REVERSE')) {
      sorted = events.sort((a, b) => {
        if (a[title] > b[title]) return 1
        if (a[title] < b[title]) return -1
        return 0
      })
    } else {
      sorted = events.sort((a, b) => {
        if (a[title] < b[title]) return 1
        if (a[title] > b[title]) return -1
        return 0
      })
    }
    setEventsSorted(sorted)
  }, [sortBy, events])

  return (
    <>
      <div className={s.grid}>
        <div className={s.grid_titles}>
          <div className={s.title}>
            <ButtonTitle
              onClick={() => handleSortBy('earring')}
              selected={sortBy.includes('earring')}
              directionDown={sortBy.includes('REVERSE')}
            >
              Vaca
            </ButtonTitle>
          </div>
          <div className={s.title}>
            <ButtonTitle
              onClick={() => handleSortBy('key')}
              selected={sortBy.includes('key')}
              directionDown={sortBy.includes('REVERSE')}
            >
              Evento
            </ButtonTitle>
          </div>
          <div className={s.title}>
            <ButtonTitle
              onClick={() => handleSortBy('date')}
              selected={sortBy.includes('date')}
              directionDown={sortBy.includes('REVERSE')}
            >
              Fecha
            </ButtonTitle>
          </div>
          {/* <div className={s.title}>Status</div>
          <div className={s.title}>Proximo</div> */}
        </div>
        {eventsSorted.map((event, i) => (
          <Row key={i} event={event} />
        ))}
      </div>
    </>
  )
}

const Row = ({ event }) => {
  const { date, id, label, cow, variants } = event

  const router = useRouter()
  return (
    <div
      className={s.grid_row}
      onClick={() => router.push(`/dashboard/events/${id}`)}
    >
      <div>
        <span>
          <span>{`${cow.earring} `}</span>
          <em>{cow?.name}</em>
        </span>
      </div>
      <div>
        <div>{label}</div>
        <em>{variants?.map((variant) => variant.label)}</em>
        <div></div>
      </div>
      <div>{fromNow(date)}</div>

      {/*  <div>{events?.length}</div>
      <div>{events[events.length - 1]?.label}</div> */}
      {/*  <div>
        {statuses?.map((status, i) => (
          <div key={i}>
            <em>{status?.label}</em>
          </div>
        ))}
      </div>
      <div>
        <div>{nextEvent?.label}</div>
        <em>{nextEvent?.date}</em>
      </div> */}
    </div>
  )
}

const ButtonTitle = ({ children, onClick, selected, directionDown }) => {
  return (
    <>
      <button onClick={onClick} selected={true} className={s.button_title}>
        {children}
        {selected && (
          <>{directionDown ? <ExpandLessIcon /> : <ExpandMoreIcon />}</>
        )}
      </button>
      <div className={selected ? s.selected : s.unselected} />
    </>
  )
}
