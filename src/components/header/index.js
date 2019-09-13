import React from 'react';
import style from './style.module.css';
import Search from '../../scenes/home/components/Search';

const Header = () => (
  <header className={style.header}>
    <h1
      css={`
        position: fixed;
      `}
    >
      Movie DB
    </h1>
    <Search />
  </header>
);

export default Header;
