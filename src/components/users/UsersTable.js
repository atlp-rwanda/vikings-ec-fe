import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserRow from './UserRow';
import Pagination from '../Pagination';
import { getUsers } from '../../features/auth/userSlice';

const UsersTable = ({ data }) => {
  const dispatch = useDispatch();
  const { pagination } = useSelector((state) => state.users);
  const users = data.data.items;

  return (
    <div className="overflow-x-auto xs:w-screen md:px-24 xs:px-4 sm:px-4 mb-5">
      <table className="w-full text-sm text-left text-black-500">
        <caption className="px-6 py-3 text-left text-green-600 font-bold text-[17px]">
          All Users
        </caption>
        <thead className="text-xs text-white">
          <tr className="border-b">
            <th scope="col" className="px-6 py-3 text-center text-green-600">
              Names
            </th>
            <th scope="col" className="px-6 py-3 text-center text-green-600">
              Email
            </th>
            <th scope="col" className="px-6 py-3 text-center text-green-600">
              Role
            </th>
            <th scope="col" className="px-6 py-3 text-center text-green-600">
              status
            </th>
            <th scope="col" className="px-6 py-3" />
          </tr>
        </thead>

        <tbody>
          {users
            && users.map((user) => (
              <UserRow key={user.id} user={user} />
            ))}
        </tbody>
      </table>
      <div className="flex justify-center">
        <Pagination
          currentPage={parseInt(pagination.currentPage, 10)}
          pageCount={pagination.totalPages}
          setPageNumber={(page) => { dispatch(getUsers({ page })); }}
        />
      </div>
    </div>
  );
};

export default UsersTable;
