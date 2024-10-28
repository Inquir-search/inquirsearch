# Inquir Search Library

## Table of Contents
- [Inquir Search Library](#inquir-search-library)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
    - [Core Components](#core-components)
  - [Installation](#installation)
  - [Getting Started](#getting-started)
    - [1. SearchManager](#1-searchmanager)
    - [2. SearchBox](#2-searchbox)
    - [3. SearchResults](#3-searchresults)
  - [Debounce Support](#debounce-support)
  - [Usage Example](#usage-example)
  - [API Documentation](#api-documentation)
    - [SearchManager](#searchmanager)
    - [SearchBox](#searchbox)
    - [SearchResults](#searchresults)
  - [Contributing](#contributing)
  - [License](#license)

---

## Introduction

The **Inquir Search Library** is a flexible, framework-agnostic JavaScript library designed to provide search functionality in your applications. It allows interaction with a backend search API, managing search state and handling user inputs through **headless components**. These components focus solely on state management, making them easy to integrate with any front-end framework or plain JavaScript.

### Core Components

- **SearchManager**: Manages search queries, executes API requests, and handles search results.
- **SearchBox**: Manages the search query state and updates the SearchManager.
- **SearchResults**: Subscribes to search results from the SearchManager and manages local state.

---

## Installation

To install the library, use the following command for npm:

Run the `npm install` command followed by `@inquir/inquirsearch`.

Alternatively, if using yarn, run the `yarn add` command followed by `@inquir/inquirsearch`.

---

## Getting Started

### 1. SearchManager

The **SearchManager** is the core component responsible for managing the search state, constructing query objects based on your API schema, executing search requests, and notifying subscribers about state changes.

To instantiate the **SearchManager**, pass an API key to the constructor. This key is used in the Authorization header for API requests.

The **SearchManager** provides several key methods:
- `updateQueryParams`: This method updates the search parameters based on the provided object.
- `executeSearch`: Executes the search request based on the current state and notifies subscribers about the results.
- `subscribe`: Subscribes to specific events like `resultsChange` or `error`.

The **SearchManager** uses an internal event emitter to manage subscriptions and notifications.

---

### 2. SearchBox

The **SearchBox** component manages the search query state and interacts with the **SearchManager** to update the query parameters and trigger searches.

When instantiating **SearchBox**, pass in the **SearchManager** instance.

Key methods of **SearchBox** include:
- `setQuery`: Sets the search query and triggers a search.
- `subscribe`: Subscribes to query changes, allowing a listener function to respond whenever the query changes.
- `getQuery`: Retrieves the current search query.

Each **SearchBox** instance uses an event emitter to notify subscribers about query changes.

---

### 3. SearchResults

The **SearchResults** component subscribes to search results from the **SearchManager** and maintains its own local state for the results.

When instantiating **SearchResults**, pass in the **SearchManager** instance.

Key methods of **SearchResults** include:
- `subscribe`: Subscribes to search result changes, allowing a listener function to respond whenever new results are available.
- `getResults`: Retrieves the current search results.
- `destroy`: Cleans up subscriptions when the component is no longer needed.

Each **SearchResults** instance uses an event emitter to notify subscribers about updates to the results.

---

## Debounce Support

To prevent excessive API calls during rapid user input, the **SearchManager** includes a debounce mechanism in the `executeSearch` method. This ensures that searches are only executed after a set delay since the last invocation.

There are two approaches for implementing debounce:

- **Manual Debounce**: The `executeSearch` method is debounced using a `setTimeout` and `clearTimeout` mechanism.
- **Using Lodash**: For a more robust solution, **lodash.debounce** can be used to debounce the search execution.

To use **lodash**, first install it and update the **SearchManager** to use **lodash.debounce**.

---

## Usage Example

Here’s an example of how to use the **Inquir Search Library** to integrate search functionality into a web application:

1. Create a basic HTML structure with a search input field and a results container.
2. Instantiate **SearchManager**, **SearchBox**, and **SearchResults**.
3. Listen for user input changes on the search input field, and pass the query to **SearchBox** to trigger a search.
4. Subscribe to **SearchResults** to update the results container when new search results are available.

When a user types into the search input, **SearchBox** will update the query in **SearchManager**, which will execute a debounced search and notify **SearchResults** of the updated results.

---

## API Documentation

### SearchManager

The **SearchManager** constructor requires an API key for authenticating API requests.

Key methods:
- `updateQueryParams`: Updates the search parameters, such as query, size, and page, using the provided object.
- `executeSearch`: Executes the search based on the current state and notifies listeners when results are available.
- `subscribe`: Subscribes to events like `resultsChange` or `error` and accepts a listener function that responds to updates.

---

### SearchBox

The **SearchBox** constructor requires an instance of **SearchManager**.

Key methods:
- `setQuery`: Sets the search query and updates the **SearchManager**.
- `getQuery`: Retrieves the current search query.
- `subscribe`: Subscribes to query changes with a listener function that reacts to query updates.

---

### SearchResults

The **SearchResults** constructor requires an instance of **SearchManager**.

Key methods:
- `subscribe`: Subscribes to updates in search results using a listener function.
- `getResults`: Retrieves the current search results.
- `destroy`: Cleans up subscriptions when the component is no longer needed.

---

## Contributing

We welcome contributions to the **Inquir Search Library**. Follow these steps to contribute:

1. Fork the repository.
2. Clone your forked repository to your local machine.
3. Create a new branch for your feature or bug fix.
4. Make the necessary changes and commit them.
5. Push your changes to your forked repository.
6. Open a pull request with a detailed description of the changes.

---

## License

The **Inquir Search Library** is licensed under the MIT License.
