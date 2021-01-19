import React, { Component } from 'react';
import './TaskForm.css';

class TaskForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: props.defaultTask ? props.defaultTask : '',
      hr: props.defaultHr ? parseInt(props.defaultHr) : '',
      min: props.defaultMin ? parseInt(props.defaultMin) : ''
    }

    this.prefillForm = this.prefillForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);
    this.handleHrChange = this.handleHrChange.bind(this);
    this.handleMinChange = this.handleMinChange.bind(this);
  }

  /* Detect when form should be prefilled */
  componentDidUpdate(prevProps) {
    if (this.props.prefill === true && prevProps.prefill === false) {
      this.prefillForm();
    }
  }

  /* Prefills form with passed props */
  prefillForm() {
    const { defaultTask, defaultHr, defaultMin } = this.props;
    this.setState({
      task: defaultTask,
      hr: defaultHr,
      min: defaultMin
    });
  }

  /* Resets form fields */
  resetForm() {
    this.setState({
      task: '',
      hr: '',
      min: ''
    });
  }

  /* Handles form submit */
  handleSubmit(event) {
    event.preventDefault();
    const { submit } = this.props;
    const { task, hr, min } = this.state;

    if (submit) submit({ task, hr: parseInt(hr), min: parseInt(min) }); // runs submit function, passing form data
  }

  /* Handles changes to the task input field value */
  handleTaskChange(event) {
    this.setState({ task: event.target.value });
  }

  /* Handles changes to the hour input field value */
  handleHrChange(event) {
    this.setState({ hr: event.target.value });
  }

  /* Handles changes to the minute input field value */
  handleMinChange(event) {
    this.setState({ min: event.target.value });
  }

  render() {
    const { task, hr, min } = this.state;
    return (
      <form className="task-form" onSubmit={this.handleSubmit}>
        <h3>Add a new task</h3>
        <label htmlFor="task">What do you need to do?</label>
        <input type="text" name="task" required maxLength="50" placeholder="Pack lunch" value={task} onChange={this.handleTaskChange} />
        <label>How long will it take?</label>
        <div>
          <input type="number" name="estimated-hrs" required min="0" placeholder="0" value={hr} onChange={this.handleHrChange} /> 
          <span>hr(s)</span>
          <input type="number" id="estimated-min" name="estimated-min" required min="0" placeholder="0" value={min} onChange={this.handleMinChange} />
          <span>mins</span>
        </div>
        <input type="submit" className="clickable" value="Submit"></input>
      </form>
    );
  }
}

export default TaskForm;