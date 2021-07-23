import { injectable } from "tsyringe";

import { Config } from '../models/config';
import { Guess } from "../models/guess";
import { Session } from "../models/session";
import { SessionState } from '../models/session-state';
import { SessionRepository } from '../repositories/session-repository';

@injectable()
export class SessionManager {
  private readonly sessions: SessionRepository;

  public constructor(sessions: SessionRepository) {
    this.sessions = sessions;
  }

  private getConfig() {
    const config: Config = {
      DigitCount: 4,
      Digits: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    };
    return config;
  }

  private generateNumber(count: number, digits: string[]): string[] {
    const number: string[] = [];

    let i = 0;
    while (i < count) {
      const index = Math.round(Math.random() * digits.length);
      const digit = digits[index];
      if (!number.includes(digit)) {
        number.push(digit);
        i++;
      }
    }

    return number;
  }

  public create(): Session {
    const config = this.getConfig();

    const session: Session = {
      DigitCount: config.DigitCount,
      Digits: config.Digits,
      Guesses: [],
      Number: [],
      Start: new Date(),
      End: undefined,
      State: SessionState.New,
      Duration: 0,
      Score: 0,
      Rank: 0
    };

    session.Number = this.generateNumber(session.DigitCount, session.Digits);

    return session;
  }

  private calculatePosition(session: Session, number: string[]) {
    let result = 0;

    for (let i = 0; i < number.length; i++) {
      if (number[i] === session.Number[i]) {
        result++;
      }
    }

    return result;
  }

  private calculateDigit(session: Session, number: string[]) {
    let result = 0;

    for (let i = 0; i < number.length; i++) {
      if (session.Number.includes(number[i])) {
        result++;
      }
    }

    return result;
  }

  public guest(session: Session, number: string[]): Guess {
    const guess: Guess = {
      Number: number,
      Date: new Date(Date.now()),
      Position: this.calculatePosition(session, number),
      Digit: this.calculateDigit(session, number),
    };

    return guess;
  }
}
