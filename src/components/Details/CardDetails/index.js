import styles from './styles.module.css'
import { format } from 'date-fns'

export default function CardDetails({ details }) {
  const { earring, name, registryDate, birth } = details

  if (details === undefined) return 'loading ...'
  return (
    <>
      <div className={styles.details_box}>
        <div>
          <div className={styles.detail_title}> Arete No. :</div>
          <div className={styles.detail_content}>{earring}</div>
        </div>
        <div>
          <div className={styles.detail_title}>Nombre :</div>
          <div className={styles.detail_content}>{name || '-'}</div>
        </div>
        <div>
          <div className={styles.detail_title}>Edad :</div>
          <div className={styles.detail_content}>
            {birth ? format(birth, 'dd MMM') : '-'}
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
