import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

//Used to determine the user's physical location - Makes use of the Geolocation API

//subclassing React.component - created a new instance of the app component
class App extends React.Component{
  // Babel will intialize our constructor automatically 
    state = {Latitude: null, errorMessage: ''};

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

    }r

    //helper function

    renderContent(){
        if (this.state.errorMessage && !this.state.Latitude){
            return <div>Error: {this.state.errorMessage}</div>
        }

        if (!this.state.errorMessage && this.state.Latitude){
            return <SeasonDisplay Latitude={this.state.Latitude}/>  
        }

            return <Spinner message="Coming right up!" />; 
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

ReactDOM.render(
    <App />, 
    document.querySelector('#root')
)