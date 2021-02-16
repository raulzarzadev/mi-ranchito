import { Btn1, Btn2 } from '@cmps/Btns'
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
  const earrings = cows
  const earringNo = router?.query?.earring
  const earringId = router?.query?.earringId

  const [form, setForm] = useState({
    date: getToday(),
    coments: '',
    earring: earringNo || '',
    earringId: earringId || '',
    event: '',
  })

  const eventsAvaiblable = formatedTypes()

  useEffect(() => {
    setForm({ ...form, earringId, earring: earringNo })
  }, [earringId])

  useEffect(() => {
    if (event) {
      setForm(event)
    }
  }, [event])

  const [labelButton, setLabelButton] = useState('Guardar Evento')

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

  const valid = !form.earring || !form.event || labelButton === 'Guardado'
  earrings.sort((a, b) => {
    if (a.earring > b.earring) return 1
    if (a.earring < b.earring) return -1
    return 0
  })
  console.log(valid)

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
                    name="earringId"
                    id="select-animal"
                    value={form?.earringId || ''}
                  >
                    <option value="" disabled>
                      Arete No.
                    </option>
                    {earrings.map((earring, i) => (
                      <option key={i} value={earring.id}>
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
                <Btn1 disabled={valid}>{labelButton}</Btn1>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
