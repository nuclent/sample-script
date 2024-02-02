import {
  BaseContext,
  ExternalDataSource,
  SearchDataQuery,
} from '@nuclent/nflow-scripts';
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
      url: '',
      credential: {
        key: 'value',
      },
    },
  },
  env: {},
};
describe('DataSource', () => {
  const source: ExternalDataSource = loadScript(
    `${process.cwd()}/dist/apps/${process.env.NX_TASK_TARGET_PROJECT}/main.js`
  );

  it('Get list should OK', async () => {
    const payload: SearchDataQuery = { type: 'offset' };
    await expect(source.getList(payload, mockContext)).resolves.toBeDefined();
  });

  it('Get item should OK', async () => {
    const externalId = '1';
    await expect(
      source.getItem({ externalId }, mockContext)
    ).resolves.toBeDefined();
  });

  it('Create item should OK', async () => {
    const body: Record<string, unknown> = {};
    await expect(
      source.createItem({ body }, mockContext)
    ).resolves.toBeDefined();
  });

  it('Update item should OK', async () => {
    const externalId = '1';
    const body: Record<string, unknown> = {
      name: 'name',
    };
    await expect(
      source.updateItem({ externalId, body }, mockContext)
    ).resolves.toBeDefined();
  });

  it('Delete item should OK', async () => {
    const externalId = '1';
    await expect(
      source.deleteItem({ externalId }, mockContext)
    ).resolves.toBeDefined();
  });
});
