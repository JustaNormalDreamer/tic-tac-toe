import React from 'react';
import Button from '../Button/button';

interface IBoardProps {
  items: Map<string, string>;
  winner?: string;
  onButtonClick: (index: string) => void;
}

const Board: React.FC<IBoardProps> = ({ items, winner, onButtonClick }) => {
  return (
    <div className="w-full md:w-2/3 order-1 md:order-2">
      <div className="board border-8 border-orange-700 rounded-2xl m-2">
        <div className="grid grid-cols-3">
          {Array(9)
            .fill(null)
            .map((el, index) => (
              <Button
                key={index}
                currentIndex={String(index)}
                value={items.get(String(index))}
                winner={winner}
                onClick={onButtonClick}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Board;
