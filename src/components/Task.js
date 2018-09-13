import React, { Component } from 'react';


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
      <li className={task.complete ? 'complete' : ''}>
        <input type="checkbox" onChange={() => this.complete(index)} />
        <h2>{task.name}</h2>
        <p>{task.description}</p>
        <span>{task.dueDate}</span>
        <button onClick={() => this.remove(index)}>x</button>
      </li>
    )
  }
}