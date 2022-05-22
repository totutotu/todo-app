const Task = ({ description, id, created, completed, changeCompleteStatus, remove }) => {
    const dateString = `
        ${new Date(created).toLocaleDateString()} at ${new Date(created).toLocaleTimeString()}
    `;
    const changeStatusbuttonText = completed ? 'Return to Todo-list' : 'Mark Complete';

    return (
        <div className={`card ${completed ? 'completed-card': ''}`}>
            <p className='title'>Description: {description}</p>
            <div className='metadata'>
                <p>id: {id}</p>
                <p>Created: {dateString}</p>
            </div>
            <div className='buttons'>
                <button
                    id={id}
                    onClick={(e) => changeCompleteStatus(e.target.id)}
                    className='complete'
                >
                    {changeStatusbuttonText}
                </button>
                <button
                    id={id}
                    onClick={(e) => remove(e.target.id)}
                    className='warning'
                >
                    Delete
                </button>
            </div>

        </div>
    );
};

export default Task;