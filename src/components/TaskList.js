import React from 'react';
import Task from './Task';
import styled from 'styled-components';

const TaskList = ({ tasks, completeTask, removeTask }) => (
  <Tasks>
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
  </Tasks>
)

const Tasks = styled.ul`
  width: 100%;
  margin: 0;
  padding: 0;
`

export default TaskList;