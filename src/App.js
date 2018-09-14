import React, { Component } from 'react';
import TaskList from './components/TaskList';
import styled from 'styled-components';

class App extends Component {
  state = {
    tasks: JSON.parse(localStorage.getItem('tasks')) || []
  }

  save = () => {
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
  }

  /**
   * Create the task object
   * and use that object to update our list of tasks
   */
  addTask = (e) => {
    e.preventDefault();

    const task = {
      id: Date.now(),
      name: this.name.value,
      description: this.description.value,
      dueDate: this.dueDate.value,
      complete: false
    }
    
    this.setState(
      { tasks: [...this.state.tasks, task] }, 
      () => this.save()
    );
    
    this.taskForm.reset();
  }

  /**
   * Take a copy of our state
   * Toggle the value of complete
   * Update our state
   */
  completeTask = (index) => {
    const tasks = [...this.state.tasks];
    tasks[index].complete = !tasks[index].complete;
    this.setState(
      {tasks},
      () => this.save()
    );
  }

  /**
   * Take a copy of our state
   * Remove our task from the list
   * Update our state
   */
  removeTask = (index) => {
    const tasks = [...this.state.tasks];
    tasks.splice(index, 1);
    this.setState(
      {tasks},
      () => this.save()
    );
  }

  render() {
    const { tasks } = this.state;

    return (
      <div className="app">
        <FormContainer>
          <h2>Add a Task</h2>
          <form ref={(el) => this.taskForm = el} onSubmit={(e) => this.addTask(e)}>
            <FormGroup>
              <label htmlFor="name">Name</label>
              <input 
                ref={(input) => this.name = input}
                name="name"
                type="text"
                required
              />
            </FormGroup>
            <FormGroup>
              <label htmlFor="description">Description</label>
              <textarea 
                ref={(input) => this.description = input}
                name="description" 
                cols="30" 
                rows="5"
                required
              ></textarea>
            </FormGroup>
            <FormGroup>
              <label htmlFor="dueDate">Due Date</label>
              <input 
                ref={(input) => this.dueDate = input}
                name="dueDate"
                type="date"
                required
              />
            </FormGroup>
            <button>+ Add Task</button>
          </form>
        </FormContainer>
        {tasks &&
          <TaskList
            tasks={tasks}
            completeTask={this.completeTask}
            removeTask={this.removeTask}
          />
        }
      </div>
    );
  }
}

export default App;

const FormContainer = styled.div`
  background-color: #fff;
  padding: 1rem;
  margin-bottom: 1rem;

  h2 {
    margin-top: 0;
  }
`

const FormGroup = styled.div`
  margin-bottom: .5rem;
  input, textarea {
    color: #333;
    font-size: 12px;
    padding: .75rem;
    border: 1px solid lightgray;
    
    &:focus {
      outline: none;
    }
  }
  label {
    color: gray;
    font-size: 10px;
    font-weight: bold;
    text-transform: uppercase;
    display: inline-block;
    margin-bottom: .25rem;
  }
`