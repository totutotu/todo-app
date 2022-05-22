import { useState } from 'react';

const CreateTaskModal = ({ showModal, setShowModal, createTask }) => {
    const [description, setDescription] = useState('');

    const handleChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createTask(description);
        setDescription('');
        setShowModal(false);
    };


    const closeModal = () => {
        setDescription('');
        setShowModal(false);
    };

    const isDescriptionValid = () => {
        return description.length > 0 && description.length <= 100;
    };

    return (
        <div id='modal' className={showModal ? 'modal': 'hidden'}>
            <div className='modal-content'>
                <span className='close' onClick={() => closeModal()}>&times;</span>
                <h2>Add a new task</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                    Task Description:
                    <input
                        maxLength={100}
                        minLength={1}
                        required
                        type='text'
                        className={'modal-input'}
                        value={description}
                        placeholder='Max 100 characters'
                        onChange={handleChange} />
                    </label>
                    <input
                        disabled={!isDescriptionValid()}
                        type='submit'
                        className='green-button'
                        value='Submit'
                    />
                </form>
            </div>
        </div>
);};


export default CreateTaskModal;