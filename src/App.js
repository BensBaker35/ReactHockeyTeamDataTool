import React, { Component } from 'react';
import './App.css'
import StatDisplay from './components/statDisplay';
import NHLTeams from './utils/NHLTeams.json';


class App extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      team: '',
      test: false,
      error: false,
      teamMeta: '',
    }
    this.teamArr = NHLTeams.teams;
  }

  render() {
    //console.log(this.state);
    if(this.state.error){
      return(
        <div className="App">
        <form onSubmit={this.lookUpTeam}>
        <input type = {'text'} placeholder={'Your name Here'} value={this.state.name}
            onChange={this.handleNameChange} />
            <input type="submit" value="submit" className="submit"/>
        </form>
          <h1>Something went wrong try again</h1>
          <h1>Look Up {this.state.name}</h1>
          <StatDisplay team = {this.state.team} test={false}/>
        </div>
        );
    }
    if(this.state.test){
      return(
      <div className="App">
      <form onSubmit={this.lookUpTeam}>
      <input type = {'text'} placeholder={'Your name Here'} value={this.state.name}
          onChange={this.handleNameChange} />
          <input type="submit" value="submit" className="submit"/>
      </form>
        <StatDisplay team = {this.state.team} test={true} teamColor={this.getTeamColor()}/>
      </div>
      );
    }
    else{
      return (
     
        <div className="App">
        <form onSubmit={this.lookUpTeam}>
        <input type = {'text'} placeholder={'Your name Here'} value={this.state.name}
            onChange={this.handleNameChange} />
            <input type="submit" value="submit" className="submit"/>
        </form>
          <h1>Look Up {this.state.name}</h1>
          <StatDisplay team ={this.state.team} test ={false} teamColor={null}/>
        </div>
        
      );
    }
    
    
  }
  handleNameChange = (event) => {
    const value = event.target.value;
    this.setState({
      name: value
    })
  }
  lookUpTeam = (event) => {
    this.setState({
      name:'',
      team:'',
      test: false,
      error: false
    })
    event.preventDefault();
    //console.log(this.state.name);
    const teamID = this.convertInput(this.state.name.toLowerCase());
    //console.log(teamID);
    if(teamID === -1){
      this.setState({
        name: '',
        team:'',
        test: false,
        error: true
      })
    }else{
      fetch(`http://localhost:4000/teams/${teamID}`)
    .then((response)=>{
      console.log(response);
      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType.includes('json')) {
            console.log('JSON Error');
            this.setState({
              name: this.state.name,
              team: '',
              test: false,
              error: true,
              
            })
            return response.json().then(error =>{
                console.log(error)
                Promise.reject(error.message)
            });
            
        } else {
            console.log('Message Error');
            this.setState({
              name: this.state.name,
              team: '',
              test: false,
              error: true
            })
            return response.text().then(message => Promise.reject(message));
        }
    } else {

        response.json().then(res => {
          
          this.setState({
            name: this.state.name,
            team: res,
            test: true,
            error: false
          })
        })
    }
    })
    }

    
  }
 

  convertInput(name){
    
    
    for(var i = 0; i < this.teamArr.length; i++){
      var team = this.teamArr[i];
      //console.log(team);
      if(name === team.name.toLowerCase()){
        return team.id
      }
      else{
        for(var j = 0; j < team.shorthand.length; j++){
          
          var shortName = team.shorthand[j].toLowerCase();
          if(shortName === name){
            return team.id
          }
        }
      }
    }
    return -1;
   
  }

  getTeamColor(){
    var teamID = this.state.team.id;
    if(teamID !== undefined){
      console.log(teamID);
      
      var teamElement = this.teamArr.find((element)=> {
        return (element.id === teamID) ? element.color : false
      })
      /*for(var i = 0; i < this.teamArr.length; i++){
        if(this.teamArr[i].id === teamID){
          element = this.teamArr[i]
        }
      }*/

      console.log(teamElement);
      return teamElement.color;
    }
    return -1;
   
  }




}

export default App;
