import Recurso from '@cmps/Recurso/Recurso'
import { RESOURCES } from '@raiz/HARD_DATA-COPY'
import React from 'react'
import styles from './styles.module.css'

const resources = RESOURCES

export default function ResourcesGrid() {
  return (
    <div className={styles.resources_grig}>
      {resources.map((resource, i) => (
        <Recurso
          key={i}
          src={resource.src}
          image={resource.image}
          title={resource.title}
          fileName={resource.fileName}
        />
      ))}
    </div>
  )
}
