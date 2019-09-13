import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';
import { Loading } from '../../components';
import debounce from '../../utils/debounce';

import { URL_IMAGE, IMAGE_SIZE_300 } from '../../constants';
import { getMovies, findMovie } from './redux/actions';
import Scene from '../Scene';

const ListMovies = styled.div`
  display: flex;
  max-width: 100vw;
  flex-wrap: wrap;
  height: 100vh;

  @media(min-width: 768px) {
    width: 80vw;
  }
`;

const Movie = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  align-items: center;

  @media(min-width: 768px) {
    width: 30%;
  }
  @media(min-width: 425px) and (max-width: 767px) {
    width: 46%;
  }
`;

const Poster = styled.img`
  height: auto;
  border-radius: 5px;
  width: max-content;
`;

class Home extends Component {
  loadMore() {
    const {
      fetchMovies, page, totalPages, searchText, searchMovie,
    } = this.props;
    if (page < totalPages || page === 0) {
      if (searchText) {
        debounce(searchMovie(searchText, page + 1), 500);
      } else {
        debounce(fetchMovies(page + 1), 500);
      }
    }
  }

  render() {
    const { list } = this.props;
    const items = [];
    if (list.length > 0) {
      list.forEach((movie) => {
        items.push(
          <Movie key={movie.id}>
            {movie.poster_path && <Poster src={`${URL_IMAGE}/${IMAGE_SIZE_300}${movie.poster_path}`} alt={movie.title} />}
            <h2
              css={`
                text-align: center; color: #028090;
              `}
            >
              {movie.title}
            </h2>
            <p
              css={`
                flex: 1;
              `}
            >
              {movie.overview ? `${movie.overview.substring(0, 300)}...` : ''}
            </p>
          </Movie>
        );
      });
    }
    console.log(list);
    return (
      <Scene>
        {list.length < 1 && <Loading />}
        <ListMovies>
          <InfiniteScroll
            pageStart={0}
            loadMore={() => this.loadMore()}
            hasMore
            initialLoad
            threshold={700}
            css={`
              display: flex;
              flex-wrap: wrap;
            `}
          >
            {items}
          </InfiniteScroll>
        </ListMovies>
      </Scene>
    );
  }
}

Home.propTypes = {
  list: PropTypes.array,
  fetchMovies: PropTypes.func,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  searchText: PropTypes.string,
  searchMovie: PropTypes.func,
};

const mapStateToProps = (state) => state.homeReducer;
const mapDispatchToProps = (dispatch) => ({
  fetchMovies: (page) => dispatch(getMovies(page)),
  searchMovie: (searchText, page) => dispatch(findMovie(searchText, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
