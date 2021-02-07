import { ALL_EVENTS } from '@raiz/HARD_DATA-COPY'
import styles from './styles.module.css'

export default function Calendar() {
  const eventsAvailables = ALL_EVENTS
  console.log(eventsAvailables)
  return (
    <div>
      <div className={styles.calendar}>
        <div className={styles.calendar_row}>
          <div>
            <h5>Evento </h5>
          </div>

          <div>
            <h5>Desde el celo</h5>
          </div>
        </div>
        {eventsAvailables.map((event) => (
          <>
            {event.visible && (
              <div className={styles.calendar_row}>
                <div className={styles.calendar_title}>{event.label} </div>
                <div>
                  <ProgressBar progress={event.from0Day} />
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  )
}

const ProgressBar = ({ progress }) => (
  <div className={styles.progress_bar}>
    <div
      className={styles.progress}
      style={{ width: `${(progress / 283) * 50}%` }}
    ></div>
    <div className={styles.progress_placeholder}>{progress}</div>
  </div>
)
