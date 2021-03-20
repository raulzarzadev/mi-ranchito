import { useEffect, useState } from 'react'
import styles from './styles.module.css'
const defaultRows = [
  {
    id: '3424',
    earringNo: '00',
    name: 'nombre',
    registry: '3 dias ',
    statuses: ['lactando', 'gestando'],
    birth: 1231242353,
    events: [{}, {}],
  },
]
export default function CowsTable({ title = 'Table title', earrings }) {
  console.log(earrings)
  const tableTitles = [
    { title: 'earring', label: 'Arete / Nombre' },
    { title: 'age', label: 'Edad / Ing' },
    { title: 'events', label: 'Eventos' },
    { title: 'lastEvent', label: 'Ultimo' },
    { title: 'status', label: 'Estatus' },
  ]
  const [rows, setRows] = useState(defaultRows)
  useEffect(() => {
    if (earrings) {
      setRows(earrings)
    }
  }, [earrings])

  const [sortBy, setSortBy] = useState('earring')
  const handleSortRowsBy = (title) => {
    // TODO implementar sort
    console.log('not yet')
  }
  console.log(sortBy)

  return (
    <div className={styles.table_content}>
      <div>{title}</div>
      <div className={styles.table}>
        <div className={`${styles.row} ${styles.row_headers}`}>
          {/* table titles */}
          {tableTitles.map(({ title, label }, i) => (
            <div
              onClick={() => handleSortRowsBy(title)}
              key={i}
              className={`${styles.cell} ${styles.cell_title}`}
            >
              {label}
            </div>
          ))}
        </div>
        {rows.map(
          ({
            id,
            events,
            statuses,
            registry,
            birth,
            name,
            earring,
            lastEvent,
          }) => (
            <div key={id} className={`${styles.row}`}>
              <div className={`${styles.cell}`}>{`${earring} ${name}`}</div>
              <div className={`${styles.cell}`}>{birth || 'n/a'}</div>
              <div className={`${styles.cell}`}>{events?.length}</div>
              <div className={`${styles.cell}`}>{lastEvent?.label}</div>
              <div className={`${styles.cell}`}>
                {statuses?.map((status) => (
                  <div key={status}>{status}</div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
