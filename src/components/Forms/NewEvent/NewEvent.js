import Button from '@cmps/Inputs/Button'
import { H2 } from '@cmps/Texts/H'
import { EVENTS_TYPES_2 } from '@raiz/constants/EVENTS_INFO'
import useCows from '@raiz/src/hooks/useCows'
import useEvents from '@raiz/src/hooks/useEvents'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
// import { formatedTypes } from '../../utils'
import styles from './styles.module.css'
import Text from '@cmps/Inputs/Text'
import Select from '@cmps/Inputs/Text/Select'
import { formatInputDate } from '@raiz/src/utils/Dates'

export default function NewEvent({ title = '', event = null }) {
  const EVENTS = EVENTS_TYPES_2
  const router = useRouter()
  const {
    query: { date, cowId },
  } = router

  const { getCows } = useCows()
  const { addEvent, editEvent } = useEvents()

  const [labelButton, setLabelButton] = useState('Guardar')
  const [earrings, setEarrings] = useState(undefined)
  const [form, setForm] = useState({
    date: new Date(),
    coments: '',
    earringId: '',
    key: '',
  })

  useEffect(() => {
    getCows().then((res) => setEarrings(res))
  }, [])

  useEffect(() => {
    if (cowId) {
      const earringNo = earrings?.find((cow) => cow.id === cowId)?.earring
      setForm({ ...form, earringId: cowId, earring: earringNo })
    }
  }, [cowId, earrings])

  useEffect(() => {
    if (event) {
      setForm({ ...event })
    }
  }, [event])

  useEffect(() => {
    if (date) {
      setForm({ ...form, date })
    }
  }, [])

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
    /* const earringNo = earrings?.find((cow) => cow.id === e.target.value)
      ?.earring */
    setForm({ ...form, earringId: e.target.value })
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

  const valid = !form.earringId || !form.key || labelButton === 'Guardado'

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

  console.log('earrings', earrings)

  if (earrings?.length === 0) return 'No hay vacas registradas aun...'

  return (
    <div>
      <H2>{title}</H2>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <div>
            <div className={styles.event_form__input}>
              <Select
                value={form?.earringId}
                name="earringId"
                label="Arete"
                onChange={handleSelectCow}
              >
                <option value="" disabled>
                  {`Selecciona Arete`}
                </option>
                {earrings?.map((earring, i) => (
                  <option key={i} value={earring.id}>
                    {earring.earring} {earring?.name}
                  </option>
                ))}
              </Select>
              {/*  <span>
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
              </span> */}
            </div>
            <div className={styles.event_form__input}>
              <Select
                label="Evento"
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
              </Select>
            </div>
            {variants?.length > 0 && (
              <div className={styles.event_form__input}>
                <Select
                  label="Variante"
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
                </Select>
              </div>
            )}
            <div className={styles.event_form__input}>
              <Text
                label="Detalles"
                rows={2}
                onChange={handleChange}
                name="coments"
                id="observaciones"
                value={form?.coments || ''}
                placeholder="Detalles"
              />
            </div>
            <div className={styles.event_form__input}>
              <Text
                label="Fecha"
                type="date"
                name="date"
                id="event-date"
                value={formatInputDate(form?.date)}
                onChange={handleChangeDate}
              />
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
