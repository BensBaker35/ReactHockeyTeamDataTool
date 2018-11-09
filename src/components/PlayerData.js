import React from 'react'
import '../css/PlayerData.css'

class PlayerData extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            player: props.player,
            expand: false,
            playerData: null
        }
        this.toggleExpand.bind(this);
    }
    
    
    
    render(){
        if(!this.state.expand){
            return (
                <div>
                    <button className="PlayerButton" onClick={this.toggleExpand}>{this.state.player.person.fullName}</button>
                </div>
                
            );
        }
        else{
            console.log('expanded');
            return (
                <div>
                    <button className="PlayerButton" onClick={this.toggleExpand}>{this.state.player.person.fullName}</button>
                    <h3>Number {this.state.playerData.number}, Position {this.state.playerData.position}</h3>
                    <table>
                        <tbody>
                         {this.createStatTable()}
                        </tbody>
                        
                    </table>
                    
                </div>
                
            );
        }
       
        
    }
    toggleExpand = (event) => {
        if(this.state.expand){
            this.setState({
                player: this.state.player,
                expand: false,
                playerData: null
            })
        }
        else{
        const playerID = this.state.player.person.id;
        fetch(`http://localhost:4000/players/${playerID}`)
        .then((response)=>{
            console.log(response)
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
                  
                  return response.text().then(message => Promise.reject(message));
              }
          } else {
              response.json().then(res => {
                this.setState({
                    player: this.state.player,
                    expand: true,
                    playerData: res
                })
              })
          }
          })
        }
    }

    createStatTable(){
        let stats = this.state.playerData.stats
        let rows = [];
        
        if(this.state.playerData.position !== "G"){
            var playerHeader = 
            <tr key='header'>
                <td>Team Name</td>
                <td>Assists</td>
                <td>Goals</td>
                <td>Penalty Minutes</td>
                <td>Games</td>
                <td>Plus/Minus</td>
                <td>Hits</td>
                <td>Shots</td>
                <td>Blocked Shots</td>
                <td>Points</td>
                <td>season</td>
            </tr>
            rows.push(playerHeader);
            for(var i = 0; i < stats.length; i++){
                var stat = stats[i];
                var row = 
                <tr key={i + stat.teamName + stat.season}>
                    <td>{stat.teamName}</td>
                    <td>{stat.assists}</td>
                    <td>{stat.goals}</td>
                    <td>{stat.pim}</td>
                    <td>{stat.games}</td>
                    <td>{stat.plusMinus}</td>
                    <td>{stat.hits}</td>
                    <td>{stat.shots}</td>
                    <td>{stat.bshots}</td>
                    <td>{stat.points}</td>
                    <td>{stat.season}</td>
                </tr>
                rows.push(row);
            }
        }
        else{
            var goalieHeader = 
            <tr key="Header">
                <td>Team Name</td>
                <td>Wins</td>
                <td>Losses</td>
                <td>Ties</td>
                <td>Shutouts</td>
                <td>GAA</td>
                <td>Save%</td>
                <td>Games</td>
                <td>Shots</td>
               
                <td>Season</td>
            </tr>
            rows.push(goalieHeader);
            for(var i = 0; i< stats.length; i++){
                var stat = stats[i];
                var row = 
                <tr key={i + stat.teamName + stat.season}>
                    <td>{stat.teamName}</td>
                    <td>{stat.wins}</td>
                    <td>{stat.losses}</td>
                    <td>{stat.ties}</td>
                    <td>{stat.sot}</td>
                    <td>{stat.gaa}</td>
                    <td>{stat.svp}</td>
                    <td>{stat.gms}</td>
                    <td>{stat.shots}</td>
                    
                    <td>{stat.season}</td>
                </tr>
                rows.push(row)    
            }
            
        }
        
        return rows;
    }

}

export default PlayerData