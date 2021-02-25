import { H3 } from '@cmps/H'
import { P1, P3 } from '@cmps/P'
import styles from './styles.module.css'

export default function LastEventView({ lastEvent }) {
  const upcommingEvents = lastEvent?.nextEvents
  return (
    <>
      <div className={styles.lastEvent_row}>
        <div>
          <H3>Ultimo Evento</H3>
          {lastEvent ? (
            <div style={{ display: 'flex' }}>
              <div style={{ margin: '8px', textAlign: 'center' }}>
                {lastEvent?.label}
                <div>
                  <em>{lastEvent?.type}</em>
                </div>
              </div>
              <div style={{ margin: '8px', textAlign: 'center' }}>
                {lastEvent?.formatDate}
                <div>
                  <em>{lastEvent?.fromNow}</em>
                </div>
              </div>

              <div style={{ margin: '8px', textAlign: 'center' }}>
                {`Comentarios`}
                <div>
                  <em>
                    {lastEvent?.eventOption} , {lastEvent?.coments}
                  </em>
                </div>
              </div>
            </div>
          ) : (
            <P3>No hay eventos aún</P3>
          )}
        </div>
      </div>
      <div className={styles.lastEvent_row}>
        <div>
          <H3>{`Proximos Eventos`}</H3>
          <div className={styles.upcoming_line}>
            {upcommingEvents ? (
              <>
                {upcommingEvents?.map((event, i) => (
                  <div
                    key={i}
                    style={{
                      margin: '8px',
                      textAlign: 'center',
                      minWidth: '100px',
                    }}
                  >
                    <P1>{event.label} </P1>
                    <em>{event.type}</em>
                    <div>
                      <P1>{event.formatDate}</P1> <em>{event.fromNow}</em>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <P3>No hay proximos eventos</P3>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
