import {BoardRedux} from '../board/board.jsx';
import {ThreadRedux} from '../thread/thread.jsx';

const AppReducer = (state = {}, action)=>{
  switch(action.type){
    default:
      return state;
  }
}
export default [
  AppReducer,
  BoardRedux,
  ThreadRedux
]
