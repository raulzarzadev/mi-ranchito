import React, { useState } from 'react'
import { getToday } from '../../utils'
import styles from './styles.module.css'

export default function NewEventForm ({
  handleSubmit = () => console.log('submit'),
  earrings = [],
  eventsAvaiblable = []
}) {
  const [form, setForm] = useState({
    date: getToday(),
    earring: '',
    event: ''
  })
  const handleChange = (e) => {
    setLabelButton('Guardar Evento')
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const [labelButton, setLabelButton] = useState('Guardar Evento')
  const handleChangeButton = (label) => {
    setLabelButton(label)
    setForm({ date: getToday() })
  }

  const valid = !form.earring || !form.event || labelButton === 'Guardado'

  return (
    <div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(form)
            handleChangeButton('Guardado')
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
                  Fecha:{' '}
                  <input
                    style={{ width: 150 }}
                    onChange={handleChange}
                    type="date"
                    name="date"
                    id="event-date"
                    value={form.date}
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
