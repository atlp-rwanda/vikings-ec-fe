import React from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { markOneNotification } from '../features/notifications/markOneNotificationSlice';
import { showSuccessMessage, showErrorMessage } from '../utils/toast';
import Loader from './Loader';
import { markOneAsRead } from '../features/notifications/getNotificationSlice';

const NotificationRow = ({
  isRead, id, type, message, createdAt,
}) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.markOneNotification);
  const [isActor, setIsActor] = React.useState(false);

  const handleMarkOne = async (id) => {
    try {
      setIsActor(true);
      const response = await dispatch(markOneNotification(id)).unwrap();
      showSuccessMessage(response?.message);
      dispatch(markOneAsRead(id));
      setIsActor(false);
    } catch (error) {
      showErrorMessage(error.data?.message);
      setIsActor(false);
    }
  };

  return (
    <div>
      <div className=" cursor-default block">
        <div className="px-6 py-4 font-medium text-gray-900">
          <div className="flex items-center w-full">
            { (isActor && isLoading) ? <span className="text-[#858383] rounded-full mr-2 border" data-testid="Loading"><Loader className="" /></span> : (
              <div data-testid="markOneButton">
                {isRead ? (
                  <span className="material-symbols-outlined text-[#7AC751] rounded-full mr-2 border">
                    done_all
                  </span>
                ) : (
                  <span className="material-symbols-outlined text-[#858383] rounded-full mr-2 border cursor-pointer" onClick={() => handleMarkOne(id)}>
                    done_all
                  </span>
                )}
              </div>
            )}
            <div className="w-full flex flex-col">
              <div className="flex justify-between w-full text-sm">
                <h6>{type}</h6>
              </div>
              <div className="text-xs font-light">
                {message}
              </div>
            </div>
            <p className="text-xs font-thin">{ moment(createdAt).format('DD MMMM YYYY') }</p>
          </div>
        </div>
      </div>
      <hr className="h-0.5 mx-5 bg-gray-300" />
    </div>
  );
};

export default NotificationRow;
