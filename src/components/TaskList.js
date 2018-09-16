import React from 'react';
import Task from './Task';
import FlipMove from 'react-flip-move';

const TaskList = ({ tasks, completeTask, removeTask }) => (
  <FlipMove 
    typeName="ul"
    duration={250}
    style={{margin: '0px', padding: '0'}}
    >
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
  </FlipMove>
)

export default TaskList;