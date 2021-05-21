import ButtonBack from '@cmps/ButtonBack'
import { H3 } from '@cmps/H'
import { fromNow } from '@raiz/src/utils'
import s from './styles.module.css'

export default function EventDetails({ event }) {
  console.log('event', event)

  return (
    <div>
      <ButtonBack />
      <div>
        <H3>{`Detalles del Evento`}</H3>
        <div>Vaca : {event.earring}</div>
        <div>Evento : {event.label}</div>
        <div>Creado : {fromNow(event.date)}</div>
      </div>
    </div>
  )
}
