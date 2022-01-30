import React from 'react';

interface IWinnerProps {
  winner?: string;
  itemSize: number;
}

const Winner: React.FC<IWinnerProps> = ({ winner, itemSize }) => {
  return (
    <>
      {winner && (
        <>
          <h2 className="text-3xl font-bold">Congratulations {winner}!!</h2>
          <h3>
            Game Won by {winner} at {itemSize} steps.
          </h3>
        </>
      )}
    </>
  );
};

export default Winner;
