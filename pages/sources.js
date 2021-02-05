import Layout from '@cmps/Layout'
import Recurso from '@cmps/Recurso/Recurso'
import React from 'react'

export default function Sources() {
  return (
    <div>
      <div className="box-2">
        <h4>Recursos</h4>
      </div>
      <div>
        <Recurso
          src="/files/agrobanco_peru/Alimentacion_ganado_bovino_2010.pdf"
          image="/files/agrobanco_peru/agro_banco_peru_2010.png"
          title=" Alimentacion de Ganado Bovino 2010"
          fileName="Alimentacion_ganado_bovino_2010."
        />
      </div>
    </div>
  )
}

Sources.Layout = Layout
