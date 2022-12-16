import styles from './styles.module.css';
import igniteLogo from '../../assets/ignite-logo.svg'
 export const Header = () => {
  return (
    <header className={styles.header}>
      <img src={igniteLogo}/>
      <strong>Feed</strong>
    </header>
  )
}