import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

const styles = {
  header: {
    backgroundColor: '#282c34',
    minHeight: '10vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white'
  },
  createButton: {
    alignSelf: 'flex-end',
    margin: '15px'
  }
};

const Header = () => (
  <header style={styles.header}>
    <Button as={Link} to="/create" color="teal" style={styles.createButton}>
      CREATE
    </Button>
  </header>
);

export default Header;
