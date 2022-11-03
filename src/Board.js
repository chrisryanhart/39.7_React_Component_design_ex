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
  const createCell = () => {
    let randomNum = Math.floor(Math.random()*2);
    let cellVal = randomNum === 1 ? true : false;
    return cellVal;
  }
  
  const [board, setBoard] = useState(createBoard());
  let winMessage = {display: "none"};
  let boardStatus = {display: "flexbox"};

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    for (let i =0; i< nrows; i++){
      let row = [];
      for (let j=0; j<ncols; j++){
        let value = createCell();
        row.push(value);

        if (row.length === ncols) {
          initialBoard.push(row);
        }
      }
    }

    // TODO: create array-of-arrays of true/false values
    return initialBoard;
  }


  function flipCellsAround(coord) {
    // event.persist();
    setBoard(oldBoard => {
      // let coord = event.currentTarget.attributes.coord.value;
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };


      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(row => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y,x,boardCopy);
      flipCell(y+1,x,boardCopy);
      flipCell(y-1,x,boardCopy);
      flipCell(y,x+1,boardCopy);
      flipCell(y,x-1,boardCopy);
      console.log('test');

      // TODO: return the copy
      return boardCopy;
    });
  }

  function hasWon(board){
    // TODO: check the board in state to determine whether the player has won.

    const gameStatus = board.map(row => row.find(ele => ele === false));

    if (!gameStatus.includes(false)){
      console.log('you won!');

      winMessage.display = 'block';
      boardStatus.display = 'none';
    }
  }

  hasWon(board);

  // TODO

  // make table board
  // map cells 

  return (<>
            <h1 style={winMessage}>You won!</h1>
            <table style={boardStatus}>
              <tbody>
                  {board.map((arr,y) => {
                      return (<tr key={y}>
                          {arr.map((ele,x) => {
                              let coord = `${y}-${x}`;
                              return (
                                <Cell key={coord} isLit={ele} flipCellsAroundMe={() => flipCellsAround(coord)} />
                              );
                        })}
                      </tr>);
                    })}
              </tbody>
            </table>
          </>);
}


export default Board;
