import { useRouter } from 'next/router'
import styles from './styles.module.css'

export default function BtnBack({  label = 'Regresar' }) {
  const router = useRouter()
  const handleClick = () => {
    router.back()
  }
  return (
    <>
      <button className={styles.btn_back} onClick={handleClick}>{label}</button>
    </>
  )
}
