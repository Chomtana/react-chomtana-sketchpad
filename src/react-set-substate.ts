import { cloneDeep, set } from "lodash";

export default function setSubstate(
  state: any,
  setState: Function,
  path: string,
  value: any
) {
  var stateClone = cloneDeep(state);
  set(stateClone, path, value);
  setState(stateClone);
}
