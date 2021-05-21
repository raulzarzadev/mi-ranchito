import { useRouter } from 'next/router'
import s from './styles.module.css'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
export default function ButtonBack() {
  const router = useRouter()
  return (
    <div className={s.buttonback_container}>
      <button className={s.buttonback} onClick={() => router.back()}>
        <ArrowBackIosIcon />
        {`Regresar`}
      </button>
    </div>
  )
}
