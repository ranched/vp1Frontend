import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Form, Button } from 'semantic-ui-react';

const styles = {
  mainAssets: {
    margin: '20px'
  }
};

const options = [
  { key: 'm', text: 'Manufacturing', value: 'manufac' },
  { key: 'a', text: 'Automobile', value: 'auto' }
];

class CreateAssets extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //componentDidMount = () => {}

  render() {
    return (
      <section className="centered">
        <Grid style={styles.mainAssets} centered>
          <Grid.Column width={10}>
            <h2 style={{ textAlign: 'center' }}>CREATE ASSET</h2>
          </Grid.Column>
          <Grid.Column width={10}>
            <Form>
              <Form.Group widths="equal">
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
                {/* <Form.Input type="file" /> */}
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
              />
              <Form.TextArea label="README" placeholder="Add README" />
              {/* <Form.Checkbox label='I agree to the Terms and Conditions' /> */}
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
