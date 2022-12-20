import React from 'react';
import PropTypes from 'prop-types';
import '../styles/notification.css';

function Notification({ status }) {
  return (
    <div className="notification--container">
      {status}
    </div>
  );
}

Notification.propTypes = {
  status: PropTypes.string.isRequired,
};

export default Notification;
