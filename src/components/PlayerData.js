import React from 'react'
import '../css/PlayerData.css'

class PlayerData extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            player: props.player,
            displayStat: props.displayStat,
            
        }
    }
    
    
    
    render(){
        return (
           
            <button className="PlayerButton">{this.state.player.person.fullName}</button>
        );
        
    }
}

export default PlayerData