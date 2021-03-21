import ConfigurationView from '@cmps/ConfigurationView/ConfigurationView'
import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import PrivateRoute from '@raiz/src/HOCS/PrivateRoute'

export default function Private() {
  return (
    <PrivateRoute
      Component={ConfigurationView}
      SecondaryLayout={DashboardCowsLayout}
    />
  )
}
