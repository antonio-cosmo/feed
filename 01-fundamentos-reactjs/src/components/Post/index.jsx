import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'
import { useState } from 'react';
import { Avatar } from '../Avatar'
import { Comment } from '../Comment'
import styles from './styles.module.css'

export const Post = ({author, content, publishedAt}) => {

  // const publishedAtFormat = new Intl.DateTimeFormat('pt-BR',{
  //   day: '2-digit',
  //   month: 'long',
  //   hour: '2-digit',
  //   minute: '2-digit'
  // }).format(publishedAt)

  const publishedDateFormat = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt,{
    locale: ptBR,
    addSuffix: true
  });

  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')

  const handleComments = (event) => {
    event.preventDefault()
    setComments([...comments, newComment])
    setNewComment('')
  };

  const handleNewCommentChange = (event) => {
    event.target.setCustomValidity('');
    setNewComment(event.target.value)
  };

  const handleNewCommentInvalid = (e) => {
    e.target.setCustomValidity('Esse campo é obrigatorio');
  }

  const deleteComment = (commentDelete) => {
    const commentWithoutDelete = comments.filter(comment => {
      return comment !== commentDelete
    });

    setComments(commentWithoutDelete)
  };

  

  const isNewCommentEmpty = newComment.length === 0
  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo} >
            <strong>
              {author.name}
            </strong>
            <span>
              {author.role}
            </span>
          </div>
        </div>

        <time title={publishedDateFormat} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>
      
      <div className={styles.content}>
        {content.map(line => {
          if(line.type == 'paragraph'){
            return <p key={line.content}>{line.content}</p>
          }else if(line.type == 'link'){
            return <p key={line.content}><a href="#">{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleComments} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          placeholder='Deixe um comentario'
          value={newComment}
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button type='submit' disabled={isNewCommentEmpty}>Comentar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return <Comment key={comment} content={comment} onDeleteComment={deleteComment}/>
        })}
      </div>
    </article>
  )
}