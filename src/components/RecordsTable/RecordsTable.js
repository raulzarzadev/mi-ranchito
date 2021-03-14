import { P2 } from '@cmps/P'
import styles from './styles.module.css'

export default function RecordsTable({ records = [] }) {
  if (records.length === 0) return <P2>Aun no hay registros</P2>

  const column = {
    cows: [
      { earringId: '235235', earring: 'primera', liters: '14.5' },
      { earringId: '2335', earring: 'segunda', liters: '18.5' },
      { earringId: '235', earring: 'tercera', liters: '12.5' },
      { earringId: '2457235', earring: 'cuarta', liters: '19.5' },
    ],
    date: '28-ene',
    litersAverage: 15.6,
    litersTotals: 63.9
  }
  return (
    <>
      <div>Registros de leche</div>
      <div className={styles.grid_column}>
        <div className={styles.grid_total}>60</div>
        <div className={styles.grid_average}>15</div>
        <div className={styles.grid_cow}>12</div>
        <div className={styles.grid_cow}>17</div>
        <div className={styles.grid_cow}>12</div>
        <div className={styles.grid_cow}>18</div>
        <div className={styles.grid_date}>28-ene</div>
        <div className={styles.grid_cows}>4 </div>
      </div>
    </>
  )
}
