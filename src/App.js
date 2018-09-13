import React, { Component } from 'react';

const TaskList = ({ tasks, completeTask, removeTask }) => (
  <ul>
    {
      tasks.map((task, index) => 
        <Task 
          key={task.id}
          index={index}
          task={task} 
          completeTask={completeTask} 
          removeTask={removeTask} 
        />)
    }
  </ul>
)

class Task extends Component {
  complete = (index) => {
    this.props.completeTask(index);
  }

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

class App extends Component {
  state = {
    tasks: []
  }

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

  completeTask = (index) => {
    const tasks = [...this.state.tasks];
    tasks[index].complete = !tasks[index].complete;
    this.setState({tasks});
  }

  removeTask = (index) => {
    const tasks = [...this.state.tasks];
    tasks.splice(index, 1);
    this.setState({tasks});
  }

  render() {
    const { tasks } = this.state;

    return (
      <div>
        {tasks && 
          <TaskList 
            tasks={tasks} 
            completeTask={this.completeTask}
            removeTask={this.removeTask}
          />
        }
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
