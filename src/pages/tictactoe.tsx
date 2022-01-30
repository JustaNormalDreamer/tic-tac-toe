import React, { useCallback, useEffect, useReducer } from 'react';
import { initialState, ticTacToeReducer, TicTacToeType } from './tictactoeReducer';
import ChooseGameMode from '../components/GameMode';
import Board from '../components/Board';
import Log from '../components/Log';
import Winner from '../components/Winner';
import Score from '../components/Score';

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

  return (
    <section className="overflow-y-hidden">
      <div className="container">
        <div className="flex flex-wrap">
          {!mode ? (
            <ChooseGameMode dispatch={dispatch} />
          ) : (
            <>
              <div
                className={`flex h-screen w-full transition ${
                  !winner && 'hidden'
                } fixed z-10 bg-gray-200/75`}
              >
                <div className="m-auto space-y-5 text-center">
                  <Winner itemSize={values.size} winner={winner} />

                  <div className="space-x-5">
                    <button
                      className={`hover:scale-110 bg-orange-500 hover:bg-orange-400 duration-500 transition px-5 py-3 my-5 text-white rounded-md`}
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
                </div>
              </div>

              <div className="w-full md:w-1/3 px-5 order-2 md:order-1">
                <button
                  className={
                    'z-10 relative text-lg font-semibold bg-purple-800 hover:bg-purple-600 transition duration-500 text-white px-4 py-2 my-5 rounded-2xl'
                  }
                  onClick={() => dispatch({ type: TicTacToeType.CHOOSE_GAME_MODE, payload: '' })}
                >
                  {`< Back to Game Mode`}
                </button>
                <Score totalScore={totalScore} />

                <div className="text-2xl">
                  {!winner && <h2 className="">Current Player: {getCurrentPlayer()}</h2>}
                </div>

                <Log items={values} dispatch={dispatch} />
              </div>

              <Board winner={winner} onButtonClick={onButtonClick} items={values} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default TicTacToe;
