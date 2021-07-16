import * as assert from 'assert';
import { SessionManager } from './session-manager';

/* eslint-disable @typescript-eslint/no-unsafe-call */
describe('session-manager', function () {
    it('initializes with default options', async function () {
      const target = new SessionManager();

      assert.ok(target != null);
    });

    it('should able to create', async function () {
      const target = new SessionManager();

      assert.ok(target != null);

      const actual = target.create();

      assert.ok(actual != null);
      assert.ok(actual.Number != null);
      assert.ok(actual.Guesses != null);
    });
});

