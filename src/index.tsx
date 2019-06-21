import * as React from "react";
import { render } from "react-dom";

import "./styles.css";
import setSubstate from "./react-set-substate";

import { createStore } from "redux";
import { Provider, useSelector } from "react-redux";
import reducer, { stateObj } from "./reducer";

import useSelectorRef from "./refsystem/useSelectorRef";

import RefContainer from "./refsystem/RefContainer";

function Test(params) {
  const refs = new RefContainer(params);

  return (
    <>
      <div>x current: {refs.x.current}</div>
      <div>x: {refs.x.value}</div>
      <div>y current: {refs.y.current}</div>
      <div>y: {refs.y.value}</div>
      <div>z: {JSON.stringify(refs.z.value)} </div>
      <div>z[1]: {JSON.stringify(refs.z(1).value)} </div>
      <div>z[1].a: {JSON.stringify(refs.z(1)("a").value)}</div>
      <button onClick={() => refs.x.stage(5)}>Stage x</button>
      <button onClick={() => refs.x.commit()}>Commit x</button> <br />
      <button
        onClick={() => {
          refs.y.set(refs.y() + ", God!!!");
        }}
      >
        Set y
      </button>
      <br />
      <button
        onClick={() =>
          refs
            .z(1)("a")
            .set(10)
        }
      >
        Set z[1].a
      </button>
      <br />
      <button
        onClick={() => {
          refs.z.push({ a: 6, b: 9 });
        }}
      >
        Push z
      </button>
      <button
        onClick={() => {
          refs.z.pop();
        }}
      >
        Pop z
      </button>
      <button
        onClick={() => {
          refs.z.commit();
        }}
      >
        Commit z
      </button>
    </>
  );
}

function App() {
  const [x, setX] = React.useState({ x: [2, 5], y: 4, z: 0 });

  const refs = new RefContainer();
  refs.x = useSelectorRef("x");
  refs.y = useSelectorRef("y");
  refs.z = useSelectorRef("z");

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>

      <Test {...refs} />
      <div>x current outside: {JSON.stringify(refs.x.current)}</div>
      <div>x outside: {JSON.stringify(refs.x.value)}</div>
      <div>z current outside: {JSON.stringify(refs.z.current)}</div>
      <div>z outside: {JSON.stringify(refs.z.value)}</div>

      <h3>{x.x}</h3>
      <h3>{x.y}</h3>
      <h3>{x.z}</h3>
      <button
        onClick={() => {
          setSubstate(x, setX, "z", 5);
          setSubstate(x, setX, "z", x.z + 1);
        }}
      >
        aaa
      </button>
    </div>
  );
}

const store = createStore(reducer);

console.log(reducer);

const rootElement = document.getElementById("root");
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
