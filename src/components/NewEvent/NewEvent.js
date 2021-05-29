import { Btn1 } from '@cmps/Btns'
import Button from '@cmps/Button'
import { H2 } from '@cmps/H'
import { EVENTS_TYPES_2 } from '@raiz/constants/EVENTS_INFO'
import useCows from '@raiz/src/hooks/useCows'
import useEvents from '@raiz/src/hooks/useEvents'
import { formatInputDate } from '@raiz/src/utils/Dates'
import { formatEvent } from '@raiz/src/utils/Event'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
// import { formatedTypes } from '../../utils'
import styles from './styles.module.css'

export default function NewEvent({
  title = '',
  earringId = null,
  event = null,
}) {
  const EVENTS = EVENTS_TYPES_2
  const router = useRouter()

  const { getCows } = useCows()
  const { addEvent, editEvent } = useEvents()

  const [labelButton, setLabelButton] = useState('Guardar')
  const [earrings, setEarrings] = useState(undefined)
  const [form, setForm] = useState({
    date: new Date(),
    coments: '',
    earring: '',
    earringId: '',
    key: '',
  })

  useEffect(() => {
    getCows().then((res) => setEarrings(res))
  }, [])

  useEffect(() => {
    if (earringId) {
      const earringNo = earrings?.find((cow) => cow.id === earringId)?.earring
      setForm({ ...form, earringId, earring: earringNo })
    }
  }, [earringId, earrings])

  useEffect(() => {
    if (event) {
      setForm({ ...event })
    }
  }, [event])

  const [variants, setVariants] = useState(null)
  useEffect(() => {
    const variants = EVENTS.find(({ key }) => key === form.key)?.variants
    if (variants) {
      setVariants(variants)
    } else {
      setVariants(null)
    }
  }, [form.key])

  const handleSelectCow = (e) => {
    const earringNo = earrings?.find((cow) => cow.id === e.target.value)
      ?.earring
    setForm({ ...form, earring: earringNo, earringId: e.target.value })
  }

  const handleChangeDate = (e) => {
    console.log(e.target.value)
    setForm({ ...form, date: e.target.value })
  }

  const handleChange = (e) => {
    setLabelButton('Guardar')
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

  const valid = !form.earring || !form.key || labelButton === 'Guardado'

  /*  const eventsAvailable = formatedTypes()?.sort((a, b) => {
    if (a.label > b.label) return 1
    if (a.label < b.label) return -1
    return 0
  }) */

  /*  const regularEvents = eventsAvailable.filter(
    (event) => event.category === 'regular'
    )
    const specialsEvents = eventsAvailable.filter(
      (event) => event.category === 'special'
      )
      const adminEvents = eventsAvailable.filter(
        (event) => event.category === 'admin'
        )
        
        */
  /* const eventVariants = EVENTS.find((event) => event.type === form.key)
    

    console.log('eventVariants', eventVariants)
     */

  console.log('variants', variants)
  console.log('form', form)

  if (earrings?.length === 0) return 'No hay vacas registradas aun...'
  const foramtedDate = formatInputDate(form?.date)

  return (
    <div>
      <H2>{title}</H2>
      <div>
        <form
        className={styles.form}
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
                  value={form?.key || ''}
                  name="key"
                  id="select-animal"
                  placeholder="Selecciona una vaca"
                >
                  <option value="" disabled>
                    {`Selecciona Evento`}
                  </option>
                  <optgroup label="Periodicos">
                    {EVENTS?.map((event, i) => (
                      <option key={event.key} value={event.key}>
                        {event.label}
                      </option>
                    ))}
                  </optgroup>
                  {/*  <optgroup label="Especiales">
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
                  </optgroup> */}
                </select>
              </span>
            </div>
            {variants?.length > 0 && (
              <div className={styles.event_form__input}>
                <span>
                  <select
                    className={styles.select}
                    onChange={handleChange}
                    name="variant"
                    id="select-event-option"
                    value={form?.variant || ''}
                  >
                    <option value="" disabled>
                      {`Variante`}
                    </option>
                    {variants?.map((variant, i) => (
                      <option key={i} value={variant.key}>
                        {variant.label}
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
                  value={foramtedDate}
                />
              </span>
            </div>
            <div className={styles.event_form__input}>
              <Button primary p="2" my="2" disabled={valid}>
                {labelButton}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
