# Library API

A simple REST API for managing books, built with Node.js using the native `http` module.

## Features

* Create a new book
* Get all books
* Update a book
* Delete a book
* Generate unique book IDs with `crypto`
* Store and update data in a JSON file
* Handle request bodies and query parameters
* Return appropriate HTTP status codes

## Technologies

* Node.js
* HTTP module
* File System (`fs`)
* URL module
* Crypto module
* JSON

## API Endpoints

| Method | Endpoint                | Description    |
| ------ | ----------------------- | -------------- |
| POST   | `/api/books`            | Add a new book |
| GET    | `/api/books`            | Get all books  |
| PUT    | `/api/books?id=BOOK_ID` | Update a book  |
| DELETE | `/api/books?id=BOOK_ID` | Delete a book  |

## Purpose

This project was built as a learning project to practice building REST APIs with Node.js without using an external framework.
