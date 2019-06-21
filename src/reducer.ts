import { set, cloneDeep } from "lodash";

export interface stateObj {
  x: any;
  y: any;
  z: any;
}

export const initialState: stateObj = {
  x: 3,
  y: "dasasdasd",
  z: [{ a: 3, b: 4 }, { a: 4, b: 5 }]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "$Chomtana.RefCommit":
      let newState = cloneDeep(state);
      let newVal = cloneDeep(action.value);
      set(newState, action.path, newVal);
      return newState;
    default:
      return state;
  }
}
