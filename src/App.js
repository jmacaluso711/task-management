import React, { Component } from 'react';

const Task = ({ task, completeTask }) => (
  <li>
    <input type="checkbox" onChange={completeTask} />
    <h2>{task.name}</h2>
    <p>{task.description}</p>
    <span>{task.dueDate}</span>
    <button>x</button>
  </li>
)

class App extends Component {
  state = {
    tasks: [],
    done: false
  }

  addTask = (e) => {
    e.preventDefault();
    const task = {
      name: this.name.value,
      description: this.description.value,
      dueDate: this.dueDate.value
    }
    this.setState({ 
      tasks: [...this.state.tasks, task]
    });
    this.taskForm.reset();
  }

  completeTask = (e, key) => {
    console.log(key);
  }

  render() {
    const { tasks } = this.state;

    return (
      <div>
        <ul>
          {tasks.map((task, i) => <Task key={i} task={task} completeTask={(e, key) => this.completeTask(e, key)} />)}
        </ul>
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
      </div>
    );
  }
}

export default App;
