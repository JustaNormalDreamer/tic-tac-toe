import React, { useState } from 'react';

interface IButton {
  currentIndex: string;
  onClick: (currentIndex: string) => void;
  winner?: string;
  value?: string;
}

const Button: React.FC<IButton> = ({ currentIndex, onClick, winner, value }) => {
  const [animate, setAnimate] = useState<boolean>(false);

  const handleClick = () => {
    if (!value && !winner) {
      onClick(currentIndex);

      setAnimate(true);

      setTimeout(() => {
        setAnimate(false);
      }, 2500);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="px-5 py-8 text-8xl text-center border-8 bg-orange-400 hover:bg-orange-300 transition duration-500 ease-in-out hover:cursor-pointer text-white"
    >
      <button className={`font-bold transition duration-200 ${animate && 'animate-bounce'}`}>
        {value === 'Player I' && 'O'}
        {value === 'Player II' && 'X'}
      </button>
    </div>
  );
};

export default Button;
