import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../component/Header';

class Feedback extends React.Component {
  showMessage = () => {
    const { assertions } = this.props;
    const minAssertions = 3;
    if (assertions < minAssertions) {
      return 'Could be better...';
    }
    return 'Well Done!';
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <p>{this.showMessage()}</p>
        <button
          type="button"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <button
          type="button"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>

    );
  }
}
const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
