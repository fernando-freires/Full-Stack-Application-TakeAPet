import styles from './Container.module.css'

// Container to use in App to define the usable area between navbar and footer
function Container({children}) {
    return (
      <main className={styles.container}>
          {children}
      </main>
    )
  }
  
export default Container
  