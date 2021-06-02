# Five Second Timer

![image](https://user-images.githubusercontent.com/7864652/120560114-6d02c500-c3bf-11eb-9214-15df4634987a.png)





**Note**: If you encounter an issue while doing npm install

*Missing binding /Users/umukherjee/Documents/_CODE_KATA/_REACT_TIMER/five-second-timer/node_modules/node-sass/vendor/darwin-x64-72/binding.node
Node Sass could not find a binding for your current environment: OS X 64-bit with Node.js 12.x

Found bindings for the following environments:
  - OS X 64-bit with Node.js 10.x

This usually happens because your environment has changed since running `npm install`.
Run `npm rebuild node-sass` to download the binding for your current environment.*

Then please do `npm rebuild node-sass`

### Start the  project.

Please run npm start. The timer will appear here - ***localhost:3000***

### Run unit tests

Please run ***npm run test***. There are 2 tests which will run

## Use Cases

1. At first we can see a circle with gray background. The timer state is 'INIT'.

2. When user clicks inside the circle, the timer starts running for 5 seconds and the circle turns black in clockwise direction. The timer state is now 'RUNNING'. When 5 seconds is over,  the whole circle is black.
The timer state is now 'STOPPED'.

3. Now, if the user clicks inside the circle again, then the circle starts turning gray in anticlockwise direction. The duration is now 300 ms. The timer state is 'REVERSE'. After 300 miliseconds, the circle. will turn gray again.  The timer has been reset. The timer state is now 'INIT'.

4. Again the user can click and the timer will start running again.

5. When timer is running , if the user clicks on the circle, the timer will pause. The state is now 'PAUSED'. Now, if the user clicks the circle once again, the timer starts running again.

## Design

- I have used React hooks.

- A component 'Timer' has been created which can take 2 properties - 'baseDuration' and 'reverseDuration'. These are the times taken to start and reset the timer. This is just an example. We can use more properties as inputs.

- The above design creates a reusable component 'Timer'

- The circle has a radius of 40

## Additional Libraries used

1. **node-sass* to create sass files for better organization of CSS files

2. eslint has been used for linting

3. '@testing-library/react' has been used for unit testing

4. '@testing-library/jest-dom' has been included to use jest matchers inside unit tests.
