# uttalat
Utility to manage text messages in an application

## Bundles
A text bundle is a regular js object. It can have nested properties.

```js
const bundle = {
    headline: 'Hello World!',
    error: {
        greetingUnknown: 'No greeting found',
        remoteError: 'Could not load hello world'
    }
};
```

Add bundles to `uttalat`.

```js
import {addBundle} from 'uttalat';

addBundle(bundle);
```

The text messages can be retrieved using dot notation.

```js
import m from 'uttalat';

function HelloWorld({errorMessage}) {
    return (
        <div>
            <h1>{m('headline')}</h1>

            {errorMessage ?
                <div>{m(`error.${errorMessage}`, 'error.remoteError')}</div>
                : null
            }
        </div>
    );
}
```

## Replace variables in message

A variable can be substituted in a text message by prefixing a colon `:`.

```js
const bundle = {
    greet: ':greeting World!'
}

addBundle(bundle);

const message = m('greet', {greeting: 'Hello'}); // "Hello World!"
```

## Api

#### `uttalat(key, fallbackKey1, ..., fallbackKeyN, args)`

_get text message_

* `key [string]`: key to look for.
* `fallbackKey{1..n} [string]`: if key before is not found, check the next.
* `args [object]`: replace variables in text message with values in `args`.
* returns: `[string]` the text message found or `key` if not found.

#### `uttalat.addBundle(bundle)`

_adds a new bundle with text messages_

* `bundle [object]`: any object with text messages

#### `uttalat.getHtmlMessage(key, fallbackKey1, ..., fallbackKeyN, args)`

_get text message for use in react `dangerouslySetInnerHTML`_

Returns the text message wrapped in `{__html: '...'}`;
