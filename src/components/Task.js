import React, { Component } from 'react';
import styled from 'styled-components';


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

    return (
      <TaskItem className={task.complete ? 'complete' : ''}>
        <span>  
          <input type="checkbox" onChange={() => this.complete(index)} />
        </span>
        <div>
          <span>{task.dueDate}</span>
          <h2>{task.name}</h2>
          <p>{task.description}</p>
        </div>
        <button onClick={() => this.remove(index)}>x</button>
      </TaskItem>
    )
  }
}

const TaskItem = styled.li`
  display: flex;
  list-style-type: none;
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

    span {
      font-size: 10px;
    }
  }

  h2 {
    font-size: 16px;
    font-weight: normal;
    margin: 0;
  }

  p {
    font-size: 14px;
    margin: 0;
  }

  button {
    color: #aa231f;
    font-weight: bold;
    font-size: 14px;
    display: block;
    width: 75px;
    border: none;
    background-color: #ff5c49;
    margin-left: auto;
    cursor: pointer;
  }
`