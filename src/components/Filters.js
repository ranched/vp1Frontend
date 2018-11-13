import React, { Component } from 'react';
import { Dropdown, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

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

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      industries: [],
      cloudServices: [],
      pillars: [],
      hubsters: []
    };
  }

  updateIndustries = (e, { name, value }) => { this.setState({ industries: value }) }
  updateCloudServices = (e, { name, value }) => { this.setState({ cloudServices: value }) }
  updatePillars = (e, { name, value }) => { this.setState({ pillars: value }) }
  updateHubsters = (e, { name, value }) => { this.setState({ hubsters: value }) }

  componentDidMount = () => {

  }

  render() {
    var { industries, cloudServices, pillars, hubsters } = this.state;
    var { options, update } = this.props;
    return (
      <div className="Filters" style={styles.filters}>
        <Dropdown
          style={styles.dropdown}
          clearable multiple search selection
          value={industries} onChange={this.updateIndustries}
          options={options.industries}
          placeholder="Industries"
        />
        <Dropdown
          style={styles.dropdown}
          clearable multiple search selection
          value={cloudServices} onChange={this.updateCloudServices}
          options={options.cloudServices}
          placeholder="Cloud Services"
        />
        <Dropdown
          style={styles.dropdown}
          clearable multiple search selection
          value={pillars} onChange={this.updatePillars}
          options={options.pillars}
          placeholder="Pillars"
        />
        <Dropdown
          style={styles.dropdown}
          clearable multiple search selection
          value={hubsters} onChange={this.updateHubsters}
          options={options.cloudServices}
          disabled
          placeholder="Hubsters"
        />
        <Dropdown
          style={styles.dropdown}
          clearable multiple search selection
          value={industries} onChange={this.updateIndustries}
          /* options={useCase} */
          disabled
          placeholder="Keywords"
        />
        <Button color="red" onClick={() => update(this.state)}> Update </Button>
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
