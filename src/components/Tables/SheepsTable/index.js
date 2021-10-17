import { H2 } from '@cmps/Texts/H'
import ROUTES from '@raiz/constants/ROUTES'
import { get_sheeps } from '@raiz/firebase/sheeps'
import { useAuth } from '@raiz/src/context/AuthContext'
import { currentAge, fromNow } from '@raiz/src/utils/Dates'
import { formatDistanceToNow } from 'date-fns'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function SheepsTable() {
  const [sheeps, setSheeps] = useState([])
  const router = useRouter()
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

  const handleRedirectToDetails = (id) => {
    router.push(ROUTES.sheeps.details(id))
  }

  return (
    <div className="">
      <H2>Borregos</H2>
      <div className="flex  font-bold">
        <div className="w-1/6 text-right pr-2">Lote</div>
        <div className="w-1/5 text-left pl-1">Arete</div>
        <div className="w-auto">Edad</div>
        {/* <div className={s.title}>Status</div>
          <div className={s.title}>Proximo</div> */}
      </div>
      {sheeps?.map(({ id, batch, earring, birth }) => (
        <div
          onClick={() => handleRedirectToDetails(id)}
          key={id}
          className="flex my-3 shadow-sm hover:shadow-lg"
        >
          <div className="w-1/6 text-right pr-2">{batch}</div>
          <div className="w-1/5 text-left pl-1">{earring}</div>
          <div className="w-auto">{birth && currentAge(birth)}</div>
        </div>
      ))}
    </div>
  )
}
