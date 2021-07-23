import { SessionState } from './session-state';
import { Guess } from './guess';
import { Entity } from './entity';
export interface Session extends Entity<string> {
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
