import DashboardCowsLayout from '@cmps/DashboardCowsLayout/DashboardCowsLayout'
import NewEvent from '@cmps/NewEvent'


export default function newEvent() {
  
  return (
    <>
      <NewEvent />
    </>
  )
}

newEvent.SecondaryLayout = DashboardCowsLayout
