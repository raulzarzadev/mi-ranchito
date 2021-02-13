import BtnLink from '@cmps/BtnLink/BtnLink'
import EventTable from '@cmps/EventTable'
import useCows from '@raiz/src/hooks/useCows'
import React, { useEffect, useState } from 'react'

export default function CowDetails({ cowId }) {
  const { getCowDetails } = useCows()
  const [cow, setCow] = useState(null)
  useEffect(() => {
    if (cowId) {
      getCowDetails(cowId)
        .then(setCow)
        .catch((err) => console.log(err))
    }
  }, [cowId])
  console.log('vaca detalles', cow)
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <BtnLink
          label="Nuevo Evento"
          href={`/dashboard-cows/newEvent?earring=${cow?.earring}&earringId=${cow?.id}`}
        />
        <BtnLink
          label="Nuevo Registro"
          href={`/dashboard-cows/newRecord?earring=${cow?.earring}&earringId=${cow?.id}`}
        />
      </div>
      <div>Id: {cow?.id}</div>
      <div>Arete: {cow?.earring}</div>
      <div>Nombre/apodo: {cow?.name}</div>
      <EventTable upcomingEvents title={`Eventos de ${cow?.earring}`} events={cow?.events} />
    </div>
  )
}
