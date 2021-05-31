import s from './styles.module.css'

export default function Switch({ label, disabled, id='check-box' , name = 'switch', onChange }) {
  return (
    <div className={s.switch_content}>
      <label htmlFor={id} className={s.switch}>
        {label && <span className={s.label}>{label}</span>}
        <input
          onChange={onChange}
          id={id}
          type="checkbox"
          disabled={disabled}
          name={name}
        />
        <span className={s.slider} />
      </label>
    </div>
  )
}
