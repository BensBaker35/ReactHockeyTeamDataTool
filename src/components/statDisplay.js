import React, { Component } from 'react';
import PlayerData from './PlayerData'
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
                    {this.displayRoster()}
                </div>
            );
        }
        else{
            return <p>Search for a team</p>
        }
    }
    displayRoster(){
        let players = [];
        let teamRoster = this.state.team.roster;
        for(var i = 0; i < teamRoster.length; i++){
            players.push(
                <PlayerData player={teamRoster[i]} key={teamRoster[i].jerseyNumber}/>
            )
        }
        return players;
    }
}

  //export default MyComponent; 
  export default StatDispaly