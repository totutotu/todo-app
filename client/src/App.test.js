import { render, screen } from '@testing-library/react';
import Task from './components/Task';
import CreateTaskModal from './components/CreateTaskModal';

test('renders Task card', () => {
  render(<Task description='Test task' id={13} created={new Date()} changeCompleteStatus={() => ''} remove={() => ''}/>);
  const descriptionText = screen.getByText(/description: test task/i);
  expect(descriptionText).toBeInTheDocument();
});


test('renders create new Task Modal', () => {
  render(<CreateTaskModal showModal={true} id={13} setShowModal={() => ''} createTask={() => ''}/>);
  const modalHeader = screen.getByText(/Add a new task/i);
  expect(modalHeader).toBeInTheDocument();
});
