import Calendar from '@cmps/Calendar/Calendar'
import ResourcesGrid from '@cmps/ResourcesGrid/ResourcesGrid'
import React from 'react'

export default function SourcesView() {
  return (
    <div className="center">
      <div className="box-2">
        <h4>Calendario</h4>
        <Calendar />
        <div>
          <div className="box-2">
            <h4>Recursos</h4>
          </div>
          <ResourcesGrid />
        </div>
      </div>
    </div>
  )
}
