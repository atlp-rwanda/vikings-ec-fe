import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import loader from "../../../public/images/icons/loader.svg";
import prof from "../../../public/images/prof.png";
import source from "../../assets/threeDot.svg";
import DropChildren from "../DropDown";
import { getUserActions } from "../../features/auth/userSlice";
import { showErrorMessage, showSuccessMessage } from "../../utils/toast";
import { changeStatus } from "../../features/auth/changeUserStatusSlice";
import { updateRole } from "../../features/auth/rolesSlice";

export default function UserRow({ user}) {
  const { isLoading, data: rolesData } = useSelector((state) => state.roles);
  const { isLoading: loadingStatus } = useSelector(
    (state) => state.changeStatus
  );
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(false);
  
  const handleUpdateRole = async (userId, role) => {
    try {
      setLoading(true);
      const response = await dispatch(
        updateRole({
          payload: { role: role },
          id: userId,
        })
      );
      if (response.type === "updateRole/fulfilled") {
        dispatch(
          getUserActions.changeField({ userId, field: "role", value: role })
        );
        showSuccessMessage(response.payload.message);
      }
      setLoading(false)
    } catch (error) {
      showErrorMessage(error.data.message);
      setLoading(false)
    }
  };

  const handleStatusChange = async (userId, isActive) => {
    try {
      setLoading(true);
      const response = await dispatch(
        changeStatus({
          payload: { isActive: isActive },
          id: userId,
        })
      );
      if (response.type === "changeStatus/fulfilled") {
        dispatch(
          getUserActions.changeField({
            userId,
            field: "isActive",
            value: isActive,
          })
        );
        showSuccessMessage(response.payload.message);
      }
      setLoading(false)
    } catch (error) {
      showErrorMessage(error.data.message);
      setLoading(false)

    }
  };

  return (
    <tr className="bg-white border-b" >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  <div className="flex items-center">
                    {user.avatar ? (
                      <img
                        src={`${user.avatar}`}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                    ) : (
                      <img src={prof} className="w-8 h-8 rounded-full mr-2" />
                    )}
                    <div>
                      <div>{`${user.firstname}`}</div>
                      <div className="text-xs text-gray-400">
                        {user.lastname}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {`${user.email}`}
                  <div className="text-[12px] text-gray-400">
                    {user.verified ? "verified" : "not verified"}
                  </div>
                </td>
                <td className="px-6 py-4">{isLoading && loading ? (
                              <img
                                src={loader}
                                className="animate-spin w-[30px] text-center"
                              />
                            ) : user.role}</td>
                <td>
                  <button
                    className={`px-3 py-1 text-white rounded-2xl text-center ${
                      user.isActive ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {loadingStatus && loading ? (
                              <img
                                src={loader}
                                className="animate-spin w-[30px] text-center"
                              />
                            ) : (user.isActive ? "Active" : "Disabled")}
                  </button>
                </td>
                <td className="">
                  <DropChildren
                    toggle={
                      <img
                        src={source}
                        className="filter grayscale "
                        type="button"
                        data-dropdown-toggle="userDropdown"
                        data-dropdown-placement="bottom-start"
                      />
                    }
                  >
                    <div id="userDropdown" className=" bg-white">
                      <div className="px-4 py-3 text-sm  text-black dark:text-white">
                        <div className="text-black">
                          {`${user.firstname} ${user.lastname}`}
                        </div>
                        <div className="font-medium truncate text-gray-400">
                          {user.email}
                        </div>
                      </div>
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="avatarButton"
                      >
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-black hover:bg-gray-100 dark:hover:bg-green-600 dark:hover:text-white"
                            onClick={() => handleUpdateRole(user.id, "admin")}
                          >
                            Make admin
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-black hover:bg-gray-100 dark:hover:bg-green-600 dark:hover:text-white"
                            onClick={() => handleUpdateRole(user.id, "seller")}
                          >
                            Make seller
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-black hover:bg-gray-100 dark:hover:bg-green-600 dark:hover:text-white"
                            onClick={() => handleUpdateRole(user.id, "buyer")}
                          >
                            Make buyer
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-black hover:bg-gray-100 dark:hover:bg-red-600 dark:hover:text-white"
                            onClick={() =>
                              handleStatusChange(user.id, !user.isActive)
                            }
                          >
                            change account status
                          </a>
                        </li>
                      </ul>
                    </div>
                  </DropChildren>
                </td>
              </tr>
  )
}
