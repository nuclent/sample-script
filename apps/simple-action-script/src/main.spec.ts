import { ActionMeta, BaseContext } from '@nuclent/nflow-scripts';

const mockContext: BaseContext = {
  apiHost: 'mock.host',
  tenant: 'mock-tenant',
  orgId: 1,
  username: 'username',
  userId: 'user-id',
  token: 'token',
  profileId: 'p-id',
  profileName: 'p-name',
  roleId: 'r-id',
  roleName: 'r-name',
  divisionId: 'd-id',
  divisionName: 'd-name',
  credential: {
    type: 'custom',
    data: {
      key: 'value',
    },
  },
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
