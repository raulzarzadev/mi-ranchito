import { Btn1 } from '@cmps/Btns'
import { H2 } from '@cmps/H'
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

  useEffect(() => {
    if (earringId) {
      const earringNo = cows.find((cow) => cow.id === earringId)?.earring
      setForm({
        ...form,
        earring: earringNo,
      })
    }
  }, [earringId, cows])

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
  console.log(form)

  const [labelButton, setLabelButton] = useState('Guardar Evento')

  const handleSelectCow = (e) => {
    const earringNo = cows.find((cow) => cow.id === e.target.value)?.earring
    setForm({ ...form, earring: earringNo, earringId: e.target.value })
  }

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

  return (
    <div>
      <div className={styles.title}>
        <H2>Nuevo Evento</H2>
      </div>
      <div>
        <form
          onSubmit={(e) => {
            console.log('sub')
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
                    onChange={handleSelectCow}
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
