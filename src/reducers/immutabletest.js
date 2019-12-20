// import { fromJS } from 'immutable' // immutable练习

import type from '../actions/actionTypes'

// immutable练习
// const initState = fromJS({
//     num: 150
// })

const initState = {
    num: 150
}

export default (state=initState, action)=>{
    switch (action.type){
        case type.ADD :
            return {
                ...state,
                num: state.num+=1
            }
            // return state.updateIn(['count'], v=>v+1) // immutable练习
        case type.DIV :
            return {
                ...state,
                num: state.num-=1
            }
            // return state.updateIn(['count'], v=>v-1) // immutable练习
        default :
            return state;
    }
}