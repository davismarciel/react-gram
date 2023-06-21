import { resetMessage } from '../slices/photoSlice';

export const useResetMessage = (dispatch) => {
  return () => {
    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  };
};
