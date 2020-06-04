# use-keyboard-timer

use-keyboard-timer is a minimal, React hook for Cubing Timers. It handles all the logic of a timer (inspection, holding space, etc) so that you can focus on building the UI! The only peer dependency is react, and

## Installation

Install by doing `yarn add react-keyboard-timer` or `npm install react-keyboard-timer`

## Usage

```js
import useKeyboardTimer from 'use-keyboard-timer';

const settings = {
  timerInput: 'timer',
  inspection: 'always',
  timerUpdate: 'deciseconds',
  timeToRelease: 'stackmat',
};

const { time, inspectionTime, state, isTiming } = useKeyboardTimer(settings);

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
