import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlayerGrid from './PlayerGrid';
import OpponentGrid from './OpponentGrid';
// import OutcomePage from './OutcomePage';

class GamePage extends Component {
  constructor() {
    super();
    this.state = {
      p1_positions: [],
      allGuesses: ["A1", "A3", "B3", "C3", "B1", "C1", "D6", "E6", "D7", "G7", "A2", "B2"],
      clickedStartGame: false,
      playerBoxesClicked: [],
    }

    this.hasClickedToPlay = this.hasClickedToPlay.bind(this);
  }

  componentDidMount() {
    console.log("My game ID is:", this.props.match.params.game_id);
  }

  sendBoxClick(row, column) {
    this.setState({
      playerBoxesClicked: this.state.playerBoxesClicked.concat([[row, column]])
    })
    console.log(this.state.playerBoxesClicked);
  }

  hasClickedToPlay() {
    let currentGameID = this.props.match.params.game_id;
    fetch(`http://localhost:8080/api/games/${currentGameID}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        p1_positions: this.state.playerBoxesClicked
      })
    }).then((res) => {
      return res.json();
    }).then((updatedPlayerShips) => {
      console.log("p1_position ships updated with - ", updatedPlayerShips);
    });
    
    this.setState({
      clickedStartGame: true
    });
  }


  render() {

    const gameStarted = this.state.clickedStartGame;
     
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>Stay out of hot water!</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <h2>Your gameboard</h2>
            <PlayerGrid sendBoxClick={this.sendBoxClick.bind(this)} />
          </div>
          {gameStarted ? (          
            <div className="col-md-6">
              <h2>Sink your enemy</h2>
              <OpponentGrid />
            </div>
            ) : (
            <div className="col-md-6">
              <h2>Place your battleships!</h2>
              <h5>Click the squares on your board to place your ships then click 'Start Game'</h5>
              <button className="btn btn-outline-success" onClick={ this.hasClickedToPlay }>Start Game</button>
            </div>
          )}
        </div>

        <div className="row">
          <div className="col-md-6">
            <h2>High Scores</h2>
            <hr/>
              <ul>
                <h4>KJE - 850</h4>
                <h4>SJD - 740</h4>
                <h4>DBP - 720</h4>
                <h4>AML - 690</h4>
              </ul>
          </div>

          <div className="col-md-6">
            <h2>Guesses</h2>
            <hr/>
            <div className="row">
              {this.state.allGuesses.map((eachGuess, idx) => {
                return <div key={ idx } className="col-md-4">
                  <h3>{eachGuess}</h3>
                  </div>
                })
              }
            </div>
          </div>
        </div>
        <Link to={ '/' } className="btn btn-outline-info btn-lg">Return Home</Link>
        <Link to={ '/' } className="btn btn-outline-danger btn-lg">Quit Game</Link>
      </div>
    )
  }
}

export default GamePage
