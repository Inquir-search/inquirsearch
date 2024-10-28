# Inquir Search Library

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Getting Started](#getting-started)
  - [1. SearchManager](#1-searchmanager)
  - [2. SearchBox](#2-searchbox)
  - [3. SearchResults](#3-searchresults)
- [Debounce Support](#debounce-support)
- [Usage Example](#usage-example)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

The **Inquir Search Library** is a flexible, framework-agnostic JavaScript library designed to provide robust search functionality in your applications. It allows seamless interaction with a backend search API, managing search state and handling user inputs through **headless components**. These components focus solely on state management, leaving the UI rendering to you, making integration with any front-end framework or vanilla JavaScript straightforward.

### Core Components

- **`SearchManager`**: Manages search queries, executes API requests, and handles search results.
- **`SearchBox`**: Manages the search query state and updates the `SearchManager`.
- **`SearchResults`**: Subscribes to search results from the `SearchManager` and manages local state.


## Installation (TBD)

Install the Inquir Search Library using npm:

```bash
npm install @inquir/inquirsearch
