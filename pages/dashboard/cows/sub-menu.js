import SubMenuNew from '@cmps/Forms/SubMenuNew'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import DashboardSheepsLayout from '@raiz/src/layouts/DashboardSheepsLayout/DashboardSheepsLayout'

export default function Private() {
  return (
    <PrivateRoute
      Component={SubMenuNew}
      SecondaryLayout={DashboardSheepsLayout}
      wonType='cows'
    />
  )
}

