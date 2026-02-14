import { describe, it, expect } from 'vitest';
import { pactManager } from '../../../src/core/contracts/pact.manager.js';
import axios from 'axios';

describe('Sample API Contract', () => {
  // Only setup if Pact is enabled in .env
  const pact = pactManager.setup('taflex-consumer', 'sample-provider');

  it('should validate the user profile contract', async () => {
    if (!pactManager.enabled) {
      console.log('Pact is disabled. Skipping contract test.');
      return;
    }

    await pactManager.addInteraction({
      state: 'user exists',
      uponReceiving: 'a request for user profile',
      withRequest: {
        method: 'GET',
        path: '/profile',
      },
      willRespondWith: {
        status: 200,
        body: {
          username: 'taflex_user',
          role: 'admin',
        },
      },
    });

    await pactManager.executeTest(async (mockServer) => {
      const response = await axios.get(`${mockServer.url}/profile`);
      expect(response.status).toBe(200);
      expect(response.data.username).toBe('taflex_user');
    });
  });
});
