import React from 'react';

interface IScoreProps {
  totalScore: {
    player1: number;
    player2: number;
  };
}

const Score: React.FC<IScoreProps> = ({ totalScore }) => {
  return (
    <>
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
    </>
  );
};

export default Score;
