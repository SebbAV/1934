import React, { Component } from 'react'
import { connect } from 'react-redux';
import { postScores } from '../../actions/index'

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
        } else {
            let { movements } = this.state
            let completed = true
            let user_object_uid = "5bdf6ecbd712ed36e4fb67bc"
            alert("game over");
            this.props.postScores(({ movements, user_object_uid, completed }), () => {

            })
        }
    }
    componentDidMount() {
        this.sortDoors();
    }
    render() {
        console.log(this.state.up)
        if (this.state.up) {
            return (
                <div>
                    <div className="col-md-12">
                        <button className="float-right" >Log out</button>
                    </div>
                    <div className="col-md-12">
                        <img src={require(`../../img/doors/${this.state.up}`)} id="door_up" onClick={this.selectDoor} height="450" />
                        <img src={require(`../../img/doors/${this.state.left}`)} id="door_left" onClick={this.selectDoor} height="450" />
                        <img src={require(`../../img/doors/${this.state.right}`)} id="door_right" onClick={this.selectDoor} height="450" />
                        <img src={require(`../../img/doors/${this.state.down}`)} id="door_down" onClick={this.selectDoor} height="450" />
                    </div>
                </div>
            )
        }
        else {
            return ('Loading...')
        }
    }
}

export default connect(null, { postScores })(Game)