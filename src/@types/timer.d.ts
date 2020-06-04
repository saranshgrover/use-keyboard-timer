declare namespace Timer {
  interface TimerSettings {
    timerInput: 'manual' | 'timer' | 'stackmat';
    inspection: 'always' | 'never' | 'nonbld';
    timerUpdate: timerUpdate;
    timeToRelease: timeToRelease;
  }
  type timerUpdate =
    | 'seconds'
    | 'centiseconds'
    | 'millisecond'
    | 'none'
    | number; // a number means ever X seconds
  type timeToRelease = 'none' | 'stackmat';
  interface Solve {
    time: number;
    scramble: string;
    sessionId: string;
    eventId: EventId;
    subsetId?: subsetId;
    uid: string;
    solution?: Solution;
    notes?: String;
  }
  interface Solution {
    method: PuzzleMethod;
    reconstruction: String;
  }
  interface Stats {
    single?: SolveRecord;
    ao5?: SolveRecord;
    ao12?: SolveRecord;
    ao50?: SolveRecord;
    ao100?: SolveRecord;
  }
  interface SolveRecord {
    time: number;
    startSolve: Solve;
    numberOfSolves: number;
  }
  type SolveMap = Map<string, number>;
  type PuzzleMethod = 'CFOP' | 'Roux' | 'ZZ' | undefined;
  type EventId =
    | '222'
    | '333'
    | '444'
    | '555'
    | '666'
    | '777'
    | 'clock'
    | 'minx'
    | 'pyram'
    | 'skewb'
    | 'sq1';
  type subsetId =
    | '2gll'
    | 'ble'
    | 'cls'
    | 'cmll'
    | 'edges'
    | 'fmc'
    | 'lccp'
    | 'll'
    | 'lsll'
    | 'lu'
    | 'nls'
    | 'pll'
    | 'wv'
    | 'zz'
    | 'tsle'
    | 'zzle'
    | 'zzlsll';
}
