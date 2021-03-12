import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = Array.from({length: nrows}, x => Array.from({length:ncols}));
    const board = initialBoard.map(r => r.map(c => c = false))
    // TODO: create array-of-arrays of true/false values
    return board;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    if(board.every(r => r.every(c => c === true))){
      return true;
    }
  }

  function flipCellsAround(coord) {
    
    setBoard(oldBoard => {
      const [y, x] = coord;
      
      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
        return boardCopy
      };

      // TODO: Make a (deep) copy of the oldBoard
      const copyArr = [...board]

      // TODO: in the copy, flip this cell and the cells around it
      const fliped = (copyArr) =>{
        flipCell(y, x, copyArr)
        flipCell(y+1, x, copyArr)
        flipCell(y-1, x, copyArr)
        flipCell(y, x+1, copyArr)
        flipCell(y, x-1, copyArr)
        return copyArr
      } 

      // TODO: return the copy
      return fliped(copyArr)
    });
  }

  // if the game is won, just show a winning msg & render nothing else
    if(hasWon()){
      return <h1>You have won!</h1>
    }
  // TODO

  // make table board

  // TODO
  // console.log(board)
  return(
    <table>
      {board.map((row, y) => <tr key={y}>{row.map((column, x) => <Cell key={`${y}${x}`} isLit={column} flipCellsAroundMe={() => flipCellsAround([y,x])} />)}</tr>)}
    </table>
  )
}

export default Board;
