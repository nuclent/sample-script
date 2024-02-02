import { ActionMeta, BaseContext } from '@nuclent/nflow-scripts';
import { loadScript } from '@sample-script/test';

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
      url: 'http://localhost',
      credential: {
        key: 'value',
      },
    },
  },
  env: {},
};

describe('DataSource', () => {
  const source: ActionMeta = loadScript(
    `${process.cwd()}/dist/apps/${process.env.NX_TASK_TARGET_PROJECT}/main.js`
  );

  it('should OK', async () => {
    const args: Record<string, unknown> = {};
    await expect(source.handler(args, mockContext)).resolves.toBeDefined();
  });
});
