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
            <ClearButton onClick={clearFilters}>Clear</ClearButton>
          </FilterGroup>
        </form>
      </FilterContainer>
    )
  }
}

const FilterContainer = styled.div`
  margin-bottom: 1rem;
  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  h2 {
    color: #fff;
    font-size: 16px;
  }
`;

const FilterGroup = styled.div`
  input {
    display: none;
  }
  label {
    color: #fff;
    font-size: .875rem;
    display: inline-block;
    padding: .5rem;
    border-radius: 4px;
    border: 2px solid #fff;
    background-color: transparent;
    cursor: pointer;
  }
  input:checked ~ label {
    background-color: #188291;
  }
`;

const ClearButton = styled.button`
  color: #fff;
  font-size: .875rem;
  display: inline-block;
  padding: .5rem;
  border-radius: 4px;
  border: 2px solid #fff;
  background-color: transparent;
  cursor: pointer;
`;