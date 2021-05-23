import ButtonBack from '@cmps/ButtonBack'
import { H3 } from '@cmps/H'
import { useRouter } from 'next/router'
import s from './styles.module.css'

export default function CowsTable({ title = 'Table title', cows = [] }) {
  return (
    <>
      <div className={s.grid}>
        <H3>Vacas</H3>
        <div className={s.grid_titles}>
          <div className={s.title}>Vaca</div>
          <div className={s.title}>Eventos</div>
          <div className={s.title}>Ultimo</div>
          {/* <div className={s.title}>Status</div>
          <div className={s.title}>Proximo</div> */}
        </div>
        {cows.map((cow) => (
          <Row key={cow.id} cow={cow} />
        ))}
      </div>
    </>
  )
}

const Row = ({ cow }) => {
  const { statuses, nextEvent, id, events } = cow
  const router = useRouter()
  return (
    <div
      className={s.grid_row}
      onClick={() => router.push(`/dashboard/cows/${id}`)}
    >
      <div>
        <div>{`${cow.earring}`}</div>
        <em>{cow.name || ' - '}</em>
      </div>
      <div>{events.length}</div>
      <div>{events[events.length - 1]?.label}</div>
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
