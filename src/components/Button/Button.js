import s from './styles.module.css'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import BackspaceIcon from '@material-ui/icons/Backspace'
import EditIcon from '@material-ui/icons/Edit'
import Link from 'next/link'

export default function Button({
  Component,
  underline,
  active,
  children,
  outlined,
  primary,
  secondary,
  link,
  href,
  deleteIcon = false,
  editIcon = false,
  icon = false,
  nextLink = false,
  buttonBack = false,
  ...rest
}) {
  const WrapperButton = (props) =>
    Component ? (
      <Component {...props} />
    ) : nextLink ? (
      <Link href={href}>
        <button {...props} />
      </Link>
    ) : (
      <button {...props} />
    )

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
      {buttonBack && <BackspaceIcon />}
      {deleteIcon && <DeleteForeverIcon />}
      {editIcon && <EditIcon />}
      {children}
      {underline && <div className={s.selected} />}
    </WrapperButton>
  )
}
