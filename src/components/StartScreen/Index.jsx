import styles from './StartScreen.module.css'

const StartScreen = ({startGame}) => {





  return (
    <div className={styles.start}>
        <h1>SecretWord</h1>
        <p>Clique no botão abaixo para começar a jogar</p>
        <button onClick={startGame}>Começar o jogo</button>
    </div>
  )
}

export default StartScreen