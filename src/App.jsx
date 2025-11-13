import { useEffect, useMemo, useState } from 'react'
import {
  Menu,
  Bell,
  CircleUser,
  ChevronDown,
  LayoutGrid,
  Package,
  Layers,
  ShoppingCart,
  Boxes,
  LineChart,
  LogOut,
  ChevronRight,
  Plus,
  Search
} from 'lucide-react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function useTheme() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('pdpp-theme')
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const enableDark = stored ? stored === 'dark' : prefersDark
    setDark(enableDark)
    document.documentElement.classList.toggle('dark', enableDark)
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('pdpp-theme', next ? 'dark' : 'light')
  }

  return { dark, toggle }
}

function Topbar({ onToggleSidebar }) {
  const { dark, toggle } = useTheme()
  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-neutral-900/70 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
      <div className="h-16 px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onToggleSidebar} className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 sm:hidden">
            <Menu size={20} />
          </button>
          <div className="w-10 h-10 rounded-xl bg-orange-500 text-white grid place-items-center font-bold shadow-sm">PD</div>
          <div className="leading-tight hidden sm:block">
            <p className="font-semibold text-neutral-900 dark:text-neutral-100">PD Bagus Putra</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Sistem Point of Sale</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
            <Search size={16} />
            <input placeholder="Cari menu atau aksi..." className="bg-transparent outline-none text-sm w-64 placeholder:text-neutral-400" />
          </div>

          <button onClick={toggle} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition">
            <span className="i-[theme]">{dark ? 'Dark' : 'Light'}</span>
          </button>

          <button className="relative p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 transition">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 text-white text-[10px] grid place-items-center">3</span>
          </button>
          <div className="flex items-center gap-2 pl-2">
            <img className="w-9 h-9 rounded-full object-cover ring-2 ring-orange-500/20" src="https://i.pravatar.cc/100?img=12" alt="Admin" />
            <button className="hidden sm:flex items-center gap-1 text-sm text-neutral-700 dark:text-neutral-200 px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800">
              <span>Admin</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

function Sidebar({ open }) {
  const menu = [
    { icon: LayoutGrid, label: 'Dashboard', active: true },
    { icon: Package, label: 'Data Barang' },
    { icon: Layers, label: 'Kategori Material' },
    { icon: ShoppingCart, label: 'Transaksi Penjualan' },
    { icon: Boxes, label: 'Stok Barang' },
    { icon: LineChart, label: 'Laporan Keuangan' },
    { icon: LogOut, label: 'Logout', danger: true },
  ]

  return (
    <aside className={classNames(
      'fixed sm:sticky top-16 left-0 h-[calc(100vh-4rem)] w-72 shrink-0 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-4 transition-transform duration-300 ease-out',
      open ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
    )}>
      <nav className="space-y-1">
        {menu.map((item) => (
          <button key={item.label} className={classNames(
            'w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-left transition group',
            item.active
              ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-semibold shadow-inner'
              : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:text-white dark:hover:bg-neutral-800',
            item.danger && 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30'
          )}>
            <item.icon size={18} className={classNames(item.active ? 'text-orange-500' : 'text-neutral-400 group-hover:text-orange-500')} />
            <span className="flex-1">{item.label}</span>
            {item.active && <ChevronRight size={16} className="text-orange-500" />}
          </button>
        ))}
      </nav>
    </aside>
  )
}

function SummaryCard({ title, value, trend, icon: Icon }) {
  const trendColor = trend && trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600'
  return (
    <div className="rounded-2xl p-5 bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200/80 dark:border-neutral-800">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">{title}</p>
        <div className="w-10 h-10 rounded-xl grid place-items-center bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
          <Icon size={18} />
        </div>
      </div>
      <div className="flex items-end gap-3">
        <p className="text-2xl font-semibold text-neutral-900 dark:text-white">{value}</p>
        {trend && <span className={classNames('text-xs font-medium', trendColor)}>{trend}</span>}
      </div>
    </div>
  )
}

function SalesChart() {
  // Simple mocked monthly sales data
  const data = useMemo(() => [12, 18, 15, 20, 28, 25, 32, 30, 34, 40, 38, 45], [])
  const max = Math.max(...data) * 1.2
  const points = data
    .map((d, i) => {
      const x = (i / (data.length - 1)) * 100
      const y = 100 - (d / max) * 100
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div className="rounded-2xl p-5 bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200/80 dark:border-neutral-800">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Grafik Penjualan per Bulan</p>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500"></span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">2025</span>
        </div>
      </div>
      <div className="h-64">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polyline
            fill="none"
            stroke="#f97316"
            strokeWidth="1.5"
            points={points}
          />
          <polygon
            fill="url(#grad)"
            points={`0,100 ${points} 100,100`}
          />
          {/* Grid */}
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={i} x1="0" x2="100" y1={(i + 1) * 20} y2={(i + 1) * 20} stroke="currentColor" strokeWidth="0.2" className="text-neutral-200 dark:text-neutral-800" />
          ))}
        </svg>
      </div>
      <div className="mt-3 grid grid-cols-12 text-[11px] text-neutral-500 dark:text-neutral-400">
        {['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'].map((m) => (
          <span key={m} className="text-center">{m}</span>
        ))}
      </div>
    </div>
  )
}

function RecentTable() {
  const rows = [
    { id: 'TRX-1201', date: '12 Jan 2025', customer: 'Umum', items: 8, total: 'Rp 1.250.000' },
    { id: 'TRX-1200', date: '12 Jan 2025', customer: 'CV Maju', items: 14, total: 'Rp 3.480.000' },
    { id: 'TRX-1199', date: '11 Jan 2025', customer: 'Umum', items: 5, total: 'Rp 620.000' },
    { id: 'TRX-1198', date: '11 Jan 2025', customer: 'PT Konstruksi', items: 22, total: 'Rp 6.240.000' },
  ]
  return (
    <div className="rounded-2xl p-5 bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200/80 dark:border-neutral-800">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">Transaksi Terbaru</p>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-neutral-500 dark:text-neutral-400">
              <th className="py-3">ID</th>
              <th className="py-3">Tanggal</th>
              <th className="py-3">Pelanggan</th>
              <th className="py-3">Item</th>
              <th className="py-3">Total</th>
              <th className="py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.id} className={classNames('border-t border-neutral-200/80 dark:border-neutral-800', i % 2 === 1 && 'bg-neutral-50/50 dark:bg-neutral-950/20')}>
                <td className="py-3 font-medium text-neutral-800 dark:text-neutral-200">{r.id}</td>
                <td className="py-3 text-neutral-600 dark:text-neutral-300">{r.date}</td>
                <td className="py-3 text-neutral-600 dark:text-neutral-300">{r.customer}</td>
                <td className="py-3 text-neutral-600 dark:text-neutral-300">{r.items}</td>
                <td className="py-3 text-neutral-800 dark:text-neutral-200">{r.total}</td>
                <td className="py-3">
                  <div className="flex justify-end">
                    <button className="px-3 py-1.5 text-xs rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200">Detail</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer className="py-6 text-center text-xs text-neutral-500 dark:text-neutral-400">
      © 2025 PD Bagus Putra - Sistem Point of Sale Laravel 10
    </footer>
  )
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Topbar onToggleSidebar={() => setSidebarOpen((s) => !s)} />
      <div className="flex">
        <Sidebar open={sidebarOpen} />
        <main className="flex-1 min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white">Dashboard</h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">Ringkasan aktivitas toko material Anda</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-sm">
                <Plus size={16} /> Tambah Barang Baru
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 hover:bg-black text-white dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 shadow-sm">
                <Plus size={16} /> Tambah Transaksi
              </button>
            </div>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <SummaryCard title="Total Barang" value="1.248 SKU" trend="+3.2%" icon={Package} />
            <SummaryCard title="Transaksi Hari Ini" value="86" trend="+12%" icon={ShoppingCart} />
            <SummaryCard title="Total Penjualan Bulan Ini" value="Rp 128.450.000" trend="+8.4%" icon={LineChart} />
            <SummaryCard title="Barang Hampir Habis" value="24" trend="-5%" icon={Boxes} />
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2"><SalesChart /></div>
            <div className="xl:col-span-1 space-y-4">
              <div className="rounded-2xl p-5 bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200/80 dark:border-neutral-800">
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-3">Aksi Cepat</p>
                <div className="grid grid-cols-2 gap-3">
                  <button className="rounded-xl p-4 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-left transition">
                    <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100">Tambah Barang</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Input SKU baru</p>
                  </button>
                  <button className="rounded-xl p-4 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-left transition">
                    <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100">Tambah Transaksi</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Penjualan kasir</p>
                  </button>
                  <button className="rounded-xl p-4 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-left transition">
                    <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100">Cek Stok</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">SKU kritis</p>
                  </button>
                  <button className="rounded-xl p-4 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-left transition">
                    <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100">Laporan</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">Ringkasan keuangan</p>
                  </button>
                </div>
              </div>
              <div className="rounded-2xl p-5 bg-gradient-to-br from-orange-50 to-white dark:from-neutral-900 dark:to-neutral-900 shadow-sm border border-neutral-200/80 dark:border-neutral-800">
                <p className="text-sm text-neutral-700 dark:text-neutral-200">Tips</p>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">Gunakan mode gelap untuk kenyamanan saat shift malam.</p>
              </div>
            </div>
          </section>

          <section>
            <RecentTable />
          </section>

          <Footer />
        </main>
      </div>
    </div>
  )
}
