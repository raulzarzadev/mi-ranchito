import { Btn1 } from '@cmps/Btns'
import { H2 } from '@cmps/H'
import NumbersInput from '@cmps/NumbersInput/NumbersInput'
import useCows from '@raiz/src/hooks/useCows'
import { useRecords } from '@raiz/src/hooks/useRecords'
import { IconMilk } from '@raiz/src/Icons/IconMilk'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { formatedTypes, formatInputDate } from '../../utils'
import styles from './styles.module.css'

export default function NewRecord({ record = null }) {
  const router = useRouter()
  const { getCows } = useCows()
  const { addRecord, editRecord } = useRecords()
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
    type: 'milk',
  })

  useEffect(() => {
    setForm({ ...form, earringId, earring: earringNo })
  }, [earringId])

  useEffect(() => {
    if (record) {
      setForm(record)
    }
  }, [record])

  const [labelButton, setLabelButton] = useState('Guardar')

  const handleSelectCow = (e) => {
    const earringNo = earrings.find((cow) => cow.id === e.target.value)?.earring
    setForm({ ...form, earring: earringNo, earringId: e.target.value })
  }

  const handleChangeDate = (e) => {
    const date = new Date(e.target.value).toISOString()
    setForm({ ...form, date })
  }

  const handleChange = (e) => {
    setLabelButton('Guardar')
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    record?.id ? editRecord(record?.id, form) : addRecord(form)
    setLabelButton('Guardado')
    setForm({ ...form, earring: '', coments: '' })
    /*  setTimeout(() => {
      router.back()
    }, 300) */
  }

  const valid = !form.earring || !form.type || labelButton === 'Guardado'

  const eventsAvaiblable = formatedTypes()?.sort((a, b) => {
    if (a.label > b.label) return 1
    if (a.label < b.label) return -1
    return 0
  })

  const [keysOpened, setkeysOpened] = useState(false)
  const handleOpenKeyBoard = () => {
    setkeysOpened(!keysOpened)
  }

  return (
    <div>
      <div className="box-1">
        <H2>{`Nuevo Registro`}</H2>
      </div>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <div>
            <div
              style={{
                width: '50px',
                height: '50px',
                border: '1px solid',
                display: 'flex',
                margin: '0 auto',
                position: 'relative',
                paddingBottom: '15px',
                justifyContent: 'center',
                borderRadius: '4px',
              }}
            >
              <IconMilk />
              <span style={{ position: 'absolute', bottom: '0' }}>Leche</span>
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
            <div>
              <div className={styles.event_form__input}>
                {console.log(keysOpened.toString())}
                <div
                  name="liters"
                  onClick={handleOpenKeyBoard}
                  opened={keysOpened.toString()}
                  className={`${styles?.textarea} 
                    ${styles.liters}`}
                >
                  {form?.liters || 'Litros'}
                </div>
              </div>
              {keysOpened && (
                <NumbersInput
                  value={form.liters}
                  setValue={(num) => setForm({ ...form, liters: num })}
                  hideDisplay
                />
              )}
            </div>
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
                  placeholder="Observaciones"
                ></textarea>
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
