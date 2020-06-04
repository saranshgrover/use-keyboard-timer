import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import useKeyboarTimer from '../src/';

const settings = {
  timerInput: 'timer',
  inspection: 'always',
  timerUpdate: 'deciseconds',
  timeToRelease: 'stackmat',
};

const App = () => {
  const {
    time,
    state,
    dnf,
    inspectionTime,
    isTiming,
    plusTwo,
  } = useKeyboarTimer(settings);
  return (
    <div>
      {`Time: ${time} \n State: ${state} \n Inspection: ${inspectionTime} \n DNF: ${dnf} \n Plus 2: ${plusTwo}`}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
