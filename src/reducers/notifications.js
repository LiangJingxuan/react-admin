import type from '../actions/actionTypes'

const initState = {
    isLoading: false,
    list: [
        {
            id:1,
            title:'sdaadsafasf254sda3da4a423d4',
            desc: 'dsadsadadasvcxvdsadasdfasdfdaf45d4a4a56s6d4a54d53as4d3a4d34af64a6sd4sd.a4d35as4das64da546sa54ds35a',
            isHasRead: false
        },
        {
            id:2,
            title:'sdaadsafasf254sda3da4a423d4',
            desc: 'dsadsadadasvcxvdsadasdfasdfdaf45d4a4a56s6d4a54d53as4d3a4d34af64a6sd4sd.a4d35as4das64da546sa54ds35a',
            isHasRead: false
        }
    ]
}

export default (state=initState, action)=>{
    switch(action.type){
        case type.START_MORK_AS_READ :
            return{
                ...state,
                isLoading: true
            }
        case type.FINISH_MORK_AS_READ :
            return{
                ...state,
                isLoading: false
            }
        case type.RECIVED_NOTIFICATIONS :
            return{
                ...state,
                list: action.payload.list
            }
        case type.MARK_NOTIFICATION_AS_READ_BY_ID :
            const newList = state.list.map(item=>{
                if(item.id===action.payload.id){
                    item.isHasRead=true
                }
                return item;             
            })
            return {
                ...state,
                list: newList
            }
        case type.MARK_NOTIFICATIONS_AS_READ :
            return {
                ...state,
                list: state.list.map(item=>{
                        item.isHasRead=true
                        return item;             
                      })
            }     
        default:
            return state;
    }
}