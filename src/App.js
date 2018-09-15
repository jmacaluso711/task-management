import React, { Component } from 'react';
import styled from 'styled-components';
import TaskList from './components/TaskList';
import Filters from './components/Filters';
import moment from 'moment';
const token = 'tasks'

export default class App extends Component {
  state = {
    tasks: JSON.parse(localStorage.getItem(token)) || [],
    filter: ''
  }

  /**
   * Set our state object in localStorage
   */
  save = () => {
    localStorage.setItem(token, JSON.stringify(this.state.tasks));
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
      { 
        tasks: [...this.state.tasks, task], 
        filter: '' 
      }, 
      () => this.save()
    );
    this.filters.filterForm.reset();
    this.taskForm.reset();
  }

  /**
   * Take a copy of our state
   * Toggle the value of complete
   * Update our state and save to localStorage
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
   * Update our state and save to localStorage
   */
  removeTask = (index) => {
    const tasks = [...this.state.tasks];
    tasks.splice(index, 1);
    this.setState(
      {tasks},
      () => this.save()
    );
  }

  /**
   * Set the filter state to the filter input value
   */
  filterBy = (e) => {
    this.setState({
      filter: e.target.value
    });
  }

  /**
   * Clear our filter state and reset the filter form
   * to get back to the default state
   */
  clearFilters = (e) => {
    e.preventDefault();
    this.setState({
      filter: ''
    });
    this.filters.filterForm.reset();
  }

  render() {
    const { tasks, filter } = this.state;
    let filteredTasks = tasks;
    
    /**
     * Update our filteredTasks variable based on
     * the selected filter
     */
    if (filter) {
      const today = moment().format('YYYY-MM-DD');
      const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
      switch (filter) {
        case 'todayTomorrow':
          filteredTasks = tasks.filter(task => {
            return moment(task.dueDate).isSame(today) || moment(task.dueDate).isSame(tomorrow);
          });
          break;
        case 'complete':
          filteredTasks = tasks.filter(task => task.complete === true);
          break;
        case 'overdue':
          filteredTasks = tasks.filter(task => moment(task.dueDate).isBefore(today));
          break;
        default:
          break;
      }
    }

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
            <AddTaskButton>+ Add Task</AddTaskButton>
          </form>
        </FormContainer>
        {tasks.length !== 0 &&
          <React.Fragment>
            <Filters 
              ref={(el) => this.filters = el} 
              filterBy={(e) => this.filterBy(e)}
              clearFilters={(e) => this.clearFilters(e)}
            />
            <TaskList
              tasks={filteredTasks}
              completeTask={this.completeTask}
              removeTask={this.removeTask}
            />
          </React.Fragment>
        }
      </div>
    );
  }
}

const FormContainer = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #00b6cb;
  box-shadow: 0px 0px 10px rgba(18, 163, 180,.6);
  margin-bottom: 2rem;

  h2 {
    margin-top: 0;
  }

  input,
  textarea {
    width: 100%;
  }
`;

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
    font-size: 10px;
    font-weight: bold;
    text-transform: uppercase;
    display: inline-block;
    margin-bottom: .25rem;
  }
`;

const AddTaskButton = styled.button`
  color: #fff;  
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1rem;
  padding: .75rem 2rem;
  border: none;
  border-radius: 5px;
  background-color: #fe8500;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: #db7c00
  }
`;
