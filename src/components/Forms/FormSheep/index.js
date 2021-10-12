import { H2 } from '@cmps/Texts/H'

import { useEffect, useState } from 'react'

import { create_sheeps, edit_sheep } from '@raiz/firebase/sheeps'
import { useAuth } from '@raiz/src/context/AuthContext'
import FormEarring from '../FormEarring'

export default function FormSheep({ sheep = undefined, title = '' }) {
  const { user } = useAuth()

  const [earrings, setEarrings] = useState()

  const handleSubmit = async (form, response) => {
    if (form?.id) {
      edit_sheep(form.id, form)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => console.log('err', err))
    } else {
      create_sheeps(user.id, form)
        .then(({ res }) => {
          response(res.id)
        })
        .catch((err) => console.log('err', err))
    }
  }

  return (
    <div>
      <H2>{title}</H2>
      <FormEarring earring={sheep} handleSubmit={handleSubmit} />
    </div>
  )
}
