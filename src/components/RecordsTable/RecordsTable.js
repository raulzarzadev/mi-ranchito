import { P2 } from '@cmps/P'
import styles from './styles.module.css'

export default function RecordsTable({ records = [] }) {
  if (records.length === 0) return <P2>Aun no hay registros</P2>

  const columns = [
    {
      cows: [
        { earringId: '235235', earring: 'primera', liters: '14.5' },
        { earringId: '2335', earring: 'segunda', liters: '18.5' },
        { earringId: '235', earring: 'tercera', liters: '12.5' },
        { earringId: '2457235', earring: 'cuarta', liters: '19.5' },
        { earringId: '357235', earring: 'cuarta', liters: '19.5' },
      ],
      date: '28-ene',
      litersAverage: 15.6,
      litersTotals: 63.9,
    },
    {
      cows: [
        { earringId: '235235', earring: 'primera', liters: '12.5' },
        { earringId: '2335', earring: 'segunda', liters: '16.5' },
        { earringId: '235', earring: 'tercera', liters: '18.5' },
        { earringId: '2457235', earring: 'cuarta', liters: '22' },
        { earringId: '357235', earring: 'cuarta', liters: '25.5' },
        { earringId: '3535', earring: 'septima', liters: '28.5' },
      ],
      date: '05-feb',
      litersAverage: 22.6,
      litersTotals: 120.9,
    },
    {
      cows: [
        { earringId: '235235', earring: 'primera', liters: '12.5' },
        { earringId: '2335', earring: 'segunda', liters: '16.5' },
        { earringId: '235', earring: 'tercera', liters: '18.5' },
        { earringId: '2457235', earring: 'cuarta', liters: '22' },
        { earringId: '357235', earring: 'cuarta', liters: '25.5' },
        { earringId: '3535', earring: 'septima', liters: '28.5' },
      ],
      date: '20-feb',
      litersAverage: 17.6,
      litersTotals: 250.9,
    },

    {
      cows: [
        { earringId: '235235', earring: 'primera', liters: '12.5' },
        { earringId: '2335', earring: 'segunda', liters: '16.5' },
        { earringId: '235', earring: 'tercera', liters: '18.5' },
        { earringId: '2457235', earring: 'cuarta', liters: '22' },
        { earringId: '357235', earring: 'cuarta', liters: '25.5' },
        { earringId: '3535', earring: 'septima', liters: '28.5' },
      ],
      date: '28-feb',
      litersAverage: 15.6,
      litersTotals: 400.9,
    },
    {
      cows: [
        { earringId: '235235', earring: 'primera', liters: '12.5' },
        { earringId: '2335', earring: 'segunda', liters: '16.5' },
        { earringId: '235', earring: 'tercera', liters: '18.5' },
        { earringId: '2457235', earring: 'cuarta', liters: '22' },
        { earringId: '357235', earring: 'cuarta', liters: '25.5' },
        { earringId: '3535', earring: 'septima', liters: '28.5' },
      ],
      date: '05-mar',
      litersAverage: 22.6,
      litersTotals: 200.9,
    },
    {
      cows: [
        { earringId: '235235', earring: 'primera', liters: '12.5' },
        { earringId: '2335', earring: 'segunda', liters: '16.5' },
        { earringId: '235', earring: 'tercera', liters: '18.5' },
        { earringId: '2457235', earring: 'cuarta', liters: '22' },
        { earringId: '335', earring: 'cuarta', liters: '23.5' },
        { earringId: '357235', earring: 'cuarta', liters: '25.5' },
        { earringId: '3535', earring: 'septima', liters: '28.5' },
      ],
      date: '15-abr',
      litersAverage: 24.6,
      litersTotals: 270.9,
    },
  ]
  return (
    <>
      <div>Registros de leche</div>
      <div className={styles.graph_top_labels}>
        <GraphLabel label="Total" color="graph-1" />
        <GraphLabel label="Litros %" color="graph-2" />
        <GraphLabel label="Litros x Vaca" color="graph-3" />
      </div>
      <figure className={styles.graph}>
        <div className={styles.column}>
          <div className={styles.graph_labels}>
            <div>Total</div>
            <div>Individal</div>
            <div>
              <div>Fecha</div>
              <div>Vacas</div>
            </div>
          </div>
        </div>
        {columns.map((column, i) => (
          <div key={i} className={styles.column}>
            <div className={styles.data}>
              <div className={styles.total_liters}>
                <div
                  className={`${styles.graph_point} ${styles.graph_main_point}`}
                  style={{
                    bottom: `calc(${Math.log(column.litersTotals) * 10}%)`,
                  }}
                  type="graph-1"
                >
                  <span>{column.litersTotals} L</span>
                </div>
              </div>
              <div
                className={`${styles.graph_point} ${styles.graph_main_point}`}
                style={{ bottom: `calc(${column.litersAverage * 5}px - 50px)` }}
                type="graph-2"
              >
                <span>{column.litersAverage} L</span>
              </div>
              {column.cows.map((cow) => (
                <div
                  type="graph-3"
                  key={cow.earringId}
                  className={styles.graph_point}
                  style={{ bottom: `calc(${cow.liters * 5}px - 50px)` }}
                >
                  <span>{cow.liters} L </span>
                </div>
              ))}
            </div>
            <div className={styles.col_details}>
              <div className={styles.grid_date}>{column.date}</div>
              <div className={styles.grid_cows}>{column.cows.length} </div>
            </div>
          </div>
        ))}
      </figure>

      <figcaption hidden>
        {' '}
        {`A graph about the milk produced in a spacific date`}
      </figcaption>
    </>
  )
}

function GraphLabel({ label, color }) {
  return (
    <span className={styles.graph_label}>
      <div className={styles.square_label} color={color} />
      {label}
    </span>
  )
}
