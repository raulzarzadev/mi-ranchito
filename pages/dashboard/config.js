import ConfigurationView from '@cmps/views/ConfigurationView/ConfigurationView'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'
import DashboardSheepsLayout from '@raiz/src/layouts/DashboardSheepsLayout/DashboardSheepsLayout'

export default function Private() {
  return (
    <PrivateRoute
      Component={ConfigurationView}
      SecondaryLayout={DashboardSheepsLayout}
    />
  )
}
