import { H3 } from '@cmps/H'
import styles from './styles.module.css'

export default function ConfigurationView() {
  const dates = [
    {
      key: 'celo',
      label: 'Celo',
      period: 21,
    },
  ]
  return (
    <div className={styles.configuration}>
      <H3>Configuración de fechas</H3>
      <div>
        {dates.map((date) => (
          <div key={date.key} >
            <div>{date.label}</div>
            <div>{date.period}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
