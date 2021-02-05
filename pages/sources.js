import Layout from '@cmps/Layout'
import Recurso from '@cmps/Recurso/Recurso'
import ResourcesGrid from '@cmps/ResourcesGrid/ResourcesGrid'
import React from 'react'

export default function Sources() {
  return (
    <div>
      <div className="box-2">
        <h4>Recursos</h4>
      </div>
      <div>
        <ResourcesGrid />
      </div>
    </div>
  )
}

Sources.Layout = Layout
