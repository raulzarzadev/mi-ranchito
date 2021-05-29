import ConfigurationView from '@cmps/views/ConfigurationView/ConfigurationView'
import DashboardCowsLayout from '@raiz/src/layouts/DashboardCowsLayout/DashboardCowsLayout'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'

export default function Private() {
  return (
    <PrivateRoute
      Component={ConfigurationView}
      SecondaryLayout={DashboardCowsLayout}
    />
  )
}
