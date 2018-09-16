import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

export default class Task extends Component {
  /**
   * Pass the task object to our App component
   * so we can toggle the complete value
   */
  complete = (task) => {
    this.props.completeTask(task);
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
    const dueDatePast = moment(task.dueDate).isBefore(today);
    const dueToday = moment(task.dueDate).isSame(today);
    const dueTomorrow = moment(task.dueDate).isSame(tomorrow);
    
    return (
      <TaskItem className={task.complete ? 'task-complete' : ''}>
        <span>  
          <input 
            id={'task-'+index} 
            type="checkbox" 
            onChange={() => this.complete(task)}
            checked={task.complete}
          />
          <label htmlFor={'task-' + index}></label>
        </span>
        <div>
          <time dateTime={task.dueDate}>
            <span>{moment(task.dueDate).format('MMM Do YYYY')}</span>
            {dueDatePast ? <span className="warning warning--overdue">Overdue!</span> : ''}
            {dueToday || dueTomorrow ? <span className="warning warning--due-soon">Due Soon!</span> : ''}
          </time>
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
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #00b6cb;
  box-shadow: 0px 0px 10px rgba(24, 130, 145,.6);
  background-color: #fff;

  > span {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    label {
      display: block;
      position: relative;
      width: 30px;
      height: 30px;
      border: 1px solid #00b6cb;
      border-radius: 50%;
      cursor: pointer;
    }

    label:before {
      content: " ";
      display: block;
      position: absolute;
      left: 4px;
      top: 4px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      transform: scale(0);
      transition: all 0.2s ease;
    }

    input:checked ~ label:before {
      transform: scale(1);
      background-color: #00b6cb;
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 4;
    padding: 1rem;

    time {
      font-size: 10px;

      span {
        color: #fff;
        font-weight: bold;
        display: inline-block;
        margin-right: 10px;
        padding: 3px 5px;
        border-radius: 3px;
        background-color: #12a3b4;
        transition: all 0.2s ease;
      }
    }

    .warning--overdue {
      background-color: #ff5c49;
    }

    .warning--due-soon {
      background-color: #34bc6e;
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

  &.task-complete {
    background-color: #f0f0f0;
    h2 {
      text-decoration: line-through;
    }
    time span,
    .warning--overdue,
    .warning--due-soon {
      background-color: #a6a5a6;
    }
  }
`

const ButtonRemove = styled.button`
  color: gray;
  font-weight: bold;
  font-size: 14px;
  display: block;
  width: 75px;
  border: none;
  border-radius: 0 8px 8px 0;
  margin-left: auto;
  cursor: pointer;
  background-color: #eaeaea;
  transition: all 0.3s ease;
  &:hover {
    background-color: #d8d8d8
  }
`