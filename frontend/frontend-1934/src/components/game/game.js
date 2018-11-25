import React, { Component } from 'react'
import { connect } from 'react-redux';
import { postScores, sendAI, startAI, stopAI } from '../../actions/index'

import { Button, Panel, ButtonGroup } from 'react-bootstrap'
import Modal from 'react-modal';
import '../../css/logo.css'


const color = ["red", "green", "yellow", "blue"];
const number = ["1", "2", "3", "4"];
const figure = ["circle", "triangle", "square", "poli"];
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        width: '50%',
        right: 'auto',
        bottom: 'auto',
        color: 'white',
        background: '#282c34',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },
    overlay: { zIndex: 1000 }
};
Modal.setAppElement('.container')
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
                movements: [],
                modalIsOpen: false
            }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.restartGame = this.restartGame.bind(this);
        this.selectDoor = this.selectDoor.bind(this);
        this.sortDoors = this.sortDoors.bind(this);
    }
    componentWillMount() {
        //TODO: start game
        this.props.startAI();
    }
    componentWillUnmount() {
        //TODO: Stop game
        this.props.stopAI();
    }
    openModal() {
        this.setState({ modalIsOpen: true });
    }
    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    restartGame() {
        this.setState({ modalIsOpen: false, finished: false, movements: [] }, () => {
            this.sortDoors();
        })
    }
    convertToInt(door) {
        var arr_door = door.split("_");
        arr_door[0] = parseInt(arr_door[0]);
        arr_door[2] = arr_door[2].replace(".png", "");
        switch (arr_door[1]) {
            case "red":
                arr_door[1] = 1
                break;
            case "green":
                arr_door[1] = 2
                break;
            case "yellow":
                arr_door[1] = 3
                break;
            case "blue":
                arr_door[1] = 4
                break;
        }
        switch (arr_door[2]) {
            case "circle":
                arr_door[2] = 1
                break;
            case "triangle":
                arr_door[2] = 2
                break;
            case "square":
                arr_door[2] = 3
                break;
            case "poli":
                arr_door[2] = 4
                break;
        }
        return arr_door;
    }
    selectDoor(param) {
        switch (param.target.id) {
            case "door_up":
                if (this.state.doors[0] == true) {
                    this.setState({ finished: true })
                }

                this.state.movements.push(this.convertToInt(this.state.up));
                break;
            case "door_left":
                if (this.state.doors[1] == true) {
                    this.setState({ finished: true })
                }
                this.state.movements.push(this.convertToInt(this.state.left));
                break;
            case "door_right":
                if (this.state.doors[2] == true) {
                    this.setState({ finished: true })
                }
                this.state.movements.push(this.convertToInt(this.state.right));
                console.log("Se guardo")

                break;
            case "door_down":
                if (this.state.doors[3] == true) {
                    this.setState({ finished: true })
                }
                this.convertToInt(this.state.down);
                this.state.movements.push(this.convertToInt(this.state.down));
                console.log("Se guardo")
                break;
            default:
                break
        }
        let last = this.state.movements[this.state.movements.length - 1]
        if (last) {
            let send_move = { movements: last }
            this.props.sendAI(send_move);
        }
        this.sortDoors();

    }
    sortDoors() {
        if (!this.state.finished) {
            this.state.doors = [false, false, false, false];
            this.state.doors[Math.floor((Math.random() * 4) + 0)] = true;
            let temp_up, temp_down, temp_left, temp_right
 
            this.state.doors.forEach((element, i) => {
                console.log("seh")
                console.log(this.props.generated_door)
                console.log("seh final")
                if(this.props.generated_door){
                    console.log("Esta limpio")
                    element = false
                }
                if (element) {
                    switch (i) {
                        case 0:
                            temp_up = number[this.props.generated_door[0]] + "_" + color[this.props.generated_door[1]] + "_" + figure[this.props.generated_door[2]] + ".png" 
                            break
                        case 1:
                            temp_left = number[this.props.generated_door[0]] + "_" + color[this.props.generated_door[1]] + "_" + figure[this.props.generated_door[2]] + ".png" 
                            break
                        case 2:
                            temp_right = number[this.props.generated_door[0]] + "_" + color[this.props.generated_door[1]] + "_" + figure[this.props.generated_door[2]] + ".png" 
                            break
                        case 3:
                            temp_down = number[this.props.generated_door[0]] + "_" + color[this.props.generated_door[1]] + "_" + figure[this.props.generated_door[2]] + ".png" 
                            break

                    }
                }
                else {
                    switch (i) {
                        case 0:
                            temp_up =  number[Math.floor((Math.random() * 4) + 0)] + "_" + color[Math.floor((Math.random() * 4) + 0)] + "_" + figure[Math.floor((Math.random() * 4) + 0)] + ".png"
                            break
                        case 1:
                            temp_left = number[Math.floor((Math.random() * 4) + 0)] + "_" + color[Math.floor((Math.random() * 4) + 0)] + "_" + figure[Math.floor((Math.random() * 4) + 0)] + ".png"
                            break
                        case 2:
                            temp_right = number[Math.floor((Math.random() * 4) + 0)] + "_" + color[Math.floor((Math.random() * 4) + 0)] + "_" + figure[Math.floor((Math.random() * 4) + 0)] + ".png"
                            break
                        case 3:
                            temp_down =  number[Math.floor((Math.random() * 4) + 0)] + "_" + color[Math.floor((Math.random() * 4) + 0)] + "_" + figure[Math.floor((Math.random() * 4) + 0)] + ".png"
                            break

                    }
                }
                console.log(temp_up)

            });
            this.setState({up:temp_up,down:temp_down,left:temp_left,right:temp_right})


        } else {
            let { movements } = this.state
            let completed = true
            let user_object_uid = "5bdf6ecbd712ed36e4fb67bc"
            this.props.postScores(({ movements, user_object_uid, completed }), () => {

            })
            this.props.stopAI();
            return this.gameOverPanel();
        }

    }
    gameOverPanel() {
        this.setState({ modalIsOpen: true });
        


    }
    componentDidMount() {
        this.sortDoors();
    }
    render() {
        console.log(this.state.up)
        if (this.state.up) {
            return (
                <div className="col-md-12">
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal">
                        <h2 className="text-center">{!this.state.finished ? 'Pause' : 'Game Over'}</h2>
                        <hr />
                        {
                            !this.state.finished &&
                            <ButtonGroup vertical block>
                                <Button onClick={this.closeModal}>Continue</Button>
                                <Button onClick={this.closeModal}>Scores</Button>
                                <Button onClick={this.closeModal}>Exit</Button>
                            </ButtonGroup>
                            ||
                            <div>
                                <h4 className="text-center"> Score:{this.state.movements ? this.state.movements.length : 'Error'}</h4>
                                <Button block onClick={this.restartGame}>Continue</Button>
                            </div>
                        }
                    </Modal>
                    <div className="col-md-12">
                        <Button className="float-right" onClick={this.openModal} >Log out</Button>

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
function mapStateToProps(state) {
    console.log(state)

    return {
        generated_door: state.scores
    };
}

export default connect(mapStateToProps, { postScores, sendAI, startAI, stopAI })(Game)