# use-keyboard-timer

use-keyboard-timer is a minimal, React hook for Cubing Timers. It handles all the logic of a timer (inspection, holding space, etc) so that you can focus on building the UI! The only peer dependency is react

## Installation

Install by doing `yarn add use-keyboard-timer` or `npm install use-keyboard-timer`

## Usage

```js
import useKeyboardTimer from 'use-keyboard-timer';

const settings = {
  timerInput: 'timer',
  inspection: 'always',
  timerUpdate: 'deciseconds',
  timeToRelease: 'stackmat',
};

const { time, inspectionTime, state, isTiming, dnf, plusTwo } = useKeyboardTimer(settings);

return (
  <div>
    {`Time: ${time} \n State: ${state} \n Inspection: ${inspectionTime} \n DNF: ${dnf} \n Plus 2: ${plusTwo}`}
  </div>
);
```

The `settings` paramater takes an object of the following `TimerSettings` type:

```ts
interface TimerSettings {
  layout: 'drawer' | 'divider3' | 'divider2' | 'simple';
  timerInput: 'manual' | 'timer' | 'stackmat';
  inspection: 'always' | 'never' | 'nonbld';
  timerUpdate: timerUpdate;
  timeToRelease: timeToRelease;
}
type timerUpdate = 'seconds' | 'centiseconds' | 'millisecond' | 'none' | number; // a number means ever X ms
type timeToRelease = 'none' | 'stackmat';
```

The hook returns the following type: 

```ts
interface useKeyboardTimerReturn {
    time: number | null; // the time in ms
    isTiming: boolean;
    state: TimerState;
    inspectionTime: number; // inspection time in seconds. Can be 0/-1 indicating +2
    pause: () => void; // function to pause the timer
    unpause: () => void; // function to unpause the timer
    dnf: boolean; // True if over 17 seconds of inspection is used
    plusTwo: boolean; True if 15-17 seconds of inspection is used

}
/**
 *  @typedef NONE: Nothing is happening. This only happens when the timer is reset and/or when the hook is called for the first time
 *  @typedef INSPECTION: We are currently in inspection state
 *  @typedef SPACE_PRESSED_TIMING: The spacebar has been pressed, but is not yet valid for beginning.
 *  @typedef SPACE_PRESSED_VALID: The spacebar has been pressed and is valid to begin the time
 *  @typedef STARTED: The timer is running. The time will be available in the `time` variable.
 *  @typedef STOPPED: Timer has been stopped. The final time is available in the `time` variable. Note that users can start a new solve immediately
 *  @typedef PAUSED: A timer can be paused by calling the `pause()` function. When paused, times cannot begin. This may be useful when you want to open a modal, and dont want the timer running in the background. You can unpause by calling the `unpause()` function, which reverts back to `NONE` state.
 */
type TimerState =
  | 'NONE'
  | 'INSPECTION'
  | 'INSPECTION_PENALTY'
  | 'SPACE_PRESSED_TIMING'
  | 'SPACE_PRESSED_VALID'
  | 'SPACE_PRESSED_INSPECTION'
  | 'STARTED'
  | 'STOPPED'
  | 'PAUSED';


```

## Commands

TSDX scaffolds your new library inside `/src`, and also sets up a [Parcel-based](https://parceljs.org) playground for it inside `/example`.

The recommended workflow is to run TSDX in one terminal:

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run the example inside another:

```bash
cd example
npm i # or yarn to install dependencies
npm start # or yarn start
```

The default example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure TSDX is running in watch mode like we recommend above. **No symlinking required**, [we use Parcel's aliasing](https://github.com/palmerhq/tsdx/pull/88/files).

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

#### Setup Files

This is the folder structure we set up for you:

```shell
/example
  index.html
  index.tsx       # test your component here in a demo app
  package.json
  tsconfig.json
/src
  index.tsx       # EDIT THIS
/test
  blah.test.tsx   # EDIT THIS
.gitignore
package.json
README.md         # EDIT THIS
tsconfig.json
```

## Using the Playground

```bash
cd example
npm i # or yarn to install dependencies
npm start # or yarn start
```

The default example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure TSDX is running in watch mode like we recommend above. **No symlinking required**!

## Authors

- [Saransh Grover](https://saranshgrover.com)
