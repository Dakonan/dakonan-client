const NUM_HOLES = 6

const advance = index => ((index + 1) % (2 * NUM_HOLES + 2))

const noStones = board => player => {
  return board.slice(player * 6, player * 6 + 6).every(n => n === 0)
}

const emptyHomes = board => {
  return board.map((n, i) => ((i + 1) % 7 === 0 ? 0 : n))
}

const sum = (a, b) => a + b

const findWinner = board => {
  const totalPlayer1 = board[getHomeIndex(0)]
  const totalPlayer2 = board[getHomeIndex(1)]
  return totalPlayer1 > totalPlayer2 
    ? 'Player 1 wins!' 
    : totalPlayer2 > totalPlayer1
      ? 'Player 2 wins! '
      : 'Draw! '
}

const getHomeIndex = player => player * 7 + 6

const playerTotalInPlay = board => player => {
  return board.slice(player * 6, player * 6 + 6).reduce(sum)
}

const clearStones = board => {
  return board.map((n, i) => ((i + 1) % 7 === 0 ? n : 0))
}

const belongsTo = player => index => {
  return index > player * 6 && index <= player * 6 + 6 
}

const makeMove = moveIndex => ({ player, board, isOver }) => {

  const otherPlayer = 1 - player

  const playerHomeIndex = getHomeIndex(player)
  const otherPlayerHomeIndex = getHomeIndex(otherPlayer)

  let numStones = board[moveIndex]
  // remove the stones from the hole at moveIndex
  let newBoard = board.slice().map((n, i) => i === moveIndex ? 0 : n)
  // and advance the currIndex
  let currIndex = moveIndex

  // repeatedly advance the index and drop a stone
  while (numStones > 0) {
    currIndex = advance(currIndex)
    numStones = numStones - 1
    newBoard[currIndex] = newBoard[currIndex] + 1
  }

  // no stones left in player cups at players turn
    // bug fixing
    if (player === 1 && board.slice(player * 6 + 1, player * 6 + 7).reduce(sum) === 0) {
      console.log(player);
      console.log(board);
      console.log(board.slice(player * 6 + 1, player * 6 + 6).reduce(sum), 'hiha');
      return {
        player: otherPlayer,
        board,
        isOver: true,
        message: findWinner(board)
      }
    }

    if (player === 0 && board.slice(player * 6, player * 6 + 6).reduce(sum) === 0) {
      console.log(player);
      console.log(board);
      console.log(board.slice(player * 6 + 1, player * 6 + 6).reduce(sum), 'hiha');
      return {
        player: otherPlayer,
        board,
        isOver: true,
        message: findWinner(board)
      }
    }
  

  // no stones left
  if (noStones(newBoard)(player)) {
    // move stones to otherPlayer's pot
    const otherPlayerTotal = playerTotalInPlay(newBoard)(otherPlayer)
    newBoard[playerHomeIndex] = newBoard[playerHomeIndex] + otherPlayerTotal
    newBoard = clearStones(newBoard)
    return {
      board: newBoard,
      isOver: true,
      message: findWinner(newBoard)
    }
  }

  if (noStones(newBoard)(otherPlayer)) {
    // move stones to otherPlayer's pot
    const playerTotal = playerTotalInPlay(newBoard)(player)
    newBoard[otherPlayerHomeIndex] = newBoard[otherPlayerHomeIndex] + playerTotal
    newBoard = clearStones(newBoard)
    return {
      board: newBoard,
      isOver: true,
      message: findWinner(newBoard)
    }
  }

  // if final stone was in players home
  if (currIndex === playerHomeIndex) {
    return {
      player,
      isOver,
      board: newBoard,
      message: ''
    }
  }

  // if final stone was in player's empty hole
  if (belongsTo(player)(currIndex) && newBoard[currIndex] === 1) {
    const oppositeIndex = 12 - currIndex
    newBoard[playerHomeIndex] = newBoard[playerHomeIndex] + newBoard[oppositeIndex] + 1
    newBoard[currIndex] = 0
    newBoard[oppositeIndex] = 0
    return {
      isOver,
      board: newBoard,
      player: otherPlayer,
      message: ''
    }
  }

  if ((moveIndex + 1) % 7 === 0) {
    return { 
      player,
      board,
      isOver,
      message: 'bad move' }
  }
  if (Math.floor(moveIndex / 7) !== player) {
    console.log(board.slice(otherPlayer * 6, otherPlayer * 6 + 6).reduce(sum));
    return { 
      player,
      board,
      isOver,
      message: 'wrong player' }
  }
  if (!board[moveIndex] || isOver){
    console.log(player);
    console.log(board);
    console.log(board.slice(player * 6 + 1, player * 6 + 7).reduce(sum));
    return { 
      player,
      board,
      isOver,
      message: 'no stones!' }
  }



  // else nothing special
  return {
    isOver,
    board: newBoard,
    player: otherPlayer,
    message: ''
  }

}

export { makeMove, emptyHomes }