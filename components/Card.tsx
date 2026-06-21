import styles from '../styles/Home.module.css'

interface CardProps {
  href: string
  title: string
  description: string
}

const Card = ({ href, title, description }: CardProps) => {
  return (
    <a href={href} className={styles.card}>
      <h2>{title} &rarr;</h2>
      <p>{description}</p>
    </a>
  )
}

export default Card
