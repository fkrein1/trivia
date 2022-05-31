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

  render() {
    const { ranking } = this.state;
    return (
      <div id="ranking">
        <h1>Ranking</h1>
        <div >
          {ranking.map(({ name, score }, index) => (
            <div class="ranking-list" key={ index + 1 }>
              <p>{`#${ index + 1 }`}</p>
              <p>{ name }</p>
              <p>{ score }</p>
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
