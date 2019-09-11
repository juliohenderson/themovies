import React from 'react';
import PropTypes from 'prop-types';

const Scene = ({ children }) => (
  <main
    css={`
      display: flex;
      justify-content: center;
      padding-top: 68px;
      background: #f1f1f1;
      min-height: 100%;
    `}
  >
    {children}
  </main>
);

Scene.propTypes = {
  children: PropTypes.object,
};

export default Scene;
