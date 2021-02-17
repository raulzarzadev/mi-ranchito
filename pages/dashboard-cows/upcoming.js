import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import UpcomingEvents from '@cmps/UpcomingEvents'

export default function upcoming() {
  
  return (
    <>
      <UpcomingEvents    />
    </>
  )
}

upcoming.SecondaryLayout = DashboardCowsLayout
