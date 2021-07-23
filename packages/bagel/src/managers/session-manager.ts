import { Guess } from '../models/guess';
import { Session } from '../models/session';

export class SessionManager {
    private generateNumber(): string[] {
        const count: number = 4;
        const digits: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

        const number: string[] = [];

        let i = 0;
        while(i < count) {
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
      const session: Session = {
        Number: this.generateNumber(),
        Guesses: []
      };

      return session;
    }

    private calculatePosition(session: Session, number: string[]) {
      let result = 0;

      for(let i = 0; i < number.length; i++) {
        if (number[i] === session.Number[i]) {
          result++;
        }
      }

      return result;
    }

    private calculateDigit(session: Session, number: string[]) {
      let result = 0;

      for(let i = 0; i < number.length; i++) {
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
        Digit: this.calculateDigit(session, number)
      };

      return guess;
    }
}
