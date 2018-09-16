import React, { Component } from 'react';
import styled from 'styled-components';

export default class Filters extends Component {
  render() {
    const { filterBy } = this.props;

    return (
      <FilterContainer>
        <h1>Filter tasks by:</h1>
        <form ref={(el) => this.filterForm = el}>
          <FilterGroup>
            <input
              id="all"
              type="radio"
              name="filter"
              value="all"
              onChange={filterBy} />
            <label htmlFor="all">All</label>
          </FilterGroup>
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
        </form>
      </FilterContainer>
    )
  }
}

/**
 * Styled Components
 */
const FilterContainer = styled.section`
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #b8c1c1;
  background-color: #fff;
  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  h1 {
    font-size: 16px;
    margin-top: 0;
  }
`;

const FilterGroup = styled.div`
  input {
    display: none;
  }
  label {
    font-size: .875rem;
    display: inline-block;
    padding: .5rem;
    border-radius: 4px;
    border: 1px solid #b8c1c1;
    background-color: transparent;
    cursor: pointer;
  }
  input:checked ~ label {
    color: #fff;
    background-color: #6f7878;
  }
`;