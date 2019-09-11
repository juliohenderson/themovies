import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { InfiniteLoader, List, AutoSizer } from 'react-virtualized';

import { URL_IMAGE, IMAGE_SIZE_300 } from '../../constants';
import { getMovies } from './redux/actions';
import Scene from '../Scene';

const ListMovies = styled.div`
  display: flex;
  max-width: 100vw;
  flex-wrap: wrap;
  height: 100vh;
`;

const Movie = styled.div`
  flex: 1 1 33%;
  padding: 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  max-width: 32%;
`;

const Poster = styled.img`
  min-height: 451px;
  height: auto;
  border-radius: 5px;
`;

class Home extends Component {
  isRowLoaded({ index }, list) {
    return !!list[index];
  }

  loadMoreRows(fetchMovies, page) {
    fetchMovies(page + 1);
  }

  rowRenderer({ key, index }, list) {
    return (
      (list.length > 0 && key && index && list[index]) && (
      <Movie key={key}>
        {list[index].poster_path && <Poster src={`${URL_IMAGE}/${IMAGE_SIZE_300}${list[index].poster_path}`} alt={list[index].title} />}
        <h2 css={`text-align: center`}>{list[index].title}</h2>
        <p>{`${list[index].overview.substring(0, 300)}...`}</p>
      </Movie>
      )
    );
  }

  UNSAFE_componentWillMount() {
    this.props.fetchMovies(1);
  }

  render() {
    const { list, page, fetchMovies } = this.props;
    return (
      <Scene>
        <ListMovies>
          <InfiniteLoader
            isRowLoaded={(props) => this.isRowLoaded(props, list)}
            loadMoreRows={() => this.loadMoreRows(fetchMovies, page)}
            rowCount={10000}
          >
            {({ onRowsRendered, registerChild }) => (
              <AutoSizer>
                {({ width, height }) => (
                  <List
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    rowCount={10000}
                    rowRenderer={(props) => this.rowRenderer(props, list)}
                    width={width}
                    height={height}
                    rowHeight={731}
                    // containerStyle={{
                    //   display: 'flex',
                    //   flexWrap: 'wrap',
                    //   height: 'auto',
                    // }}
                    overscanRowCount={10}
                  />
                )}
              </AutoSizer>
            )}
          </InfiniteLoader>
        </ListMovies>
      </Scene>
    );
  }
}

Home.propType = {
  list: PropTypes.array,
};

const mapStateToProps = (state) => state.homeReducer;
const mapDispatchToProps = (dispatch) => ({
  fetchMovies: (page) => dispatch(getMovies(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
