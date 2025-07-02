import styles from './Game.module.css'



const Game = ({ verifyLetter, pickedCategory, pickedWord, letters, guessedLetters, wrongLetters, guesses, score }) => {
  return (

    <div className={styles.game}>
      <p className={styles.points}><span>Pontuação: {score}</span></p>

      <h1>Adivinhe a Palavra</h1>

      <h3 className={styles.tip}>
        Dica sobre a Palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativas</p>

      <div className={styles.wordContainer}>
        {
          letters.map((letter, i) =>
            guessedLetters.includes(letter) ? (
              <span key={i} className={styles.letter}>
                {letter}
              </span>
            ) : (
              <span key={i} className={styles.blankSquare}></span>
            )
          )
        }





      </div>

      <div className={styles.letterContainer}>
        <p>Tente adivinhar uma letra da palavra</p>
        <input type="text" name='letter' maxLength='1' required />
        <button>Jogar</button>
      </div>

      <div className={styles.wrongLetterContainer}>
        <p>letras Já utilizadas</p>
        {
          wrongLetters.map((letter,i)=>(
            <span key={i}>{letter}</span>
          ))
        }
        
      </div>

    </div>


  )
}

export default Game