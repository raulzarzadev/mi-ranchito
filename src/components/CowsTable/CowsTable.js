import Button from '@cmps/Button'
import { useEffect, useState } from 'react'
import s from './styles.module.css'
export default function CowsTable({ title = 'Table title', cows = [] }) {
  return (
    <div className={s.grid}>
      <Button>Hola</Button>
      <div className={s.grid_titles}>
        <div className={s.title}>Vaca</div>
        <div className={s.title}>Status</div>
        <div className={s.title}>Proximo</div>
      </div>
      {cows.map((cow) => (
        <Row key={cow.id} cow={cow} />
      ))}
    </div>
  )
}

const Row = ({ cow }) => {
  console.log('cow', cow)
  const [statuses, setStatuses]=useState()
  useEffect(()=> {
    cow.statuses().then(setStatuses)
  },[])
 /*  const statuses = [
    {
      key: 'PREGN',
      label: 'Preñada',
    },
    {
      key: 'LACT',
      label: 'Lactante',
    },
  ] */

  const nextEvent = {
    key: 'BIRTH',
    label: 'Parto',
    date: new Date().getTime(),
  }
  console.log('statuses', statuses)
  
  return (
    <div 
    className={s.grid_row} 
    onClick={() => console.log('details')}
    >
      <div>
        <div>{`${cow.earring}`}</div>
        <em>{cow.name || ' - '}</em>
      </div>
      <div>
        {statuses?.map((status, i) => (
          <div key={i}>
            <em>{status?.label}</em>
          </div>
        ))}
      </div>
      <div>
        <div>{nextEvent.label}</div>
        <em>{nextEvent.date}</em>
      </div>
    </div>
  )
}
