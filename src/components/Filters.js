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

const FilterContainer = styled.section`
  margin-bottom: 1rem;
  form {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  h1 {
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
    border: 1px solid #fff;
    background-color: transparent;
    cursor: pointer;
  }
  input:checked ~ label {
    background-color: #188291;
  }
`;