const InitialState = {

    showPreload: false,
    //userInfo
    token:'',

   
}
const rootReducer = (state = InitialState, action) => {
  switch (action.type) {
    
    case 'SET_TOKEN':
        return { ...state, token: action.payload };
    case 'SET_ADMIN_INFO':
        return { ...state, info: action.payload };
    case 'LOG_OUT':
        return InitialState;
    default:
        return state;
  }
};

export default rootReducer;