# UnMineable.js

[![axios](https://img.shields.io/github/package-json/dependency-version/LockBlock-dev/unmineable.js/axios)](https://www.npmjs.com/package/axios) [![socket.io-client](https://img.shields.io/github/package-json/dependency-version/LockBlock-dev/unmineable.js/socket.io-client)](https://www.npmjs.com/package/socket.io-client)

[![GitHub stars](https://img.shields.io/github/stars/LockBlock-dev/unmineable.js.svg)](https://github.com/LockBlock-dev/unmineable.js/stargazers) ![npm](https://img.shields.io/npm/dm/unmineable.js)

unmineable.js is a Node.js module that allows you to easily interact with the UnMineable API and WebSocket.

• Promise based

• Performant

• 100% coverage of the UnMineable API and WebSocket

## Installation

• Download [NPM](https://www.npmjs.com/get-npm) and [NodeJS](https://nodejs.org)

With GitHub :

• Download the project or clone it

• Go to the unmineable.js folder and do `npm install`

• Require the [client.js](/src/client.js)

With NPM :

• Download the project

• Do `npm install unmineable.js`

• Require the library

## Documentation

See the [API documentation](/API.md)  
See the [WebSocket documentation](/WebSocket.md)  
See the [changelog](/CHANGELOG.md)

## Example usage

### Using the library - API

```js
const { Client } = require("unmineable.js");
//OR
import { Client } from "unmineable.js";

const client = new Client();

client.stats().then((data) => {
    console.log(data);
});

//OR

const myFunc = async () => {
    const data = await client.stats();
    console.log(data);
};

myFunc();
```

The library is async, be sure to use [async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function#syntax) or [.then()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then#syntax)

### Using the library - WebSocket

```js
const { Client } = require("unmineable.js");
//OR
import { Client } from "unmineable.js";

const client = new Client();

client.on("event", (data) => {
    console.log(data);
});

client.start("UUID"); //uiid can be found in client.wallet function
```

List of events available [here](/WebSocket.md)

## Credits

[UnMineable](https://unmineable.com)

## Copyright

See the [license](/LICENSE)
