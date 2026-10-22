# Library API

A REST-style library management API built with **Node.js** using the native `http` module and the **MVC (Model–View–Controller) architecture**.

## Overview

Library API is a backend project developed to practice server-side programming, REST API design, and separation of concerns in Node.js.

The project manages books, users, and book rentals. It uses a file-based JSON data store and separates request routing, application logic, and data operations into dedicated modules.

The API is implemented without Express, providing hands-on experience with Node.js core modules and the fundamentals of backend development.

## Architecture

The project follows the MVC architectural pattern:

- **Model:** Handles data operations, business logic, and persistence.
- **Controller:** Processes incoming requests, coordinates model operations, and sends HTTP responses.
- **Routes:** Maps HTTP methods and endpoints to the appropriate controllers.

This separation makes the codebase easier to understand, maintain, test, and extend.

## Features

### Book Management

- Create new books with unique IDs
- Retrieve the list of books
- Update book information
- Delete books
- Track book availability

### User Management

- Register new users
- Prevent duplicate user registration
- Update user-related data
- Upgrade users to administrator
- Authenticate users through a login endpoint
- Track user-related records

### Rental Management

- Rent available books
- Prevent unavailable books from being rented
- Associate rental records with users and books
- Return rented books
- Remove completed rental records
- Update book availability after rental and return operations

### API Capabilities

- REST-style endpoints
- HTTP method-based routing
- JSON request and response handling
- Request body processing
- Query parameter handling
- HTTP status code handling
- Persistent data updates using a local JSON file
- Unique ID generation with Node.js `crypto`

## Technologies

- **Node.js** — JavaScript runtime
- **HTTP** — Native HTTP server and request handling
- **File System (`fs`)** — File-based data persistence
- **URL** — URL and query parameter handling
- **Crypto** — Unique ID generation
- **JSON** — Data storage and API communication

## Project Structure

```text
library-API/
├── Controller/
│   ├── bookController.js
│   └── userController.js
├── Model/
│   ├── bookModel.js
│   └── userModel.js
├── Routes/
│   ├── bookRouts.js
│   └── userRoutes.js
├── app.js
├── db.json
├── package.json
└── README.md
```

- `app.js` — Creates and starts the HTTP server and connects the route handlers.
- `Routes/` — Defines API endpoint routing.
- `Controller/` — Handles request processing and HTTP responses.
- `Model/` — Implements data access and business operations.
- `db.json` — Stores books, users, and rental records locally.

## API Endpoints

### Books

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/books` | Create a book |
| `GET` | `/api/books` | Retrieve all books |
| `PUT` | `/api/books?id=BOOK_ID` | Update a book |
| `DELETE` | `/api/books?id=BOOK_ID` | Delete a book |

### Users

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/users` | Register a user |
| `POST` | `/api/users/login` | Authenticate a user |
| `PUT` | `/api/users?id=USER_ID` | Update user data |
| `PUT` | `/api/users/upgrade?id=USER_ID` | Upgrade a user to administrator |

### Rentals

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/books/rent` | Rent a book |
| `POST` | `/api/books/return` | Return a rented book |

**Note:** Endpoints that require identifiers or request data use query parameters or JSON request bodies, depending on the operation.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- Git installed (optional, for cloning the repository)

### Installation

Clone the repository:

```bash
git clone https://github.com/mahdimousavi3m/library-API.git
cd library-API
```

Install dependencies if required:

```bash
npm install
```

Start the server using the configured development script:

```bash
npm run dev
```

The server starts on port `8000`.

## Data Storage

The application stores data in `db.json`, organized into three collections:

```json
{
  "users": [],
  "books": [],
  "rents": []
}
```

- `users` — Registered user records
- `books` — Book details and availability
- `rents` — Active rental records

This file-based approach is intended for learning and development rather than production use.

## Project Goals

This project demonstrates practical experience with:

- Node.js core modules
- HTTP request and response handling
- REST API design
- MVC architecture and separation of concerns
- Modular code organization
