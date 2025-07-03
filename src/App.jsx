//CSS
import styles from './App.module.css'

//COMPONENTS
import StartScreen from './components/StartScreen'
import Game from './components/Game/Game'
import GameOver from './components/GameOver/GameOver'

//REACT
import { use, useCallback, useEffect, useState } from 'react'

//DATA
import { wordsList } from "./data/words"


const stage = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
]


function App() {
  const [gameStage, setGameStage] = useState(stage[0].name)
  const [words] = useState(wordsList)

  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')
  const [letters, setLetters] = useState('')

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(0)




  const pickWordAndCategory = useCallback(() => {
    //pick a random category
    const categories = Object.keys(words)//metodo que retorna todas as chaves dos objetos

    //cria um array de valores
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)]

    //pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)]


    return { word, category }
  }, [words])






  //starts the secret word game
  const startgame = useCallback(() => {
    //clear all letters
    clearLetterStates()

    //pick word and pick category   
    const { word, category } = pickWordAndCategory()

    //create a array of letters
    let wordLetters = word.split('')
    wordLetters = wordLetters.map((l) => l.toLowerCase())
    console.log(wordLetters)

    //fill states
    setPickedCategory(category)
    setPickedWord(word)
    setLetters(wordLetters)


    setGameStage(stage[1].name)

  }, [pickWordAndCategory])





  // process the letter input
  const verifyLetter = (letter) => {
    const normalizeLetter = letter.toLowerCase()

    //check if letter has already been utilized

    if (
      guessedLetters.includes(normalizeLetter) ||
      wrongLetters.includes(normalizeLetter)
    ) {
      return
    }

    //push guessed letter or remove a guess

    if (
      letters.includes(normalizeLetter)
    ) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters, normalizeLetter
      ]
      )
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizeLetter
      ])
      setGuesses((actualGuesses) => actualGuesses - 1)
    }

  }





  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }






  useEffect(() => {

    if (guesses <= 0) {
      //reset all states
      clearLetterStates()
      setGameStage(stage[2].name)



    }
  }, [guesses])






  //check win condition

  useEffect(() => {

    const uniqueLetters = [...new Set(letters)]

    //win condition
    if (guessedLetters.length === uniqueLetters.length) {
      //add score
      setScore((actualScore) => (actualScore += 100))

      //restart game with new word
      startgame()
    }



  }, [guessedLetters, letters, startgame])





  //restarts the game
  const retry = () => {
    setScore(0)
    setGuesses(3)

    setGameStage(stage[0].name)
  }




  
  return (
    <div className={styles.App}>
      {gameStage === "start" && <StartScreen startGame={startgame} />}
      {gameStage === "game" &&
        <Game
          verifyLetter={verifyLetter}
          pickedCategory={pickedCategory}
          pickedWord={pickedWord}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      }
      {gameStage === "end" && <GameOver
        retry={retry}
        score={score}
      />}
    </div>
  )
}

export default App
