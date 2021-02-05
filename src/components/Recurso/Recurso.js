import React from 'react'
import styles from './styles.module.css'

export default function Recurso({ src, fileName, title, image }) {
  return (
    <div className={styles.resource}>
      <div className={styles.resource_text}>
        <h4>{title}</h4>
      </div>
      <img className={styles.resource_media} src={image} alt={title} />
      <div className={styles.resource_text}>
        <div className={styles.resource_link}>
          <a className="a" href={src} download={fileName}>
            Descarga este libro gratis
          </a>
        </div>
      </div>
    </div>
  )
}
