import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Divider } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { getUsersOrders } from '../State/Order/Action';
import { useNavigate } from 'react-router-dom';

export const Notification = () => {
    const { order } = useSelector(store => store);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        dispatch(getUsersOrders(jwt));
    }, [jwt, dispatch]);

    const notifications = order.orders.slice(0, 10).map((item, index) => {
        let message = '';
        let color = '';
        if (item.orderStatus === 'PENDING') {
            message = `Your order #${item.id} is pending restaurant confirmation.`;
            color = 'bg-yellow-50 text-yellow-600';
        } else if (item.orderStatus === 'DELIVERED' || item.orderStatus === 'COMPLETED') {
            message = `Your order #${item.id} from ${item.restaurant?.name || 'Sunny Food'} has been delivered successfully.`;
            color = 'bg-green-50 text-green-600';
        } else {
            message = `Order #${item.id} status is now ${item.orderStatus}.`;
            color = 'bg-blue-50 text-blue-600';
        }

        return {
            id: item.id || index,
            message,
            color,
            date: new Date(item.createdAt).toLocaleString(),
            orderId: item.id
        };
    });

    return (
        <div className="p-4 md:p-8 flex flex-col items-center">
            <h1 className='text-2xl font-bold py-5 text-center mb-6'>Notifications</h1>
            <div className='flex flex-col gap-4 w-full max-w-3xl'>
                {notifications.length === 0 ? (
                    <div className="text-center text-gray-400 mt-10">You have no new notifications.</div>
                ) : (
                    notifications.map((item) => (
                        <Card onClick={() => navigate('/my-profile/orders')} key={item.id} className="p-4 flex gap-4 items-start bg-white shadow-sm rounded-lg border border-gray-100 cursor-pointer hover:shadow-md transition">
                            <div className={`p-3 rounded-full ${item.color}`}>
                                <NotificationsActiveIcon />
                            </div>
                            <div className="flex-1 mt-1">
                                <p className="font-semibold text-gray-800 leading-tight">{item.message}</p>
                                <p className="text-xs text-gray-400 mt-2 font-medium tracking-wide">{item.date}</p>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};
