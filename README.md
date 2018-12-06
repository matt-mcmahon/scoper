# Scoper

[CSS Modules][1] are a popular way to style your websites, but could be easier to use.

Enter, __Scoper__! 🎆

__Scoper__ takes the mapping object that tools like [WebPack][7] create when you import a CSS Module,
and creates a [Tagged Template function][2] that lets you more easily attach generated class-names onto your HTML elements.
Simply _tag_ a [template literal][4] that contains a [valid `className`][3] with the function that __Scoper__ creates for you, __Scoper__ will expand the names in the literal into their generated equivalents.


## Getting Started

Add __Scoper__ to your project using [NPM][5]:

```
> npm install --save @mwm/scoper
```

Then import it anywhere that you're using _CSS Modules_.
(You can name the import and functions anything you want.)

```jsx
import scoper from 'scoper'
```

__Scoper__ doesn't do anything on it's own;
it requires the _mapping_ object that [WebPack][7] creates when importing a CSS module.
For example, we can pass the `styles` object below as an argument to the function we imported, and __Scoper__ will return a tagging function:

```jsx
import styles from './App.module.css'
const scope = scoper(styles)
```

With our tagging function in hand, we can then apply complicated scoped class-names like this 😊:
```jsx
<div className={scope`my-class otherClass`}>
```
instead of this 😟:
```jsx
<div className={styles['my-class'] + ' ' + styles.otherClass}>
```


## React Example

This is what the `App.js` component might look like if [create-react-app][8] used _CSS Modules_ and __Scoper__ tagging.

In this example, I've combined the root `<div>` and `<header>` elements to show how adding multiple classes works.
I've also renamed the "logo" class to "animated-logo", to show-off how easy kebab class-names are to use.
Finally, the class-names that WebPack generates are configured to include the "App" prefix by default, so I removed that prefix from them.

Here's the code:

```jsx
import React, { Component } from 'react'
import scoper from 'scoper'
import logo from './logo.svg'
import styles from './App.module.css'

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




[1]: https://github.com/css-modules/css-modules
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates
[3]: https://developer.mozilla.org/en-US/docs/Web/API/Element/className
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
[5]: https://www.npmjs.com/
[6]: https://reactjs.org/
[7]: https://webpack.js.org/
[8]: https://facebook.github.io/create-react-app/
