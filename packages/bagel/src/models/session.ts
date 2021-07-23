import { SessionState } from './session-state';
import { Guess } from './guess';
export interface Session {
    DigitCount: number;
    Digits: string[];

    Number: string[];
    Guesses: Guess[];

    State: SessionState;
    Start: Date;
    End?: Date;
    Duration: number;
    Score: number;
    Rank: number;
}
