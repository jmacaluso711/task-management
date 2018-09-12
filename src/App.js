import React, { Component } from 'react';

const Task = ({ task }) => (
  <li>
    <h2>{task.name}</h2>
    <p>{task.description}</p>
    <span>{task.dueDate}</span>
  </li>
)

class App extends Component {
  state = {
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    done: false
  }

  createTask = (e) => {
    e.preventDefault();
    let task = {
      name: this.name.value,
      description: this.description.value,
      dueDate: this.dueDate.value
    }
    localStorage.setItem('tasks', JSON.stringify(this.state.tasks));
    this.setState({ 
      tasks: [...this.state.tasks, task]
    });
    this.taskForm.reset();
  }

  render() {
    const { tasks } = this.state;
    return (
      <div>
        <ul>
          {tasks.map((task, i) => <Task key={i} task={task} />) }
        </ul>
        <form ref={(el) => this.taskForm = el} onSubmit={(e) => this.createTask(e)}>
          <div>
            <input 
              ref={(input) => this.name = input}
              name="name"
              type="text"
            />
          </div>
          <div>
            <textarea 
              ref={(input) => this.description = input}
              name="description" 
              cols="30" 
              rows="5"
            ></textarea>
          </div>
          <div>
            <input 
              ref={(input) => this.dueDate = input}
              name="dueDate"
              type="date"
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
