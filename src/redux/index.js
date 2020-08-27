import React  from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {count: state.count + action.payload};
    case "decrement":
      return {count: state.count - action.payload};
    default:
      throw new Error();
  }
};

export default reducer;

 
