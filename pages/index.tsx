import type { NextPage } from 'next'
import Layout from '../components/Layout'
import Card from '../components/Card'
import styles from '../styles/Home.module.css'

const cards = [
  {
    href: 'https://nextjs.org/docs',
    title: 'Documentation',
    description: 'Find in-depth information about Next.js features and API.',
  },
  {
    href: 'https://nextjs.org/learn',
    title: 'Learn',
    description: 'Learn about Next.js in an interactive course with quizzes!',
  },
  {
    href: 'https://github.com/vercel/next.js/tree/canary/examples',
    title: 'Examples',
    description: 'Discover and deploy boilerplate example Next.js projects.',
  },
  {
    href: 'https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app',
    title: 'Deploy',
    description:
      'Instantly deploy your Next.js site to a public URL with Vercel.',
  },
]

const Home: NextPage = () => {
  return (
    <Layout>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <p className={styles.description}>
        Get started by editing{' '}
        <code className={styles.code}>pages/index.tsx</code>
      </p>

      <div className={styles.grid}>
        {cards.map((card) => (
          <Card key={card.href} {...card} />
        ))}
      </div>
    </Layout>
  )
}

export default Home
