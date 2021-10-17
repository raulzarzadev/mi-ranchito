import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import DashboardSheepsLayout from '@raiz/src/layouts/DashboardSheepsLayout/DashboardSheepsLayout'
import SheepsDasboard from '@raiz/src/layouts/DashboardSheepsLayout'

export default function PrivateDashboard() {
  return (
    <PrivateRoute
      Component={SheepsDasboard}
      SecondaryLayout={DashboardSheepsLayout}
    />
  )
}
