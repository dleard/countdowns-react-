import React, { Component } from 'react';
import uuid from 'uuid/v4'

class Dashboard extends Component {
  state = {
    countdowns: [
      {
        title: 'NHL Draft Lottery',
        category: 'example',
        id: uuid(),
        date:'2018-04-28T19:00:00', 
      }, 
      {
        title: 'My first baseball game',
        category: 'example',
        id: uuid(),
        date:'2018-04-25T18:15:00',
      }
    ]
  }

  handleCreateFormSubmit =(countdown) => {
    this.createCountdown(countdown);
  };

  handleEditFormSubmit = (attributes) => {
    this.updateCountdown(attributes);
  };

  handleDelete = (id) => {
    this.deleteCountdown(id)
  }

  deleteCountdown = (id) => {
    this.setState({
      countdowns:this.state.countdowns.filter(cd => cd.id !== id )
    });
  };

  createCountdown = (countdown) => {
    const c = {
      title: countdown.title || 'title',
      category: countdown.category || 'category',
      id: uuid(),
      date: countdown.date || '2018-12-24T17:00:00',
    }
    this.setState({
      countdowns: this.state.countdowns.concat(c),
    })
  };

  updateCountdown = (attributes) => {
    this.setState({
      countdowns: this.state.countdowns.map((countdown) => {
        if (countdown.id === attributes.id) {
          return Object.assign({}, countdown, {
            title: attributes.title,
            category: attributes.category,
          });
        } else {
          return countdown;
        }
      }),
    });
  };
  
  render() {
    return (
      <div className='ui five column centered grid'>
        <div className='column'>
          <CountdownList
            countdowns={this.state.countdowns}
            onFormSubmit={this.handleEditFormSubmit}
            onDelete={this.handleDelete}
          />
          <ToggleEdit 
            onFormSubmit={this.handleCreateFormSubmit}
          />  
        </div>
      </div>
    );
  }
}

class CountdownList extends Component {
  render() {
    const countdowns = this.props.countdowns.map((countdown) => (
      <EditableCountdown
        key={countdown.id}
        id={countdown.id}
        title={countdown.title}
        category={countdown.category}
        date={countdown.date}
        onFormSubmit={this.props.onFormSubmit}
        onDelete={this.props.onDelete}
      />
    ));
    return (
      <div id='countdowns'>
        {countdowns}
      </div>
    );
  }
}

class ToggleEdit extends Component {
  state = {
    isOpen: false,
  };

  handleFormOpen = () => {
    this.setState({ isOpen: true });
  };

  handleFormClose = () => {
    this.setState({ isOpen: false});
  };

  handleFormSubmit = (countdown) => {
    this.props.onFormSubmit(countdown);
    this.setState({ isOpen: false });
  };
  
  render() {
    if (this.state.isOpen) {
      return (
        <EditCountdownCard
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
        return (
          <div className='ui basic content center aligned segment'>
            <button 
              className='ui basic button icon'
              onClick={this.handleFormOpen}
            >
              <i className='plus icon' />
            </button>
          </div>
        );
    }
  }
}

class EditableCountdown extends Component {
  state = {
    editFormOpen: false,
  };

  handleEditClick =() => {
    this.openForm();
  };

  handleFormClose = () => {
    this.closeForm();
  };

  handleSubmit = (countdown) => {
    this.props.onFormSubmit(countdown);
    this.closeForm();
  };

  openForm = () => {
    this.setState({ editFormOpen: true });
  };

  closeForm = () => {
    this.setState({ editFormOpen: false });
  };

  render() {
    if (this.state.editFormOpen === true) {
      return (
        <EditCountdownCard 
          id={this.props.id}
          title={this.props.title}
          category={this.props.category}
          date={this.props.date}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
        />  
      )
    } else {  
        return (
          <Countdown
            id={this.props.id}
            title={this.props.title}
            category={this.props.category}
            date={this.props.date}
            onEditClick={this.handleEditClick}
            onDelete={this.props.onDelete}
          />
        );
    }
  }
}

class EditCountdownCard extends React.Component {
  state = {
    title: this.props.title || '',
    category: this.props.category || '',
    date: this.props.date || '2018-12-24T17:00:00'

  };

  handleTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleCategoryChange = (e) => {
    this.setState({ category: e.target.value });
  };

  handleDateChange = (e) => {
    const newDate = e.target.value;
    const split = this.state.date.split('T');
    const newFullDate = newDate + 'T' + split[1];
    this.setState({ date: newFullDate });
  };

  handleTimeChange = (e) => {
    const newTime = e.target.value;
    const split = this.state.date.split('T');
    const newFullDate = split[1] + 'T' + newTime;
    this.setState({ date: newFullDate });
  };

  handleSubmit = () => {
    this.props.onFormSubmit({
      id: this.props.id,
      title: this.state.title,
      category: this.state.category,
      date: this.state.date,
    })
  };
  
  render() {
    const dateTimeArray=[]
    const submitText = this.props.id ? 'Update' : 'Create';
    const split = this.state.date.split('T');
    dateTimeArray[0] = split[0];
    dateTimeArray[1] = split[1];
    
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Title</label>
              <input 
                type='text' 
                value={this.state.title} 
                onChange={this.handleTitleChange}
              />
            </div>
            <div className='field'>
              <label>Category</label>
              <input 
                type='text' 
                value={this.state.category} 
                onChange={this.handleCategoryChange}
              />
            </div>
            <div className='field'>
              <label>End Date</label>
              <input 
                type='text' 
                value={dateTimeArray[0]} 
                onChange={this.handleDateChange}
              />
            </div>
            <div className='field'>
              <label>End Time</label>
              <input type='text'
              value={dateTimeArray[1]} 
              onChange={this.handleTimeChange}
            />
            </div>
            <div className='ui two bottom attached buttons'>
              <button 
                className='ui basic blue button'
                onClick={this.handleSubmit}
              >
                {submitText}
              </button>
              <button 
                className='ui basic red button'
                onClick={this.props.onFormClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Countdown extends Component {
  
  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
  }

  componentWillUnMount() {
    clearInterval(this.forceUpdateInterval);
  }

  getDays = (date) => {
    const endDate = new Date(date)
    const timeInMs = endDate - Date.now();
    var days = Math.floor(timeInMs / (1000 * 60 * 60 * 24));
    return days + ' d'
  }
  
  getTimeString = (date) => {
    const endDate = new Date(date)
    const timeInMs = endDate - Date.now();
    const delim = ":";
    let hours = Math.floor(timeInMs / (1000 * 60 * 60) % 24);
    let minutes = Math.floor(timeInMs / (1000 * 60) % 60);
    let seconds = Math.floor(timeInMs / 1000 % 60);
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return hours + delim + minutes + delim + seconds;
  }
  
  handleDelete = () => {
    this.props.onDelete(this.props.id)
  }

  render() {
    return (
      <div className='ui card'>
        <div className='content'>
          <div className='header'>
            {this.props.title}
          </div>
          <div className='meta'>
            {this.props.category}
          </div>
          <div className='center aligned description'>
            <h2>
              {this.getDays(this.props.date)}
            </h2>
            <h2>
              {this.getTimeString(this.props.date)}
            </h2>
          </div>
          <div className='extra content'>
            <span 
              className='right floated edit icon'
              onClick={this.props.onEditClick}
            >
              <i className='edit icon' />
            </span>
            <span 
              className='right floated trash icon'
              onClick={this.handleDelete}
            >
              <i className='trash icon' />
            </span>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Dashboard;