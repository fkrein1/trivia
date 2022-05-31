import React from 'react';
import { connect } from 'react-redux';
import getAsk from '../services/getAsk';
import { updateScore } from '../redux/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      trivia: [],
      currentQuestion: 0,
      disabledQuestion: false,
      timer: 30,
      correctAnswersIndex: [],
      allAnswers: [],
      setIntervalId: 0,
    };
  }

  async componentDidMount() {
    await this.getTrivia();
  }

  componentWillUnmount() {
    const { setIntervalId } = this.state;
    clearInterval(setIntervalId);
  }

  getTrivia = async () => {
    const { history, difficulty, category } = this.props;
    const token = localStorage.getItem('token');
    if (token === null) return history.push('/');
    const API_ASK = await getAsk(token, difficulty, category);
    const tokenInvalid = 3;
    if (API_ASK.response_code === tokenInvalid) {
      localStorage.removeItem('token');
      return history.push('/');
    }
    const tokenValid = 0;
    if (API_ASK.response_code === tokenValid) {
      this.setState({ trivia: API_ASK.results });
      this.setTimer();
      this.setAnswers();
    }
  }

  setTimer = () => {
    const { timer } = this.state;
    const oneSecond = 1000;
    let counter = timer;
    const setIntervalId = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
      counter -= 1;
      if (counter === 0) {
        clearInterval(setIntervalId);
        this.setState({
          disabledQuestion: true,
        });
      }
    }, oneSecond);
    this.setState({ setIntervalId });
  }

  setAnswers = () => {
    const { trivia } = this.state;
    const correctAnswersIndex = [];
    trivia.forEach((question) => {
      const max = question.incorrect_answers.length;
      const random = Math.floor(Math.random() * (max - 0 + 1) + 0);
      correctAnswersIndex.push(random);
    });

    const allAnswers = [];
    trivia.forEach((question, index) => {
      const wrongAnswers = [...question.incorrect_answers];
      wrongAnswers.splice(correctAnswersIndex[index], 0, question.correct_answer);
      allAnswers.push(wrongAnswers);
    });
    this.setState({ correctAnswersIndex, allAnswers });
  }

  renderAnswers = () => {
    const {
      correctAnswersIndex,
      allAnswers,
      currentQuestion,
      disabledQuestion,
    } = this.state;
    const correct = correctAnswersIndex[currentQuestion];
    return (
      allAnswers[currentQuestion]
        .map((answer, ind) => (
          <button
            key={ ind }
            type="button"
            data-testid={ this.dataTestAnswer(ind, correct) }
            className={ this.btnAnswerStyle(ind, correct) }
            onClick={ this.answerClick }
            disabled={ disabledQuestion }
          >
            { this.decodeHTMLEntities(answer) }
          </button>
        ))
    );
  }

  dataTestAnswer = (index, correct) => {
    if (index === correct) {
      return 'correct-answer';
    } if (index > correct) {
      return `wrong-answer-${index - 1}`;
    } return `wrong-answer-${index}`;
  }

  btnAnswerStyle = (index, correct) => {
    const { disabledQuestion } = this.state;
    if (disabledQuestion && index === correct) return 'correct-btn';
    if (disabledQuestion && index !== correct) return 'incorrect-btn';
  }

  answerClick = ({ target }) => {
    const { setIntervalId } = this.state;
    clearInterval(setIntervalId);
    this.setState({
      disabledQuestion: true,
    }, this.calculateScore(target));
  }

  calculateScore = ({ dataset: { testid } }) => {
    if (testid !== 'correct-answer') return;
    const { trivia, currentQuestion, timer } = this.state;
    const { score, assertions, dispatch } = this.props;
    const question = trivia[currentQuestion];
    const difficulty = ['easy', 'medium', 'hard'];
    const difficultyMultiplier = difficulty.indexOf(question.difficulty) + 1;
    const basePoints = 10;
    const newScore = score + basePoints + (timer * difficultyMultiplier);
    const newAssertions = assertions + 1;
    dispatch(updateScore(newScore, newAssertions));
  }

  rankingSetup = () => {
    const { name, score } = this.props;
    const playerResult = { name, score };

    if (localStorage.getItem('ranking') === null) {
      localStorage.setItem('ranking', JSON.stringify([playerResult]));
    } else {  
      const currentRanking = JSON.parse(localStorage.getItem('ranking'));
      const newRanking = [...currentRanking, playerResult];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
      }
    }

  nextClick = () => {
    const { currentQuestion } = this.state;
    const { history } = this.props;
    const finalQuestion = 4;
    if (currentQuestion === finalQuestion) {
      this.rankingSetup();
      history.push('/feedback');
    }
    else {
      this.setState((prevState) => ({
        currentQuestion: prevState.currentQuestion + 1,
        disabledQuestion: false,
        timer: 30,
      }));
      this.setTimer();
    }
  }

   decodeHTMLEntities = (text) => {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }

  render() {
    const {
      trivia,
      currentQuestion,
      timer,
      correctAnswersIndex,
      disabledQuestion,
    } = this.state;
    const { name, score } = this.props;
    return (
      <div id="game">
        <header>
          <p>{`Player: ${name}`}</p>
          <p>{`Score: ${score}`}</p>
        </header>
        <p class="timer">{ timer }</p>
        { correctAnswersIndex.length !== 0 && (
          <div>
            <p class="question">{ this.decodeHTMLEntities(trivia[currentQuestion].question) }</p>
            <div class="answers">{ this.renderAnswers()}</div>
            { disabledQuestion && (
              <button
                id="next"
                type="button"
                onClick={ this.nextClick }
              >
                Next
              </button>
            )}
          </div>
        ) }

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  assertions: state.player.assertions,
  score: state.player.score,
  difficulty: state.player.difficulty,
  category: state.player.category,
});

export default connect(mapStateToProps)(Game);