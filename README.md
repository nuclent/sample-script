# SampleScript

## Requirements:
- Access nuclent registry
  - Please follow [Github Package](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-with-a-personal-access-token)

## Structure

- `apps/simple-action-script`: Sample code to make action script for action metadata script
  This action will make request to **https://jsonplaceholder.typicode.com** and handle body payload:

  - path: string/optional path to request, default: `users`
  - method: string/optional request method, default: `get`
  - body: string/optional request body, default: `null`
  - headers: object/optional request headers, default `{}`

- `apps/simple-data-source`: Sample code to make external data source script
  This script is for handling `users` **https://jsonplaceholder.typicode.com** as external source with all source action
  - get list users
  - get user by id
  - create new user
  - update user by id
  - delete user by id

## Create new app

- Run `yarn gen:app --name=<your-app-name>`
- Sync config for those files from source `simple-action-script` or `simple-data-source` to your new app
  - profile.json
  - tsconfig.spec.json

## How to build

- Run `yarn nx build <project-name>`
  Ex: _yarn nx build simple-data-source_
- The bundled code can be locate in `dist/apps/<project-name>/main.js`
  Please copy all scripts inside that file and put it to script section in nFlow action-meta/data-source UI-builder

## How to test

- Run `yarn nx test <project-name>`
  Ex: _yarn nx test simple-data-source_
