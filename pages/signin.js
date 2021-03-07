import SignForm from '@cmps/SignForm/SignForm'
import PublicRoute from '@raiz/src/HOCS/PublicRoute'

export default function Signin() {
  return <PublicRoute Component={SignForm} />
}
