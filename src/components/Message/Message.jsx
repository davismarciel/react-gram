import './Message.css';

const Message = ({ msg, type }) => {
  return (
    <div className={`message ${type}`}>
      <h1>{msg}</h1>
    </div>
  );
};

export default Message;
