import { getCow } from '@raiz/firebaseClient'
import useCows from '@raiz/src/hooks/useCows'
import { useRecords } from '@raiz/src/hooks/useRecords'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { getToday } from '../../utils'
import styles from './styles.module.css'

export default function NewRecord({ earring, record = null }) {
  const router = useRouter()
  const { getCows } = useCows()
  const { addRecord, editRecord } = useRecords()
  const earringNo = router?.query?.earring
  const earringId = router.query?.earringId
  const [earrings, setEarrings] = useState()
  // TODO funcion getCows
  useEffect(() => {
    getCows().then((res) => setEarrings(res))
  }, [])
  console.log(router.query)

  const [form, setForm] = useState({
    date: getToday(),
    coments: '',
    earring: earringNo || '',
    earringId,
    record: '',
  })

  earrings.sort((a, b) => {
    if (a.earring > b.earring) return 1
    if (a.earring < b.earring) return -1
    return 0
  })
  // console.log(earrings)

  const recordsAvaiblable = [
    {
      type: 'milk',
      label: 'Leche',
    },
    {
      type: 'sick',
      label: 'Enfermedad',
    },
  ]

  useEffect(() => {
    if (record) {
      setForm(record)
    }
  }, [record])

  const handleChange = (e) => {
    setLabelButton('Guardar Registro')
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = () => {
    record?.id ? editRecord(record?.Recordsid, form) : addRecord(form)
    setLabelButton('Guardado')
    setForm({ ...form, record: '', earring: '', coments: '' })
    setTimeout(() => {
      router.back()
    }, 300)
  }
  const [labelButton, setLabelButton] = useState('Guardar Registro')

  const valid = !form.earring || !form.record || labelButton === 'Guardado'

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
                  Registro:{' '}
                  <select
                    style={{ width: 150 }}
                    onChange={handleChange}
                    value={form?.record || ''}
                    name="record"
                    id="select-animal"
                    placeholder="Selecciona una vaca"
                  >
                    <option value="" disabled>
                      Registro
                    </option>
                    {recordsAvaiblable.map((record, i) => (
                      <option key={i} value={record.type}>
                        {record.label}
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
                    id="record-date"
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
