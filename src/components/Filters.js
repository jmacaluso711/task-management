import React, { Component } from 'react';
import styled from 'styled-components';

export default class Filters extends Component {
  render() {
    const { filterBy, clearFilters } = this.props;

    return (
      <FilterContainer>
        <h2>Filter tasks by:</h2>
        <form ref={(el) => this.filterForm = el}>
          <FilterGroup>
            <input
              id="todayTomorrow"
              type="radio"
              name="filter"
              value="todayTomorrow"
              onChange={filterBy} />
            <label htmlFor="todayTomorrow">Due Today/Tomorrow</label>
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
            <button onClick={clearFilters}>Clear</button>
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
`;

const FilterGroup = styled.div`

`;