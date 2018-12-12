import React, { Component } from "react";
import {
  Card,
  Image,
  Placeholder,
  Popup,
  Dimmer,
  Button
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import sizeMe from "react-sizeme";
import Dotdotdot from "react-dotdotdot";
var styles = {
  archImg: {
    maxHeight: "20vh",
    minHeight: "20vh",
    maxWidth: "100%",
    objectFit: "scale-down",
    backgroundColor: "white"
  }
};

const trimWithEllipis = str => {
  if (str.length > 30) {
    str = str.slice(0, 30) + "...";
  }
  return str;
};

class AssetCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widthSet: false
    };
  }

  componentDidMount = () => {
    /* var { setWidth, size } = this.props;
    console.log("didMount", size); */
    /* setWidth(size.width); */
  };
  componentDidUpdate = () => {
    var { asset, setWidth, size, loading, topAsset } = this.props;
    if (!loading && topAsset && !this.state.widthSet) {
      console.log("topAsset card width getting set ...", size);
      console.log(asset);
      setWidth(size.width);
      this.setState({ widthSet: true });
    }

    /* componentWillReceiveProps = nextProps => {
      var { topAsset, cardWidth } = this.props;
      console.log("topAsset = ", topAsset);
      console.log("nextProps = ", nextProps);
    }; */
    /* var { loading, setWidth, cardWidth, size } = this.props;
    var { widthSet } = this.state;
    if (loading) return;
    if (cardWidth === 0 && widthSet === false) {
      setWidth(size.width);
      this.setState({ widthSet: true });
    }
  }; */
    /* componentWillReceiveProps = nextProps => {
    if (this.props.cardWidth === null && nextProps.cardWidth > 0) {
      this.setState({ cardWidth: nextProps.cardWidth });
    }
    */
  };

  handleShow = () => this.setState({ active: true });
  handleHide = () => this.setState({ active: false });

  loadingCard = () => {
    return (
      <Card style={styles.card}>
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
        <Card.Content>
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line length="very short" />
              <Placeholder.Line length="medium" />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length="short" />
            </Placeholder.Paragraph>
          </Placeholder>
        </Card.Content>
        <Card.Content extra>
          <Placeholder.Line length="very short" />
        </Card.Content>
      </Card>
    );
  };

  render() {
    var { asset, loading, topAsset, cardWidth } = this.props;
    var { active } = this.state;
    if (loading || (!topAsset && !cardWidth)) {
      return this.loadingCard();
    }
    var pathname = "/assets/" + asset.scrm_id;
    var state = { asset };
    var publishDate = asset.publish_date || asset.createdOn;
    return (
      <Card
        as={Link}
        className="assetCard"
        style={{ width: cardWidth }}
        to={{ pathname, state }}
      >
        <Dimmer.Dimmable
          as={Image}
          blurring
          dimmed={active}
          onMouseEnter={this.handleShow}
          onMouseLeave={this.handleHide}
        >
          <Dimmer active={active} inverted onClickOutside={this.handleHide}>
            <Button color="red">VIEW</Button>
          </Dimmer>
          <Image src={asset.arch_diagram} style={styles.archImg} />
        </Dimmer.Dimmable>
        <Popup
          content={asset.description}
          on="hover"
          trigger={
            <Card.Content className="cardContent">
              <Dotdotdot clamp={2}>
                <Card.Header as="h2" className="cardTitle">
                  {asset.title}
                </Card.Header>
              </Dotdotdot>
            </Card.Content>
          }
        />
        <Card.Content extra style={{ padding: "7px" }}>
          <span className="cardMeta">
            {asset.view_count + " Views "}&middot;
            {" Added " + new Date(publishDate).toLocaleDateString()}
          </span>
        </Card.Content>
      </Card>
    );
  }
}
/* if (this.props.topAsset) {} */
export default sizeMe(/* { monitorWidth: true } */)(AssetCard);
