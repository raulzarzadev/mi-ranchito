import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import useCows from '@raiz/src/hooks/useCows'
import { formatInputDate, fromNow } from '@raiz/src/utils'
import { H2 } from '@cmps/H'
import { Btn1 } from '@cmps/Btns'
import ROUTES from '@raiz/constants/ROUTES'

export default function NewEarring({ cow = undefined, title = '' }) {
  const { addCow, getCows, editCow } = useCows()

  useEffect(() => {
    if (cow) {
      setForm({
        earring: cow.earring,
        name: cow?.name || null,
        registryDate: cow.registryDate,
      })
      setActions('edit')
    }
  }, [cow])

  console.log(cow)

  const [form, setForm] = useState({})
  const [earrings, setEarrings] = useState()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    getCows().then((res) => setEarrings(res))
  }, [])

  const alreadyExist = earrings?.find(
    (earring) => earring.earring === form.earring
  )
  const [actions, setActions] = useState('new')

  const handleSubmit = () => {
    if (cow) {
      editCow(cow.id, form).then((res) => setActions('saved'))
    } else {
      addCow(form).then((res) => {
        setActions('saved')
        setForm({ id: res?.id })
      })
    }
  }

  const handleChangeDate = (e) => {
    const registryDate = new Date(e.target.value || form.date).toISOString()
    setForm({ ...form, registryDate })
  }

  const valid = !!alreadyExist || !form?.earring

  return (
    <div className="center">
      <div>
        <div className="box-1">
          <H2>{title}</H2>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <div>
            <div className={styles.item}>
              <span className={styles.input_label}>
                {`Identificador* :`}
                <input
                  className={styles.text_input}
                  type="text"
                  placeholder="Numero de arete"
                  name="earring"
                  value={form?.earring || ''}
                  onChange={handleChange}
                  autoFocus
                  autoComplete="off"
                ></input>
                <em>{alreadyExist && 'Este arete ya está registrado'}</em>
              </span>
            </div>
            <div className={styles.item}>
              <span className={styles.input_label}>
                {`Nombre :`}
                <input
                  className={styles.text_input}
                  value={form?.name || ''}
                  type="text"
                  placeholder="(opcional)"
                  name="name"
                  onChange={handleChange}
                  autoComplete="off"
                ></input>
              </span>
            </div>
            <div className={styles.item}>
              <span className={styles.input_label}>
                <span>
                  {`Ingreso :`} <em>(opcional)</em>
                </span>
                <input
                  className={styles.date}
                  type="date"
                  name="registryDate"
                  value={formatInputDate(form.registryDate)}
                  onChange={handleChangeDate}
                ></input>
              </span>
            </div>
            {actions === 'edit' && (
              <div className={styles.actions}>
                <div className={styles.item}>
                  <Btn1>Editar</Btn1>
                </div>
              </div>
            )}
            {actions === 'new' && (
              <div className={styles.actions}>
                <div className={styles.item}>
                  <Btn1 disabled={valid}>Guardar</Btn1>
                </div>
              </div>
            )}
            {actions === 'saved' && (
              <div className={styles.actions}>
                <div className={styles.item}>
                  <Btn1 href={`${ROUTES.newEvent}?cowId=${form?.id}`}>
                    Nuevo evento
                  </Btn1>
                </div>
                <div className={styles.item}>
                  <Btn1
                    href={`${ROUTES.newCow}`}
                    onClick={() => setActions('new')}
                  >
                    Nuevo Vaca
                  </Btn1>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
