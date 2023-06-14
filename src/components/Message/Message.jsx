import './Message.css';
import PropTypes from 'prop-types';

const Message = ({ msg, type }) => {
  return (
    <div className={`message ${type}`}>
      <p>{msg}</p>
    </div>
  );
};

Message.defaultProps = {
  msg: '',
  type: '',
};

Message.propTypes = {
  msg: PropTypes.string,
  type: PropTypes.string,
};

export default Message;
