import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import * as api from '../api';
import {
    TrendingUp,
    TrendingDown,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Wallet
} from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
} from 'chart.js';
import { format, startOfMonth, endOfMonth, isWithinInterval, subMonths } from 'date-fns';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import toast from 'react-hot-toast';

// Modular Reports Components
import ReportsHeader from '../components/Reports/ReportsHeader';
import QuickFilter from '../components/Reports/QuickFilter';
import ReportStat from '../components/Reports/ReportStat';
import FinancialOverviewChart from '../components/Reports/FinancialOverviewChart';
import CategorySplitChart from '../components/Reports/CategorySplitChart';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

const Reports = () => {
    const { transactions } = useData();
    const [startDate, setStartDate] = useState(format(startOfMonth(new Date()), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState(format(endOfMonth(new Date()), 'yyyy-MM-dd'));

    const filteredTransactions = useMemo(() => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        return transactions.filter(t => {
            const transDate = new Date(t.date);
            return isWithinInterval(transDate, { start, end });
        });
    }, [transactions, startDate, endDate]);

    const openingBalance = useMemo(() => {
        const start = new Date(startDate);
        return transactions
            .filter(t => new Date(t.date) < start)
            .reduce((acc, t) => t.type === 'income' ? acc + parseFloat(t.amount) : acc - parseFloat(t.amount), 0);
    }, [transactions, startDate]);

    const stats = useMemo(() => {
        const income = filteredTransactions
            .filter(t => t.type === 'income')
            .reduce((acc, t) => acc + parseFloat(t.amount), 0);
        const expense = filteredTransactions
            .filter(t => t.type === 'expense')
            .reduce((acc, t) => acc + parseFloat(t.amount), 0);
        return { income, expense, balance: income - expense };
    }, [filteredTransactions]);

    const categoryData = useMemo(() => {
        const categories = {};
        filteredTransactions.forEach(t => {
            categories[t.category] = (categories[t.category] || 0) + parseFloat(t.amount);
        });

        return {
            labels: Object.keys(categories),
            datasets: [{
                data: Object.values(categories),
                backgroundColor: ['#f27021', '#00a4e4', '#56a717', '#0f172a', '#64748b', '#94a3b8'],
                borderWidth: 0,
            }]
        };
    }, [filteredTransactions]);

    const savePDFToRoot = async () => {
        const doc = new jsPDF();
        // Header
        doc.setFillColor(242, 112, 33);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont("helvetica", "bold");
        doc.text("EthioFinance Executive Report", 15, 25);
        doc.setFontSize(10);
        doc.text("Official Ethio Telecom Financial Intelligence", 15, 32);

        // Meta Info
        doc.setTextColor(100, 100, 100);
        doc.setFontSize(12);
        doc.text(`Period: ${format(new Date(startDate), 'MMM dd, yyyy')} - ${format(new Date(endDate), 'MMM dd, yyyy')}`, 15, 55);
        doc.text(`Generated: ${format(new Date(), 'PPPP p')}`, 15, 62);

        // Summary
        doc.setFillColor(248, 250, 252);
        doc.roundedRect(15, 75, 180, 50, 5, 5, 'F');
        doc.setTextColor(30, 41, 59);
        doc.setFontSize(14);
        doc.text("Financial Metrics (ETB)", 25, 88);
        doc.setFontSize(11);
        doc.text(`Opening Balance: ETB ${openingBalance.toLocaleString()}`, 25, 98);
        doc.text(`Total Income: + ETB ${stats.income.toLocaleString()}`, 25, 106);
        doc.text(`Total Expenses: - ETB ${stats.expense.toLocaleString()}`, 25, 114);
        doc.setFont("helvetica", "bold");
        doc.text(`Closing Balance: ETB ${(openingBalance + stats.balance).toLocaleString()}`, 25, 122);

        // Transactions
        doc.autoTable({
            startY: 140,
            head: [['Date', 'Description', 'Category', 'Type', 'Amount (ETB)']],
            body: filteredTransactions.map(t => [
                format(new Date(t.date), 'MMM dd, yyyy'),
                t.description,
                t.category,
                t.type.toUpperCase(),
                `${t.type === 'income' ? '+' : '-'} ${parseFloat(t.amount).toLocaleString()}`
            ]),
            headStyles: { fillColor: [0, 164, 228] },
            margin: { left: 15, right: 15 }
        });

        const pdfBase64 = doc.output('datauristring');
        const fileName = `EthioFinance_Report_${startDate}_to_${endDate}_${Date.now()}.pdf`;

        const savePromise = api.saveReport({ pdfData: pdfBase64, fileName });

        toast.promise(savePromise, {
            loading: 'Archiving report to root folder...',
            success: 'Report successfully saved to project root!',
            error: 'Failed to save report to server root.'
        });
    };

    return (
        <div className="space-y-8 pb-12">
            <ReportsHeader
                onSave={savePDFToRoot}
                isSaveDisabled={filteredTransactions.length === 0}
            />

            {/* Date Filters */}
            <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                    <div className="bg-orange-50 p-3 rounded-2xl">
                        <Calendar className="text-orange-600" size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">From Date</p>
                        <input
                            type="date"
                            className="bg-transparent border-none p-0 text-sm font-black text-gray-900 focus:ring-0 cursor-pointer"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="h-10 w-px bg-gray-100 hidden md:block" />

                <div className="flex items-center gap-3">
                    <div className="bg-blue-50 p-3 rounded-2xl">
                        <Calendar className="text-blue-600" size={20} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">To Date</p>
                        <input
                            type="date"
                            className="bg-transparent border-none p-0 text-sm font-black text-gray-900 focus:ring-0 cursor-pointer"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="ml-auto flex items-center gap-2">
                    <QuickFilter label="This Month" onClick={() => {
                        setStartDate(format(startOfMonth(new Date()), 'yyyy-MM-dd'));
                        setEndDate(format(endOfMonth(new Date()), 'yyyy-MM-dd'));
                    }} />
                    <QuickFilter label="Last Month" onClick={() => {
                        const lastMonth = subMonths(new Date(), 1);
                        setStartDate(format(startOfMonth(lastMonth), 'yyyy-MM-dd'));
                        setEndDate(format(endOfMonth(lastMonth), 'yyyy-MM-dd'));
                    }} />
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <ReportStat
                    label="Opening Balance"
                    value={openingBalance}
                    icon={<Wallet size={20} />}
                    color="text-slate-900"
                    bgColor="bg-slate-50"
                />
                <ReportStat
                    label="Period Income"
                    value={stats.income}
                    icon={<ArrowUpRight size={20} />}
                    color="text-green-600"
                    bgColor="bg-green-50"
                    prefix="+"
                />
                <ReportStat
                    label="Period Expense"
                    value={stats.expense}
                    icon={<ArrowDownRight size={20} />}
                    color="text-orange-600"
                    bgColor="bg-orange-50"
                    prefix="-"
                />
                <ReportStat
                    label="Net Change"
                    value={stats.balance}
                    icon={stats.balance >= 0 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                    color={stats.balance >= 0 ? "text-blue-600" : "text-red-600"}
                    bgColor={stats.balance >= 0 ? "bg-blue-50" : "bg-red-50"}
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <FinancialOverviewChart income={stats.income} expense={stats.expense} />
                <CategorySplitChart
                    data={categoryData}
                    hasData={filteredTransactions.length > 0}
                />
            </div>
        </div>
    );
};

export default Reports;
