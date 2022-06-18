import { ThumbsUp, Trash } from 'phosphor-react';
import { Avatar } from '../Avatar';
import styles from './styles.module.css';

export const Comment = ({content}) => {
  return(
    <div className={styles.comment}>
      <Avatar hasBorder={false} src='https://avatars.githubusercontent.com/u/77928459?v=4' />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}> 
          <header>
            <div className={styles.authorAndTime}>
              <strong>Antônio Cosmo</strong>
              <time title='' dateTime=''>
                Postado há 1h
              </time>
            </div>

            <button title='Deletar comentario'>
              <Trash size={24}/>
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button>
            <ThumbsUp/>
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  );
}