Tomasino Web Webtech (Backend) Project - backend API of a blog-style application

## Language and Framework
-Javascript
-Node.js
-Express.js

## Requirements

- Node.js 20 or newer
- npm (included with Node.js)
- Visual Studio Code

## Download and open the project

1. Download the `tomweb_backend.zip` folder from Google Drive.
2. Extract the zip file.
3. Open Visual Studio Code.
4. Select File > Open Folder and choose the extracted `tomweb_backend` folder.

## Uninstall files and folders

1. node_modules
2. package-lock.json

## Install dependencies

Run this once inside the terminal after downloading the project:

```powershell
npm install
```

## Start the server

From the project root, run:

```powershell
npm run dev
```

The server should report that it is running on port `3000`.

To check that it is working, open this URL in a browser:

http://localhost:3000/

Expected response:

{"message":"Server is running"}

Stop the server with `Ctrl+C` in the terminal.

## Database

The application uses SQLite. A file named `tomweb.sqlite` is already present inside the folder and already contains data.

To create a new database just delete the `tomweb.sqlite` file and then run `npm run dev` in the terminal and then it will create a new empty database/sqlite file named `tomweb.sqlite`

## API endpoints

The base URL is `http://localhost:3000`.

| Method | Endpoint | Authentication |
| --- | --- | --- |
| `GET` | `/` | None |
| `POST` | `/login` | None |
| `GET` | `/posts` | None |
| `GET` | `/posts/:id` | None |
| `POST` | `/posts` | Required |
| `PATCH` | `/posts/:id` | Required |
| `DELETE` | `/posts/:id` | Required |
| `POST` | `/comment` | Required |
| `PATCH` | `/comment/:id` | Required |
| `DELETE` | `/comment/:id` | Required |

Protected requests can authenticate with the `X-API-Token` returned by `POST /login`. Make sure you input the `X-API-Token` in the header. Key = X-API-Token Value = [API token returned in the login]. Session based authentication can also be used. Go to the `Optional Functionalities Added` part below to be instructed on changing the authentication method.

## Troubleshooting

## `npm` or `node` is not recognized

Install Node.js from [https://nodejs.org/](https://nodejs.org/) and restart VS Code. Confirm the installation with:

```powershell
node --version
npm --version
```

## The server does not start

Check that:

- The terminal is open in the folder containing `package.json`.
- `npm install` completed successfully.
- The `.env` file is in the project root and is named exactly `.env`.
- `PORT` is set to an available port.

## `better-sqlite3` installation fails

Make sure Node.js is 20 or newer, then remove the generated `node_modules` folder and `package-lock.json`, run `npm install` again, and restart the server.

## API Endpoints and how to send requests

## Login to get the API token
/login - POST
body:
{
  "username":"tomasinoweb",
  "password":"tmsnw3btech"
}

# Display all posts
/posts - GET
body:
N/A

# Display single post using an id
/posts/:post_id - GET
body:
N/A

# Create a post
/posts - POST
body:
{
  "title": [Your title],
  "content": [Your content],
  "author_name": [The author]
}

# Edit a post using an id
/posts/:post_id - PATCH
body:
{
  "title": [Modified title],
  "content": [Modified content],
  "author_name": [Modified Author]
}

# Delete a post using an id
/posts/:post_id - DELETE
body:
N/A

# Create a comment to a post
/comment - POST
body:
{
post_id: [id of the post you want to comment to],
commenter_name: [Name of the commenter],
comment_body: [content of the comment]
}

# Modify a comment
/comment/:comment_id - PATCH
body:
{
"commenter_name": [Modified Author] ,
"comment_body": [Modified comment]
}

# Delete a comment using an id
/comment/:comment_id - DELETE
body:
N/A

## Optional Functionalities Added
1. Pagination
Example:
{{BaseURL}}/posts?page=1&take=1
2. Filtering
Example:
{{BaseURL}}/posts?search=tomasino
3. CORS Protection
4. Session Based Authentication
How to use:
  1. Go to the routes folder.
  2. Access commentRoutes and postRoutes.
  3. Change the `authMiddlewareUsingAPIToken` to `authMiddlewareUsingSession`
