import React from 'react';
import { IAction, TicTacToeType } from '../../pages/tictactoeReducer';

interface ILogProps {
  items: Map<string, string>;
  dispatch: React.Dispatch<IAction>;
}

const Log: React.FC<ILogProps> = ({ items, dispatch }) => {
  const renderLog = () => {
    const data: string[] = [];

    items.forEach((item, key) => {
      data.push(`${item} clicked at square ${parseInt(key) + 1}.`);
    });

    return data.reverse();
  };

  return (
    <div className="log space-y-2">
      <h2 className="text-3xl font-semibold">Log:</h2>
      <button
        className={`bg-indigo-500 text-white px-4 py-2 rounded-md ${
          items.size > 0 ? 'block' : 'hidden'
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
  );
};

export default Log;
