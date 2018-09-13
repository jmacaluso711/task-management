import React, { Component } from 'react';
import TaskList from './components/TaskList';


class App extends Component {
  state = {
    tasks: []
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

    this.setState({ 
      tasks: [...this.state.tasks, task]
    });
    
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
    this.setState({tasks});
  }

  /**
   * Take a copy of our state
   * Remove our task from the list
   * Update our state
   */
  removeTask = (index) => {
    const tasks = [...this.state.tasks];
    tasks.splice(index, 1);
    this.setState({tasks});
  }

  render() {
    const { tasks } = this.state;

    return (
      <div>
        <form ref={(el) => this.taskForm = el} onSubmit={(e) => this.addTask(e)}>
          <div>
            <input 
              ref={(input) => this.name = input}
              name="name"
              type="text"
              required
            />
          </div>
          <div>
            <textarea 
              ref={(input) => this.description = input}
              name="description" 
              cols="30" 
              rows="5"
              required
            ></textarea>
          </div>
          <div>
            <input 
              ref={(input) => this.dueDate = input}
              name="dueDate"
              type="date"
              required
            />
          </div>
          <button>+ Add Task</button>
        </form>
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
