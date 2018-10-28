import React, { Component } from 'react'

const color = ["red", "green", "yellow", "blue"];
const number = ["1", "2", "3", "4"];
const figure = ["circle", "triangle", "square", "poli"];
class Game extends Component {
    constructor(props) {
        super(props)
        this.state =
            {
                up: "",
                left: "",
                right: "",
                down: "",
                finished: false,
                doors: [false, false, false, false],
                movements: []
            }
        this.selectDoor = this.selectDoor.bind(this);
        this.sortDoors = this.sortDoors.bind(this);
    }
    selectDoor(param) {
        switch (param.target.id) {
            case "door_up":
                if (this.state.doors[0] == true) {
                    this.setState({ finished: true })
                }
                else {
                    this.state.movements.push(this.state.up);
                }
                break;
            case "door_left":
                if (this.state.doors[1] == true) {
                    this.setState({ finished: true })
                } else {
                    this.state.movements.push(this.state.left);
                }
                break;
            case "door_right":
                if (this.state.doors[2] == true) {
                    this.setState({ finished: true })
                } else {
                    this.state.movements.push(this.state.right);
                }
                break;
            case "door_down":
                if (this.state.doors[3] == true) {
                    this.setState({ finished: true })
                } else {
                    this.state.movements.push(this.state.down);
                }
                break;
            default:
                break
        }
        this.sortDoors();

    }
    sortDoors() {
        if (!this.state.finished) {
            this.state.doors = [false, false, false, false];
            this.state.doors[Math.floor((Math.random() * 4) + 0)] = true;
            this.setState({
                up: number[Math.floor((Math.random() * 4) + 0)] + "_" + color[Math.floor((Math.random() * 4) + 0)] + "_" + figure[Math.floor((Math.random() * 4) + 0)] + ".png",
                left: number[Math.floor((Math.random() * 4) + 0)] + "_" + color[Math.floor((Math.random() * 4) + 0)] + "_" + figure[Math.floor((Math.random() * 4) + 0)] + ".png",
                right: number[Math.floor((Math.random() * 4) + 0)] + "_" + color[Math.floor((Math.random() * 4) + 0)] + "_" + figure[Math.floor((Math.random() * 4) + 0)] + ".png",
                down: number[Math.floor((Math.random() * 4) + 0)] + "_" + color[Math.floor((Math.random() * 4) + 0)] + "_" + figure[Math.floor((Math.random() * 4) + 0)] + ".png"
            });
        }else{
            alert("game over");
        }
    }
    componentDidMount() {
        this.sortDoors();
    }
    render() {
        return (
            <div className="full-height" >
                <div className="col-md-12">
                    <button className="full-height" id="door_up" onClick={this.selectDoor}>{this.state.up}</button>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <button className="full-height" id="door_left" onClick={this.selectDoor}>{this.state.left}</button>
                    </div>
                    <div className="col-md-6">
                        <button className="full-height" id="door_right" onClick={this.selectDoor} >{this.state.right}</button>
                    </div>
                </div>
                <div className="col-md-12">
                    <button className="full-height" id="door_down" onClick={this.selectDoor}>{this.state.down}</button>
                </div>
            </div>
        )
    }
}

export default Game