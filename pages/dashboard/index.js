import CowsDasboard from '@cmps/DashboardCowsLayout'
import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'

export default function PrivateDashboard() {
  return (
    <PrivateRoute
      Component={CowsDasboard}
      SecondaryLayout={DashboardCowsLayout}
    />
  )
}
