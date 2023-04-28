import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { addNotifications, fetchNotifications, markAllAsRead } from '../features/notifications/getNotificationSlice';
import { markAllNotifications } from '../features/notifications/markAllNotificationsSlice';
import NotificationRow from './NotificationRow';
import getUserInfo from '../utils/getUserInfo';
import { showSuccessMessage, showErrorMessage } from '../utils/toast';
import Loader from './Loader';

const Notifications = () => {
  const [totalNotifications, setTotalNotifications] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const { isLoading: isLoadingMore, notifications, pagination } = useSelector((state) => state.notifications);
  const { isLoading } = useSelector((state) => state.markAllNotifications);
  const dispatch = useDispatch();

  const socket = io.connect(process.env.REACT_APP_BASE_URL);
  const userInfo = getUserInfo();

  useEffect(() => {
    dispatch(fetchNotifications());
    socket.on(`notification.${userInfo?.id}`, (data) => {
      dispatch(addNotifications(data));
      showSuccessMessage(`${data?.message}`);
    });
  }, []);

  useEffect(() => {
    if (notifications) {
      const unRead = notifications.filter(notification => notification.isRead === false);
      const notificationsCount = unRead.length;
      setTotalNotifications(notificationsCount);
    }
  }, [notifications]);

  const handleMarkAll = async () => {
    try {
      const response = await dispatch(markAllNotifications()).unwrap();
      showSuccessMessage(response?.message);
      dispatch(markAllAsRead());
    } catch (error) {
      showErrorMessage(error.data?.message);
    }
  }

  const handleLoadMore = () => {
    const currentPage = parseInt(pagination.currentPage);
    if(currentPage === pagination.totalPages) {
      console.log("NO NEXT PAGE");
      return false;
    }
    dispatch(fetchNotifications({ page: currentPage + 1, append: true }));
  }

  return (
    <>
      <div data-testid="notifications-list" className="relative font-bold flex justify-start items-start cursor-pointer" onClick={() => setIsOpen((isOpen) => !isOpen)}>
        { totalNotifications === 0 && <span className="absolute top-0 -right-1 bg-[#7AC751] text-white text-xs  px-1 rounded-full">
          {totalNotifications}
        </span>}
        { totalNotifications > 0 && <span className="absolute top-0 -right-1 bg-[#c75151] text-white text-xs  px-1 rounded-full">
          {totalNotifications}
        </span>}
        <span className="material-symbols-outlined text-[#7AC751] text-3xl">
          notifications
        </span>
      </div>
      <div className='shadow-2xl max-h-96 md:w-96 max-w-xs overflow-scroll rounded-xl absolute z-[9999999] bg-white md:top-28 md:right-36 top-20 right-9'>
        { isOpen && <><div className='flex justify-between items-center p-5'>
          <h2 className='text-xl font-extrabold text-[#266C00]'>
            Notifications
          </h2>
          { isLoading ? <span className='px-12 flex justify-center items-center'><Loader className="" /></span> : <div className='flex items-center border p-1 cursor-pointer' onClick={() => {handleMarkAll()}}>
            <p className='text-xs font-light text-[rgb(122,199,81)]'>
              Mark all as read
            </p>
            <span className="material-symbols-outlined text-[#7AC751] rounded-full">
              done_all
            </span>
          </div>}
        </div><hr className="h-0.5 mx-5 bg-gray-300" /></>}
        <div className='flex flex-col gap-3'>
          {isOpen && notifications?.map(notification => (
            <NotificationRow key={notification.id} {...notification} />
        ))}
        {isOpen && (isLoadingMore? <span className='px-12 flex justify-center items-center'><Loader className="" /></span> : <button
          className="self-center my-5 bg-green-500 px-2 py-1 rounded-full text-xs text-white mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
          type="button"
          disabled={(parseInt(pagination.currentPage) === pagination.totalPages) || !notifications
          ?.length}
          onClick={handleLoadMore}
        >LOAD MORE</button>)}
        </div>
      </div>
    </>
  );
};

export default Notifications;
