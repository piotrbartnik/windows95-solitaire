// card actions
export const DEAL_CARDS = "DEAL_CARDS";
export const TAKE_ONE_FROM_STOCK = "TAKE_ONE_FROM_STOCK";
export const REVERSE_STOCK = "REVERSE_STOCK";
export const REMOVE_CARD_FROM_STOCK = "REMOVE_CARD_FROM_STOCK";
export const ADD_CARD_TO_PILE = "ADD_CARD_TO_PILE";
export const REMOVE_CARD_FROM_PILE = "REMOVE_CARD_FROM_PILE";
export const TURN_CARD_ON_PILE = "TURN_CARD_ON_PILE";
export const STOCK_TURN_COUNTER = "STOCK_TURN_COUNTER";
export const RESET_STOCK_COUNTER = "RESET_STOCK_COUNTER";
// fountadion actions
export const ADD_CARD_TO_FIRST_FOUNDATION = "ADD_CARD_TO_FIRST_FOUNDATION";
export const ADD_CARD_TO_SECOND_FOUNDATION = "ADD_CARD_TO_SECOND_FOUNDATION";
export const ADD_CARD_TO_THIRD_FOUNDATION = "ADD_CARD_TO_THIRD_FOUNDATION";
export const ADD_CARD_TO_FOURTH_FOUNDATION = "ADD_CARD_TO_FOURTH_FOUNDATION";
export const REMOVE_CARD_FROM_FOUNDATION = "REMOVE_CARD_FROM_FOUNDATION";
// window actions
export const TOGGLE_WINDOW = "TOGGLE_WINDOW";
// score actions
export const COUNT_SCORE = "COUNT_SCORE";
export const RESET_SCORE = "RESET_SCORE";
// game actions
export const START_GAME = "START_GAME";
export const STOP_GAME = "STOP_GAME";
export const FINISH_GAME = "FINISH_GAME";
// time actions
export const SAVE_INITIAL_TIME = "SAVE_INITIAL_TIME";
export const RESET_TIME = "RESET_TIME";
export const SAVE_SCORE_TIME = "SAVE_SCORE_TIME";
// undo actions
export const SET_UNDO_ACTION = "SET_UNDO_ACTION";
export const UNDO_TAKE_ONE_FROM_STOCK = "UNDO_TAKE_ONE_FROM_STOCK";
export const UNDO_REMOVE_FROM_PILE = "UNDO_REMOVE_FROM_PILE";
export const UNDO_MOVE_FROM_STOCK_TO_PILE = "UNDO_MOVE_FROM_STOCK_TO_PILE";
export const UNDO_MOVE_FROM_STOCK_TO_FOUNDATION =
  "UNDO_MOVE_FROM_STOCK_TO_FOUNDATION";
export const UNDO_MOVE_FROM_PILE_TO_FOUNDATION =
  "UNDO_MOVE_FROM_PILE_TO_FOUNDATION";
export const UNDO_MOVE_FROM_FOUNDATION_TO_PILE =
  "UNDO_MOVE_FROM_FOUNDATION_TO_PILE";
