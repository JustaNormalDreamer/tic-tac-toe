interface ITotalScore {
  player1: number;
  player2: number;
}

export interface ITicTacToe {
  currentPlayer: boolean;
  values: Map<string, string>;
  winner?: string;
  totalScore: ITotalScore;
}

export const initialState = {
  currentPlayer: true,
  values: new Map<string, string>(),
  winner: undefined,
  totalScore: {
    player1: 0,
    player2: 0
  }
};

export enum TicTacToeType {
  RESET = 'RESET',
  BOARD_CLICKED = 'BOARD_CLICKED',
  SWITCH_PLAYER = 'SWITCH_PLAYER',
  CHECK_WINNER = 'CHECK_WINNER',
  GAME_WON = 'GAME_WON',
  UNDO = 'UNDO',
  GOTO_HISTORY = 'GOTO_HISTORY',
  NEW_GAME = 'NEW_GAME'
}

export const ticTacToeReducer = (state: ITicTacToe, action: any): ITicTacToe => {
  const getCurrentPlayer = (current?: boolean): string => {
    if (typeof current === 'boolean') {
      return current ? 'Player I' : 'Player II';
    }

    return state.currentPlayer ? 'Player I' : 'Player II';
  };

  switch (action.type) {
    case TicTacToeType.RESET:
      return {
        ...initialState,
        values: new Map<string, string>(),
        totalScore: state.totalScore
      };
    case TicTacToeType.BOARD_CLICKED:
      return {
        ...state,
        currentPlayer: !state.currentPlayer,
        values: new Map(state.values.set(action.payload, getCurrentPlayer()))
      };
    case TicTacToeType.CHECK_WINNER:
      return {
        ...state
      };
    case TicTacToeType.SWITCH_PLAYER:
      return {
        ...state,
        currentPlayer: !state.currentPlayer
      };
    case TicTacToeType.GAME_WON:
      return {
        ...state,
        winner: getCurrentPlayer(!state.currentPlayer),
        totalScore: {
          player1: !state.currentPlayer ? state.totalScore.player1 + 1 : state.totalScore.player1,
          player2: state.currentPlayer ? state.totalScore.player2 + 1 : state.totalScore.player2
        }
      };
    case TicTacToeType.UNDO:
      const lastItem = Array.from(state.values).slice(0, -1);
      return {
        ...state,
        currentPlayer: !state.currentPlayer,
        values: new Map(lastItem),
        winner: undefined
      };
    case TicTacToeType.NEW_GAME:
      return {
        ...initialState,
        values: new Map<string, string>()
      };
    default:
      return state;
  }
};
