import useCows from '@raiz/src/hooks/useCows'
import useEvents from '@raiz/src/hooks/useEvents'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { formatedTypes, getToday } from '../../utils'
import styles from './styles.module.css'

export default function NewEvent({ event = null }) {
  const router = useRouter()
  const { cows } = useCows()
  const { addEvent, editEvent } = useEvents()
  const earringNo = router?.query?.earring
  const earrings = cows

  const [form, setForm] = useState({
    date: getToday(),
    coments: '',
    earring: earringNo || '',
    event: '',
  })

  earrings.sort((a, b) => {
    if (a.earring > b.earring) return 1
    if (a.earring < b.earring) return -1
    return 0
  })
  // console.log(earrings)

  const eventsAvaiblable = formatedTypes()

  useEffect(() => {
    if (event) {
      setForm(event)
    }
  }, [event])

  const handleChange = (e) => {
    setLabelButton('Guardar Evento')
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = () => {
    event?.id ? editEvent(event?.id, form) : addEvent(form)
    setLabelButton('Guardado')
    setForm({ ...form, event: '', earring: '', coments: '' })
    setTimeout(() => {
      router.back()
    }, 300)
  }
  const [labelButton, setLabelButton] = useState('Guardar Evento')

  // TODO Evento revision, comentarios , evento aleatorio
  // TODO Seleccionar autor del evento, escribir obs
  // TODO gesta exitosa -> aproximado
  // TODO if parto => select sexo
  // TODO nueva vaca, crear padre
  // TODO nueva vaca, nac / registro
  // TODO Cambiar id de vacas a earring - string - nickNmae
  // TODO nuevo envento aborto / venta /

  const valid = !form.earring || !form.event || labelButton === 'Guardado'

  return (
    <div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <div>
            <div>
              <div className={styles.event_form__input}>
                <span>
                  Vaca:{' '}
                  <select
                    style={{ width: 150 }}
                    onChange={handleChange}
                    name="earring"
                    id="select-animal"
                    value={form?.earring || ''}
                  >
                    <option value="" disabled>
                      Arete No.
                    </option>
                    {earrings.map((earring, i) => (
                      <option key={i} value={earring.earring}>
                        {earring.earring} {earring?.nickName}
                      </option>
                    ))}
                  </select>
                </span>
              </div>
              <div className={styles.event_form__input}>
                <span>
                  Evento:{' '}
                  <select
                    style={{ width: 150 }}
                    onChange={handleChange}
                    value={form?.event || ''}
                    name="event"
                    id="select-animal"
                    placeholder="Selecciona una vaca"
                  >
                    <option value="" disabled>
                      Evento
                    </option>
                    {eventsAvaiblable.map((event, i) => (
                      <option key={i} value={event.type}>
                        {event.label}
                      </option>
                    ))}
                  </select>
                </span>
              </div>
              <div className={styles.event_form__input}>
                <span>
                  Observaciones:
                  <textarea
                    type="text"
                    rows={2}
                    style={{ width: 150 }}
                    onChange={handleChange}
                    name="coments"
                    id="observaciones"
                    value={form?.coments || ''}
                    placeholder="Detalles"
                  ></textarea>
                </span>
              </div>
              <div className={styles.event_form__input}>
                <span>
                  Fecha:{' '}
                  <input
                    style={{ width: 150 }}
                    onChange={handleChange}
                    type="date"
                    name="date"
                    id="event-date"
                    value={form.date || ''}
                  />
                </span>
              </div>
              <div className={styles.event_form__input}>
                <button type="submit" disabled={valid}>
                  {labelButton}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
