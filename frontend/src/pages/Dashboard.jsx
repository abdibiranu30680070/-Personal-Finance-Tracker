import React from 'react';
import { useData } from '../context/DataContext';
import StatCard from '../components/StatCard';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    PointElement,
    LineElement,
} from 'chart.js';

// Modular Dashboard Components
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import ActivityChart from '../components/Dashboard/ActivityChart';
import CategoryChart from '../components/Dashboard/CategoryChart';
import OverviewChart from '../components/Dashboard/OverviewChart';
import RecentTransactions from '../components/Dashboard/RecentTransactions';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    PointElement,
    LineElement
);

const Dashboard = () => {
    const { summary, transactions, loading, error } = useData();

    if (loading) return (
        <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
    );

    if (error) return (
        <div className="text-red-500 p-4 border border-red-200 bg-red-50 rounded-xl">
            {error}
        </div>
    );

    // Prepare chart data logic (kept here for now to avoid prop drilling complexity or could be moved to hooks)
    const categoryData = {
        labels: summary.category_totals.map(c => c.category),
        datasets: [{
            data: summary.category_totals.map(c => c.total),
            backgroundColor: ['#F27021', '#00A4E4', '#56A717', '#f59e0b', '#8b5cf6', '#ec4899'],
            borderWidth: 0,
        }]
    };

    const last7Days = [...Array(7)].map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d.toISOString().split('T')[0];
    });

    const trendData = {
        labels: last7Days.map(date => new Date(date).toLocaleDateString(undefined, { weekday: 'short' })),
        datasets: [
            {
                label: 'Income',
                data: last7Days.map(date =>
                    transactions
                        .filter(t => t.type === 'income' && t.date.startsWith(date))
                        .reduce((sum, t) => sum + Number(t.amount), 0)
                ),
                borderColor: '#56A717',
                backgroundColor: '#56A717',
                tension: 0.4,
                fill: false,
            },
            {
                label: 'Expenses',
                data: last7Days.map(date =>
                    transactions
                        .filter(t => t.type === 'expense' && t.date.startsWith(date))
                        .reduce((sum, t) => sum + Number(t.amount), 0)
                ),
                borderColor: '#ef4444',
                backgroundColor: '#ef4444',
                tension: 0.4,
                fill: false,
            }
        ]
    };

    const comparisonData = {
        labels: ['Income', 'Expenses'],
        datasets: [{
            label: 'Total (ETB)',
            data: [summary.total_income, summary.total_expenses],
            backgroundColor: ['#56A717', '#F27021'],
            borderRadius: 8,
        }]
    };

    const recentTransactions = transactions.slice(0, 5);

    return (
        <div className="space-y-10">
            <DashboardHeader />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard title="Balance" amount={summary.balance} icon={<DollarSign className="text-blue-600" />} color="blue" />
                <StatCard title="Income" amount={summary.total_income} icon={<TrendingUp className="text-green-600" />} color="green" />
                <StatCard title="Expenses" amount={summary.total_expenses} icon={<TrendingDown className="text-red-600" />} color="red" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <ActivityChart trendData={trendData} />
                <CategoryChart categoryData={categoryData} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <OverviewChart comparisonData={comparisonData} />
                <RecentTransactions transactions={recentTransactions} />
            </div>
        </div>
    );
};

export default Dashboard;
