import { Btn1 } from '@cmps/Btns'
import { H2 } from '@cmps/H'
import useCows from '@raiz/src/hooks/useCows'
import useEvents from '@raiz/src/hooks/useEvents'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { formatedTypes, formatInputDate, getToday } from '../../utils'
import styles from './styles.module.css'

export default function NewEvent({ event = null }) {
  const router = useRouter()
  const { getCows } = useCows()
  const { addEvent, editEvent } = useEvents()
  const [earrings, setEarrings] = useState()

  const earringNo = router?.query?.earring
  const earringId = router?.query?.cowId

  useEffect(() => {
    getCows().then((res) => setEarrings(res))
  }, [])

  useEffect(() => {
    if (earringId && earrings) {
      const earringNo = earrings.find((cow) => cow.id === earringId)?.earring
      setForm({
        ...form,
        earring: earringNo,
      })
    }
  }, [earringId, earrings])

  const [form, setForm] = useState({
    date: new Date().toISOString(),
    coments: '',
    earring: earringNo || '',
    earringId: earringId || '',
    event: '',
  })

  useEffect(() => {
    setForm({ ...form, earringId, earring: earringNo })
  }, [earringId])

  useEffect(() => {
    if (event) {
      setForm(event)
    }
  }, [event])

  const [labelButton, setLabelButton] = useState('Guardar Evento')

  const handleSelectCow = (e) => {
    const earringNo = earrings.find((cow) => cow.id === e.target.value)?.earring
    setForm({ ...form, earring: earringNo, earringId: e.target.value })
  }

  const handleChangeDate = (e) => {
    const date = new Date(e.target.value).toISOString()
    setForm({ ...form, date })
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

  const eventsAvaiblable = formatedTypes()?.sort((a, b) => {
    if (a.label > b.label) return 1
    if (a.label < b.label) return -1
    return 0
  })

  const regularEvents = eventsAvaiblable.filter(
    (event) => event.category === 'regular'
  )
  const specialsEvents = eventsAvaiblable.filter(
    (event) => event.category === 'special'
  )
  const adminEvents = eventsAvaiblable.filter(
    (event) => event.category === 'admin'
  )

  const optionsType = eventsAvaiblable.find(
    (event) => event.type === form.event
  )?.options

  return (
    <div>
      <div className="box-1">
        <H2>{`Nuevo Evento`}</H2>
      </div>
      
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <div>
            <div className={styles.event_form__input}>
              <span>
                <select
                  className={styles.select}
                  onChange={handleSelectCow}
                  name="earringId"
                  id="select-animal"
                  value={form?.earringId || ''}
                >
                  <option value="" disabled>
                    {`Selecciona Arete`}
                  </option>
                  {earrings?.map((earring, i) => (
                    <option key={i} value={earring.id}>
                      {earring.earring} {earring?.nickName}
                    </option>
                  ))}
                </select>
              </span>
            </div>
            <div className={styles.event_form__input}>
              <span>
                <select
                  className={styles.select}
                  onChange={handleChange}
                  value={form?.event || ''}
                  name="event"
                  id="select-animal"
                  placeholder="Selecciona una vaca"
                >
                  <option value="" disabled>
                    {` Selecciona Evento`}
                  </option>
                  <optgroup label="Periodicos">
                    {regularEvents?.map((event, i) => (
                      <option key={i} value={event.type}>
                        {event.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Especiales">
                    {specialsEvents?.map((event, i) => (
                      <option key={i} value={event.type}>
                        {event.label}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Administrativos">
                    {adminEvents?.map((event, i) => (
                      <option key={i} value={event.type}>
                        {event.label}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </span>
            </div>
            {optionsType?.length > 0 && (
              <div className={styles.event_form__input}>
                <span>
                  <select
                    className={styles.select}
                    onChange={handleChange}
                    name="eventOption"
                    id="select-event-option"
                    value={form?.eventOption || ''}
                  >
                    <option value="" disabled>
                      {`Detalles`}
                    </option>
                    {optionsType?.map((option, i) => (
                      <option key={i} value={option.type}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </span>
              </div>
            )}

            <div className={styles.event_form__input}>
              <span>
                <textarea
                  type="text"
                  rows={2}
                  className={styles.textarea}
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
                <input
                  className={styles.date}
                  onChange={handleChangeDate}
                  type="date"
                  name="date"
                  id="event-date"
                  value={formatInputDate(form.date)}
                />
              </span>
            </div>
            <div className={styles.event_form__input}>
              <Btn1 disabled={valid}>{labelButton}</Btn1>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
