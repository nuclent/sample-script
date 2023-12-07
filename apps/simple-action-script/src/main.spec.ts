import { ActionMeta, BaseContext } from '@nuclent/nflow-scripts';

const mockContext: BaseContext = {
  apiHost: 'mock.host',
  tenant: 'mock-tenant',
  orgId: 1,
  username: 'username',
  userId: 'user-id',
  env: {},
};
describe('DataSource', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const source: ActionMeta = require('./main');

  it('should OK', async () => {
    const args: Record<string, unknown> = {};
    await expect(source.handler(args, mockContext)).resolves.toBeDefined();
  });
});
