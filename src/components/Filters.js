import React, { Component } from 'react';
import { Dropdown, Button, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import dropOptions from '../sample/dropOptions';

const styles = {
  filters: {
    margin: '10px'
  },
  dropdown: {
    margin: '5px'
  }
};


const capitalize = word => {
  if (word === "and") return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const format = value => {
  var text;
  var words = value.split('_');
  if (words.length === 1) { text = capitalize(words[0]); }
  else {
    words = words.map(word => capitalize(word));
    text = words.join(' ');
  }
  return { value, text }
}

/* Fetch data from API, including dropdown search values */
var filterOptions = {
  industries: dropOptions.industries.map(industry => format(industry)),
  cloudServices: dropOptions.cloudServices.map(cloudService => format(cloudService)),
  pillars: dropOptions.pillars.map(pillar => format(pillar))
}

const splitStringOnSpaces = str => str.split(' ');

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      industries: [],
      cloudServices: [],
      pillars: [],
      hubsters: [],
      keywords: []
    };
  }

  updateIndustries = (e, { name, value }) => { this.setState({ industries: value }) }
  updateCloudServices = (e, { name, value }) => { this.setState({ cloudServices: value }) }
  updatePillars = (e, { name, value }) => { this.setState({ pillars: value }) }
  updateHubsters = (e, { name, value }) => { this.setState({ hubsters: value }) }

  updateKeywords = (e, { name, value }) => { this.setState({ keywords: splitStringOnSpaces(value) }) }

  clearFilters = () => {
    this.setState({
      industries: [],
      cloudServices: [],
      pillars: [],
      hubsters: [],
      keywords: []
    });
  }

  componentDidMount = () => {

  }

  render() {
    var { industries, cloudServices, pillars, hubsters, keywords } = this.state;
    var { update } = this.props;
    return (
      <div className="Filters" style={styles.filters}>
        <Dropdown
          style={styles.dropdown}
          clearable multiple search selection
          value={industries} onChange={this.updateIndustries}
          options={filterOptions.industries}
          placeholder="Industries"
        />
        <Dropdown
          style={styles.dropdown}
          clearable multiple search selection
          value={cloudServices} onChange={this.updateCloudServices}
          options={filterOptions.cloudServices}
          placeholder="Cloud Services"
        />
        <Dropdown
          style={styles.dropdown}
          clearable multiple search selection
          value={pillars} onChange={this.updatePillars}
          options={filterOptions.pillars}
          placeholder="Pillars"
        />
        <Dropdown
          style={styles.dropdown}
          clearable multiple search selection
          value={hubsters} onChange={this.updateHubsters}
          options={filterOptions.cloudServices}
          disabled
          placeholder="Hubsters"
        />
        <Input
          name="keywords"
          value={keywords.join(' ')} onChange={this.updateKeywords}
          placeholder="Keywords"
        />
        <Button color="red" onClick={() => update(this.state)}> Update </Button>
        <Button onClick={() => this.clearFilters()}> Clear </Button>
      </div>
    );
  }
}

Filters.propTypes = {
  timePeriods: PropTypes.array,
  industries: PropTypes.array,
  tech: PropTypes.array,
  useCase: PropTypes.array
};

export default Filters;
