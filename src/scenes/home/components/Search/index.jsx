import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { findMovie, getMovies, handleChange } from '../../redux/actions';
import debounce from '../../../../utils/debounce';

import './style/search.css';

class Search extends Component {
  handleChange(searchText) {
    const { searchMovie, fetchMovies, handleChangeText } = this.props;
    handleChangeText(searchText);
    if (searchText) {
      debounce(searchMovie(searchText, 1), 500);
    } else {
      debounce(fetchMovies(1), 500);
    }

    const el1 = document.querySelector('html');
    if (el1) {
      el1.scrollTop = 0;
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { searchText } = this.props;
    return (
      <input type="search" placeholder="Pesquisar" onChange={(event) => this.handleChange(event.target.value)} value={searchText} />
    );
  }
}

Search.propTypes = {
  searchMovie: PropTypes.func,
  fetchMovies: PropTypes.func,
  handleChangeText: PropTypes.func,
  searchText: PropTypes.string,
};

const mapStateToProps = (state) => state.homeReducer;
const mapDispatchToProps = (dispatch) => ({
  searchMovie: (name, page) => dispatch(findMovie(name, page)),
  fetchMovies: (page) => dispatch(getMovies(page)),
  handleChangeText: (searchText) => dispatch(handleChange(searchText)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
