import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking'))
    if (ranking !== null) {
      const sortedRanking = ranking.sort((a, b) => b.score - a.score);
      this.setState({ ranking: sortedRanking });
    }
  }

  homeClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1>Ranking</h1>
        <button
          type="button"
          onClick={ this.homeClick }
        >
          Home
        </button>
        <div />
        <div>
          {ranking.map(({ name, score }, index) => (
            <div key={ index + 1 }>
              <p>{ `Name: ${name}` }</p>
              <p>{ `Score: ${score}` }</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
});

Ranking.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps, null)(Ranking);
