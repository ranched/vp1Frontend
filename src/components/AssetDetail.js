import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Image, Grid } from 'semantic-ui-react';
import { assets, assetsMap } from '../sample/assets';

const AssetDetail = ({ match }) => {
  let id = match.params.assetId;
  let asset = assets[assetsMap[id]];
  return (
    <div>
      <Button as={Link} to="/assets">
        CLOSE
      </Button>
      <h1> Detail for SCRM Asset: {id}</h1>

      <h2>{asset.title}</h2>

      <h2> Date added: {new Date(asset.dateAdded).toLocaleDateString()}</h2>

      <h2> Description: {asset.description}</h2>

      <h2>Views: {asset.views}</h2>

      <Image src={asset.imgUrl} />
    </div>
  );
};

export default AssetDetail;
