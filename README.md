# Nx Amplify Gen 2 Template

## Backend commands
the following commands provide an easy way to trigger amplify commands without having to navigate to the library directory, you can check <a href='https://docs.amplify.aws/gen2/reference/cli-commands/#amplify-sandbox'>here</a> for additional information and arguments for given commands

`nx dev backend`(amplify sandbox): Deploys a sandbox testing environment for testing code locally.

`nx pull backend`(amplify generate): Pulls the latest deployed backend config for use on the client.

`nx types backend`(amplify codegen): Generates mutations, queries, subscriptions and types for use with typescript client.

## Start the app

To start the development server run `nx serve web`. Open your browser and navigate to http://127.0.0.1:{port}/. Happy coding!

## Deploy the app on AWS
- Create amplify gen 2 app.
- Do not check `my app is a monorepo` checkbox.
- Change the frontend build command to `nx build web`.
- Change the Build output directory to `dist/apps/web/.next`.
- Click on advanced settings and add a new environment variable with key `_CUSTOM_IMAGE` with value `amplify:al2023`
- Once your app has been created, got to `Build settings` located in the `Hosting secion`
- Click edit, and replace it with the content `./buildspec.yaml` located in the root directory of the project
- Save and re-run the deployment N.B the initial deployment is expected to fail



