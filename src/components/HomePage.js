import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GamePage from './GamePage.js';

class HomePage extends Component {
  constructor() {
    super();
    this.hasClickedToPlay = this.hasClickedToPlay.bind(this)
  }

  hasClickedToPlay() {
    fetch("http://localhost:8080/api/games", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p1_position: [2,5],
        p2_position: [1,3],
        p1_guesses: [3,1],
        p2_guesses: [7,3],
        game_finished: false,
      })
    }).then((res) => {
      return res.json()
    }).then((json) => {
      console.log(json)
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <img id="homepage-ship" src="https://static-pss-eu.wgcdn.co/shop/media/items/1c/b1/1cb113ec539d47dcb26f8d06cbb132b8.png" alt="battleship-image"/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Link to={ './gamepage' } onClick={ () => this.hasClickedToPlay()} className="btn btn-outline-success btn-lg">ENTER</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
