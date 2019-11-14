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
import IconSvg from '../../assets/information.svg';

const ListMovies = styled.ul`
  padding: 0px;

  @media(min-width: 768px) {
    width: 80vw;
  }
`;

const Movie = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #101010;
  border-radius: 5px;
`;

const Poster = styled.img`
  border-radius: 5px;
  width: 300px;
  height: 450px;
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
            <div
              css={`
                position: relative;
                display: flex;
                align-self: start;
                margin-bottom: 5px;
              `}
            >
              <span
                css={`
                  position: absolute;
                  display: flex;
                  background: #e50914;
                  border-radius: 15px;
                  color: #fff;
                  font-weight: 600;
                  width: 90px;
                  height: 25px;
                  justify-content: center;
                  align-items: center;
                  TOP: -13px;
                  left: 15px;
                `}
              >Nota: {movie.vote_average}</span>
              <span>
                <object type="image/svg+xml" data={IconSvg} className="logo">
                  Kiwi Logo {/* <!-- fallback image in CSS --> */}
                </object>
              </span>
            </div>
            <footer
              css={`
                flex: 1;
                padding: 15px 20px;
                border-radius: 0 0 5px 5px;
                text-align: center;
              `}
            >
              <strong
                css={`
                  color: #E50914;
                `}
              >
                {movie.title}
              </strong>
              <p
                css={`
                  font-size: 14px;
                  line-height: 20px;
                  color: #fff;
                  margin-top: 5px;
                  text-align: justify;
                `}
              >
                {movie.overview ? `${movie.overview.substring(0, 300)}...` : ''}
              </p>
            </footer>
          </Movie>
        );
      });
    }

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
              list-style: none;
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              grid-gap: 30px;
              margin-top: 50px;
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
