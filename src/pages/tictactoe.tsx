import React, { useCallback, useEffect, useReducer } from 'react';
import Button from '../components/Button/button';
import { initialState, ticTacToeReducer, TicTacToeType } from './tictactoeReducer';
import ChooseGameMode from '../components/GameMode';

const TicTacToe = () => {
  // true for player 1, false for player 2
  const [{ currentPlayer, values, winner, totalScore, mode }, dispatch] = useReducer(
    ticTacToeReducer,
    initialState
  );

  const getCurrentPlayer = (current?: boolean): string => {
    if (typeof current === 'boolean') {
      return current ? 'Player I' : 'Player II';
    }

    return currentPlayer ? 'Player I' : 'Player II';
  };

  const generateRandomNumber = (): string => {
    const max = 8;
    const min = 0;
    const result = Math.random() * (max - min) + min;
    return String(Math.ceil(result));
  };

  const getAMove = () => {
    let botMove: string = generateRandomNumber();
    while (values.has(botMove)) {
      botMove = generateRandomNumber();
    }

    return botMove;
  };

  const initiateBot = () => {
    setTimeout(() => {
      dispatch({
        type: TicTacToeType.BOARD_CLICKED,
        payload: getAMove()
      });
    }, 500);
  };

  const onButtonClick = useCallback(
    (index: string) => {
      if (!mode && !winner) return;

      dispatch({
        type: TicTacToeType.BOARD_CLICKED,
        payload: index
      });

      if (mode === 'singlePlayer') {
        initiateBot();
      }
    },
    [winner, mode]
  );

  const checkWinner = useCallback(() => {
    const winnerRow = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    winnerRow.forEach((el) => {
      const [a, b, c] = el;
      if (
        values.get(String(a)) &&
        values.get(String(a)) === values.get(String(b)) &&
        values.get(String(a)) === values.get(String(c))
      ) {
        dispatch({
          type: TicTacToeType.GAME_WON
        });
      }
    });
  }, [values]);

  useEffect(() => {
    if (values.size === 9) {
      window.alert("It's a draw, all squares are filled.");
    } else if (values.size >= 5) {
      // check for winner
      checkWinner();
    }
  }, [values.size, checkWinner]);

  const reset = () => {
    dispatch({
      type: TicTacToeType.RESET
    });
  };

  const renderLog = () => {
    const data: string[] = [];

    values.forEach((item, key) => {
      data.push(`${item} clicked at square ${parseInt(key) + 1}.`);
    });

    return data.reverse();
  };

  return (
    <section className="my-5">
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/3 px-5 order-2 md:order-1">
            {!mode ? (
              <ChooseGameMode dispatch={dispatch} />
            ) : (
              <>
                <button
                  className={
                    'text-lg font-semibold bg-purple-800 hover:bg-purple-600 transition duration-500 text-white px-4 py-2 my-5 rounded-2xl'
                  }
                  onClick={() => dispatch({ type: TicTacToeType.CHOOSE_GAME_MODE, payload: '' })}
                >
                  {`< Back to Game Mode`}
                </button>
                <h1 className="text-2xl font-bold">Total Score:</h1>
                <div className="flex justify-between">
                  <div className="my-5">
                    <span className="text-xl font-bold bg-indigo-500 rounded-2xl px-2 py-1 text-white">
                      Player I: {totalScore.player1}
                    </span>
                  </div>
                  <div className="my-5">
                    <span className="text-xl font-bold bg-indigo-500 rounded-2xl px-2 py-1 text-white">
                      Player II: {totalScore.player2}
                    </span>
                  </div>
                </div>
                {winner && (
                  <>
                    <h2 className="text-3xl font-bold">Congratulations {winner}!!</h2>
                    <h3>
                      Game Won by {winner} at {values.size} steps.
                    </h3>
                  </>
                )}
                <div className="space-x-5">
                  <button
                    className={`bg-orange-500 hover:bg-orange-400 duration-500 transition px-5 py-3 my-5 text-white rounded-md`}
                    onClick={() => dispatch({ type: TicTacToeType.NEW_GAME })}
                  >
                    New Game
                  </button>
                  <button
                    className={`bg-orange-500 hover:bg-orange-400 duration-500 transition px-5 py-3 my-5 text-white rounded-md ${
                      winner && 'animate-bounce'
                    }`}
                    onClick={reset}
                  >
                    Reset
                  </button>
                </div>
                <div className="text-2xl">
                  {!winner && <h2 className="">Current Player: {getCurrentPlayer()}</h2>}
                </div>
                <div className="log space-y-2">
                  <h2 className="text-3xl font-semibold">Log:</h2>
                  <button
                    className={`bg-indigo-500 text-white px-4 py-2 rounded-md ${
                      values.size > 0 ? 'block' : 'hidden'
                    }`}
                    onClick={() => dispatch({ type: TicTacToeType.UNDO })}
                  >
                    Undo
                  </button>
                  {renderLog().map((el, index) => (
                    <p key={index} className="text-gray-400">
                      {el}
                    </p>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="w-full md:w-2/3 order-1 md:order-2">
            <div className="board border-8 border-orange-700 rounded-2xl mx-2">
              <div className="grid grid-cols-3">
                {Array(9)
                  .fill(null)
                  .map((el, index) => (
                    <Button
                      key={index}
                      currentIndex={String(index)}
                      value={values.get(String(index))}
                      winner={winner}
                      onClick={onButtonClick}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TicTacToe;
