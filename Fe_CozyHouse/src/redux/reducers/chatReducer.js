const initState = {
    userId: 2,
  };
  
  export default (state = initState, action) => {
    switch (action.type) {
      case 'CHANGE_USER_ID':
        return {
          ...state,
          userId: action.userId,
        };
      default:
        return state;
    }
  };
  