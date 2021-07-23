import { Session } from '../../models/session';
import { ArrayRepository } from '../array-repository';
import { SessionRepository } from '../session-repository';

export class SessionArrayRepository extends ArrayRepository<number, Session> implements SessionRepository {
}
