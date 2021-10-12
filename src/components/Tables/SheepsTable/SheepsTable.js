import { H2 } from '@cmps/Texts/H'
import ROUTES from '@raiz/constants/ROUTES'
import { get_sheeps } from '@raiz/firebase/sheeps'
import { useAuth } from '@raiz/src/context/AuthContext'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import s from './styles.module.css'

export default function SheepsTable() {
  const [sheeps, setSheeps] = useState([])
  const { user } = useAuth()
  useEffect(() => {
    if (user) {
      get_sheeps(user?.id)
        .then(({ ok, res }) => {
          if (ok) {
            setSheeps(res)
          }
        })
        .catch((err) => console.log(err))
    }
  }, [user])


  return (
    <>
      <div className={s.grid}>
        <H2>Borregos</H2>
        <div className={s.grid_titles}>
          <div className={s.title}>Borrego</div>
          <div className={s.title}>Eventos</div>
          <div className={s.title}>Ultimo</div>
          {/* <div className={s.title}>Status</div>
          <div className={s.title}>Proximo</div> */}
        </div>
        {sheeps?.map((sheep) => (
          <Row key={sheep.id} sheep={sheep} />
        ))}
      </div>
    </>
  )
}

const Row = ({ sheep }) => {
  const { statuses, nextEvent, id, events } = sheep
  const router = useRouter()
  return (
    <div
      className={s.grid_row}
      onClick={() => router.push(`${ROUTES.sheeps}/${id}`)}
    >
      <div>
        <div>{`${sheep?.earring}`}</div>
        <em>{sheep?.name}</em>
      </div>
      <div>{events?.length}</div>
      {/* <div>{events[events?.length - 1]?.label}</div> */}
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
