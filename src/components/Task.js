import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

export default class Task extends Component {
  /**
   * Pass the task index to our App component
   * so we can toggle the complete value
   */
  complete = (index) => {
    this.props.completeTask(index);
  }

  /**
   * Pass the task index to our App component
   * so we can remove the task from the list.
   */
  remove = (index) => {
    this.props.removeTask(index);
  }

  render() {
    const { task, index } = this.props;
    const today = moment().format('YYYY-MM-DD');
    const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
    const pastDue = moment(task.dueDate).isBefore(today);
    const dueToday = moment(task.dueDate).isSame(today);
    const dueTomorrow = moment(task.dueDate).isSame(tomorrow);
    
    return (
      <TaskItem>
        <span>  
          <input 
            id={'task-'+index} 
            type="checkbox" 
            onChange={() => this.complete(index)}
            checked={task.complete}
          />
          <label htmlFor={'task-' + index}></label>
        </span>
        <div>
          {pastDue ? 'Past Due' : ''}
          {dueToday || dueTomorrow ? 'Due Soon' : ''}
          <time dateTime={task.dueDate}>{moment(task.dueDate).format('MMM Do YYYY')}</time>
          <h2>{task.name}</h2>
          <p>{task.description}</p>
        </div>
        <ButtonRemove onClick={() => this.remove(index)}>x</ButtonRemove>
      </TaskItem>
    )
  }
}

const TaskItem = styled.li`
  display: flex;
  list-style-type: none;
  margin-bottom: 2px;
  background-color: #fff;

  > span {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 4;
    padding: 1rem;

    time {
      font-size: 10px;
    }
  }
  
  h2 {
    font-size: 16px;
    font-weight: bold;
    margin: .25rem 0;
  }

  p {
    font-size: 12px;
    margin: 0;
  }
`

const ButtonRemove = styled.button`
  color: gray;
  font-weight: bold;
  font-size: 14px;
  display: block;
  width: 75px;
  border: none;
  background-color: lightgray;
  margin-left: auto;
  cursor: pointer;
`