# Lesson Plan: Composing Components, Props vs. State, and Component Lifcycle Methods


## Level Set (5 min)


### Purpose

"This lesson will cover some of the foundational concepts of React. Instructors will lead students in the creation of a simple geolocation app. This app will display a grapic that represents the weather in the user's current location."


### Learning Objectives
By the end of this lesson, the learners will be able to:
1. Explain the difference between props and state.
1. Make use of the Geolocation API
1. Understand the difference between stateful components and stateless functional components. 
1. Explain conditional rendering 
1. Determine when it is best to use functional components and class components. 

---

# You Do: Stateless functional Components (5 min)


### Define Stateless Functional Components
* A stateless component is usually associated with how a concept is presented to the user. It is similar to a function in that, it takes an input (props) and returns the output (react element).

### When Should We Use Stateless Functional Components?
* When we just need to present props
* When you don't need state, or any internal variables
* When you want reusable code

# We Do: Props and Components

## Props (5 min)
*Instructor: Explain the importance of props in react.js

> The purpose of this section is to discuss react.js props.

Make the following points while speaking about this topic:

### Define Props 
* Props is a special keyword in React that stands for properties. 
* Props are used for passing data from one component to another 
* Props data is read only, this means that data coming from the parent should not be changed by the child. 
* An important idea we must remember is that props are passed one way from parent to child. 

###  Components and Props (10 min)

Live code a simple stateless component for students. Be sure to let them know that this is simply a quick introduction to using props. During this demonstration re-examine the key characteristics of stateless functional components. This will be useful for when we implements stateful components in the following section. We want students to be aware of the key differences between each of the components. 

Display your screen as you do the following:

* Open Terminal and create a new react project called weather
```javaScript
npx create-react-app weather
```
* Type the following into index.js:

```javaScript
function Welcome(props) {
return <h1>Hello, {props.name}</h1>;
}

function App() {
return (
<div>
<Welcome name="Harry" />
<Welcome name="Emily" />
<Welcome name="Greg" />
</div>
);
}

ReactDOM.render(
<App />,
document.getElementById('root')
);

```
After rendering the first Welcome component ask students for input on how to implement another. Allow students to ask questions and get comfortable with the code you have created. 

# You Do: Stateful Components 

## State (5 min)
*Instructor: Explain the importance of state in react.js

> The purpose of this section is to discuss react.js state objects.

Make the following points while speaking about this topic:

### Define State & the Rules of State
* State is a JavaScript object that contains 
*  Each component can maintain its own state, which lives in an object called ```this.state```
* Updating state on a component causes the component to instantly rerender. 
* State must be intialized when a component is created.
* State can only be updated with ```setState()```

### What is a Stateful Component?
* A stateful component is always a class component.
* Stateful components are created by extending the React.Component class
* The component re-renders based on changes to its state, and can pass properties of it's state down to child components as properties on a props object. 

### When Should We Use Stateful Components?
* When building an interactive element or an element that accepts user input. 
* When a component is dependent on state for rendering , such as, fetching data before rendering. 

###  Creating Stateful Components (10 min)

Open the starter code and complete the index.js file to accompany the code that has already been provided. We are going to start by including essential imports. 

```javaScript
import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
```
Point out that we need to import the SeasonDisplay file that is included in the project's files. This file is needed to determine the messages and images that our App class will display. Be sure to mention that third party packages are listed first.

```javaScript
class App extends React.Component{
// Babel will intialize our constructor automatically 
state = {Latitude: null, errorMessage: ''};

render () {
return (

//Students will complete code to render content based on the presence of an error message and a response form the Geolocation API

        )

    }
}

ReactDOM.render(
<App />, 
document.querySelector('#root')
)
```
Make sure that learners understand that it isn't necessary to create a constructor to intialize state. Explain that Bable will do this for us in the background. We are creating a Latitude property on our state object that will hold the response from the Geolocation API. Point out that we are going to implement our first lifecycle method to house the response from the geolocation API. 

## Lifecycle Methods (10 min)

Explain that there are a many useful lifecycle methods but for the purposes of this lesson we will be focusing on constructor, render, and componentDidMount.

* Constructor: If the component is a class component the constructor is the first thing that will be called. The constructor gets called with the component props. 
Ex:
```JavaScript
class MyComponent extends Component {
constructor(props) {
super(props);
this.state = {
counter: 0,
        };
    }
}
```
Remind students that it is possible to set initial without a constructor. 

* Render: The render method is responsible for returning the JSX of our components. 

* ComponentDidMount: This method is called after we have rendered our component for the first time. By convention, code related to data loading requests will be placed here. Trying to place data loading code in the lifecycle methods prevously mentioned will create bugs.

``` javaScript

componentDidMount(){

//The user's location is fetched as soon as things start up
window.navigator.geolocation.getCurrentPosition(
position => this.setState({ Latitude: position.coords.latitude}),
//inserting a lat object to pull latitiute instead of hardcoding - SetState is a function put on our app component when we extend react.component

//Proper practice - never directly set state (must use function) / However it is ok to set state within the constructor

/*
This line of code does not occur while we are running the constructor. This is not run until the geolocation has been returned.

Steps:

1. Get the result of geolocation
2. update our state object with a call to this.setState
3. React sees that we updated the state of a component
4. React call our 'render' method a second time
5. Render method returns some (updated) JSX

Important facts:

- Anytime we update the state on a component the component will instantly rerender. 
- State must be intialized when a component is created
- State is a JS object that contains data relevant to a component.
- State can only be updated using the function 'setState'. 
- Not required to update every property under state when updating state

** App component is rendered twice in this example:
1. App returns JSX, and gets rendered to page as HTML
2. rerendered when state is updated. 
*/


//failure callback
err => this.setState({errorMessage: err.message})
);

}
```

Live code the above code and provide an explanation to learners. Make sure that students are comfortable with the material before introducing the next section.  Provide a brief explanation of conditional rendering before asking students to complete the next section. 


## Student Do: Conditonal Rendering (15 min)

* This section will involve students implementing code that will display either the SeasonalDisplay component, a loading message or an error message depending on the component's state. If the state contains an errror message and no latitude then we will return an error message. If the latitude is present and there is no error message then we will return our sesonal display (With latitude passed in as a prop). If both values are absent then we can display a loading message. 

* Bonus: Ask students if they can figure out to include conditional rendering inside of :

```JavaScript
<div className="border red">
</div>
```

## Instructor Review (10 min)

Present the completed file to learners.

```JavaScript
//helper function

renderContent(){
if (this.state.errorMessage && !this.state.Latitude){
return <div>Error: {this.state.errorMessage}</div>
}

if (!this.state.errorMessage && this.state.Latitude){
return <SeasonDisplay Latitude={this.state.Latitude}/>  
}

return <Spinner message="Coming right" />; 
}

//Must define a render method or an error will be thrown

/*
This is an example of conditional rendering. We are returning different JSX depending on the state of our component.
*/

/* This border will always be present no matter what return statement is returned. How was this done?
- A helper method was created above 
*/


render () {
return (
<div className="border red">
{this.renderContent()}
</div>
)

}
}

```
## Instructor Do: Show Solution (15 min)
* Be sure to go over this solution with the class to clear up any confusion. The purpose of this is to review the project structure and foster discussion about the solution. This is also a great time for learners to correct their code and clear up any misunderstandings. 

Open up the solution project and display it on the screen during the review session. 

1. Show the solution code for the seasonDisplay file. Give a brief explanation of this file and point out the use of functional stateless components and the props system. 
1. Discuss the code in the index.js file. Pay particular attention to the creation of a class component, intialization of state and use of various lifcycle methods. 
1. Ask learners how the solution compares to the code they created durnig class. 

## Recap (5 min)
* Go over the differences between stateless functional components and stateful components.
* Speak to students about the difference between props and state. Reassure them that everyone messes this up in the beginning. 
* Remind students about the Lifecycle methods we covered today. 









