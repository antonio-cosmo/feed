
import { PencilLine } from 'phosphor-react';
import { Avatar } from '../Avatar';
import styles from './styles.module.css';


export const Sidebar = ({ user }) => {
  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src='https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZGV2ZWxvcG1lbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=500'
      />

      <div className={styles.profile}>
        <Avatar src={user.avatarUrl} />
        <strong>{user.name}</strong>
        <span>{user.role}</span>
      </div>

      <footer>
        <a href="#">
          <PencilLine size={20} />
          Editar seu perfil
        </a>
      </footer>

    </aside>
  )
}