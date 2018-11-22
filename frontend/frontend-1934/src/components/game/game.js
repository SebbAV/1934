import React, { Component } from 'react'
import { connect } from 'react-redux';
import { postScores } from '../../actions/index'

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
        this.selectDoor = this.selectDoor.bind(this);
        this.sortDoors = this.sortDoors.bind(this);
    }
    openModal() {
        this.setState({ modalIsOpen: true });
    }
    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    convertToInt(door) {
        var arr_door = door.split("_");
        arr_door[0]= parseInt(arr_door[0]);
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
                else {
                    this.state.movements.push(this.convertToInt(this.state.up));
                }
                break;
            case "door_left":
                if (this.state.doors[1] == true) {
                    this.setState({ finished: true })
                } else {
                    this.state.movements.push(this.convertToInt(this.state.left));
                }
                break;
            case "door_right":
                if (this.state.doors[2] == true) {
                    this.setState({ finished: true })
                } else {
                    this.state.movements.push(this.convertToInt(this.state.right));
                }
                break;
            case "door_down":
                if (this.state.doors[3] == true) {
                    this.setState({ finished: true })
                } else {
                    this.convertToInt(this.state.down);
                    this.state.movements.push(this.convertToInt(this.state.down));
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
                <div className="col-md-12">
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal">
                        <h2>Pause</h2>
                        <hr />
                        <ButtonGroup vertical block>
                            <Button onClick={this.closeModal}>Continue</Button>
                            <Button onClick={this.closeModal}>Scores</Button>
                            <Button onClick={this.closeModal}>Exit</Button>
                        </ButtonGroup>
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

export default connect(null, { postScores })(Game)