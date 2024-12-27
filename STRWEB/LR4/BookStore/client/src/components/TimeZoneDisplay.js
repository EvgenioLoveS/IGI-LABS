import React, { Component } from 'react';

class TimeZoneDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: '',
      timeZone: ''
    };
  }

  getCurrentDateAndTimeZone = () => {
    const date = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short' 
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    const timeZone = date.toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2];

    this.setState({ currentDate: formattedDate, timeZone });
  };

  componentDidMount() {
    this.getCurrentDateAndTimeZone();
    this.interval = setInterval(this.getCurrentDateAndTimeZone, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval); 
  }

  render() {
    const { currentDate, timeZone } = this.state;

    return (
      <span style={{ color: '#fff', fontSize: '14px' }}>
        {currentDate} (Time Zone: {timeZone})
      </span>
    );
  }
}

export default TimeZoneDisplay;