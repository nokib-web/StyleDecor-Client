import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AdminAnalytics = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin/stats');
            return res.data;
        }
    });

    const chartData = [
        { name: 'Services', count: stats.products || 0 },
        { name: 'Users', count: stats.users || 0 },
        { name: 'Bookings', count: stats.bookings || 0 },
        { name: 'Revenue', count: stats.revenue || 0 },
    ];

    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;
        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <div>
            <h2 className="text-3xl font-semibold my-4">Dashboard Analytics</h2>
            <div className="stats shadow w-full mb-8">

                <div className="stat">
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value text-primary">${stats.revenue}</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Users</div>
                    <div className="stat-value text-secondary">{stats.users}</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Bookings</div>
                    <div className="stat-value">{stats.bookings}</div>
                </div>

                <div className="stat">
                    <div className="stat-title">Services</div>
                    <div className="stat-value">{stats.products}</div>
                </div>

            </div>

            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="count" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminAnalytics;
