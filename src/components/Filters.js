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

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //componentDidMount = () => {}

  render() {
    let { industries, tech, useCase } = this.props;

    return (
      <div className="Filters" style={styles.filters}>
        <Dropdown
          style={styles.dropdown}
          clearable
          multiple
          search
          selection
          options={industries}
          placeholder="Industry"
        />
        <Dropdown
          style={styles.dropdown}
          clearable
          multiple
          search
          selection
          options={tech}
          placeholder="Cloud Services"
        />
        <Dropdown
          style={styles.dropdown}
          clearable
          multiple
          search
          selection
          options={useCase}
          placeholder="Keyword"
        />
        <Button color="red"> Update </Button>
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
