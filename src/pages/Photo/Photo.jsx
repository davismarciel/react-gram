import './Photo.css';

// React hooks
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Hooks
import { useResetMessage } from '../../hooks/useResetMessage';

// Slice
import { getPhoto, like, comment } from '../../slices/photoSlice';

// Config
import { uploads } from '../../utils/config';

// Components
import Message from '../../components/Message/Message';
import Photos from '../../components/Photos/Photos';
import Like from '../../components/Like/Like';

const Photo = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const resetMessage = useResetMessage(dispatch);

  const { user } = useSelector((state) => state.auth);
  const {
    photo, loading, error, message,
  } = useSelector((state) => state.photo);

  // Comments
  const [commentTxt, setCommentTxt] = useState('');

  // Load data
  useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  // Insert a like
  const handleLike = () => {
    dispatch(like(photo._id));

    resetMessage();
  };

  // Insert a comment
  const handleComment = (e) => {
    e.preventDefault();

    const commentData = {
      comment: commentTxt,
      id: photo._id,
    };

    dispatch(comment(commentData));

    setCommentTxt('');

    resetMessage();
  };

  return (
    <div id="photo">
      <Photos photo={photo} />
      <Like photo={photo} user={user} handleLike={handleLike} />
      <div className="message-container">
        {error && <Message msg={message} type="error" />}
        {message && <Message msg={message} type="success" />}
      </div>
      <div className="comments">
        {photo.comments && (
          <>
            <h3>
              Comments: (
              {photo.comments.length}
              )
            </h3>
            <form onSubmit={handleComment}>
              <input
                type="text"
                placeholder="Write a comment"
                onChange={(e) => setCommentTxt(e.target.value)}
                value={commentTxt || ''}
              />
              <button type="submit">Send</button>
            </form>
            {photo.comments.length === 0 && <p>There's no comments yet</p>}
            {photo.comments.map((comment) => (
              <div className="comment" key={comment.comment}>
                <div className="author">
                  {comment.userImage && (
                    <img
                      src={`${uploads}/users/${comment.userImage}`}
                      alt={comment.userName}
                    />
                  )}
                  <Link to={`/users/${comment.userId}`}>
                    <p>{comment.userName}</p>
                  </Link>
                </div>
                <p>{comment.comment}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Photo;
