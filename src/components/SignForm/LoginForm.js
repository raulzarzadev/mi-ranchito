import Link from 'next/link'
import React, { useState } from 'react'
import styles from './styles.module.css'
export default function LoginForm({ handleSubmit, isLoginPage = false }) {
  const [form, setForm] = useState({
    email: '',
    pass: '',
    confirmPass: '',
  })

  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const minLength = 4
  const isEqual = isLoginPage || form.pass === form.confirmPass
  const isToShort = form.pass.length < minLength
  const bottonEnable = !isEqual || isToShort

  return (
    <div className={styles.login_page}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit(form)
        }}
      >
        <div className={styles.form}>
          <div className={styles.form_title}>
            <h4>{isLoginPage ? ' Ingresa' : 'Registrate'}</h4>
          </div>
          <div className={styles.form_input}>
            <input
              value={form?.email || ''}
              onChange={handleChange}
              placeholder={'Email'}
              name="email"
            />

            <div className={styles.form_input}>
              <input
                type={'password'}
                value={form?.pass || ''}
                onChange={handleChange}
                placeholder={'Password'}
                name="pass"
              />
              {isToShort && (
                <div>
                  <em>Contraseña debe tener al menos {minLength}</em>
                </div>
              )}
            </div>

            {!isLoginPage && (
              <>
                <div className={styles.form_input}>
                  <input
                    type={'password'}
                    value={form?.confirmPass || ''}
                    onChange={handleChange}
                    placeholder={'Confirm Password'}
                    name="confirmPass"
                  />
                  {!isEqual && (
                    <div>
                      <em>Contraseñas deben coincidir</em>
                    </div>
                  )}
                </div>
              </>
            )}

            <em>Estamos trabajando en esto</em>
            <button type="submit" disabled={bottonEnable} disabled>
              Enviar
            </button>


            <div className={styles.form_input}>
              <div className={styles.ligth_link}>
                {isLoginPage ? (
                  <Link href="/signup">Registrate</Link>
                ) : (
                  <Link href="/signin">Ingresa</Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
