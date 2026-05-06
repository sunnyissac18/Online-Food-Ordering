import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Divider } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { getUsersOrders } from '../State/Order/Action';

export const Payment = () => {
    const { order } = useSelector(store => store);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        dispatch(getUsersOrders(jwt));
    }, [jwt, dispatch]);

    const completedOrders = order.orders.filter(o => o.orderStatus === 'COMPLETED' || o.orderStatus === 'DELIVERED');

    return (
        <div className="p-4 md:p-8 flex flex-col items-center">
            <h1 className='text-2xl font-bold py-5 text-center mb-6'>Payment History</h1>
            <div className='flex flex-col gap-4 w-full max-w-3xl'>
                {completedOrders.length === 0 ? (
                    <div className="text-center text-gray-400 mt-10">No payment history found.</div>
                ) : (
                    completedOrders.map((item, index) => (
                        <Card key={item.id || index} className="p-5 flex justify-between items-center bg-white shadow-sm rounded-lg border border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-green-50 text-green-600 rounded-full">
                                    <AccountBalanceWalletIcon />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">Order #{item.id}</p>
                                    <p className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                                    <p className="text-xs text-gray-400 mt-1">{item.items?.length || 0} items from {item.restaurant?.name || 'Restaurant'}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg text-gray-900">₹{item.totalPrice}</p>
                                <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded mt-1 inline-block uppercase">SUCCESS</span>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};
