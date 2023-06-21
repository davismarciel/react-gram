/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import './Like.css';

import { BsHeart, BsHeartFill } from 'react-icons/bs';

const Like = ({ photo, user, handleLike }) => {
  return (
    <div className="like">
      {photo.likes && user && (
        <>
          {photo.likes.includes(user._id) ? (
            <BsHeartFill />
          ) : (
            <BsHeart onClick={() => handleLike(photo)} />
          )}
          <p>
            {photo.likes.length}
            {' '}
            Like(s)
          </p>
        </>
      )}
    </div>
  );
};

export default Like;
