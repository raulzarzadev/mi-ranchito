import { H3 } from '@cmps/Texts/H'
import { L2, L } from '@cmps/Texts/L'
import ROUTES from '@raiz/constants/ROUTES'
import styles from './styles.module.css'

export default function SideNav({ links = [] }) {
  return (
    <div className={styles.side_navigation}>
      <div className={`${styles.common} ${styles.side_logo}`}>
        <L href={`${ROUTES.home}`}>
          <img
            src="/assets/Logo.svg"
            alt="hola"
            className={styles.image_logo}
          />
        </L>
      </div>
      <div className={`${styles.common} ${styles.side_links}`}>
        <SectionLinks links={links} title="- Panel -" category="main" />
        <SectionLinks links={links} category="cattle" />
        <SectionLinks links={links} category="events" />
        <SectionLinks links={links} category="records" />
      </div>
      <div className={`${styles.common} ${styles.side_options}`}>Opciones</div>
    </div>
  )
}

function SectionLinks({ links = [], category, title }) {
  const filteredLinks = links.filter((link) => link.cat === category)
  return (
    <div className={styles.link_section}>
      <H3>{title}</H3>
      {filteredLinks.map((link, i) => (
        <div key={i}>
          <L2 href={link.href}>{link.label}</L2>
        </div>
      ))}
    </div>
  )
}
