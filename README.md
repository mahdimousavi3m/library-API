# Library API

A simple REST API for managing books, users, and library rentals, built with Node.js using the native `http` module.

## Overview

Library API is a backend project designed to manage the core operations of a small library system.

The API handles books, users, and rental records, while storing application data in a local JSON file. It implements request routing, request body processing, query parameters, data validation, and persistent data updates without relying on external frameworks such as Express.

## Features

### Books

* Add new books
* Retrieve all books
* Update book information
* Delete books
* Track book availability
* Generate unique IDs for books

### Users

* Register new users
* Prevent duplicate user registration
* Update user information
* Upgrade users to admin
* Track user-related data

### Rentals

* Rent available books
* Prevent unavailable books from being rented
* Associate rentals with users and books
* Return rented books
* Remove completed rental records
* Automatically update book availability

### General

* REST-style API endpoints
* HTTP method-based routing
* Query parameter handling
* JSON request and response handling
* Request body processing
* Input validation
* HTTP status code handling
* Persistent data storage using `db.json`
* Unique ID generation using Node.js `crypto`
* File operations using Node.js `fs`

## Technologies

* Node.js
* HTTP
* File System (`fs`)
* URL
* Crypto
* JSON

## Data Structure

The application uses three m
