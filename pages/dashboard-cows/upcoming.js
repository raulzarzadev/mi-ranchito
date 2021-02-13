import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import UpcomingEvents from '@cmps/UpcomingEvents'
import useEvents from '@raiz/src/hooks/useEvents'

export default function upcoming() {
  const { events } = useEvents()
  return (
    <>
      <UpcomingEvents events={events}   />
    </>
  )
}

upcoming.SecondaryLayout = DashboardCowsLayout
