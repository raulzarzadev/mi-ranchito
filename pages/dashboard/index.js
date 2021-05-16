import CowsDasboard from '@raiz/src/layouts/DashboardCowsLayout'
import DashboardCowsLayout from '@raiz/src/layouts/DashboardCowsLayout/DashboardCowsLayout'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'

export default function PrivateDashboard() {
  return (
    <PrivateRoute
      Component={CowsDasboard}
      SecondaryLayout={DashboardCowsLayout}
    />
  )
}
