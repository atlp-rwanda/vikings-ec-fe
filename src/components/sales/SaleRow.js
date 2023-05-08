import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSalesStatus } from '../../features/sales/changeSalesStatusSlice';
import DropChildren from '../DropDown';
import threeDots from '../../assets/threeDot.svg';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';
import { getSalesActions } from '../../features/sales/getSalesSlice';
import Loader from '../../../public/images/icons/loader.svg';

const SaleRow = ({ sale }) => {
  const { isLoading } = useSelector((state) => state.changeSaleStatus);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const statuses = [
    'pending',
    'accepted',
    'shipping',
    'delivered',
    'declined',
  ];
  const handleChangeStatus = async (saleId, status) => {
    try {
      setLoading(true);
      const response = await dispatch(changeSalesStatus({
        payload: { status },
        saleId,
      })).unwrap();
      dispatch(
        getSalesActions.updateStatusField({ saleId, field: 'status', value: status }),
      );
      showSuccessMessage(response.message);
      setLoading(false);
    } catch (error) {
      showErrorMessage(error.data.message);
      setLoading(false);
    }
  };
  return (
    <tr className="bg-white border-b" data-testid="sale_row">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {sale?.Product.images && (
          <img
            src={sale?.Product.images[0]}
            className="w-8 h-8 rounded-none mr-2"
            alt="Product image"
          />
        )}
      </td>
      <td className="px-6 py-4">
        {sale?.Product.name}
      </td>
      <td className="px-6 py-4">
        {sale?.Product.price}
      </td>
      <td className="px-6 py-4">
        {sale?.quantitySold}
      </td>
      <td className="px-6 py-4">
        <button
          className={`px-3 py-1 text-center rounded-2xl cursor-default mx-auto ${
            sale?.status == 'delivered'
              ? 'bg-green-100 text-green-700'
              : sale?.status == 'pending'
                ? 'bg-yellow-100 text-yellow-600'
                : sale?.status == 'shipping'
                  ? 'bg-blue-100 text-blue-700'
                  : sale?.status == 'accepted'
                    ? 'bg-purple-100 text-purple-700'
                    : sale?.status == 'declined'
                      ? 'bg-red-100 text-red-700'
                      : ''
          }`}
        >
          {isLoading && loading ? (
            <img src={Loader} className="animate-spin w-[30px] text-center" />
          ) : sale?.status }
        </button>
      </td>
      <td >
        <DropChildren
          toggle={(
            <img
              src={threeDots}
              className="filter grayscale"
              type="button"
              data-dropdown-toggle="saleDropdown"
              data-dropdown-placement="bottom-start"
            />
          )}
        >
          <div id="saleDropdown" className="bg-white z-[9999]">
            <div className="px-4 py-3 text-sm text-black">
              Change sale status to:
            </div>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              { statuses.map((status) => (
                <li key={status}>
                  <a
                    href="#"
                    className="block px-4 py-2 text-black hover:bg-gray-100 dark:hover:bg-green-600 dark:hover:text-white"
                    onClick={() => handleChangeStatus(sale?.id, status)}
                  >
                    {status}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </DropChildren>
      </td>
    </tr>
  );
};

export default SaleRow;
