import React, { Component } from 'react';
import uuid from 'uuid/v4'

class Dashboard extends Component {
  state = {
    countdowns: [
      {
        title: 'Countdown 1',
        category: 'c1',
        id: uuid(),
        date:'2018-04-28T07:00:00', 
      }, 
      {
        title: 'Countdown 2',
        category: 'c2',
        id: uuid(),
        date:'2018-05-28T07:33:00',
      }
    ]
  }

  handleCreateFormSubmit =(countdown) => {
    this.createCountdown(countdown);
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
  }
  
  render() {
    return (
      <div className='ui five column centered grid'>
        <div className='column'>
          <CountdownList
            countdowns={this.state.countdowns}
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
        category={countdown.cagetory}
        date={countdown.date}
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
  render() {
    if (this.props.editFormOpen === true) {
      return (
        <EditCountdownCard 
          title={this.props.title}
          category={this.props.category}
          date={this.props.date}
        />  
      )
    } else {  
        return (
          <Countdown
            title={this.props.title}
            category={this.props.category}
            date={this.props.date}
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
    })
  }
  
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
    let hours = Math.ceil(timeInMs / (1000 * 60 * 60) % 60);
    let minutes = Math.floor(timeInMs / (1000 * 60) % 60);
    let seconds = Math.floor(timeInMs / 1000 % 60);
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return hours + delim + minutes + delim + seconds;
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
            <span className='right floated edit icon'>
              <i className='edit icon' />
            </span>
            <span className='right floated trash icon'>
              <i className='trash icon' />
            </span>
          </div>
        </div>
        
      </div>
    );
  }
}

export default Dashboard;