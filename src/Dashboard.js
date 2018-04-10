import React, { Component } from 'react';
import uuid from 'uuid'

class Dashboard extends Component {
  state = {}
  
  render() {
    return (
      <div className='ui five column centered grid'>
        <div className='column'>
          <CountdownList/>
        </div>
      </div>
    );
  }
}

class CountdownList extends Component {
  render() {
    return (
      <div id='countdowns'>
        <EditableCountdown
          title='Countdown 1'
          category='c1'
          date='2018-04-28T07:00:00'
          editFormOpen={false}
        />
        <EditableCountdown
          title='Countdown 2'
          category='c2'
          date='2018-05-28T07:00:00'
          editFormOpen={true}
        />
      </div>
    );
  }
}

class EditableCountdown extends Component {
  render() {
      return (
        <Countdown
          title={this.props.title}
          category={this.props.category}
          date={this.props.date}
        />
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