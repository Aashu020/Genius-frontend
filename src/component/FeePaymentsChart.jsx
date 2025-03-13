import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';

const FeePaymentChart = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend API
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8007/fee-data/all');
      processPaymentData(response.data);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Function to process payment data
  const processPaymentData = (data) => {
    const today = dayjs();
    const last7Days = [];

    // Loop through payments and filter out those from the last 7 days
    data.forEach(student => {
      student.Payments.forEach(payment => {
        const paymentDate = dayjs(payment.Date);
        if (paymentDate.isAfter(today.subtract(7, 'days'))) {
          const dateStr = paymentDate.format('YYYY-MM-DD');
          last7Days.push({ date: dateStr, paidAmount: payment.PaidAmount });
        }
      });
    });

    // Sum the PaidAmount for each date in the last 7 days
    const paymentAmounts = {};
    last7Days.forEach(payment => {
      const { date, paidAmount } = payment;
      paymentAmounts[date] = (paymentAmounts[date] || 0) + paidAmount;
    });

    // Prepare data for the bar chart
    const chartData = [];
    for (let i = 6; i >= 0; i--) {
      const day = today.subtract(i, 'days').format('YYYY-MM-DD');
      chartData.push({
        date: day,
        "Total Amount": paymentAmounts[day] || 0
      });
    }

    setPaymentData(chartData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Loading or error state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{marginTop:'16px'}}>
<h2 style={{ fontSize: '16px',textAlign:'center',margin:'20px 0px' }}>Fee Payments in the Last 7 Days (Total Amount)</h2>
      <ResponsiveContainer width="100%" height={310}>
        <BarChart data={paymentData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Total Amount" fill="#fc858f9a" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FeePaymentChart;
