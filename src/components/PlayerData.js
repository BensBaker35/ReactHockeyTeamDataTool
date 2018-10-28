import React from 'react'

class PlayerData extends React.Component{
    
    constructor(props){
        super(props)
        this.state = {
            player: props.player
        }
    }
    
    
    
    render(){
        console.log(this.state.player)
        return (
           
            <h2>{this.state.player.person.fullName}</h2>
        );
        
    }
}

export default PlayerData