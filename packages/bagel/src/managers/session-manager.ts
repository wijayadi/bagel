import { Session } from '../models/session';

export class SessionManager {
    private generateNumber(): string[] {
        return [
            '1', '2', '3', '4'
        ];
    }

    public create(): Session {
        const session: Session = {};

        session.Number = this.generateNumber();
        session.Guesses = [];

        return session;
    }
}
