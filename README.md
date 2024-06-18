# Node-famcache

![NPM Downloads](https://img.shields.io/npm/dw/%40famcache%2Ffamcache)
![NPM Version](https://img.shields.io/npm/v/%40famcache%2Ffamcache)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/famcache/node-famcache/lint_and_test.yml)
![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat)




Node-famcache is a Node.js client for Famcache, a caching server written in Go. This client allows you to interact with the Famcache server from your Node.js applications, providing an easy-to-use interface for caching operations.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Connecting to the Server](#connecting-to-the-server)
  - [Basic Operations](#basic-operations)
    - [Set a Value](#set-a-value)
    - [Get a Value](#get-a-value)
    - [Delete a Value](#delete-a-value)
    - [Publish a topic](#publish-a-topic)
    - [Subscribe to the topic](#subscribe-to-the-topic)
    - [Unsubscribe from the topic](#unsubscribe-from-the-topic)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install Node-famcache, use npm:

```sh
npm install @famcache/famcache
```

## Usage

### Connecting to the Server

First, import the module and create a client instance:

```ts
import Famcache from '@famcache/famcache';

const client = new FamcacheClient({
  host: 'localhost',
  port: 3577,
});
```

### Basic Operations

#### Set a Value

To store a value in the cache:

```ts
await client.set('key', 'value', 30000);
```

#### Get a Value

To retrieve a value from the cache:

```ts
const value = await client.get('key');
```

#### Delete a Value

To delete a value from the cache:

```ts
await client.del('key');
```


#### Publish a topic

To publish data to the topic:
```ts
client.messaging.publish('topic', 'data');
```

#### Subscribe to the topic

To subscribe to the topic:
```ts
client.messaging.subscribe('topic', (data) => {
  // ...
});
```

#### Unsubscribe from the topic

To unsubscribe from the topic:
```ts
client.messaging.unsubscribe('topic');
```

## API Reference

### `FamcacheClient`

#### `new FamcacheClient(options)`

Creates a new client instance.

- **options** (object):
  - **host** (string): The host of the Famcache server.
  - **port** (number): The port of the Famcache server.

#### `client.set(key, value, ttl?)`

Sets a value in the cache.

- **key** (string): The key under which the value will be stored.
- **value** (string): The value to store.
- **ttl** (number): Time to leave (optional)

#### `client.get(key)`

Gets a value from the cache.

- **key** (string): The key of the value to retrieve.

#### `client.delete(key, callback)`

Deletes a value from the cache.

#### `client.messaging.publish(topic, data)`

Publishes data to the topic

- **topic** (string): Topic name
- **data** (string): Payload that will be send to the subscribers

#### `client.messaging.subscribe(topic, callback)`

Subscribes to the topic

- **topic** (string): Topic name
- **callback** (Function): Callback function that will be invoked when message will be received for this topic


#### `client.messaging.unsubscribe(topic)`

Unsubscribes from the topic

- **topic** (string): Topic name

# Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

# License

Node-famcache is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
