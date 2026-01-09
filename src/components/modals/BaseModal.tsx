import React from 'react';
import { X } from 'lucide-react';

interface BaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    maxWidth?: string;
}

const BaseModal: React.FC<BaseModalProps> = ({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) => {
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] overflow-y-auto custom-scrollbar">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Positioning Container */}
            <div className="flex min-h-full items-center justify-center p-4 pointer-events-none">
                {/* Modal Content */}
                <div className={`relative w-full ${maxWidth} bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300 pointer-events-auto my-8`}>
                    <div className="flex items-center justify-between p-8 border-b border-slate-50 sticky top-0 bg-white z-10">
                        <div>
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{title}</h3>
                            <div className="h-1 w-10 bg-[#0081cc] mt-1 rounded-full"></div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-900"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BaseModal;
