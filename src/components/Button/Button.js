import s from './styles.module.css'

export default function Button({
  Component,
  underline,
  active,
  children,
  outlined,
  primary,
  secondary,
  link,
  icon,
  ...rest
}) {
  const WrapperButton = (props) =>
    Component ? <Component {...props} /> : <button {...props} />
    console.log('secondary', secondary)
    
  return (
    <WrapperButton
    icon={icon && 'true'}
      underline={underline && 'true'}
      outlined={outlined && 'true'}
      primary={primary && 'true'}
      secondary={secondary && 'true'}
      link={link && 'true'}
      className={s.button}
      {...rest}
    >
      {children}
      <div className={s.selected} />
    </WrapperButton>
  )
}
