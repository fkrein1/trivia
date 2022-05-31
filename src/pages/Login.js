import React from 'react';
import { connect } from 'react-redux';
import getToken from '../services/triviaToken';
import { addUser, resetState } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      difficulty: 'any',
      category: 'any',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(resetState());
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  }

  loginBtnEnabled = () => {
    const { name } = this.state;
    if (name.length > 0) return false;
    return true;
  }

  loginBtnClick = async () => {
    const { history, dispatch } = this.props;
    const token = await getToken();
    localStorage.setItem('token', token);
    dispatch(addUser(this.state));
    history.push('/game');
  }

  settingsBtnClick = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { name } = this.state;
    return (
      <form id="login">
        <input
          placeholder="Insert your name"
          type="text"
          name="name"
          value={ name }
          onChange={ this.handleChange }
        />
        <select name="difficulty" id="difficulty" onChange={ this.handleChange }>
          <option value="any">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select name="category" id="category" onChange={ this.handleChange }>
          <option value="any">Any Category</option>
          <option value="27">Animals</option>
          <option value="31">Anime</option>
          <option value="10">Books</option>
          <option value="11">Films</option>
          <option value="9">General Knowledge</option>
          <option value="23">History</option>
          <option value="12">Music</option>
          <option value="17">Science</option> 
          <option value="21">Sports</option>
          <option value="14">Television</option>
          <option value="15">Video Game</option>
        </select>
        <button
          type="button"
          disabled={ this.loginBtnEnabled() }
          onClick={ this.loginBtnClick }
        >
          PLAY
        </button>
      </form>
    );
  }
}

export default connect()(Login);