# Comprehensible Guide to testing with Jest and Enzyme

Test-driven development (TDD) is a practice in software development in which tests are programmed before beginning to work on the actual software. As use cases are defined in the tests, programmers are able to implement the logic of the code so that the tests go from failing tests (red) to passing tests (green), this is known as the Red/Green cycle.
  
# Table of contents

1. [Introduction](#introduction)
2. [Types of tests](#types)
3. [Testing Goals & Tradeoffs](#tradeoffs)
4. [Abstractions](#abstractions)
5. [Redux Planning](#redux-planning)
6. [Redux Thunk Tests](#redux-thunk-tests)
7. [Asynchronous Action Creators](#asynchronous-action-creators)
8. [Redux Components (connected components and Redux)](#redux-components)
9. [Mocking functions and React Hooks with `Jest.fn()`](#mocking-functions-and-hooks)
10. [Sample Repositories](#sample-repositories)

---

## Introduction <a name="introduction"></a>

**Why do tests, when they take so much effort?** Any extra time that is spent building the app, is saved in time that it would take maintaining the app. Time is also potentially saved because the app is being built more efficiently. By applying test-driven development (TDD), planning ahead of time must be done, which results in fewer false starts. Finding bugs through automated tests is more efficient than having to run the app and manually debug. Any time there are changes to the code, the tests should be run to see if there are any new bugs. By following this methodology, the code and/or software application will end up:

-   Well planned.
-   Easier to maintain.
-   Fewer bugs.
-   More happy customers.

## Types of Tests<a name="types"></a>

 -   **Unit tests:**
	 -   Tests one piece of code (usually one function). It's very granular.
-   **Integration tests:**
	-   How multiple units work together (lock and door + lock example, a lock can work well by itself, but it might not keep a door from opening).
-   **Acceptance / End-to-end (E2E) Tests**
	-   How a user would interact with an app and simulate user interaction in a browser.

## Testing Goals & Tradeoffs<a name="tradeoffs"></a>

 **Goal #1: Easy diagnosis of failing tests:**
 
-   **Efficiency and maintainability**
-   We want tests to be easy to maintain
-   Ideally, tests shouldn't be rewritten after a refactor. Otherwise, it's not a refactor, but a change
-   **Test what the app should do (behavior, not how the app works (implementation)**
	-   If implementation changes, the tests will remain the same
		-   Testing implementation is brittle (easily broken when the app still works)
-   **Example of Feature Testing:**
	-   We want to test an app that keeps a counter of button clicks.
	-   The onClick function for buttons call the incrementCounter function.
	-   Counter display increments by one.
	1.  In a behavior test we would:
		-   Set initial state
		-   Simulate button click
		-   Check if the displayed count is incremented by one
	2.  In an implementation test we would:
		-   Set initial state
		-   Simulate button click
		-   Check to see if a particular function was called
-   **Why is implementation brittle?**
	-   Testing implementation (function name)
	-   Not behavior (display update)
	-   Because the particular function can change. Instead of a particular function, we can use an inline function. The app will still work & have the same correct behavior, but the implementation test will fail.

**Goal #2: Easy diagnosis of failing tests:**

-   Tests should be as granular as possible. The more complexity, or steps  covered in a test, it will result in more time spent diagnosing in which step the test is failing. If we add a test for each step, making tests more granular, it results in higher efficiency.
-   Features to test on a shopping cart for custom T-shirt:
	-   Select t-shirt style
	-   Select size
	-   Select color
	-   Select number of shirts to order
	-   Type in text to put on shirt
	-   Etc.
	-   Add to cart
-   **Difficult to diagnose test:** Test that the cart has the correct contents **after the entire process is finished**. It's difficult because if it fails, where did the stop go wrong? Which step is causing the test to fail? Time to investigate will be spent, efficiency is wanted in diagnosing failing tests.
-   **Easy to diagnose test:**
-   After each user action, do a test.
-   Test expected internal state change.
-   Alternatively, test that a particular function was called.

### The tradeoff when doing more granular tests:

**Testing state or function calls is considered testing implementation**, which is often unwanted because it's brittle.

1.  Granular unit testing leads to:
	-   Ease of diagnosis.
	-   Brittle tests.
2.  Broader integration testing leads to:
	-   More robust tests.
	-   More difficult to find out what caused failure.

**Keep in mind:**

-   Testing is an art, not science.
-   Sometimes it's better to optimize for ease of diagnosis.
-   Sometimes it's' better to optimize for less brittle tests.
-   **Find a balance between the two.**
-   The team will determine what works best in particular scenarios.

## Abstractions<a name="abstractions"></a>

Depending on your code style, it may be benefitial to abstract certain tests and operations that happen very frequently during tests, such as finding components, and checking if the component prop types are correctly set up by comparing them to an object made of expected props. Here are some examples:

1. `findByTestAttr`:
	- Returns a `ShallowWrapper` containing node(s) with the given data-test value/attribute.
		```jsx
		/**
		* Return ShallowWrapper containing node(s) with the given data-test value.
		* @param  {ShallowWrapper}  wrapper - Enzyme shallow wrapper to search within
		* @param  {string}  val - Value of data-test attribute for search.
		* @returns  {ShallowWrapper}
		*/
		export  function  findByTestAttr(wrapper, val) {
			return wrapper.find(`[data-test="${val}"]`);
		}
		```
2. `checkProps`:
	- Takes some expected props and see whether or not they would throw a warning. The general idea is to give expected props to be good, and make sure they do not throw a warning.
		```jsx
			/**
			* Takes some expected props and see wether or not they would throw a warning.
			* The general idea is to give expected props to be good, and make sure they
			* do not throw a warning.
			* @param  {React.Component}  component - React component with propTypes property.
			* @param  {object}  conformingProps - Expected props object.
			* @returns  {void}
			*/
			export  function  checkPropTypes(component, conformingProps) {
				const  propError  =  checkProps(
					component.propTypes,
					conformingProps,
					'prop',
					component.name,
				);
				expect(propError).toBeUndefined();
			}
		```	
3. It's possible to configure the Enzyme adapter to abstract the adapter configuration for every ran test within the root directory for create-react-app applications with a filed name `setupTests.js`, the relative path of such file would look as `src/setupTests.js`, and in a `jest.config.js` file for the rest.
4. It's not recommended to abstract `setup()` because it's too different for each component.
5. **Caution:** too many abstractions results in hard-to-read tests.

### Configuration of setupTests.js:

```jsx
// Libraries
import  Enzyme  from  'enzyme';
import  EnzymeAdapter  from  'enzyme-adapter-react-16';

Enzyme.configure({
	adapter: new  EnzymeAdapter(),
	disableLifecycleMethods: true,
});
```

## Redux Planning<a name="redux-planning"></a>

### General Planning

1.  Review the components in the app, to see how do they interact with state.
	-  Optionally, write down a list of which variables will they select from the store.
2.  Develop a Redux State so that none of the components have to interact with their common parent components.
	-  Map every state variable in a table.
	-  Include their keys, data types, description, and starting value. Planning is everything.
3.  Define the flow for each state variable.
	-  Define action creators, reducers, etc., for each state variable.
	-  If you need to trigger action creators simultaneously, consider using middleware such as Redux Thunk. If asynchronous action creators are needed, consider middleware such as Redux Saga.
4.  Test action creators & actions.
	-  Moxios is good to test Axios requests.
5.  Test state and action creator props in the app components.
6.  Test action creator calls from the app components (e.g. from event handlers).

### Redux State Planning (and Tests)

1.  Action creator for each of the state variable actions.
	-  Normally only the output of the action creators are tested.
2.  A reducer for the state variable(s).
	1.  Normally, a test is done for each possible outcome depending on action types.
	2.  What pieces of state will the reducer control?
	3.  What is the initial value of the state?
	4.  To which values can it change to?
	5.  Upon what actions will the state value change?

### Recommendations:

-   Create a `storeFactory` utility function which creates a testing store with app reducers.
-   Add middlewares to the `storeFactory`.
-   Add this store as a prop to the connected components, so that it's possible to avoid using the Providers.
-   Use `shallow` to create a virtual DOM of the component, then use the Enzyme `.dive()` method to get to the child components (below the connect HOC from redux).
-   Use the actual store, not a mock store.
	-   Redux-mock-store can test intermediate actions such as loading while waiting for AJAX.
	-   Can't test changes to state.
-   The actual store is closer to the app, mock are always one step removed.

#### `storeFactory` example:

```jsx
// Libraries
import { createStore, applyMiddleware } from  'redux';  

// Dependencies
import  rootReducer  from  'reducers';
import { middlewares } from  'configureStore';

/**
* Create a testing store with imported reducers, middleware, and initial state.
* globals: rootReducer, middllewares
* @param  {object}  initialState - Initial state for the store.
* @function  storeFactory
* @returns  {Store} - Redux Store
*/
export  function  storeFactory(initialState) {
	const  createStoreWithMiddleware  =  applyMiddleware(...middlewares);
	return  createStore(rootReducer, initialState, createStoreWithMiddleware);
}
```

### Test with non-connected component to avoid using dive?

-   You can export the component before it's connected.
-   Basically, only the component class.
-   Redux testing docs actually recommend doing this (using the unconnected component for tests).
-   But Enzyme does not recommends this, Enzyme strongly recommends using the connected component, then using the dive method.

### Connected vs Non-connected Components:

-   Connected component:
	-   Closer to app.
	-   Can work with store.
-   Non-connected component:
	-   Further from app.
	-   Can pass mock action creators as props.

## Redux Thunk Tests<a name="redux-thunk-tests"></a>

### What to do with store?

1.  We can run the dispatch method `store.dispatch()`.
	-  Takes an action creator and is taken to the store.
2.  We can run the get state method `store.getState()`.
	-  Returns the state object.
	-  Useful for assertions, e.g. `expect(storeState).toEqual(object)`.

### Testing a Thunk

1.  Create a store with an initial state.
2.  Dispatch action creator with the store dispatch method.
3.  Check the state using the Jest `toEqual` method and compare it to the expected state.

This is integration testing, because we are testing action creators and reducers together. It's recommended to make an integration tests folder and add files for the wanted tests.

The idea is to do represent the "code paths" that the combinations of action creators and reducer can happen, and test each of those conditions. When the conditions of the action creators and the state are mapped, these can be represented through a matrix, and every combination is worth testing.

## Asynchronous Action Creators<a name="asynchronous-action-creators"></a>

### First things to keep in mind:

1.  Create store using `storeFactory()`.
2.  Asynchronous actions: `store.dispath()` returns promise.
3.  Put tests in a `.test()` callback.
	-  Tests will run after dispatcher completes.

### Important:

1.  `moxios.wait()` is asynchronous.
2.  **Very important than ever to see tests fail.**
3.  Very easy for tests to complete before asynchronous actions are completed.
4.  **Tests can pass even though assertion fails.**

### Common Test:

1.  Create a store with initial state.
2.  Dispatch action creator using `store.dispatch()`
	-  The dispatch method `store.dispatch()` returns a `Promise`.
	-  Check state inside `.then()` callback.
3.  It's important to see the tests fail for the first time. If they don't, `store.dispatch()` was likely not returned as a promise. Any errors that are inside a `Promise` callback from the dispatch method that was not returned won't be caught by Jest because the test will have already completed.
4.  We use moxios to configure the axios adapter to use moxios, and not http.
	-  This way, we can write moxios responses to mock server responses. This is a way to test action creators that use axios without having the server running.
	- 
## Redux Components (connected components and Redux)<a name="redux-components"></a>

### Two characteristics are tested:

1.  Test the props that the components receive. To function properly, do they have access to:
	-  The state that they need?
	-  The action creators they need?
2.  Use mocks to "spy" on action creators. Are they called when expected?
	-  E.g. fetching methods when the App mounts.
	-  Fetching methods when a submit button is clicked?
	-  Are these methods called with the right arguments?

### What is a mock function?

-   It's a fake function that runs in place of a real function.
	-   Can run alternate code or just serve as a placeholder to the real function.
-   Jest replaces the real functions with mocks.
-   Can assert on:
	-   How many times the mock ran during tests (call counts).
	-   What arguments it was called with.

### Testing Action Creator Calls

-   Export the unconnected component.
	-   Best way to mock action creator functions.
-   Pass the action creator via props.
	-   Get function from props instead of Redux connect.
	-   Mock and check that it runs.
-   Disable the lifecycle methods during tests by passing the configuration settings to the Enzyme configuration method `.configure()`.
	-   If an action creator needs to be tested inside a lifecycle method, e.g. executing an action creator inside `componentDidMount()`, then access the component instance inside the test, and then access any of the lifecycle methods, for example: `wrapper.instance().componentDidMount();`.


## Mocking functions and React Hooks with `Jest.fn()` <a name="mocking-functions-and-hooks"></a>

### What is a mocked function?

-   Fake function that runs instead of a real function.
	-   Can run alternate code, or just act as a placeholder.
-   **Jest replaces the real function with mock**.
-   Can assert on:
	-   How many times mock ran during tests.
	-   With what arguments did it receive.
-   In Redux, usually mock functions are only spied.
-   In Hooks, usually functions are mocked (replaced).
	-   These replacement functions will return values.
-   Mocks serve three purposes:
	-   Prevent side-effects like network calls.
	-   Spy on the function to see when it's called.
	-   Provide return values, to set up test conditions.
		-   For example, provide return values for set state of Hooks.

### Mocking Hooks in Jest

-   Reset properties on modules to replace functions with mocks
-   This means no destructuring on imports in non-test code
-   Don't test that React's Hooks work properly
	-   That's React's job!
-   **Instead, test that the Hooks are used properly (implementation)**
-   Will trigger update with Enzyme `setProps()`
	-   `update()` doesn't trigger `useEffect()`
	-   GitHub Issue link: [https://github.com/airbnb/enzyme/issues/2254](https://github.com/airbnb/enzyme/issues/2254)
		```jsx
		// This will work
		import  React  from  'react';
		…
		const  language = React.useContext(LanguageContext);

		// This will not work
		import  React, { useContext } from  'react';
		…
		const  language = useContext(LanguageContext);
		```

### Mocking `useState`

1.  Do not use` useState` twice.
	1.  Very difficult to test.
	2.  Need to mock `useState` to set state, for each state/usage.
	3.  If it runs 2 or more times, it will be brittle.
		1.  Need to specify order of return values in mock.
		2.  Changes in the order of the code will break tests.
2.  Mock the `React.useState` function to return the desired values, or to set the desired values of the state.
	1.  First item: value.
	2.  Second item: Function to set value.
	3.  Mock should be an array containing these two items.

### Mocking `useEffect`

1.  Use `mount`.
	1.  `useEffect` is not called on `shallow`.
	2.  GitHub issue link: [https://github.com/airbnb/enzyme/issues/2086](https://github.com/airbnb/enzyme/issues/2086)
2.  Setup mock in `setup()`.
	-  Scope mock globally.
3.  Clear mock in `setup()`, or in `afterEach`.
	-  Mock tracks calls cumulatively until reset.
4.  Mock the action inside the `useEffect`.
5.  Setup and/or update component (e.g. props) if necessary.
6.  Run assertion.

### Mocking `useReducer`

1.  Mock `useReducer` to set the value of the secret word.
2.  `useReducer` returns an array:
	1.  First item: Reducer's state value.
	2.  Second item: Reducer's dispatch function.
3.  Mock has to return an array:
	1.  First item: desired state value.
	2.  Second item: `jest.fn()` mock.

### Mocking `useContext`

1.  Mock `useContext`
	-  Mock return value.
		1.  Pros:
			-  Isolated unit test:
				-  Does not rely on other functionality.
				- Can use shallow (isolate from children components).
		2.  Cons:
			-  Multiple `useContext` mocks are dangerous:
				-  Specify order of return values.
				-  Very brittle.
				-  Not relevant for custom hook/internal state pattern.
2.  Wrap component in Provider in test setup function.
	-  Set context value with props:
		1.  Pros:
			-  Closer to actual app.
			-  Extra functionality (Provider) unlikely to fail.
		2.  Cons:
			-  Need to use `mount`.
			-  `shallow` just returns Provider.
			-  Tests depend on children of component under test.
3.  Spot-check, no not always needed to check everything, rather, check if the wiring is in place.
4.  If using a custom hook that returns the context, test if the hook throws an error if it's being used outside the provider.
	-  Use Jest `toThrow()` assertion.
		-  Takes function as argument.
		-  Fails the test if function does not throw.

## Sample Repositories<a name="sample-repositories"></a>

1. `react-testing`: [https://github.com/rmolinamir/react-testing](https://github.com/rmolinamir/react-testing)
	- Instructions:
		1. Fork or clone the repository.
		2. Install the dependencies by typing `npm install` into the CLI.
		3. Run the app by typing into the CLI `npm start`.
		4. Run tests by typing into the CLI `npm test`.
		5. Navigate to the `random-word-server` folder through the CLI, install the dependencies by running `npm install`, then start the server by typing `npm start`. **This is necessary to run network requests of the app.**
			- If you are running into trouble due to not being able to have 2 applications under the same folders (because of the `package.json` files), simply place the `random-word-server` folder into an upper directory.
