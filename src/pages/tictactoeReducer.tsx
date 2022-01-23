export interface ITicTacToe {
    currentPlayer: boolean;
    boxFilled: number;
    values: Map<string, string>;
    winner?: string;
}

export const initialState = {
    currentPlayer: true,
    boxFilled: 0,
    values: new Map<string, string>(),
    winner: undefined,
}

export enum TicTacToeType {
    RESET = 'RESET',
    BOARD_CLICKED = 'BOARD_CLICKED',
    SWITCH_PLAYER = 'SWITCH_PLAYER',
    CHECK_WINNER = 'CHECK_WINNER',
    GAME_WON = 'GAME_WON',
    UNDO = 'UNDO',
    GOTO_HISTORY = 'GOTO_HISTORY',
}

export const ticTacToeReducer = (state: ITicTacToe, action: any): ITicTacToe => {
    const getCurrentPlayer = (current?: boolean): string => {
        if(typeof current === 'boolean') {
            return current ? 'Player I' : 'Player II';
        }

        return state.currentPlayer ? 'Player I' : 'Player II';
    }

    switch(action.type) {
        case TicTacToeType.RESET:
            return {
                ...initialState,
                values: new Map<string, string>(),
            };
        case TicTacToeType.BOARD_CLICKED:
            return {
                ...state,
                currentPlayer: !state.currentPlayer,
                boxFilled: state.boxFilled + 1,
                values: new Map(state.values.set(action.payload, getCurrentPlayer())),
            }
        case TicTacToeType.CHECK_WINNER:
            return {
                ...state
            }
        case TicTacToeType.SWITCH_PLAYER:
            return {
                ...state,
                currentPlayer: !state.currentPlayer
            }
        case TicTacToeType.GAME_WON: 
            return {
                ...state,
                winner: getCurrentPlayer(!state.currentPlayer)
            }      
        case TicTacToeType.UNDO:
            const lastItem = Array.from(state.values).slice(0, -1);
            return {
                ...state,
                currentPlayer: !state.currentPlayer,
                values: new Map(lastItem),
                boxFilled: state.boxFilled - 1,
                winner: undefined,
            }
        default:
            return state;
    }
}