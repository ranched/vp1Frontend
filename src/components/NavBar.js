import React, { Component } from "react";
import { Image, Menu, Input, Icon, Label } from "semantic-ui-react";
import { Link /* , withRouter */ } from "react-router-dom";
import logo from "../assets/images/oracle/logo-red.png";
import profilePic from "../assets/images/profilepic.png";
import Stats from "./Stats";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: true,
      value: "",
      isLoading: false
    };
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  logout = () => {
    /* this.props.amceActions.logout();
    this.props.loanListActions.clearLoans(); */
  };

  resetComponent = () => this.setState({ isLoading: false, value: "" });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();
      /* const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title) */
      this.setState({
        isLoading: false /* results: _.filter(source, isMatch), */
      });
    }, 300);
  };

  render() {
    var { isLoading } = this.state;

    return (
      <Menu
        fixed="top"
        inverted
        borderless
        style={{
          height: "60px",
          overflow: "hidden",
          zIndex: 6,
          padding: "0px 25px"
        }}
      >
        <Menu.Item

          header
          style={{
            textTransform: "uppercase",
            fontSize: "20px"
          }}
        >
          <Link to="/assets">
            <Image
              size="small"
              src={logo}
              style={{
                marginRight: "1.5em" /* , , height: "auto", width: "10%"  */
              }}
            />
          </Link>
          <Link to="/assets">Asset Hub</Link>
        </Menu.Item>
        {/*<Stats />*/}
        <Menu.Menu position="right">
          <Menu.Item
            style={{
              textTransform: "uppercase",
              fontSize: "20px",
              paddingTop: "10px",
              paddingBottom: "10px",
              marginRight: "8px"
            }}
          >
            <Input
              inverted
              /* loading */
              icon={
                isLoading ? (
                  <Icon name="spinner" loading circular size="small" />
                ) : (
                    <Icon name="search" circular link size="small" />
                  )
              }
              placeholder="Search assets..."
              className="NavSearch"
            />
          </Menu.Item>
          <Menu.Item
            style={{
              fontSize: "20px"
            }}
          >
            <Link to="/create">
              <Icon
                name="plus square outline"
                link
                style={{ padding: "0px", textAlign: "center" }}
              />
              New
            </Link>
          </Menu.Item>
          <Menu.Item
            as="a"
            style={{
              paddingTop: "10px",
              paddingBottom: "10px"
            }}
          >
            <Label
              className="profileAvatar"
              size="big"
              style={{ backgroundColor: "transparent" }}
            >
              <Image avatar spaced="right" src={profilePic} />
              {/* " " + "Nolan Corcoran" */}
            </Label>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default NavBar;
