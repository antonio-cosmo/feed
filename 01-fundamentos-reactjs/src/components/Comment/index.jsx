import { ThumbsUp, Trash } from 'phosphor-react';
import { useState } from 'react';
import { Avatar } from '../Avatar';
import styles from './styles.module.css';

export const Comment = ({content, onDeleteComment}) => {
  const [likeCount, setLikeCount] = useState(0)
  const handleDeleteComment = () => {
    onDeleteComment(content)
  }

  const handleLikeComment = () => {
    setLikeCount((count) => count + 1 )
  }
  
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

            <button title='Deletar comentario' onClick={handleDeleteComment}>
              <Trash size={24}/>
            </button>
          </header>
          <p>{content}</p>
        </div>
        <footer>
          <button onClick={handleLikeComment}>
            <ThumbsUp/>
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>
    </div>
  );
}