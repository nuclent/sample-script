/**
 *
 */

import {
  BaseContext,
  DataType,
  ExternalDataSource,
  ExternalInput,
  GetListResponse,
  SearchDataQuery,
} from '@nuclent/nflow-scripts';

type ResType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Record<string, unknown>;
  phone: string;
  website: string;
  company: Record<string, unknown>;
};

class DataSource extends ExternalDataSource {
  private getUrl(env: BaseContext['env']): string {
    const host =
      (env?.['JSON_SERVER'] as string) ||
      'https://jsonplaceholder.typicode.com';
    return new URL('users', host).href;
  }
  private toDataType(res: ResType, url: string): DataType {
    return {
      ...res,
      externalId: `${res.id}`,
      displayUrl: `${url}/${res.id}`,
    };
  }

  async getList(
    args: SearchDataQuery,
    context?: BaseContext
  ): Promise<GetListResponse> {
    const { searchText } = args;
    const { limit = 10, offset = 0 } = args.type === 'offset' ? args : {};

    const url = this.getUrl(context?.env);
    const request = await fetch(url, { method: 'get' });
    const response: ResType[] = await request.json();
    const data: GetListResponse[0] = response
      .filter((i) => (searchText ? i.name.includes(searchText) : true))
      .map((r) => this.toDataType(r, url));
    const page: GetListResponse[1] = {
      total: `${response.length}`,
      limit,
      offset,
    };
    return [data, page];
  }

  async getItem(
    args: Pick<ExternalInput, 'externalId'>,
    context?: BaseContext
  ): Promise<DataType> {
    const url = this.getUrl(context?.env);
    const request = await fetch(`${url}/${args.externalId}`, { method: 'get' });
    const response: ResType = await request.json();
    return this.toDataType(response, url);
  }

  async createItem(
    args: Pick<ExternalInput, 'body'>,
    context?: BaseContext
  ): Promise<DataType> {
    const url = this.getUrl(context?.env);
    const request = await fetch(url, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(args.body || {}),
    });
    const response: ResType = await request.json();
    return this.toDataType(response, url);
  }

  async updateItem(
    args: ExternalInput,
    context?: BaseContext
  ): Promise<DataType> {
    const url = this.getUrl(context?.env);
    const request = await fetch(`${url}/${args.externalId}`, {
      method: 'put',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(args.body || {}),
    });
    const response: ResType = await request.json();
    return this.toDataType(response, url);
  }

  async deleteItem(
    args: Pick<ExternalInput, 'externalId'>,
    context?: BaseContext
  ): Promise<DataType> {
    const url = this.getUrl(context?.env);
    const request = await fetch(`${url}/${args.externalId}`, {
      method: 'delete',
    });
    const response: ResType = await request.json();
    return this.toDataType(response, url);
  }
}

module.exports = new DataSource();
