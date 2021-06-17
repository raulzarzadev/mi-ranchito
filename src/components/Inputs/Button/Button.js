import s from './styles.module.css'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import BackspaceIcon from '@material-ui/icons/Backspace'
import EditIcon from '@material-ui/icons/Edit'
import Link from 'next/link'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
export default function Button({
  Component,
  children,
  href,
  nextLink = false,

  // form
  outlined,
  fullwidth,
  deleteIcon = false,
  editIcon = false,
  addNew = false,
  icon = false,
  link,

  // color filled
  danger,
  success,
  primary,
  secondary = false,

  // decorations
  active,
  disabled,
  underline,
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
      disabled={disabled}
      fullwidth={fullwidth && 'true'}
      icon={icon ? 'true' : undefined}
      underline={underline && 'true'}
      outlined={outlined && 'true'}
      danger={danger && 'true'}
      success={success && 'true'}
      primary={primary && 'true'}
      secondary={secondary ? 'true' : 'false'}
      link={link && 'true'}
      className={s.button}
      {...rest}
    >
      {addNew && <AddCircleOutlineIcon />}
      {deleteIcon && <DeleteForeverIcon />}
      {editIcon && <EditIcon />}
      {children}
      {underline && <div className={s.selected} />}
    </WrapperButton>
  )
}
