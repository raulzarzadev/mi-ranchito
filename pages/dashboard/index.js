import CowsDasboard from '@raiz/src/layouts/DashboardCowsLayout'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import DashboardSheepsLayout from '@raiz/src/layouts/DashboardSheepsLayout/DashboardSheepsLayout'

export default function PrivateDashboard() {
  return (
    <PrivateRoute
      Component={CowsDasboard}
      SecondaryLayout={DashboardSheepsLayout}
    />
  )
}
