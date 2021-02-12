export default function RecordsTable({ records = [] }) {
  if (records.length === 0) return 'Aun no hay registros'
  return <div>Esta tabla es de todos los los registro de este usuaruio</div>
}
