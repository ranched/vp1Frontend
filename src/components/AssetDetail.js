import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Header,
  Grid,
  Image,
  Item,
  Segment,
  SegmentGroup,
  List,
  Icon,
  Embed,
  Rail,
  Button
} from "semantic-ui-react";
//import { sampleAssets, assetsMap } from '../sample/assets';
import * as api from "../services/digitalAssets";
import descriptionImg from "../assets/images/asset-description.png";
import useCaseImg from "../assets/images/asset-use-cases.png";
import wireframeImg from "../assets/images/placeholderImage.png";

class AssetDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      asset: null
    };
  }

  componentDidMount = () => {
    var { match, location } = this.props;
    var scrm_id = match.params.assetId;
    if (location.state) this.setState({ asset: location.state.asset });
    else {
      this.getAsset(scrm_id).then(asset => this.setState({ asset }));
    }
  };

  getAsset = scrm_id => {
    return api.getAsset(scrm_id).catch(error => console.log(error));
  };

  getHistory = asset => {
    var today = new Date();
    var publishDate = new Date(asset.publish_date || asset.createdOn);
    var diff = Math.floor(today.getTime() - publishDate.getTime());
    var hours = Math.floor(diff / (1000 * 60 * 60));
    var days = Math.floor(hours / 24);
    var months = Math.floor(days / 31);
    var years = Math.floor(months / 12);
    if (years) return years + (years === 1 ? " year " : " years ") + "ago";
    if (months) return months + (months === 1 ? " month " : " months ") + "ago";
    if (days) return days + (days === 1 ? " day " : " days ") + "ago";
    if (hours) return hours + (hours === 1 ? " hour " : " hours ") + "ago";
    return "less than an hour ago";
  };

  getHubsters = hubsters => {
    var result = "";
    if (hubsters.length === 1) return <Link to="">{hubsters[0]}</Link>;
    hubsters.forEach((hubster, index, array) => {
      result += <Link to="/assets">{hubster}</Link>;
      if (index + 2 === array.length) result += ", and ";
      else if (index + 1 !== array.length) {
        result += ", ";
      }
    });
    return result;
  };

  getKeyDetails = asset => {
    var hubsters = asset.hubsters.map(hubster => hubster.hubster_name);
    return (
      <Header
        as="h4"
        style={{ marginTop: "0px", marginBottom: "0px", paddingBottom: "0px" }}
      >
        {"From "}
        {this.getHubsters(hubsters)} {this.getHistory(asset)}
      </Header>
    );
  };

  getUseCases = asset => {
    console.log(asset.use_case);
    var items = [];
    var useCases = asset.use_case.split(/\s*\(\d+\)\s+/g);
    useCases.splice(0, 1);
    useCases = useCases.filter(useCase => useCase !== "");
    console.log(useCases);
    useCases.forEach(useCase => {
      items.push(
        <List.Item as="li">
          <List.Content>
            <List.Description>{useCase}</List.Description>
          </List.Content>
        </List.Item>
      );
    });
    return <List as="ol">{items}</List>;
  };

  render() {
    var { asset } = this.state;
    if (!asset) {
      return <div />;
    }
    var publishDate = asset.publish_date
      ? new Date(asset.publish_date).toLocaleDateString()
      : "Unpublished";
    return (
      <Container
        fluid
        className="assetPage"
        style={{ backgroundColor: "#F7F7F7", alignItems: "center" }}
      >
        <Grid centered columns={2} className="assetPageGrid">
          <Grid.Column width={11} className="primaryColumn">
            <Segment.Group raised className="assetContent">
              <Segment>
                <Rail position="left" className="assetRail">
                  <Button
                    as={Link}
                    to="/assets"
                    circular
                    color="black"
                    size="huge"
                  >
                    <Icon name="left arrow" />
                    BACK
                  </Button>
                </Rail>
                <Header
                  as="h1"
                  style={{ marginBottom: "0px", paddingBottom: "12px" }}
                >
                  <Header.Content>{asset.title}</Header.Content>
                </Header>
                <Header
                  as="h2"
                  style={{
                    marginTop: "0px",
                    marginBottom: "0px",
                    paddingBottom: "5px"
                  }}
                >
                  <Header.Content>{asset.view_count + " views"}</Header.Content>
                </Header>
                {this.getKeyDetails(asset)}
              </Segment>
            </Segment.Group>
            <Segment.Group raised className="assetContent">
              <Segment>
                <Header
                  as="h2"
                  style={{ marginTop: "0px", paddingBottom: "5px" }}
                >
                  <Header.Content>{"Notional Architecture"}</Header.Content>
                </Header>
                <Image src={asset.arch_diagram} />
              </Segment>
            </Segment.Group>
            <Segment.Group raised className="assetContent">
              <Segment>
                <Item.Group>
                  <Item>
                    <Item.Image
                      size="tiny"
                      src={descriptionImg}
                      style={{ paddingTop: "5px" }}
                    />
                    <Item.Content>
                      <Item.Header as="h2" style={{ fontSize: "24px" }}>
                        Asset Description
                      </Item.Header>
                      <Item.Description style={{ fontSize: "18px" }}>
                        <p>{asset.description}</p>
                      </Item.Description>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Segment>
              <Segment>
                <Item.Group style={{ verticalAlign: "middle" }}>
                  <Item style={{ verticalAlign: "middle" }}>
                    <Item.Image
                      size="tiny"
                      src={useCaseImg}
                      style={{
                        paddingTop: "5px",
                        margin: "auto"
                      }}
                    />
                    <Item.Content>
                      <Item.Header
                        as="h2"
                        style={{ fontSize: "24px", marginBottom: "15px" }}
                      >
                        Use Case(s)
                      </Item.Header>
                      <Item.Description as="List" style={{ fontSize: "18px" }}>
                        {this.getUseCases(asset)}
                      </Item.Description>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Segment>
            </Segment.Group>
            <Segment.Group>
              <Segment>
                <Header
                  as="h2"
                  style={{ marginTop: "0px", paddingBottom: "5px" }}
                >
                  <Header.Content>{"Video Demonstration"}</Header.Content>
                </Header>
                <Embed
                  active={true}
                  id="kmsembed-0_fhworweh"
                  className="kmsembed"
                  placeholder={asset.arch_diagram}
                  /* icon="youtube play inverted" */
                  /* icon={<Icon name="youtube play" />} */
                  iframe={{
                    title: "oTubeLink",
                    src: asset.otube_url,
                    width: "768",
                    height: "515",
                    allowFullScreen: true,
                    webkitallowfullscreen: true,
                    mozAllowFullScreen: true,
                    frameborder: "0",
                    style: {}
                  }}
                />
              </Segment>
            </Segment.Group>
          </Grid.Column>

          <Grid.Column width={5} className="secondaryColumn">
            <Segment.Group
              raised
              className="assetContent"
              style={{ paddingTop: "20px" }}
            >
              <Segment>
                <Item.Group>
                  <Item>
                    <Item.Content>
                      <Item.Header as="h2" style={{ fontSize: "24px" }}>
                        About This Asset
                      </Item.Header>
                    </Item.Content>
                  </Item>
                  <Item>
                    <Item.Content>
                      <Item.Description style={{ fontSize: "18px" }}>
                        <p>Customer</p>
                      </Item.Description>
                      <Item.Meta>
                        <span>{asset.customer}</span>
                      </Item.Meta>
                    </Item.Content>
                  </Item>
                  <Item>
                    <Item.Content>
                      <Item.Description style={{ fontSize: "18px" }}>
                        <p>Created On</p>
                      </Item.Description>
                      <Item.Meta>
                        <span>{asset.createdOn}</span>
                      </Item.Meta>
                    </Item.Content>
                  </Item>
                  <Item>
                    <Item.Content>
                      <Item.Description style={{ fontSize: "18px" }}>
                        <p>Published On</p>
                      </Item.Description>
                      <Item.Meta>
                        <span>{publishDate}</span>
                      </Item.Meta>
                    </Item.Content>
                  </Item>
                  <Item>
                    <Item.Content>
                      <Item.Description style={{ fontSize: "18px" }}>
                        <p>Downloads</p>
                      </Item.Description>
                      <Item.Meta>
                        <span>{asset.view_count}</span>
                      </Item.Meta>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Segment>
            </Segment.Group>

            <Segment.Group
              raised
              className="assetContent"
              style={{ paddingTop: "20px" }}
            >
              <Segment>
                <Item.Group>
                  <Item style={{ paddingBottom: "21px" }}>
                    <Item.Image size="tiny" src={wireframeImg} />
                    <Item.Content verticalAlign="middle">
                      <Item.Header as="h2" style={{ fontSize: "24px" }}>
                        Cloud Services
                      </Item.Header>
                    </Item.Content>
                  </Item>
                  <Item style={{ margin: "7px 0px" }}>
                    <Item.Image
                      size="mini"
                      src={wireframeImg}
                      style={{ marginLeft: "22.5px" }}
                    />
                    <Item.Content
                      verticalAlign="middle"
                      style={{ paddingLeft: "43.5px" }}
                    >
                      <Item.Header as="h2">CS 1</Item.Header>
                    </Item.Content>
                  </Item>
                  <Item style={{ margin: "7px 0px" }}>
                    <Item.Image
                      size="mini"
                      src={wireframeImg}
                      style={{ marginLeft: "22.5px" }}
                    />
                    <Item.Content
                      verticalAlign="middle"
                      style={{ paddingLeft: "43.5px" }}
                    >
                      <Item.Header as="h2">CS 2</Item.Header>
                    </Item.Content>
                  </Item>
                  <Item style={{ margin: "7px 0px" }}>
                    <Item.Image
                      size="mini"
                      src={wireframeImg}
                      style={{ marginLeft: "22.5px" }}
                    />
                    <Item.Content
                      verticalAlign="middle"
                      style={{ paddingLeft: "43.5px" }}
                    >
                      <Item.Header as="h2">CS 3</Item.Header>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Segment>
            </Segment.Group>

            <Segment.Group
              raised
              className="assetContent"
              style={{ paddingTop: "20px" }}
            >
              <Segment>
                <Item.Group>
                  <Item style={{ paddingBottom: "21px" }}>
                    <Item.Image size="tiny" src={wireframeImg} />
                    <Item.Content verticalAlign="middle">
                      <Item.Header as="h2" style={{ fontSize: "24px" }}>
                        Industries
                      </Item.Header>
                    </Item.Content>
                  </Item>
                  <Item style={{ margin: "7px 0px" }}>
                    <Item.Image
                      size="mini"
                      src={wireframeImg}
                      style={{ marginLeft: "22.5px" }}
                    />
                    <Item.Content
                      verticalAlign="middle"
                      style={{ paddingLeft: "43.5px" }}
                    >
                      <Item.Header as="h2">Industry 1</Item.Header>
                    </Item.Content>
                  </Item>
                  <Item style={{ margin: "7px 0px" }}>
                    <Item.Image
                      size="mini"
                      src={wireframeImg}
                      style={{ marginLeft: "22.5px" }}
                    />
                    <Item.Content
                      verticalAlign="middle"
                      style={{ paddingLeft: "43.5px" }}
                    >
                      <Item.Header as="h2">Industry 2</Item.Header>
                    </Item.Content>
                  </Item>
                  <Item style={{ margin: "7px 0px" }}>
                    <Item.Image
                      size="mini"
                      src={wireframeImg}
                      style={{ marginLeft: "22.5px" }}
                    />
                    <Item.Content
                      verticalAlign="middle"
                      style={{ paddingLeft: "43.5px" }}
                    >
                      <Item.Header as="h2">Industry 3</Item.Header>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Segment>
            </Segment.Group>

            <Segment.Group
              raised
              className="assetContent"
              style={{ paddingTop: "20px" }}
            >
              <Segment>
                <Item.Group>
                  <Item style={{ paddingBottom: "21px" }}>
                    <Item.Image size="tiny" src={wireframeImg} />
                    <Item.Content verticalAlign="middle">
                      <Item.Header as="h2" style={{ fontSize: "24px" }}>
                        Hubsters
                      </Item.Header>
                    </Item.Content>
                  </Item>
                  <Item style={{ margin: "7px 0px" }}>
                    <Item.Image
                      size="mini"
                      src={wireframeImg}
                      style={{ marginLeft: "22.5px" }}
                    />
                    <Item.Content
                      verticalAlign="middle"
                      style={{ paddingLeft: "43.5px" }}
                    >
                      <Item.Header as="h2">Hubster 1</Item.Header>
                    </Item.Content>
                  </Item>
                  <Item style={{ margin: "7px 0px" }}>
                    <Item.Image
                      size="mini"
                      src={wireframeImg}
                      style={{ marginLeft: "22.5px" }}
                    />
                    <Item.Content
                      verticalAlign="middle"
                      style={{ paddingLeft: "43.5px" }}
                    >
                      <Item.Header as="h2">Hubster 2</Item.Header>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Segment>
            </Segment.Group>

            <Segment.Group
              raised
              className="assetContent"
              style={{ paddingTop: "20px" }}
            >
              <Segment>
                <Item.Group>
                  <Item style={{ paddingBottom: "21px" }}>
                    <Item.Image size="tiny" src={wireframeImg} />
                    <Item.Content verticalAlign="middle">
                      <Item.Header as="h2" style={{ fontSize: "24px" }}>
                        Asset Archive
                      </Item.Header>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Segment>
            </Segment.Group>
          </Grid.Column>
        </Grid>
      </Container>

    )
  }
}

export default AssetDetail;
