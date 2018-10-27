import React, { Component } from 'react';
/*
class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        visibility: false
      };
      // change code below this line
      this.toggleVisibility = this.toggleVisibility.bind(this);
      // change code above this line
    }
    // change code below this line
    toggleVisibility() {
        if(this.state.visibility === true){
          this.setState()
        }
        else{
            this.setState({
                visibility: true
            });
        }
    }
    // change code above this line
    render() {
        
      if (this.state.visibility) {
        return (
          <div>
            <button onClick={this.toggleVisibility}>Click Me</button>
            <h1>Now you see me!</h1>
          </div>
        );
      } else {
        return (
          <div>
            <button onClick={this.toggleVisibility}>Click Me</button>
          </div>
        );
      }
    }
  };
*/

class StatDispaly extends React.Component {
    constructor(props){
        super(props);
        //console.log(props);
        this.state = {
            team: props.team,
            test: props.test
        };
        this.renderTeams.bind(this);
    }
    renderTeams(teamI){
        this.setState({
            test: true,
            team: teamI
        })
    }

    componentWillReceiveProps(props){
       // console.log(props)
        //console.log(this.props);
        const {team, test} = this.props;
        if(props.test !== test ||
            props.team !== team){
            this.setState({
                team: props.team,
                test: props.test
            })
        }
        
    }


    render(){
        console.log(this.state)
       
        if(this.state.test){
            const teamID = this.state.team;
            return (
                <div>
                    <h1>{teamID.name}</h1>
                    <h3>({teamID.wins},{teamID.losses},{teamID.otl})</h3>
                </div>
            );
        }
        else{
            return <p>Search for a team</p>
        }
    }
    createTeams(test){
        console.log(test);
    }
}

  //export default MyComponent; 
  export default StatDispaly