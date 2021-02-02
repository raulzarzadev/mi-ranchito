import Link from 'next/link'
import React, { useState } from 'react'
import styles from './styles.module.css'
export default function LoginForm({ handleSubmit, isLoginPage }) {
  const [form, setForm] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const buttonDisabled =
    (form?.pass === form?.confirmPass && form?.pass?.length > 6) || !isLoginPage

  return (
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
              </div>
            </>
          )}

          <button type="submit" disabled={buttonDisabled}>
            Enviar{' '}
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
  )
}
