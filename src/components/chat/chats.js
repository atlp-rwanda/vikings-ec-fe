import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { messageSchema } from '../../validations/inputValidation';
import InputField from '../forms/InputField';
import Button from '../forms/Button';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';
import { addMessage, getMessages } from '../../features/chat/getMessages';
import { useSelector } from 'react-redux';
import sendIcon from '../../../public/images/PaperPlaneRight-r.svg';
import Avatar from '../profile/Avatar';
import Loader from '../Loader';
import { sendMessage } from '../../features/chat/sendMessage.js';
import nullAvatar from '../../../public/images/prof.png';
import Moment from 'react-moment';
import loader from '../../../public/images/icons/loader.svg';

const Chat = ({ visible, onClose, socket, room, user }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.getMessages.isLoading);
  const isSendLoading = useSelector((state) => state.sendMessage.isLoading);
  const messages = useSelector((state) => state.getMessages.messages);
  const [typingText, setTypingText] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(messageSchema),
  });

  const handleTypingStart = () => {
    socket.emit('typing', { user: user.firstname, room, isTyping: true });
  };

  useEffect(() => {
    dispatch(getMessages());

    socket.on('istyping', (data) => {
      setTypingText(`${data.user} is typing ...`);
      setTimeout(() => {
        setTypingText('');
      }, 1000);
    });

    socket.on('receive_message', (data) => {
      dispatch(addMessage(data));
    });
    return () => {
      socket.off('istyping');
      socket.off('receive_message');
    };
  }, [socket]);

  const onSubmit = async (message) => {
    try {
      const response = await dispatch(sendMessage(message)).unwrap();
      const submitData = { ...response.newMessage };
      const data = { ...submitData, sender: user };
      await socket.emit('send_message', { data, room: room });
      dispatch(addMessage(data));
      showSuccessMessage(response.message);
      reset();
    } catch (error) {
      showErrorMessage(error.data.message);
    }
  };

  return (
    <div
      className={` fixed bottom-[80px] px-4 md:px-0 md:right-5 max-w-[400px] top-[50px] z-50 bg-white w-full flex flex-col xs:justify-center rounded-t-[20px] rounded-bl-[20px] ${
        !visible ? 'hidden' : ''
      }`}
    >
      <div className="bg-[#ABEC89] justify-between w-full flex h-[50px] py-[15px] px-[20px] rounded-t-[20px]">
        <div> Chat </div>
        <div>
          <button onClick={onClose}>X</button>
        </div>
      </div>

      <div className={`p-[20px] border md:mx-22 flex flex-col h-full xs:justify-center rounded-bl-[20px]`}>
        {isLoading ? (
          <div className='h-full flex justify-center'>
            <Loader />
          </div>
        ) : (
          <>
            <div className="overflow-y-auto no-scrollbar h-full flex scroll-smooth flex-col-reverse justify - center">
              {messages.map((message) => (
                <div key={message.id} className="p-[10px]">
                  <div
                    className={`${
                      message.senderId === user.id ? 'flex justify-end' : 'flex justify-start'
                    }`}
                  >
                    <Avatar
                      avatar={message.sender.avatar ? message.sender.avatar : nullAvatar}
                      className={`${
                        message.senderId === user.id
                          ? 'h-[45px] w-[45px] xs:h-[40px] xs:w-[40px]'
                          : 'h-[45px] w-[45px] xs:h-[40px] xs:w-[40px]'
                      }`}
                    />
                  </div>

                  <div
                    className={`${
                      message.senderId === user.id
                        ? 'flex justify-end mr-7 relative'
                        : 'flex justify-start ml-7 relative'
                    }`}
                  >
                    <div className="absolute top-0 py-[6px] px-[10px] font-bold">
                      {message.senderId === user.id ? '' : `@${message.sender.firstname}`}
                    </div>
                    <p
                      className={`${
                        message.senderId === user.id
                          ? 'bg-[#ABEC89] w-[80%] p-[30px] rounded-t-[20px] rounded-bl-[14px]'
                          : 'bg-[#F3F3F3]  w-[80%] p-[30px] rounded-t-[20px] rounded-br-[14px]'
                      }`}
                    >
                      {message.message}
                    </p>
                  </div>
                  <div
                    className={`${
                      message.senderId === user.id
                        ? 'flex justify-end mr-7 '
                        : 'flex justify-start ml-7 '
                    }`}
                  >
                    <small><Moment fromNow date={message.createdAt} /></small>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="text-gray-400 font-bold px-[30px] py-[10px] h-[40px]">
                <p>
                  <em> {`${typingText}`}</em>
                </p>
              </div>
            </div>
          </>
        )}
        <div className='h-[90px]'>
          <form
            onSubmit={(event) => {
              handleSubmit(onSubmit)(event);
            }}
          >
            <div className="relative">
              <InputField
                placeholder="Type message"
                onKeyDown={handleTypingStart}
                type="text"
                className=" w-full h-[55px]  rounded-[15px] px-2 py-3 text-[16px] placeholder:text-gray-400 sm:text-[12px] my-2 focus:bg-[#EAF0F7] bg-[#EAF0F7] whitespace-normal"
                {...register('message')}
                error={errors?.message}
              />
              <div className=" absolute right-0 top-0">
                {isSendLoading ? (
                  <Button
                    type="submit"
                    disabled={true}
                    className="bg-inherit hover:bg-[#F3F3F3] pb-0 pt-3 hover:rounded-r-[15px] h-[55px]"
                  >
                   <img src={loader} className="animate-spin w-[30px] text-center m-auto " />;
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-inherit hover:bg-[#F3F3F3] hover:rounded-r-[15px] h-[55px]"
                  >
                    <img src={sendIcon} alt="Send Icon" className="w-[90%] m-auto" />
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
