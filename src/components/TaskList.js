import React from 'react';
import Task from './Task';

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

export default TaskList;