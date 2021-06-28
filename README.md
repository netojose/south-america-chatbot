# South America chatbot

Production url: https://south-america-chatbot.vercel.app

Source code: https://github.com/netojose/south-america-chatbot

# Used technologies

- [React](https://reactjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Create React App](https://create-react-app.dev)
- [Jest](https://jestjs.io)
- [React Hook Form](https://react-hook-form.com)
- [React Router](https://reactrouter.com)
- [TypeScript](https://www.typescriptlang.org)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [Webpack](https://webpack.js.org)

# Project hosting

This project is hosted on Vercel.

# Tests

![Application tests](https://i.ibb.co/42X8rtS/Screenshot-2021-06-27-at-23-19-37.png 'Application tests')

# Build setup

```bash
# install dependencies
$ yarn

# run application in development mode
$ yarn start

# run tests
$ yarn test

# build for production
$ yarn build
```

The **build** command generate production files under `build` sirectory

# About the project

This was my second contact with [Tailwind CSS](https://tailwindcss.com), and I liked of the result. I decided to learn something new while creating this challenge, instead of use tools I already familiar with. Normally for this case, I use some CSS in JS approach for styling. The application is responsive, of course. Another new tool I tested, was [Redux Toolkit](https://redux-toolkit.js.org), the official, opinionated, batteries-included toolset for efficient Redux development, created by Redux Team.

For change app state, I use immutable operations (to not to mutate the state, and because it is one of the principles of Redux), but Redux Toolkit uses [Immer](https://github.com/immerjs/immer), and this package works in a different approach, I need to make operations causing mutations, but this is not in a Redux state, is just a draft, and this package uses my draft to create a new state, using the [copy-on-write](https://en.wikipedia.org/wiki/Copy-on-write) mechanism. I'm saying this, because if you see my code mutatin some objects, knows this is correct and expected by Redux Toolkit.

# To do

- Improve the modal (add autofocus on the first modal element and avoid focus on elements behind of modal) or use a third-party modal (I already have a modal component [published on npm](https://www.npmjs.com/package/@netojose/react-modal)). For this test, I have chosen to create a modal, just to explore more React features (like portal), and the communication between some components.
- Write intgration tests for testing all process (I like to use [Cypress](https://www.cypress.io/)).
- On unit tests, test components that haven't been tested yet.
- Write stores on Storybook.
