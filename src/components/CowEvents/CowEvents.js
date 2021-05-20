import Button from '@cmps/Button'
import { H3 } from '@cmps/H'
import { fromNow } from '@raiz/src/utils'
import { useRouter } from 'next/router'
import s from './styles.module.css'

export default function CowEvents({ events = [] }) {
  return (
    <div className={s.grid}>
      <H3>Todos los Eventos</H3>
      <div className={s.grid_titles}>
        <div className={s.title}>Evento</div>
        <div className={s.title}>Fecha</div>
        <div className={s.title}>Options</div>
        <div className={s.title}>Coments</div>
        <div className={s.title}>Actions</div>
      </div>
      {events.map((event) => (
        <Row key={event.id} event={event} />
      ))}
    </div>
  )
}

const Row = ({ event }) => {
  const { label, id, date, options, coments } = event
  const router = useRouter()
  return (
    <div
      className={s.grid_row}
      onClick={() => router.push(`/dashboard/cows/${id}`)}
    >
      <div>{label}</div>
      <div>{fromNow(date)}</div>
      <div>{options?.map((option) => option)}</div>
      <div>{coments}</div>
      <div>
        <Button icon deleteIcon secondary />
        <Button icon editIcon primary />
      </div>
    </div>
  )
}
