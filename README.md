This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start` or `yarn start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

Your app is ready to be deployed.

## User Guide

As a user when one runs the app with below command, goes through below user journey
### `npm install` and `npm start`

1. User lands on login screen and sees the login credentials already passed in using formik, additionally for convenience there is a banner which indicated details to be filled in.
2. User lands to product listing page (PLP) and sees couple of products to add based on configured availability.
3. User can add any of the product and witnesses cart quantity changed and can click on the same to redirect to checkout page.
4. User sees products chosen enlisted on left side of cart/checkout page and pricing summmary on right side.
5. User can increase/decrease product quantity and delete them too from the left section.
5. User can finally checkout and see a success pop up and lands back to product listing page.
6. User has the provision to see account page too while clicking on avatar from top navbar.