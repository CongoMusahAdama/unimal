import React, { useState } from 'react';
import {
    Printer,
    Download,
    Mail,
    CheckCircle2,
    User,
    Truck,
    Calendar,
    Hash,
    DollarSign,
    Package,
    ArrowRight
} from 'lucide-react';

const CustomerInvoice: React.FC<{ onSubmit: () => void; onCancel: () => void }> = ({ onSubmit, onCancel }) => {
    const [step, setStep] = useState<'form' | 'preview'>('form');
    const [invoiceData, setInvoiceData] = useState({
        customer: 'Takoradi Central Depot',
        date: new Date().toLocaleDateString('en-GB'),
        invoiceNo: `INV-${Math.floor(Math.random() * 9000) + 1000}`,
        items: [
            { desc: 'Voltic Cool Pac (Bags)', qty: 150, price: 3.50 },
            { desc: 'Unimanuel Bottle 500ml', qty: 20, price: 12.00 },
        ],
        paymentMethod: 'Cash',
        route: 'Route A',
        vehicle: 'WR-492-23'
    });

    const subtotal = invoiceData.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
    const tax = subtotal * 0.02; // 2% levy/tax
    const total = subtotal + tax;

    const handlePrint = () => {
        window.print();
        onSubmit();
    };

    if (step === 'form') {
        return (
            <div className="space-y-8 min-h-[500px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Customer Selection</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={invoiceData.customer}
                                onChange={(e) => setInvoiceData({ ...invoiceData, customer: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 pl-12 text-sm font-black focus:ring-2 focus:ring-[#0081cc]/20 focus:border-[#0081cc] transition-all"
                            />
                            <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Assigned Route</label>
                        <div className="relative">
                            <select
                                value={invoiceData.route}
                                onChange={(e) => setInvoiceData({ ...invoiceData, route: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 pl-12 text-sm font-black appearance-none focus:ring-2 focus:ring-[#0081cc]/20 focus:border-[#0081cc] transition-all"
                            >
                                <option>Route A</option>
                                <option>Route B</option>
                                <option>Direct Depot</option>
                            </select>
                            <Truck size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Standard Itemized Sales</label>
                    <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 space-y-4">
                        {invoiceData.items.map((item, i) => (
                            <div key={i} className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-50 shadow-sm">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-blue-50 text-[#0081cc] rounded-lg flex items-center justify-center">
                                        <Package size={18} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-800 uppercase leading-none">{item.desc}</p>
                                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Qty: {item.qty} • Unit: ₵{item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                                <p className="text-sm font-black text-[#003366]">₵{(item.qty * item.price).toFixed(2)}</p>
                            </div>
                        ))}
                        <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-[10px] font-black uppercase text-slate-400 hover:text-[#0081cc] hover:border-[#0081cc] transition-all">
                            Add Line Item
                        </button>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex space-x-2">
                        <button onClick={onCancel} className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Exit</button>
                    </div>
                    <button
                        onClick={() => setStep('preview')}
                        className="bg-[#003366] text-white px-10 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl hover:bg-[#0081cc] transition-all flex items-center space-x-3"
                    >
                        <span>Preview Invoice</span>
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-10 animate-in zoom-in duration-300">
            {/* INVOICE PREVIEW AREA */}
            <div className="bg-white border-2 border-slate-100 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden print:border-none print:shadow-none print:p-0">

                {/* Header */}
                <div className="flex justify-between items-start border-b-2 border-slate-100 pb-10 mb-10">
                    <div className="flex items-center space-x-6">
                        <img src="/logo.png" alt="Logo" className="h-16 w-auto" />
                        <div>
                            <h2 className="text-2xl font-black text-[#003366] uppercase tracking-tighter">UniEmmanuel Ventures</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Takoradi, Western Region • 0244925320</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <h1 className="text-3xl font-black text-[#ce1126] uppercase tracking-[0.2em] mb-2 leading-none">Tax Invoice</h1>
                        <p className="text-sm font-black text-slate-900 font-mono italic">{invoiceData.invoiceNo}</p>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-12 mb-12">
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-50 pb-2">Billed To</h4>
                        <div className="space-y-1">
                            <p className="text-lg font-black text-[#003366] uppercase tracking-tight">{invoiceData.customer}</p>
                            <p className="text-xs font-bold text-slate-500 uppercase">Distribution Route: {invoiceData.route}</p>
                            <p className="text-xs font-bold text-slate-500 uppercase">Truck Ref: {invoiceData.vehicle}</p>
                        </div>
                    </div>
                    <div className="space-y-4 text-right">
                        <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest border-b border-slate-50 pb-2">Record Logistics</h4>
                        <div className="space-y-1">
                            <p className="text-xs font-black text-slate-900 uppercase">Issue Date: {invoiceData.date}</p>
                            <p className="text-xs font-black text-slate-900 uppercase">Status: <span className="text-emerald-600">Paid - Cash</span></p>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="mb-12 overflow-hidden rounded-2xl border border-slate-100">
                    <table className="w-full text-left">
                        <thead className="bg-[#003366] text-white">
                            <tr>
                                <th className="p-5 text-[10px] font-black uppercase tracking-widest">Product Description</th>
                                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-center">Qty</th>
                                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-center">Price</th>
                                <th className="p-5 text-[10px] font-black uppercase tracking-widest text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {invoiceData.items.map((item, i) => (
                                <tr key={i} className="text-xs font-bold text-slate-700">
                                    <td className="p-5 uppercase tracking-tight">{item.desc}</td>
                                    <td className="p-5 text-center">{item.qty}</td>
                                    <td className="p-5 text-center">₵{item.price.toFixed(2)}</td>
                                    <td className="p-5 text-right font-black text-[#003366]">₵{(item.qty * item.price).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Totals */}
                <div className="flex justify-end mb-16">
                    <div className="w-64 space-y-3">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase">
                            <span>Subtotal</span>
                            <span>₵{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase">
                            <span>Levy (2%)</span>
                            <span>₵{tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t-2 border-slate-900">
                            <span className="text-sm font-black text-slate-900 uppercase">Amount Due</span>
                            <span className="text-2xl font-black text-[#ce1126] tracking-tighter">₵{total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Footer Signature */}
                <div className="grid grid-cols-2 gap-20 items-end">
                    <div className="space-y-8">
                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center space-x-3 text-emerald-700">
                            <CheckCircle2 size={24} />
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest leading-none">Official Valid Receipt</p>
                                <p className="text-[8px] font-bold uppercase mt-1">Thank you for your business</p>
                            </div>
                        </div>
                        <p className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.4em]">UniEmmanuel • Voltic Cool Pac Licensed Vendor</p>
                    </div>
                    <div className="text-center pt-8 border-t-2 border-slate-900/10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#003366]">Authorized Signature</p>
                    </div>
                </div>

                {/* Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 opacity-[0.03] pointer-events-none select-none text-[150px] font-black text-slate-900 uppercase">
                    ORIGINAL
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4 no-print">
                <button
                    onClick={() => setStep('form')}
                    className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#003366] transition-colors"
                >
                    ← Back to Edit
                </button>
                <div className="flex space-x-4">
                    <button className="p-5 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-[#003366] transition-all shadow-sm">
                        <Download size={20} />
                    </button>
                    <button className="p-5 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 transition-all shadow-sm">
                        <Mail size={20} />
                    </button>
                    <button
                        onClick={handlePrint}
                        className="bg-[#003366] text-white px-12 py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-2xl hover:bg-[#ce1126] transition-all flex items-center space-x-3"
                    >
                        <Printer size={20} />
                        <span>Print & Post Entry</span>
                    </button>
                </div>
            </div>

            <style>{`
                @media print {
                    @page { margin: 15mm; size: auto; }
                    body { background: white !important; }
                    .no-print, nav, header, aside, button { display: none !important; }
                }
            `}</style>
        </div>
    );
};

export default CustomerInvoice;
