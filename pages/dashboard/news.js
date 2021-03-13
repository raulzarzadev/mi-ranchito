import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import SubMenuNew from '@cmps/SubMenuNew'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'

export default function Private() {
  return (
    <PrivateRoute
      Component={SubMenuNew}
      SecondaryLayout={DashboardCowsLayout}
    />
  )
}

