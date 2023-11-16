/**
 * Get data from https://jsonplaceholder.typicode.com
 */

import { ActionMeta, BaseContext } from '@nuclent/nflow-scripts';

class Action extends ActionMeta {
  async handler(
    args: Record<string, unknown>,
    context: BaseContext
  ): Promise<unknown> {
    // will get server from tenant env, else use fallback value
    const host =
      (context.env['JSON_SERVER'] as string) ||
      'https://jsonplaceholder.typicode.com';
    const path = (args['path'] as string) || 'users';
    const url = new URL(path, host).href;

    const method = (args['method'] as string) || 'get';
    const body = args['body'];
    const headers = (args['headers'] as Record<string, string>) || {};

    const request = await fetch(url, {
      method,
      headers,
      body: body
        ? (typeof body === 'string' && body) || JSON.stringify(body)
        : null,
    });

    const response = await request.json();
    return response;
  }
}

module.exports = new Action();
