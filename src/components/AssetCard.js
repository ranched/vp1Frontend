import React, { Component } from 'react';
import { Card, Image } from 'semantic-ui-react';

const styles = {
  card: {
    margin: '10px'
  }
};

class AssetCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //componentDidMount = () => {}

  render() {
    const { asset } = this.props;

    return (
      <Card style={styles.card} href={`/assets/${asset.scrmId}`}>
        <Image src={asset.imgUrl} />
        <Card.Content>
          <Card.Header>{asset.title}</Card.Header>
          <Card.Meta>
            <span className="date">
              Added {new Date(asset.dateAdded).toLocaleDateString()}
            </span>
          </Card.Meta>
          <Card.Description>{asset.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <p>{asset.views} Views</p>
        </Card.Content>
      </Card>
    );
  }
}

export default AssetCard;
