import React, { Component } from 'react'


class Game extends Component {
    render() {
        return (
            
            <div class="grid-container">
            <div id="uno" onClick="#" style={{cursor:'pointer'}} class="item1">1</div>
            <div id="dos" onClick="#" style={{cursor:'pointer'}} class="item2">2</div>
            <div id="tres" onClick="#" style={{cursor:'pointer'}} class="item3">3</div>  
            </div>
        )
    }
}

export default Game