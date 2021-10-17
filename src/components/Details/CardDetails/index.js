import styles from './styles.module.css'
import { format, formatDistanceToNow } from 'date-fns'

export default function CardDetails({ details }) {
  const { earring, name, registryDate, birth, batch } = details
  if (details === undefined) return 'loading ...'
  return (
    <>
      <div className={styles.details_box}>
        <div>
          <div className={styles.detail_title}> Lote y numero :</div>
          <div className={styles.detail_content}>{` ${
            batch || ''
          } - ${earring}`}</div>
        </div>
        <div>
          <div className={styles.detail_title}>Nombre :</div>
          <div className={styles.detail_content}>{name || '-'}</div>
        </div>
        <div>
          <div className={styles.detail_title}>Edad :</div>
          <div className={styles.detail_content}>
            {birth ? formatDistanceToNow(birth) : '-'}
          </div>
        </div>
        <div>
          <div className={styles.detail_title}>Registro :</div>
          <div className={styles.detail_content}>
            {registryDate ? format(registryDate, 'dd MMM') : '-'}
          </div>
        </div>
      </div>
    </>
  )
}
