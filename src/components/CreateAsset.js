import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  Header,
  Form,
  Button,
  Input,
  Dropdown,
  Container,
  Segment,
  TextArea
} from "semantic-ui-react";
import Dropzone from "react-dropzone";
import dropOptions from "../sample/dropOptions";
import * as api from "../services/digitalAssets";

const styles = {
  mainAssets: {
    margin: "20px"
  }
};

const capitalize = word => {
  if (word === "and") return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const format = value => {
  var text;
  var words = value.split("_");
  if (words.length === 1) {
    text = capitalize(words[0]);
  } else {
    words = words.map(word => capitalize(word));
    text = words.join(" ");
  }
  return { value, text };
};

const trimStringSpaces = string => {
  return string.trim();
};

const convertStringToArray = str => {
  return str.split(",").map(trimStringSpaces);
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 0
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 0,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};
const baseStyle = {
  width: 110,
  height: 110,
  borderWidth: 2,
  borderColor: "#666",
  borderStyle: "dashed",
  borderRadius: 5,
  padding: 4
};

class CreateAssets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cloudServices: [],
      customer: "",
      description: "",
      hubsters: [],
      industries: [],
      oppId: "",
      otubeLink: "",
      pillars: [],
      repo: "",
      submitted: false,
      scrmId: "",
      title: "",
      userEmail: "",
      useCase: "",
      charsLeft: {
        useCase: 5,
        description: 5
      },
      files: [],
      archImage: {}
    };
  }

  //componentDidMount = () => {};

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
    if (name === "useCase" || name === "description") {
      var { charsLeft } = this.state;
      charsLeft[name] = 5 - value.length;
      this.setState({ charsLeft });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    var asset = this.state;

    const assetPostObj = {
      scrm_id: asset.scrmId,
      opp_id: asset.oppId,
      title: asset.title,
      repo_url: asset.repo,
      otube_url: asset.otubeLink,
      view_count: 0,
      description: asset.description,
      cloud_services: asset.cloudServices,
      hubsters: convertStringToArray(asset.hubsters),
      pillars: asset.pillars,
      industries: asset.industries,
      image_name: asset.files[0].name,
      encoded_image: asset.archImage.base64,
      createdBy: asset.userEmail,
      customer: asset.customer,
      modifiedBy: asset.userEmail,
      modifiedOn: new Date()
    };

    // make asset post
    api.postAsset(assetPostObj).catch(error => console.log(error));

    this.props.history.push("/assets");

    //this.setState({ submitted: true });
  };

  onDrop = files => {
    var file = files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      var archImage = {
        name: file.name,
        type: file.type,
        size: Math.round(file.size / 1000) + " kB",
        base64: reader.result,
        file: file
      };
      this.setState({ archImage });
    };

    this.setState({
      files: files.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    });
  };

  componentWillUnmount = () => {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
  };

  render() {
    const { files } = this.state;

    const thumbs = files.map(file => (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <img src={file.preview} style={img} />
        </div>
      </div>
    ));

    return (
      <Container
        fluid
        className="createAsset"
        style={{
          backgroundColor: "#F7F7F7",
          paddingTop: "80px",
          paddingBottom: "80px"
        }}
      >
        <Segment className="formSegment">
          <Header
            as="h1"
            dividing
            style={{ paddingBottom: "25px", marginBottom: "0px" }}
          >
            Create New Asset
          </Header>
          <Form
            onSubmit={this.handleSubmit}
            style={{ paddingTop: "25px" }}
            className="createForm"
          >
            <Form.Field required>
              <label>SCRM ID</label>
              <Input
                name="scrmId"
                value={this.state.scrmId}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Opp ID</label>
              <Input
                name="oppId"
                value={this.state.oppId}
                onChange={this.handleChange}
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
              <label>Customer</label>
              <Input
                name="customer"
                onChange={this.handleChange}
                value={this.state.customer}
              />
            </Form.Field>
            <Form.Field>
              <label>Hubsters</label>
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
              <section style={baseStyle}>
                <Dropzone accept="image/*" onDrop={this.onDrop.bind(this)}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {!thumbs.length ? <p>Drop files here</p> : null}
                    </div>
                  )}
                </Dropzone>
                <aside style={thumbsContainer}>{thumbs}</aside>
              </section>
              {!thumbs.length ? null : (
                <p style={{ marginBottom: "0" }}>{files[0].name}</p>
              )}
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
              <label>Use Case</label>
              <TextArea
                name="useCase"
                placeholder="Please enter a brief description"
                onInput={this.handleChange}
                /* value={this.state.useCase} */
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <TextArea
                name="description"
                placeholder="Please enter a brief description"
                onInput={this.handleChange}
                /* value={this.state.description} */
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
        </Segment>
      </Container>
    );
  }
}

CreateAssets.propTypes = {};

export default withRouter(CreateAssets);
