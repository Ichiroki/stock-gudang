import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Area, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, AreaChart, Pie, Cell, PieChart } from 'recharts';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const [chartData, setChartData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [masuk, setMasuk] = useState([])
    const [keluar, setKeluar] = useState([])

    console.log(masuk)

    const COLORS = ['#888d48', '#82ca9d', '#ffc658']

    useEffect(() => {
        axios.get('/dashboard/chart-data')
        .then((res) => {
            const { masuk, keluar } = res.data

            const merged = Array.from({ length: 12 }, (_, i) => {
                const month = i + 1
                const m = masuk.find((x: any) => x.month === month)
                const k = keluar.find((x: any) => x.month === month)
                return {
                    month,
                    masuk: m ? m.total : 0,
                    keluar: k ? k.total : 0
                }
            })
            setChartData(merged)
            setMasuk(masuk)
            setKeluar(keluar)
            setLoading(false)
        })
    }, [])

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <h2 className='text-xl font-bold mb-4'>Statistik Barang Masuk & Keluar</h2>
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    {loading ? (
                        <div className='w-80 h-32 animate-pulse mx-auto mt-3'>
                            <div className='h-6 w-full bg-gray-300 rounded mb-4'/>
                            <div className='h-full bg-gray-200'/>
                        </div>
                    ) : (
                        <ResponsiveContainer>
                            <LineChart data={chartData} width={500} height={300}
                            margin={{top: 20, left: -20, right: 20}}>
                                <CartesianGrid strokeDasharray="7 7"/>
                                <XAxis dataKey={"Month"}/>
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Line type="monotone" dataKey="masuk" stroke="#82ca9d" strokeWidth={2} name="Barang Masuk"/>
                                <Line type="monotone" dataKey="keluar" stroke="#ff7f7f" strokeWidth={2} name="Barang Keluar"/>
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className='w-80 h-32 animate-pulse mx-auto mt-3'>
                            <div className='h-6 w-full bg-gray-300 rounded mb-4'/>
                            <div className='h-full bg-gray-200'/>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className='w-80 h-32 animate-pulse mx-auto mt-3 relative'>
                            <div className='h-6 w-1/4 bg-gray-300 rounded mb-4 ml-60'/>
                            <div className='h-full bg-gray-200'/>
                        </div>
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                {loading ? (
                    <div className='w-full h-32 animate-pulse mx-auto mt-3'>
                        <div className='h-6 w-full bg-gray-300 rounded mb-4'/>
                        <div className='h-full bg-gray-200'/>
                    </div>
                ) : (
                    <PieChart width={400} height={300}>
                        <Pie
                            data={masuk}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#888d48"
                            label
                        >
                            {masuk.map((_, i) =>
                                <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                            )}
                        </Pie>
                        <Tooltip/>
                    </PieChart>
                    // <ResponsiveContainer>
                    //     <AreaChart data={chartData} layout='horizontal' margin={{top: 25, right: 40, bottom: 20}}>
                    //         <defs>
                    //             <linearGradient id="colorMasuk" x1="0" y1="0" x2="0" y2="1">
                    //                 <stop offset={"5%"} stopColor='#82ca9d' stopOpacity={0.8}></stop>
                    //                 <stop offset={"95%"} stopColor='#82ca9d' stopOpacity={0}></stop>
                    //             </linearGradient>
                    //         </defs>
                    //         <CartesianGrid strokeDasharray={"5 5"}/>
                    //         <XAxis dataKey={"month"}/>
                    //         <YAxis />
                    //         <Tooltip />
                    //         <Area type="monotone" dataKey="masuk" stroke="#82ca9d" fillOpacity={1} fill="url(#colorMasuk)"/>
                    //     </AreaChart>
                    // </ResponsiveContainer>
                )}
                </div>
            </div>
        </AppLayout>
    );
}
