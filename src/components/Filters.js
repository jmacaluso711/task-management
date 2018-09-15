import React, { Component } from 'react';
import styled from 'styled-components';

class Filters extends Component {
  render() {
    const { filterBy } = this.props;
    return (
      <FilterContainer>
        <form ref={(el) => this.filterForm = el}>
          <FilterGroup>
            <input
              id="todayTomorrow"
              type="radio"
              name="filter"
              value="todayTomorrow"
              onChange={filterBy} />
            <label htmlFor="todayTomorrow">Today / Tomorrow</label>
          </FilterGroup>
          <FilterGroup>
            <input
              id="overdue"
              type="radio"
              name="filter"
              value="overdue"
              onChange={filterBy} />
            <label htmlFor="overdue">Overdue</label>
          </FilterGroup>
          <FilterGroup>
            <input
              id="complete"
              type="radio"
              name="filter"
              value="complete"
              onChange={filterBy} />
            <label htmlFor="complete">Complete</label>
          </FilterGroup>
          <FilterGroup>
            <input
              id="clear"
              type="radio"
              name="filter"
              value="clear"
              onChange={filterBy} />
            <label htmlFor="clear">Clear</label>
          </FilterGroup>
        </form>
      </FilterContainer>
    )
  }
}

const FilterContainer = styled.div`
  form {
    display: flex;
  }
`

const FilterGroup = styled.div`

`

export default Filters;