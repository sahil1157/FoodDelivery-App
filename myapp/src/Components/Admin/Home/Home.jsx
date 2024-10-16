import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Home = () => {

    const stats = [
        {
            title: 'Total Sales',
            value: '$10,000,000',
            percentage: '13%',
            percentageColor: 'text-green-500',
        },
        {
            title: 'AOV',
            value: '$55',
            percentage: '-14%',
            percentageColor: 'text-red-500',
        },
        {
            title: 'Orders',
            value: '5,985',
            percentage: '-5%',
            percentageColor: 'text-red-500',
        },
        {
            title: 'Total Impressions',
            value: '405,030',
            percentage: '5%',
            percentageColor: 'text-green-500',
        },
    ];

    const lineChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Revenue Growth',
                data: [5000, 10000, 15000, 20000, 30000, 40000, 50000],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    const products = [
        {
            name: 'Lasagna Rolls',
            sellingStatus: 'No.1 selling item',
            price: '$47,338',
        },
        {
            name: 'Grilled Sandwich',
            sellingStatus: 'No.2 selling item',
            price: '$46,422',
        },
        {
            name: 'Mix Veg Pulaw',
            sellingStatus: 'No.3 selling item',
            price: '$3,349',
        },
        {
            name: 'Somen Noodles',
            sellingStatus: 'No.4 selling item',
            price: '$777',
        },
    ];

    return (
        <div className="p-6 font-ubuntu">
            <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

            {/* Flex with responsive width: full on small screens, 1/4 on lg */}
            <div className="flex flex-wrap lg:flex-nowrap justify-around gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="w-full sm:w-full lg:w-1/4 p-4 bg-white shadow-md rounded-md min-h-[130px] flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-black font-medium">{stat.title}</span>
                            <span className="text-red-500 cursor-pointer">View Report</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-2xl font-[600]">{stat.value}</span>
                            <span className={`${stat.percentageColor} font-bold`}>{stat.percentage}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-wrap lg:flex-nowrap justify-around gap-6">
                {/* Total Revenue Section */}
                <div className="w-full lg:w-1/2">
                    <h1 className="text-2xl font-semibold mb-6">Total Revenue</h1>
                    <div className="p-4 bg-white shadow-md rounded-md min-h-[370px]">
                        <Line data={lineChartData} options={lineChartOptions} />
                    </div>
                </div>

                {/* Latest Products Section */}
                <div className="w-full lg:w-1/2">
                    <h1 className="text-2xl font-semibold mb-6">Latest Products</h1>
                    <div className="bg-white p-2 shadow-md rounded-md min-h-[370px]">
                        {products.map((product, index) => (
                            <div key={index} className="mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg lg:text-xl font-[600] text-black">{product.name}</span>
                                    <span className="text-lg lg:text-xl font-medium text-black">{product.price}</span>
                                </div>
                                <div className="text-gray-500">{product.sellingStatus}</div>
                                {index !== products.length - 1 && (
                                    <hr className="border-gray-300 my-4" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
