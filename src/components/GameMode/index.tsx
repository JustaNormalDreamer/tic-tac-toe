import React from 'react';
import { IAction, TicTacToeType } from '../../pages/tictactoeReducer';

interface IGameModeProps {
  dispatch: React.Dispatch<IAction>;
}

const GameMode: React.FC<IGameModeProps> = ({ dispatch }) => {
  return (
    <div className="flex h-screen w-full">
      <div className="m-auto space-y-5 text-center">
        <div className="">
          <h2 className="text-4xl font-semibold">Game Mode</h2>
        </div>
        <div className="">
          <button
            className={
              'text-3xl font-semibold bg-purple-800 hover:bg-purple-600 transition duration-500 text-white px-4 py-2 hover:scale-110'
            }
            onClick={() =>
              dispatch({ type: TicTacToeType.CHOOSE_GAME_MODE, payload: 'singlePlayer' })
            }
          >
            Single Player
          </button>
        </div>
        <div className="">
          <button
            className={
              'text-3xl font-semibold bg-purple-800 hover:bg-purple-600 transition duration-500 text-white px-4 py-2 hover:scale-110'
            }
            onClick={() =>
              dispatch({ type: TicTacToeType.CHOOSE_GAME_MODE, payload: 'multiPlayer' })
            }
          >
            Multi Player
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameMode;
