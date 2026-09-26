# Tomasino Web Webtech Backend

Backend API for a blog-style application.

## Language and Framework
- JavaScript
- Node.js
- Express.js

## Requirements

- Node.js 20 or newer
- npm (included with Node.js)
- Visual Studio Code

## Download and Open the Project

1. Download the `tomweb_backend.zip` folder from Google Drive.
2. Extract the zip file.
3. Open Visual Studio Code.
4. Select File > Open Folder and choose the extracted `tomweb_backend` folder.

## Uninstall Files and Folders

1. node_modules
2. package-lock.json

## Install Dependencies

Run this once inside the terminal after downloading the project:

```powershell
npm install
```

## Start the Server

From the project root, run:

```powershell
npm run dev
```

The server should report that it is running on port `3000`.

To check that it is working, open this URL in a browser:

<http://localhost:3000/>

Expected response:

```json
{"message":"Server is running"}
```

Stop the server with `Ctrl+C` in the terminal.

## Database

The application uses SQLite. A file named `tomweb.sqlite` is already present inside the folder and already contains data.

To create a new database, delete the `tomweb.sqlite` file and run `npm run dev` in the terminal. This creates a new empty SQLite database named `tomweb.sqlite`.

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

Protected requests can authenticate with the `X-API-Token` returned by `POST /login`. Add it to the request header as follows:

```text
X-API-Token: [API token returned by the login request]
```

Session-based authentication can also be used. See [Optional Functionalities](#optional-functionalities) for instructions on changing the authentication method.

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

## API Endpoints and How to Send Requests

### Login to Get the API Token

**`POST /login`**

Request body:

```json
{
  "username": "tomasinoweb",
  "password": "tmsnw3btech"
}
```

### Display All Posts

**`GET /posts`**

Request body: None

### Display a Single Post

**`GET /posts/:post_id`**

Request body: None

### Create a Post

**`POST /posts`**

Request body:

```json
{
  "title": "[Your title]",
  "content": "[Your content]",
  "author_name": "[The author]"
}
```

### Edit a Post

**`PATCH /posts/:post_id`**

Request body:

```json
{
  "title": "[Modified title]",
  "content": "[Modified content]",
  "author_name": "[Modified author]"
}
```

### Delete a Post

**`DELETE /posts/:post_id`**

Request body: None

### Create a Comment on a Post

**`POST /comment`**

Request body:

```json
{
  "post_id": "[ID of the post to comment on]",
  "commenter_name": "[Name of the commenter]",
  "comment_body": "[Comment content]"
}
```

### Modify a Comment

**`PATCH /comment/:comment_id`**

Request body:

```json
{
  "commenter_name": "[Modified author]",
  "comment_body": "[Modified comment]"
}
```

### Delete a Comment

**`DELETE /comment/:comment_id`**

Request body: None

## Optional Functionalities

1. **Pagination**

   Example: `{{BaseURL}}/posts?page=1&take=1`

2. **Filtering**

   Example: `{{BaseURL}}/posts?search=tomasino`

3. **CORS protection**

4. **Session-based authentication**

   To enable it:

   1. Go to the `routes` folder.
   2. Open `commentRoutes` and `postRoutes`.
   3. Change `authMiddlewareUsingAPIToken` to `authMiddlewareUsingSession`.
