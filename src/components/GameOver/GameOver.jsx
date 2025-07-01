import style from './GameOver.module.css'

const GameOver = ({retry}) => {
  return (
            <button onClick={retry}>Resetar Jogo</button>

  )
}

export default GameOver