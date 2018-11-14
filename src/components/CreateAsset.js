import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Form, Button, Input, Label, Dropdown } from 'semantic-ui-react';
import dropOptions from '../sample/dropOptions';
import * as api from '../services/digitalAssets';

const styles = {
  mainAssets: {
    margin: '20px'
  }
};

const options = [
  { key: 'm', text: 'Manufacturing', value: 'manufac' },
  { key: 'a', text: 'Automobile', value: 'auto' }
];

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

class CreateAssets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrmId: '',
      title: '',
      repo: '',
      useCase: '',
      archDiagram: '',
      otubeLink: '',
      industries: '',
      cloudServices: '',
      pillars: '',
      description: '',
      userEmail: '',
      submitted: false
    };
  }

  //componentDidMount = () => {};

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    let assetObj = this.state;

    // set up asset post 
    const assetPostObj = {
      scrm_id: assetObj.scrmId,
      repo_url: assetObj.repo,
      use_case: assetObj.useCase,
      otube_url: assetObj.otubeLink,
      description: assetObj.description
    };

    // make asset post
    const assetPost = api.postAsset(assetPostObj)

    //set up an industry post per industry and make posts
    const industriesPosts = assetObj.industries.map(industry => (
      {
        industries: industry || 'example industry',
        scrm_id: assetObj.scrmId || '123456'
      })
    ).map(postObj => api.postIndustry(postObj));


    //set up a cloud service post per service and make posts
    const cloudServicesPosts = assetObj.cloudServices.map(service => (
      {
        cloud_services: service || 'example service',
        scrm_id: assetObj.scrmId || '123456'
      })
    ).map(postObj => api.postCloudService(postObj));

    //set up a pillar post per pillar and make posts
    const pillarsPosts = assetObj.pillars.map(pillar => (
      {
        cloud_services: pillar || 'example pillar',
        scrm_id: assetObj.scrmId || '123456'
      })
    ).map(postObj => api.postPillar(postObj));


    // set up user post object
    const userPostObj = {
      hubster_email: assetObj.userEmail || 'test.hubster@oracle.com',
      hubster_name: assetObj.userName || 'Test Hubster',
      scrm_id: assetObj.scrmId || '123456'
    };

    // make user post
    const hubsterPost = api.postHubster(assetPostObj)


    Promise.all([assetPost, industriesPosts, cloudServicesPosts, pillarsPosts, hubsterPost])
      .catch(error => console.log(error));

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
            <Form>
              <Form.Field required>
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
              {/* <Form.Group widths="equal">
                <Form.Input fluid label="SCRM ID" placeholder="Enter SCRM ID" />
              </Form.Group>

              <Form.Group widths="equal" className="update-form-field">
                <Form.Input fluid label="ALM" placeholder="ALM" />
                <Form.Button>Update</Form.Button>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input fluid label="USECASE" placeholder="Usecase" />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input fluid label="PICTURE" placeholder="Picture" />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input fluid label="OTUBE" placeholder="Otube" />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Select
                  fluid
                  label="INDUSTRY"
                  options={options}
                  placeholder="Industry"
                />
              </Form.Group>

              <Form.TextArea
                label="DESCRIPTION"
                placeholder="Enter the description..."
              /> */}
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

export default CreateAssets;
