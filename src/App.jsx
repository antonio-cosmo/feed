import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Post } from './components/Post'
import './global.css';
import styles from './App.module.css'

const user = {
  id: 1,
  avatarUrl: 'https://github.com/antonio-cosmo.png',
  name: 'Antônio Cosmo',
  role: 'Web Developer'
}
const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/antonio-cosmo.png',
      name: 'Antonio Cosmo',
      role: 'Web Developer'
    },
    content: [
      { type: 'paragraph', content: 'Fala galeraa 👋' },
      { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifolio. Visite meu github e veja o que venho fazendo e estudando 🚀' },
      { type: 'link', content: 'https://github.com/antonio-cosmo' }
    ],
    publishedAt: new Date('2022-06-16 14:00:00')
  }
]

export function App() {

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar user={user} />
        <main>
          {posts.map(post => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            )
          })}
        </main>
      </div>
    </>
  )
}

