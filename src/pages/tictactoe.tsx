import React, { useCallback, useEffect, useReducer } from 'react'
import Button from '../components/Button/button';
import { initialState, ticTacToeReducer, TicTacToeType } from './tictactoeReducer';

const TicTacToe = () => {
    // true for player 1, false for player 2
    const [{ currentPlayer, boxFilled, values, winner }, dispatch] = useReducer(ticTacToeReducer, initialState);

    const getCurrentPlayer = (current?: boolean): string => {
        if(typeof current === 'boolean') {
            return current ? 'Player I' : 'Player II';
        }

        return currentPlayer ? 'Player I' : 'Player II';
    }

    const onButtonClick = useCallback((index: string) => {
        if(!winner) {
            dispatch({
                type: TicTacToeType.BOARD_CLICKED,
                payload: index,
            })
        }
    }, [winner]);

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

        winnerRow.forEach(el => {
            const [a, b ,c] = el;
            if(values.get(String(a)) && values.get(String(a)) === values.get(String(b)) && values.get(String(a)) === values.get(String(c))) {  
                dispatch({
                    type: TicTacToeType.GAME_WON
                })          
            }
        })       
    }, [values]);

    useEffect(() => {
        if(boxFilled === 9) {
            window.alert('It\'s a draw, all squares are filled.');
        } else if(boxFilled >= 5) {
            // check for winner
            checkWinner();
        }
    }, [boxFilled, checkWinner]);

    // useEffect(() => {
    //     if(winner) {
    //         window.alert(`${winner} has won!!!`);
    //     }
    // }, [winner]);

    const reset = () => {
        dispatch({
            type: TicTacToeType.RESET
        })
    }

    const renderLog = () => {
        const data: string[] = [];

        values.forEach((item, key) => {
            data.push(`${item} clicked at square ${parseInt(key) + 1}.`);
        })
        
        return data.reverse();
    }

    return (
        <section className="my-5">
            <div className="container">
                <div className="flex flex-wrap">
                    <div className="w-1/3">
                        {winner && (
                            <>
                                <h2 className="text-3xl">Congratulations {winner}!!</h2>
                                <h3>Game Won by {winner} at {boxFilled} steps.</h3>
                            </>
                        )}
                    <button className={`bg-orange-500 hover:bg-orange-400 duration-500 transition px-5 py-3 my-5 text-white rounded-md ${winner && 'animate-bounce'}`} onClick={() => reset()}>Reset</button>
                <div className="text-2xl">
                    {!winner && (
                        <h2 className="">Current Player: {getCurrentPlayer()}</h2>
                    )}
                    </div>
                    <div className="log space-y-2">
                        <h2 className="text-3xl font-semibold">Log:</h2>
                        <button className={`bg-indigo-500 text-white px-4 py-2 rounded-md ${values.size > 0 ? 'block' : 'hidden'}`} onClick={() => dispatch({ type: TicTacToeType.UNDO })}>Undo</button>
                        {renderLog().map((el, index) =>
                            <p key={index} className="text-gray-400">{el}</p>    
                        )}
                    </div>
                    </div>

                    <div className="w-2/3">
                    <div className="board border-8 border-orange-700 rounded-2xl">
                <div className="grid grid-cols-3">
                    {Array(9).fill(null).map((el, index) => 
                     <Button key={index} currentIndex={String(index)} value={values.get(String(index))} winner={winner} onClick={onButtonClick} />
                    )}
                    </div>
                </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TicTacToe;