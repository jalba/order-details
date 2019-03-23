# Order Details

This is a simple example of an order details page, with it you can add, edit or remove items on the order as well as placing the order.

I decided to bootstrap the project with [Create React App](https://github.com/facebook/create-react-app), as it offers a really easy way to run your app, as well as the chance to have a very optimized build for production (See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information).

Data management is done with the hel of Redux and Redux Sagas.

To simulate the api calls I used Promises that resolve with a dummy payload.

If you want to see how I do error handling for those fake api calls, you need to uncomment either of these lines:

- line 53 in `src/sagas/orderSaga.js`
- line 50 in `src/sagas/productSaga.js`

## Installing and running the app

To install the depencencies, simply run `npm install` or `yarn install`
tu run `npm start` or `yarn start`. It should open a browser in http://localhost:3000