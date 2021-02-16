import BtnLink from '@cmps/BtnLink/BtnLink'
import { H2 } from '@cmps/H'
import { P2 } from '@cmps/P'

export default function RecordsTable({ records = [] }) {
  if (records.length === 0) return <P2>Aun no hay registros</P2>
  return (
    <>
      <div>Esta tabla es de todos los los registro de este usuaruio</div>
    </>
  )
}
