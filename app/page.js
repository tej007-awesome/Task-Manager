// pages/index.js
"use client";
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [date, setDate] = useState(new Date());

  const addTask = () => {
    if (taskInput.trim()) {
      if (editingIndex !== null) {
        const updatedTasks = [...tasks];
        updatedTasks[editingIndex].name = taskInput;
        setTasks(updatedTasks);
        setEditingIndex(null);
      } else {
        setTasks([...tasks, { name: taskInput, completed: false }]);
      }
      setTaskInput('');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
    updateCompletedCount(updatedTasks);
  };

  const editTask = (index) => {
    setTaskInput(tasks[index].name);
    setEditingIndex(index);
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    updateCompletedCount(updatedTasks);
  };

  const updateCompletedCount = (updatedTasks) => {
    const count = updatedTasks.filter(task => task.completed).length;
    setCompletedTasks(count);
  };

  const progressPercentage = tasks.length
    ? Math.round((completedTasks / tasks.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">Task Manager</h1>

        <div className="mb-6">
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Add a new task"
            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black placeholder-gray-400"
          />
          <button
            onClick={addTask}
            className="w-full bg-blue-600 text-white py-3 mt-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {editingIndex !== null ? 'Update Task' : 'Add Task'}
          </button>
        </div>

        <ul className="space-y-4 mb-8">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(index)}
                  className="mr-3"
                />
                <span className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>{task.name}</span>
              </div>
              <div>
                <button
                  onClick={() => editTask(index)}
                  className="mr-4 text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Task Progress</h2>
          <div className="h-4 bg-gray-200 rounded-lg overflow-hidden">
            <div
              style={{ width: `${progressPercentage}%` }}
              className="h-full bg-green-500 rounded-lg transition-all duration-300"
            ></div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Calendar</h2>
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <Calendar value={date} onChange={setDate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
