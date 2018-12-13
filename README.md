# Scoper

[CSS Modules][1] are a popular way to style your websites, but could be easier to use.

Enter, __Scoper__! 🎆

__Scoper__ takes the mapping object tools like [WebPack][7] create when you import a CSS Module,
and generates a [Tagged Template function][2] that you can use to easily attach the generated class-names to your HTML elements.
Simply _tag_ a [template literal][4] containing any [valid `className`][3] with that function, and __Scoper__ will expand each class-name into its generated equivalent.


## Getting Started

Add __Scoper__ to your project using [NPM][5]:

```
> npm install --save @mwm/scoper
```

Then import __Scoper__ anywhere you're using _CSS Modules_.

```jsx
import styles from './App.module.css' // our css
import scoper from 'scoper'           // Scoper!
```

__Scoper__ won't do anything on it's own;
it needs the _mapping_ object [WebPack][7] creates.
Simply pass the imported `styles` object to the `scoper` function, and __Scoper__ will return a _tag_ function (which we named "scope"):

```jsx
const scope = scoper(styles)
```

Tagging function in hand, we can apply complicated scoped classes like this 😊:
```jsx
<div className={scope`my-class otherClass`}>
```
instead of this 😟:
```jsx
<div className={styles['my-class'] + ' ' + styles.otherClass}>
```

Finally, you can call the tagging function like a normal function, too!
```jsx
<div className={scope('my-class otherClass')}>
```

## React Example

This is what the `App.js` component might look like if [create-react-app][8] used _CSS Modules_ and __Scoper__ tagging.

For this example, I've combined the root `<div>` and `<header>` elements to show how adding multiple classes works.
I've also renamed the "logo" class to "animated-logo", to show-off how easy kebab class-names are to use.
Finally, the class-names that WebPack generates are configured to include the "App" prefix by default, so I removed that prefix from them.

Here's the code!

```jsx
import React, { Component } from 'react'
import logo from './logo.svg'
import styles from './App.module.css'
import scoper from 'scoper'

const scope = scoper(styles)

class App extends Component {
  render () {
    return (
      <header className={scope`root header`}>
        <img className={scope`animated-logo`} src={logo} alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className={scope`link`}
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    )
  }
}

export default App
```

Added alternate function, `classer`.
You can use the _classer_ named export in React apps to avoid typing out <code>className={scope\`whatever\`}</code>.
Instead, combine classer with the spread operator for less typing:

```js
const className = classer(someImportedCSSModule)
const someJSX = <div {...className`something`} />
```

For example:

```jsx
import React, { Component } from 'react'
import logo from './logo.svg'
import styles from './App.module.css'
import { classer } from 'scoper'

const className = classer(styles)

class App extends Component {
  render () {
    return (
      <header {...className`root header`}>
        <img {...className`animated-logo`} src={logo} alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          {...className`link`}
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    )
  }
}

export default App
```


[1]: https://github.com/css-modules/css-modules
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Element/className
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[5]: https://www.npmjs.com/
[6]: https://reactjs.org/
[7]: https://webpack.js.org/
[8]: https://facebook.github.io/create-react-app/
