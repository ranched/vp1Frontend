import React, { Component } from 'react';
import { Card, Image, Placeholder } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const styles = {
  card: {
    margin: '10px'
  },
  archImg: {
    maxHeight: '20vh',
    minHeight: '20vh',
    maxWidth: '100%',
    objectFit: 'scale-down',

    backgroundColor: 'white'
  }
};

const trimWithEllipis = str => {
  if (str.length > 50) {
    str = str.slice(0, 55) + '...';
  }
  return str;
}

class AssetCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    //console.log(typeof this.props.asset.arch_diagram);
  }

  loadingCard = () => {
    return (
      <Card style={styles.card}>
        <Placeholder>
          <Placeholder.Image square />
        </Placeholder>
        <Card.Content>
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line length='very short' />
              <Placeholder.Line length='medium' />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line length='short' />
            </Placeholder.Paragraph>
          </Placeholder>
        </Card.Content>
        <Card.Content extra>
          <Placeholder.Line length='very short' />
        </Card.Content>
      </Card>
    )
  }

  render() {
    var { asset, loading } = this.props;
    if (loading) { return this.loadingCard() }
    var pathname = '/assets/' + asset.scrm_id;
    var state = { asset }
    var publishDate = asset.publish_date || asset.createdOn;
    return (
      <Card as={Link} style={styles.card} to={{ pathname, state }}>
        <Image src={asset.arch_diagram} style={styles.archImg} />
        <Card.Content>
          <Card.Header>{trimWithEllipis(asset.title)}</Card.Header>
          <Card.Meta>

          </Card.Meta>
          {/* <Card.Description>{asset.description}</Card.Description> */}
        </Card.Content>
        <Card.Content extra>
          {asset.view_count} Views
          <span className="date" style={{ float: 'right' }}>
            Added {new Date(publishDate).toLocaleDateString()}
          </span>
        </Card.Content>
      </Card>
    );
  }
}

export default AssetCard;
