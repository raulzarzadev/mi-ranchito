import DashboardCowsLayout from '@raiz/src/layouts/DashboardCowsLayout/DashboardCowsLayout'
import SubMenuNew from '@cmps/Forms/SubMenuNew'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'

export default function Private() {
  return (
    <PrivateRoute
      Component={SubMenuNew}
      SecondaryLayout={DashboardCowsLayout}
    />
  )
}
