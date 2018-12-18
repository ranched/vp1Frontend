import React, { Component } from "react";
import {
  Card,
  Segment,
  Container,
  Image,
  Divider,
  List
} from "semantic-ui-react";
import AssetCard from "./AssetCard";
import logo from "../assets/images/oracle/csh-logo-1.png";
import PropTypes from "prop-types";

const RecentsFooter = () => (
  <Segment vertical className="recentsFooter" >
    <Divider section />
    <Container textAlign="center">
      <Image centered size="small" src={logo} />
      <List
        horizontal
        divided
        link
        size="small"
        style={{ marginBottom: "0px" }}
      >
        <List.Item as="a" href="#" className="footer-text">
          Site Map
        </List.Item>
        <List.Item as="a" href="#" className="footer-text">
          Contact Us
        </List.Item>
      </List>
      <br />
      <List horizontal divided link size="small" style={{ marginTop: "0px" }}>
        <List.Item as="a" href="#" className="footer-text">
          Terms and Conditions
        </List.Item>
        <List.Item as="a" href="#" className="footer-text">
          Privacy Policy
        </List.Item>
      </List>
    </Container>
  </Segment>
);

class AssetList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: null,
      widthSet: false
    };
  }

  componentDidMount = () => { };

  setWidth = width => {
    this.props.setWidth(width);
  };

  render() {
    var { assets, loading, topAssets, cardWidth } = this.props;
    var assetArr = [];
    assets.forEach(asset => {
      assetArr.push(
        <AssetCard
          asset={asset}
          key={asset.scrm_id}
          loading={loading}
          topAsset={topAssets}
          centered
          cardWidth={cardWidth}
          setWidth={this.setWidth}
        />
      );
    });
    //if (!topAssets) assetArr.push(<RecentsFooter key="recentsFooter" />);
    return (
      <Card.Group
        itemsPerRow={topAssets ? 4 : 1}
        className={topAssets ? "topAssetsList" : "recentAssets"}
      >
        {assetArr}
      </Card.Group>
    );
  }
}

AssetList.propTypes = {
  assets: PropTypes.array
};

export default AssetList;
