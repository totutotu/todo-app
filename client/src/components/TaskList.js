import { useEffect, useState } from 'react';
import { getTasks, changeTaskCompleteStatus, removeTask, createTask } from '../services/tasksService';
import Task from './Task';
import CreateTaskModal from './CreateTaskModal';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            const res = await getTasks();
            if (res.error) {
                setError('Error fetching tasks');
            } else {
                setTasks(res.tasks);
                setError(null);

            }
            setLoading(false);
        };
        fetchTasks();
    }, []);

    const changeCompleteStatus = async (taskId) => {
        const taskToUpdate = tasks.find(task => task.id === Number(taskId));
        const res = await changeTaskCompleteStatus(taskToUpdate);
        if (res.error) {
            setError(error);
        } else {
            setTasks([
                ...tasks.filter(task => task.id !== taskToUpdate.id),
                { ...taskToUpdate, completed: !taskToUpdate.completed}
            ]);
        }
    };

    const remove = async (taskId) => {
        const res = await removeTask(taskId);
        if (res.error) {
            setError(error);
        } else {
            setTasks([
                ...tasks.filter(task => task.id !== Number(taskId))
            ]);
            setError(null);

        }
    };

    const create = async (description) => {
        const res = await createTask(description);
        if (res.error) {
            setError(error);
        } else {
            setTasks([
                ...tasks,
                res.task,
            ]);
            setError(null);

        }
    };

    const completedTasks = () => {
        const completedTasks = tasks.filter(task => !task.completed);
        if (completedTasks.length === 0) return <h2 className='infotext'>No incomplete tasks!</h2>;
        return (
            <div className='card-container incomplete'>
                {completedTasks.map(task => 
                    <Task
                        key={task.id}
                        description={task.description}
                        id={task.id}
                        created={task.createdTimeStamp}
                        completed={task.completed}
                        changeCompleteStatus={changeCompleteStatus}
                        remove={remove}
                    />)}
            </div>);
    };

    if (loading) return <h2 className='infotext'>Loading...</h2>;

    return (
        <>  
            <CreateTaskModal
                showModal={showCreateModal}
                setShowModal={setShowCreateModal}
                createTask={create}
            />
            <button onClick={() => setShowCreateModal(true)} className='green-button'>New Task</button>
            {error ?? <h2 className='infotext'>{error}</h2>}
            {tasks.length === 0 ?? <h2 className='infotext'>No added tasks yet</h2>}

            {completedTasks()}
            <hr className='solid' />
            <div className='card-container complete'>
                {tasks.filter(task => task.completed).map(task => 
                    <Task
                        key={task.id}
                        description={task.description}
                        id={task.id}
                        created={task.createdTimeStamp}
                        completed={task.completed}
                        changeCompleteStatus={changeCompleteStatus}
                        remove={remove}
                    />)}
            </div>
        </>
    );};

export default TaskList;
