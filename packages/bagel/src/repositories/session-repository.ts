import { Session } from '../models/session';
import { ArrayRepository } from './array-repository';

export interface SessionRepository extends ArrayRepository<number, Session> {
}
