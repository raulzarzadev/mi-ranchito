import Recurso from '@cmps/views/Recurso/Recurso'
import SOURCES from '@raiz/constants/SOURCES'
import React from 'react'
import styles from './styles.module.css'

const resources = SOURCES

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
