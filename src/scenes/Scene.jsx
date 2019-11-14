import React from 'react';
import PropTypes from 'prop-types';

const Scene = ({ children }) => (
  <main
    css={`
      display: flex;
      justify-content: center;
      background: #141414;
      min-height: 100%;
      padding-top: 55px;
    `}
  >
    {children}
  </main>
);

Scene.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Scene;
