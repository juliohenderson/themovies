import React from 'react';
import styled from 'styled-components';
import style from './style.module.css';

/**
 *
 *  Styled Components
 *
 */
const SearchBar = styled.div`
  background-color: #000;
  width: 300px;
`;

const Header = () => (
  <header className={style.header}>
    <h1>Movie DB</h1>
    <SearchBar />
    <div />
  </header>
);

export default Header;
