import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Grid, Form, Button, Input, Dropdown } from 'semantic-ui-react';
import dropOptions from '../sample/dropOptions';
import * as api from '../services/digitalAssets';

const styles = {
  mainAssets: {
    margin: '20px'
  }
};

const capitalize = word => {
  if (word === 'and') return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const format = value => {
  var text;
  var words = value.split('_');
  if (words.length === 1) {
    text = capitalize(words[0]);
  } else {
    words = words.map(word => capitalize(word));
    text = words.join(' ');
  }
  return { value, text };
};

const trimStringSpaces = string => {
  return string.trim();
}

const convertStringToArray = str => {
  return str.split(',').map(trimStringSpaces);
}

class CreateAssets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      archDiagram: '',
      cloudServices: [],
      customer: '',
      description: '',
      hubsters: [],
      industries: [],
      oppId: '',
      otubeLink: '',
      pillars: [],
      repo: '',
      submitted: false,
      scrmId: '',
      title: '',
      userEmail: ''
      //useCase: '',
    };
  }

  //componentDidMount = () => {};

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = (e) => {
    e.preventDefault()

    let assetObj = this.state;

    // set up asset post object
    const assetPostObj = {
      //arch_diagram_id: assetObj.archDiagram,
      cloud_services: assetObj.cloudServices,
      createdBy: assetObj.userEmail,
      customer: assetObj.customer,
      description: assetObj.description,
      hubsters: convertStringToArray(assetObj.hubsters),
      industries: assetObj.industries,
      modifiedBy: assetObj.userEmail,
      modifiedOn: new Date(),
      opp_id: assetObj.oppId,
      otube_url: assetObj.otubeLink,
      pillars: assetObj.pillars,
      repo_url: assetObj.repo,
      scrm_id: assetObj.scrmId,
      title: assetObj.title,
      view_count: 0
      //use_case: assetObj.useCase,
    };


    // make asset post
    api.postAsset(assetPostObj)
      .catch(error => console.log(error));

    this.props.history.push('/assets');



    //this.setState({ submitted: true });
  };

  render() {
    return (
      <section className="centered">
        <Grid style={styles.mainAssets} centered>
          <Grid.Column width={10}>
            <h2 style={{ textAlign: 'center' }}>CREATE ASSET</h2>
          </Grid.Column>
          <Grid.Column width={10}>
            <Form onSubmit={this.handleSubmit}>
              {/* <Form.Field required>
                <label>Select SCRM ID</label>
                <Dropdown
                  fluid
                  selection
                  label="SCRM ID"
                  name="scrmId"
                  value={this.state.scrmId}
                  onChange={this.handleChange}
                  options={dropOptions.scrmIds}
                />
              </Form.Field> */}
              <Form.Field required>
                <label>SCRM ID</label>
                <Input name="scrmId" value={this.state.scrmId}
                  onChange={this.handleChange} />
              </Form.Field>
              <Form.Field>
                <label>OPP ID</label>
                <Input
                  name="oppId"
                  value={this.state.oppId}
                  onChange={this.handleChange} />
              </Form.Field>
              <Form.Field>
                <label>Title</label>
                <Input
                  name="title"
                  onChange={this.handleChange}
                  value={this.state.title}
                />
              </Form.Field>
              <Form.Field>
                <label>Customer</label>
                <Input
                  name="customer"
                  onChange={this.handleChange}
                  value={this.state.customer}
                />
              </Form.Field>
              <Form.Field>
                <label>Hubsters (comma seperated list)</label>
                <Input
                  name="hubsters"
                  onChange={this.handleChange}
                  value={this.state.hubsters}
                />
              </Form.Field>
              <Form.Field>
                <label>Code Repository</label>
                <Input
                  name="repo"
                  placeholder="Repository URL"
                  onChange={this.handleChange}
                  value={this.state.repo}
                />
              </Form.Field>
              <Form.Field>
                <label>Architecture Diagram</label>
                <Input
                  name="archDiagram"
                  placeholder="Image URL"
                  onChange={this.handleChange}
                  value={this.state.archDiagram}
                />
              </Form.Field>
              <Form.Field>
                <label>OTube Link</label>
                <Input
                  name="otubeLink"
                  placeholder="OTube URL"
                  onChange={this.handleChange}
                  value={this.state.otubeLink}
                />
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <Input
                  name="description"
                  placeholder="Please enter a brief description"
                  onChange={this.handleChange}
                  value={this.state.description}
                />
              </Form.Field>
              <Form.Field>
                <label>Industries</label>
                <Dropdown
                  fluid
                  scrolling
                  multiple
                  name="industries"
                  value={this.state.industries}
                  onChange={this.handleChange}
                  options={dropOptions.industries.map(industry =>
                    format(industry)
                  )}
                />
              </Form.Field>
              <Form.Field>
                <label>Cloud Services</label>
                <Dropdown
                  fluid
                  scrolling
                  multiple
                  name="cloudServices"
                  value={this.state.cloudServices}
                  onChange={this.handleChange}
                  options={dropOptions.cloudServices.map(service =>
                    format(service)
                  )}
                />
              </Form.Field>
              <Form.Field>
                <label>Pillars</label>
                <Dropdown
                  fluid
                  scrolling
                  multiple
                  name="pillars"
                  value={this.state.pillars}
                  onChange={this.handleChange}
                  options={dropOptions.pillars.map(pillar => format(pillar))}
                />
              </Form.Field>

              <Form.Group>
                <Form.Button primary>SUBMIT</Form.Button>
                <Button as={Link} to="/">
                  CANCEL
                </Button>
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid>
      </section>
    );
  }
}

CreateAssets.propTypes = {};

export default withRouter(CreateAssets);
