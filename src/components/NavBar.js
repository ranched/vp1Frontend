import React, { Component } from 'react';
import { Image, Menu } from 'semantic-ui-react';
import { Link/* , withRouter */ } from 'react-router-dom';
import logo from '../assets/images/oracle/logo-red.png';

const styles = {
  header: {
    /*
    minHeight: '10vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    , */
    fontSize: 'calc(10px + 2vmin)',
    backgroundColor: '#282c34',
    color: 'white'
  },
  createButton: {
    alignSelf: 'flex-end',
    margin: '15px'
  }
};

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: true
    };
  }
  
  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  logout = () => {
    /* this.props.amceActions.logout();
    this.props.loanListActions.clearLoans(); */
  }
  
  render() {
    return (
      <Menu fixed='top' inverted borderless /* style={{fontSize:"20px"}} style={styles.header} */>
        <Menu.Item as='a' header style={{ textTransform: "uppercase", fontSize: "20px" }}>
          <Image size='small' src={logo} style={{ marginRight: '1.5em'/* , , height: "auto", width: "10%"  */}} />
          Asset Hub
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item style={{ textTransform: "uppercase", paddingRight: "20px", fontSize: "20px" }}>
            Nolan Corcoran
          </Menu.Item>
          <Menu.Item as='a' style={{ marginRight: '1em', textTransform: "uppercase", fontSize: "20px" }}>
            <Link to='/create' onClick={this.logout}>Create Asset</Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default NavBar;