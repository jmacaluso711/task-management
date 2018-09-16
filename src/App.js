import React, { Component } from 'react';
import styled from 'styled-components';
import TaskList from './components/TaskList';
import Filters from './components/Filters';
import moment from 'moment';
import FlipMove from 'react-flip-move';
const token = 'tasks'

export default class App extends Component {
  state = {
    tasks: JSON.parse(localStorage.getItem(token)) || [],
    filter: '',
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
    if(this.filters) {
      this.filters.filterForm.reset();
    }
    this.taskForm.reset();
  }

  /**
   * Take a copy of our state
   * Toggle the value of complete
   * Update our state and save to localStorage
   */
  completeTask = (task) => {
    const tasks = [...this.state.tasks];
    task.complete = !task.complete;
    this.setState(
      { tasks },
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
      { tasks },
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

  render() {
    const { tasks, filter } = this.state;
    let filteredTasks = tasks;
    let listEmptyMessage;

    if (filteredTasks.length === 0) {
      listEmptyMessage = <EmptyMessage>You don't have any tasks.</EmptyMessage>
    }

    /**
     * Update our filteredTasks variable 
     * based on the selected filter
     */
    if (filter) {
      const today = moment().format('YYYY-MM-DD');
      const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
      switch (filter) {
        case 'todayTomorrow':
          filteredTasks = tasks.filter(task => {
            return moment(task.dueDate).isSame(today) || moment(task.dueDate).isSame(tomorrow);
          });
          if (filteredTasks.length === 0) {
            listEmptyMessage = <EmptyMessage>No tasks due today or tomorrow</EmptyMessage>
          }
          break;
        case 'complete':
          filteredTasks = tasks.filter(task => task.complete === true);
          if (filteredTasks.length === 0) {
            listEmptyMessage = <EmptyMessage>No tasks completed</EmptyMessage>
          }
          break;
        case 'overdue':
          filteredTasks = tasks.filter(task => moment(task.dueDate).isBefore(today));
          if (filteredTasks.length === 0) {
            listEmptyMessage = <EmptyMessage>No tasks overdue</EmptyMessage>
          }
          break;
        case 'all':
          filteredTasks = tasks;
          break;
        default:
          break;
      }
    }

    return (
      <div className="app">
        <FormContainer>
          <h1>Add a Task</h1>
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
        <TasksContainer>
          <FlipMove
            duration={250}
            easing="ease-out"
            maintainContainerHeight={true}
          >
            {tasks.length !== 0 && 
              <Filters 
                ref={(el) => this.filters = el} 
                filterBy={(e) => this.filterBy(e)}
              />
            }
          </FlipMove>
          <FlipMove leaveAnimation='none' delay={250}>
            {listEmptyMessage}
          </FlipMove>
          <TaskList
            tasks={filteredTasks}
            completeTask={this.completeTask}
            removeTask={this.removeTask}
          />
        </TasksContainer>
      </div>
    );
  }
}

const FormContainer = styled.section`
  padding: 1rem;
  margin-right: 2rem;
  width: 420px;
  border-radius: 8px;
  border: 1px solid #00b6cb;
  box-shadow: 0px 0px 10px rgba(24, 130, 145,.6);
  background-color: #fff;

  h1 {
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
    background-color: #db7c00;
  }
`;



const TasksContainer = styled.div`
  width: 80%;
  max-width: 420px;
`;

const EmptyMessage = styled.h3`
  color: #fff;
  font-weight: normal;
  font-size: 16px;
  padding: 1rem;
  margin: 0;
  border-radius: 8px;
  border: 1px solid #fff;
`
