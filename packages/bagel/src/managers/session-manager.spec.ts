import * as assert from 'assert';
import { SessionManager } from './session-manager';

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
      assert.ok(actual.Number.length > 2);

      for(let i = 0; i < actual.Number.length; i++) {
        for(let j = i + 1; j < actual.Number.length; j++) {
          assert.ok(actual.Number[i] !== actual.Number[j]);
        }
      }

      assert.ok(actual.Guesses != null);
    });

    it('should able to guess', async function () {
      const target = new SessionManager();
      const session = target.create();
      const actual = target.guest(session, ['1', '2', '3', '4']);

      assert.ok(actual != null);
      assert.ok(actual.Number != null);
    });
});

