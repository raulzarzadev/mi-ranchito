import Text from '@cmps/Inputs/Text'
import { formatDate } from '@raiz/src/utils/Dates'
import Button from '@cmps/Inputs/Button'
import styles from './styles.module.css'
import ROUTES from '@raiz/constants/ROUTES'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function FormEarring({ handleSubmit, earring }) {
  useEffect(() => {
    if (earring) {
      setForm(earring)
      setFormStatus('edit')
    }
  }, [earring])
  const [form, setForm] = useState({
    birth: new Date(),
    registryDate: new Date(),
  })
  const [formStatus, setFormStatus] = useState('new') // new | sending | edit | saved

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleChangeDate = async (e) => {
    const date = e.target.value
    setForm({ ...form, [e.target.name]: date })
  }

  const router = useRouter()
  const response = (id) => {
    setForm({ ...form, id })
    setFormStatus('saved')
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(form, response)
          form?.id && router.push(ROUTES.sheeps.details(form?.id))
          setFormStatus('saved')
        }}
        className={styles.form}
      >
        <div className={styles.item}>
          <Text
            label="Lote"
            placeholder="Lote No."
            name="batch"
            value={form?.batch || ''}
            onChange={handleChange}
            autoComplete="off"
            autoFocus
          />
          <Text
            label="Arete"
            placeholder="Numero de arete"
            name="earring"
            value={form?.earring || ''}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className={styles.item}>
          <Text
            label="Nombre"
            value={form?.name || ''}
            placeholder="(opcional)"
            name="name"
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div className={styles.item}>
          <Text
            label="Registro"
            type="date"
            name="registryDate"
            value={formatDate(form.registryDate)}
            onChange={handleChangeDate}
          />
        </div>
        <div className={styles.item}>
          <Text
            label="Nacimiento"
            type="date"
            name="birth"
            value={formatDate(form.birth)}
            onChange={handleChangeDate}
          />
        </div>
        {formStatus === 'edit' && (
          <div className={styles.actions}>
            <div className={styles.item}>
              <Button disabled={!form?.earring} p="2" primary>
                Editar
              </Button>
            </div>
          </div>
        )}
        {formStatus === 'new' && (
          <div className={styles.actions}>
            <div className={styles.item}>
              <Button disabled={formStatus === 'valid'} p="2" primary>
                Guardar
              </Button>
            </div>
          </div>
        )}
        {formStatus === 'saved' && (
          <div className={styles.actions}>
            <div className={styles.item}>
              <Button
                p="2"
                primary
                nextLink
                href={router.route.replace('new', form?.id)}
              >
                Ver
              </Button>
            </div>
            {/* <div className={styles.item}>
              <Button
                p="2"
                primary
                nextLink
                href={`${ROUTES.newSheep}`}
              >
                Nuevo
              </Button>
            </div> */}
          </div>
        )}
      </form>
    </div>
  )
}
