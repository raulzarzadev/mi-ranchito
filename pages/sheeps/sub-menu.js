import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import DashboardSheepsLayout from '@raiz/src/layouts/DashboardSheepsLayout/DashboardSheepsLayout'
import SubMenuNew from '@raiz/src/layouts/DashboardSheepsLayout/SubMenuNew'

export default function Private() {
  return (
    <PrivateRoute
      Component={SubMenuNew}
      SecondaryLayout={DashboardSheepsLayout}
      cattleType="sheeps"
    />
  )
}

