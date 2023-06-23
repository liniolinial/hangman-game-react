import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
// import { randomWord } from "./words";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };
  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0,
      guessed: new Set(),
      answer: undefined,
      limit: false,
      words: undefined,
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.restart = this.restart.bind(this);
  }
  async componentDidMount() {
    const words = await this.fetchWords();
    console.log(words);
    this.setState({
      ...this.state,
      answer: this.randomWord(words),
      words,
    });
  }
  async fetchWords() {
    const request = await fetch("http://localhost/");
    return await request.json();
  }
  randomWord(words) {
    return words[Math.floor(Math.random() * words.length)];
  }
  restart() {
    if (this.state.limit === true) {
      this.setState({
        ...this.state,
        answer: this.randomWord(this.state.words),
        limit: false,
        nWrong: 0,
        guessed: new Set(),
      });
    } else {
      return;
    }
  }
  guessedWord() {
    if (this.state.limit === false && this.state.answer) {
      const guessedWord = this.state.answer
        .split("")
        .map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"))
        .join("");
      if (guessedWord === this.state.answer) {
        return "YOU WIN!";
      } else {
        return guessedWord;
      }
    } else {
      return this.state.answer;
    }
  }
  handleGuess(evt) {
    if (this.state.limit) {
      return;
    }
    let ltr = evt.target.value;
    const checkLossCondition = () => {
      const { maxWrong } = this.props;
      if (this.state.nWrong > maxWrong) {
        this.setState({
          limit: true,
        });
      }
    };
    this.setState(
      (st) => ({
        guessed: st.guessed.add(ltr),
        nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
      }),
      checkLossCondition,
    );
  }
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}>
        {ltr}
      </button>
    ));
  }
  render() {
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        {!this.state.limit && (
          <img src={this.props.images[this.state.nWrong]} />
        )}
        {this.state.limit && <p>YOU LOSE ㅠ_ㅠ</p>}
        {this.state.limit && (
          <button id='reset' onClick={this.restart}>
            Restart?
          </button>
        )}
        <p>Guessed wrong: {this.state.nWrong}</p>
        <p className='Hangman-word'>{this.guessedWord()}</p>
        <p className='Hangman-btns'>{this.generateButtons()}</p>
      </div>
    );
  }
}
export default Hangman;
