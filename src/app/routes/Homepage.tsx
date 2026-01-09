import React, { useState, useEffect } from 'react';
import {
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    FlaskConical,
    Filter,
    Beaker,
    Users,
    Truck,
    Trophy,
    CheckCircle2,
    ShieldCheck,
    Phone,
    Package,
    ArrowRight,
    Menu,
    X,
    MessageSquare,
    Bot,
    Send,
    ShoppingBag,
    PhoneCall,
    MessageCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Homepage: React.FC = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showChatbot, setShowChatbot] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [orderQuantity, setOrderQuantity] = useState('50');
    const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('delivery');

    const handleWhatsAppOrder = () => {
        const message = `Hello UniEmmanuel Ventures, I'd like to order *${orderQuantity} bags* of Voltic Cool Pac.\n\n*Method:* ${deliveryMethod === 'delivery' ? '🚚 Delivery to my location' : '🏪 Self-Pickup at factory'}\n\nPlease confirm availability and total cost. Thank you!`;
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/233244925320?text=${encodedMessage}`, '_blank');
    };

    // Scroll listener for chatbot visibility
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowChatbot(true);
            } else {
                setShowChatbot(false);
            }

            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in', 'fade-in', 'duration-1000');
                }
            });
        }, observerOptions);

        // Observe all section headings
        const headings = document.querySelectorAll('.scroll-animate');
        headings.forEach(heading => observer.observe(heading));

        return () => {
            headings.forEach(heading => observer.unobserve(heading));
        };
    }, []);

    return (
        <div className="font-sans text-slate-800 bg-white">
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm xl:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Slide-in Menu */}
            <div className={`fixed top-0 right-0 h-full w-[280px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 xl:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <img src="/logo.png" alt="Unimanuel Logo" className="h-10 w-auto" />
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <X size={24} className="text-slate-600" />
                        </button>
                    </div>

                    <nav className="flex flex-col space-y-4">
                        <a
                            href="#home"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-[#003366] font-black uppercase text-sm tracking-widest py-3 px-4 hover:bg-[#0081cc] hover:text-white rounded-lg transition-all"
                        >
                            Home
                        </a>
                        <a
                            href="#about"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-[#003366] font-black uppercase text-sm tracking-widest py-3 px-4 hover:bg-[#0081cc] hover:text-white rounded-lg transition-all"
                        >
                            Company
                        </a>
                        <a
                            href="#quality"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-[#003366] font-black uppercase text-sm tracking-widest py-3 px-4 hover:bg-[#0081cc] hover:text-white rounded-lg transition-all"
                        >
                            Quality
                        </a>
                        <a
                            href="#products"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-[#003366] font-black uppercase text-sm tracking-widest py-3 px-4 hover:bg-[#0081cc] hover:text-white rounded-lg transition-all"
                        >
                            Services
                        </a>

                        <div className="pt-4 border-t border-slate-200">
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    navigate('/login');
                                }}
                                className="w-full bg-[#0081cc] hover:bg-[#006bb3] text-white py-3 px-4 rounded-lg font-black uppercase text-xs tracking-widest transition-all shadow-lg"
                            >
                                Access Portal
                            </button>
                        </div>
                    </nav>
                </div>
            </div>

            {/* 2. NAVBAR (Premium Design Restored) */}
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-4 md:px-6 lg:px-12 py-4 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto flex justify-between items-center pointer-events-auto">
                    {/* Logo Section */}
                    <Link to="/" className="flex items-center bg-white p-2 md:p-3 rounded-b-xl shadow-lg border-t-2 border-[#ce1126] relative z-50 pointer-events-auto">
                        <img src="/logo.png" alt="Unimanuel Logo" className="h-10 md:h-12 lg:h-16 w-auto object-contain" />
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="xl:hidden bg-white p-3 rounded-xl shadow-lg border-t-2 border-[#0081cc] hover:bg-slate-50 transition-colors"
                    >
                        <Menu size={24} className="text-[#003366]" />
                    </button>

                    {/* Navigation Container Area */}
                    <div className="hidden xl:flex items-stretch bg-white h-14 md:h-16 lg:h-20 shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.3)] rounded-sm overflow-hidden border-t-4 border-[#0081cc]">
                        {/* Links Section */}
                        <div className="hidden xl:flex items-center space-x-6 lg:space-x-10 px-8 lg:px-14 text-[11px] font-black uppercase tracking-[0.25em] text-[#003366] border-r border-slate-50">
                            <a href="#home" className="hover:text-[#0081cc] transition-colors relative group">
                                Home
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#0081cc] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                            </a>
                            <a href="#about" className="hover:text-[#0081cc] transition-colors relative group">
                                Company
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#0081cc] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                            </a>
                            <a href="#quality" className="hover:text-[#0081cc] transition-colors relative group">
                                Quality
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#0081cc] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                            </a>
                            <a href="#products" className="hover:text-[#0081cc] transition-colors relative group">
                                Services
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#0081cc] scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                            </a>
                        </div>
                        {/* Contact Block Section */}
                        <div className="bg-[#0081cc] flex items-center px-4 md:px-8 lg:px-12 text-white group cursor-pointer hover:bg-[#003366] transition-colors">
                            <div className="flex items-center space-x-3 md:space-x-4">
                                <div className="w-8 h-8 md:w-10 md:h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-[#0081cc] transition-all">
                                    <Phone size={16} className="md:w-[18px] md:h-[18px]" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] opacity-80">Call Us</span>
                                    <span className="font-black tracking-tight text-sm md:text-[16px] lg:text-[18px]">0244925320</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* 3. HERO SECTION (Reverted to Blue with CTA Buttons) */}
            <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-28 md:pt-32">
                {/* Background Layer */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/images/warehouse_stock.png"
                        alt="Warehouse Stock"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#003366]/40 md:bg-[#003366]/30"></div>
                </div>

                {/* Diagonal Overlay (Desktop Only) */}
                <div className="absolute inset-0 z-0 hidden lg:block">
                    <div className="absolute top-0 left-0 w-[68%] h-full bg-[#003366]/80 transform -skew-x-12 -translate-x-[20%] shadow-[30px_0_100px_rgba(0,0,0,0.6)]"></div>
                </div>

                <div className="container mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center py-12 md:py-20">
                    <div className="space-y-6 md:space-y-8">
                        <div className="inline-block">
                            <span className="bg-[#0081cc] text-white px-3 md:px-5 py-1.5 md:py-2 rounded text-[9px] md:text-[11px] font-black uppercase tracking-[0.15em] md:tracking-[0.2em]">
                                VOLTIC COOL PAC • LICENSED
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight tracking-tighter animate-in slide-in-from-left duration-1000 delay-[2000ms]">
                            Voltic <span className="text-brand-red">Cool Pac</span>
                            <br className="hidden sm:block" />
                            <span className="text-[#00adff]"> 100% Pure Water</span>
                        </h1>
                        <p className="text-white/90 text-sm md:text-base lg:text-lg font-medium max-w-xl leading-relaxed">
                            Highest quality health-focused sachet water and distribution services across the Western Region.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6">
                            <button
                                onClick={() => setIsOrderModalOpen(true)}
                                className="bg-[#0081cc] hover:bg-[#ff8c00] text-white px-6 md:px-8 py-3 md:py-4 font-black uppercase text-[10px] md:text-xs tracking-widest shadow-xl transition-all active:scale-95 rounded-lg flex items-center justify-center space-x-2"
                            >
                                <ShoppingBag size={14} />
                                <span>ORDER NOW</span>
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white hover:text-[#003366] text-white px-6 md:px-8 py-3 md:py-4 font-black uppercase text-[10px] md:text-xs tracking-widest transition-all shadow-xl active:scale-95 rounded-lg"
                            >
                                ACCESS PORTAL
                            </button>
                        </div>
                    </div>

                    <div className="relative animate-in slide-in-from-right duration-1000">
                        <div className="relative z-10 scale-100 md:scale-110">
                            <img
                                src="/images/voltic_featured_red.png"
                                alt="Voltic Cool Pac Products"
                                className="w-full max-w-[350px] md:max-w-none mx-auto drop-shadow-[0_45px_45px_rgba(0,0,0,0.6)] rounded-2xl"
                            />
                        </div>
                        {/* Circle Decoration behind bottle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80%] bg-[#00adff]/10 rounded-full blur-3xl -z-10"></div>
                    </div>
                </div>

                {/* Bottom Wave Decoration */}
                <div className="absolute bottom-0 left-0 w-full leading-[0] z-20">
                    <svg viewBox="0 0 1440 120" className="w-full h-auto">
                        <path
                            fill="#ffffff"
                            d="M0,64L120,69.3C240,75,480,85,720,80C960,75,1200,53,1320,42.7L1440,32L1440,120L1320,120C1200,120,960,120,720,120C480,120,240,120,120,120L0,120Z"
                        ></path>
                    </svg>
                </div>
            </section>

            {/* 4. ABOUT SECTION */}
            <section id="about" className="py-16 md:py-24 lg:py-32 bg-white px-4 md:px-8">
                <div className="container mx-auto text-center max-w-3xl space-y-6 md:space-y-8 mb-12 md:mb-20">
                    <h2 className="scroll-animate text-3xl md:text-4xl lg:text-6xl font-black text-[#003366] tracking-tight">
                        What's Our Story
                    </h2>
                    <div className="flex justify-center">
                        <div className="flex space-x-1">
                            <div className="w-12 h-1 bg-[#0081cc] rounded-full"></div>
                            <div className="w-4 h-1 bg-[#ff8c00] rounded-full"></div>
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm md:text-base lg:text-lg leading-relaxed font-medium">
                        Unimanuel Ventures is a licensed sachet water production business located in Takoradi, Western Region of Ghana.
                        Produced under strict hygienic conditions (FDA & GSA certified) to promote health and trust.
                    </p>
                </div>

                <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {[
                        { title: 'Quality Check', icon: ShieldCheck, desc: 'Pure Voltic Cool Pac at competitive prices for distributors.' },
                        { title: 'Filtration Level', icon: Filter, desc: 'Consistent supply and reliable delivery networks across Takoradi.' },
                        { title: 'Composition', icon: FlaskConical, desc: 'Treated and quality-tested water produced under hygienic standards.' },
                        { title: 'Lab Control', icon: Beaker, desc: 'Become a distributor and grow your business with Voltic Cool Pac.' },
                    ].map((item, i) => (
                        <div key={i} className="bg-white border border-slate-100 rounded-2xl p-10 text-center shadow-lg hover:shadow-2xl transition-all group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-[4rem] group-hover:bg-[#0081cc]/5 transition-colors"></div>
                            <div className="w-20 h-20 bg-[#0081cc] rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-xl group-hover:rotate-12 transition-transform">
                                <item.icon size={32} />
                            </div>
                            <h3 className="text-xl font-black text-[#003366] mb-3 uppercase tracking-tighter">{item.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed font-medium">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="container mx-auto mt-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="relative group">
                        <div className="absolute -left-10 -top-10 bg-[#0081cc] text-white p-12 rounded-xl z-20 shadow-2xl hidden lg:block">
                            <div className="text-center">
                                <span className="text-7xl font-black italic">100</span>
                                <p className="text-xs uppercase font-bold tracking-[0.3em] mt-2 text-white/80">Percent Purity</p>
                            </div>
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-2xl relative bg-slate-100">
                            <img src="/images/water_pack.png" alt="Pure Voltic Cool Pac" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/40 to-transparent"></div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <h2 className="scroll-animate text-4xl lg:text-6xl font-black text-[#003366] tracking-tighter leading-tight">
                            We Deliver The <br />
                            <span className="text-[#0081cc]">Quality Water</span>
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed font-medium">
                            Produced under the highest hygienic conditions and trusted by distributors across the Western Region. Our mission is to provide safe drinking water that promotes health, trust, and customer satisfaction.
                        </p>
                        <div className="space-y-4">
                            {[
                                'Treated and quality-tested Voltic Cool Pac.',
                                'Produced under strict hygienic standards.',
                                'FDA & GSA Certified production processes.',
                                'Reliable distribution and customer care.'
                            ].map((text, i) => (
                                <div key={i} className="flex items-center space-x-3 text-slate-700 font-bold">
                                    <CheckCircle2 size={18} className="text-[#0081cc]" />
                                    <span>{text}</span>
                                </div>
                            ))}
                        </div>
                        <div className="pt-6">
                            <button className="bg-[#0081cc] hover:bg-[#ff8c00] text-white px-10 py-4 font-black uppercase text-xs tracking-widest shadow-xl transition-all">
                                LEARN MORE
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. QUALITY & SAFETY SECTION */}
            <section id="quality" className="py-16 md:py-24 lg:py-32 bg-slate-50 px-4 md:px-8 relative overflow-hidden">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-10 relative z-10">
                        <div className="space-y-4">
                            <p className="text-brand-red font-black uppercase tracking-[0.25em] text-xs">Quality Promise</p>
                            <h2 className="scroll-animate text-4xl lg:text-6xl font-black text-[#003366] tracking-tighter leading-tight">
                                Pure Water. <br />Safe & Every Sachet.
                            </h2>
                        </div>
                        <p className="text-slate-500 text-xl leading-relaxed font-medium max-w-xl">
                            Our water goes through a strict treatment and quality control process, including advanced filtration, UV treatment, and regular quality testing.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                            {[
                                { t: 'Advanced Filtration', i: Filter },
                                { t: 'UV Treatment', i: Beaker },
                                { t: 'Regular Testing', i: FlaskConical },
                                { t: 'Hygienic Packaging', i: ShieldCheck }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center space-x-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                    <div className="bg-[#00adff]/10 p-3 rounded-xl text-[#0081cc]">
                                        <item.i size={24} />
                                    </div>
                                    <span className="font-black text-[#003366] text-sm uppercase tracking-tight">{item.t}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="rounded-[3.5rem] overflow-hidden shadow-2xl border-x-8 border-white group-hover:scale-[1.02] transition-transform duration-700 relative">
                            <img
                                src="/images/hero_bg.png"
                                alt="Hygienic Production Process"
                                className="w-full"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl z-20 border border-slate-100 flex items-center space-x-3">
                            <div className="bg-green-500 p-2 rounded-full text-white">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Status</p>
                                <p className="text-sm font-black text-slate-900 leading-none">FDA Certified</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. WHY CHOOSE US */}
            <section className="py-12 md:py-16 bg-[#003366] text-white px-4 md:px-8 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="/images/water_hero.jpg" alt="Bg" className="w-full h-full object-cover opacity-10 grayscale" />
                </div>
                <div className="container mx-auto relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center pb-12 md:pb-16">
                        {[
                            { val: '250+', label: 'Happy Clients', icon: Users },
                            { val: '15+', label: 'Transport', icon: Truck },
                            { val: '45+', label: 'Employees', icon: Users },
                            { val: '12', label: 'Years Experience', icon: Trophy },
                        ].map((stat, i) => (
                            <div key={i} className="space-y-4 group">
                                <div className="w-20 h-20 bg-[#0081cc] rounded-full flex items-center justify-center mx-auto text-white group-hover:bg-[#ff8c00] transition-colors shadow-2xl">
                                    <stat.icon size={32} />
                                </div>
                                <h3 className="text-5xl font-black italic">{stat.val}</h3>
                                <p className="text-white/60 font-bold uppercase text-xs tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center space-y-6 md:space-y-8 pt-12 md:pt-16 border-t border-white/10">
                        <h2 className="scroll-animate text-2xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-tight italic">
                            "We don't just sell water —
                            <br className="hidden md:block" />
                            <span className="text-[#00adff]"> we deliver confidence."</span>
                        </h2>
                        <div className="flex justify-center pt-4">
                            <button className="bg-[#ff8c00] hover:bg-[#e67e00] px-8 md:px-12 py-3 md:py-5 rounded-full font-black uppercase text-xs tracking-widest transition-all shadow-xl">
                                Become a Distributor
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. PRODUCTS SECTION */}
            <section id="products" className="py-16 md:py-24 lg:py-32 bg-white px-4 md:px-8">
                <div className="container mx-auto text-center space-y-4 mb-12 md:mb-24">
                    <h2 className="scroll-animate text-3xl md:text-5xl lg:text-7xl font-black text-[#003366] tracking-tighter uppercase">
                        Reliable Supply
                    </h2>
                    <p className="text-brand-red font-black tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs">Takoradi & Beyond</p>
                </div>

                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {[
                        { title: 'Retail Shops', icon: Package, desc: 'Supplying neighborhoods with fresh Voltic Cool Pac daily.' },
                        { title: 'Offices & Corporate', icon: Users, desc: 'Regular bulk supply of Voltic Cool Pac tailored for corporate needs.' },
                        { title: 'Events & Bulk', icon: Truck, desc: 'Specialized Cool Pac arrangements for parties, funerals, and gatherings.' },
                    ].map((item, i) => (
                        <div key={i} className="space-y-8 text-center group bg-slate-50 p-16 rounded-[4rem] border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
                            <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mx-auto text-[#0081cc] group-hover:scale-110 transition-transform duration-500 shadow-lg border border-slate-100">
                                <item.icon size={48} />
                            </div>
                            <h3 className="text-2xl font-black text-[#003366] uppercase tracking-tighter">{item.title}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed text-lg">{item.desc}</p>
                            <a href="#" className="inline-flex items-center text-[#00adff] font-bold uppercase text-xs tracking-widest hover:translate-x-2 transition-transform">
                                Availability <ArrowRight size={14} className="ml-2" />
                            </a>
                        </div>
                    ))}
                </div>
            </section>


            {/* 9. CALL TO ACTION SECTION */}
            <section className="py-12 md:py-16 lg:py-20 bg-[#0081cc] text-white px-4 md:px-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                <div className="container mx-auto max-w-4xl space-y-6 md:space-y-8 relative z-10">
                    <h2 className="scroll-animate text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-tight drop-shadow-2xl">
                        Stay Refreshed.
                    </h2>
                    <div className="flex justify-center">
                        <div className="w-24 md:w-32 h-2 bg-white rounded-full"></div>
                    </div>
                    <p className="text-lg md:text-2xl text-white font-black italic max-w-2xl mx-auto py-2 md:py-4">
                        "Pure Water. Honest Quality. Reliable Supply."
                    </p>
                    <div className="pt-4 md:pt-8">
                        <button className="bg-white text-[#0081cc] px-10 md:px-16 py-4 md:py-7 rounded-full font-black uppercase text-xs md:text-sm tracking-[0.2em] shadow-2xl hover:bg-[#ff8c00] hover:text-white hover:scale-105 active:scale-95 transition-all">
                            Contact Us Today
                        </button>
                    </div>
                </div>
            </section>

            {/* 10. FOOTER */}
            <footer className="bg-slate-900 py-16 md:py-24 lg:py-32 px-4 md:px-8 text-white relative">
                <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 mb-12 md:mb-20 border-b border-white/10 pb-12 md:pb-20">
                    <div className="lg:col-span-2 space-y-8">
                        <img src="/logo.png" alt="Unimanuel Logo" className="h-20 w-auto" />
                        <p className="text-white/50 max-w-md font-medium text-lg leading-relaxed">
                            Unimanuel Ventures is committed to providing pure Voltic Cool Pac solutions that power homes and businesses across Takoradi.
                        </p>
                        <div className="flex space-x-6">
                            <Facebook size={24} className="hover:text-[#ff8c00] cursor-pointer transition-colors" />
                            <Twitter size={24} className="hover:text-[#ff8c00] cursor-pointer transition-colors" />
                            <Linkedin size={24} className="hover:text-[#ff8c00] cursor-pointer transition-colors" />
                            <Instagram size={24} className="hover:text-[#ff8c00] cursor-pointer transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-8 text-center lg:text-left">
                        <h4 className="text-xl font-black uppercase tracking-widest text-[#ff8c00]">Quick Links</h4>
                        <div className="flex flex-col space-y-4 text-white/60 font-black uppercase text-xs tracking-widest">
                            <a href="#home" className="hover:text-white transition-colors">Home</a>
                            <a href="#about" className="hover:text-white transition-colors">About</a>
                            <a href="#quality" className="hover:text-white transition-colors">Quality</a>
                            <a href="#products" className="hover:text-white transition-colors">Services</a>
                        </div>
                    </div>

                    <div className="space-y-8 text-center lg:text-left">
                        <h4 className="text-xl font-black uppercase tracking-widest text-[#ff8c00]">Support</h4>
                        <div className="flex flex-col space-y-4 text-white/60 font-black uppercase text-xs tracking-widest">
                            <a href="#" className="hover:text-white transition-colors">Center</a>
                            <a href="#" className="hover:text-white transition-colors">Contact</a>
                            <Link to="/login" className="hover:text-white transition-colors">Staff Portal</Link>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto text-center space-y-6">
                    <p className="text-[11px] font-black text-white/30 tracking-[0.4em] uppercase">
                        © 2024 UNIMANUEL VENTURES. VOLTIC COOL PAC LICENSED PRODUCER.
                    </p>
                </div>
            </footer>

            {/* Order Now Modal */}
            {isOrderModalOpen && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300"
                        onClick={() => setIsOrderModalOpen(false)}
                    />
                    <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.4)] relative z-10 overflow-hidden animate-in zoom-in duration-300">
                        {/* Header */}
                        <div className="bg-[#003366] p-8 text-white relative">
                            <div className="flex items-center space-x-4">
                                <div className="w-14 h-14 bg-[#0081cc] rounded-2xl flex items-center justify-center border-2 border-white/20">
                                    <ShoppingBag size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black uppercase tracking-widest">Place Your Order</h3>
                                    <p className="text-blue-200 text-xs font-bold uppercase tracking-tighter mt-1 opacity-80">Voltic Cool Pac • Pure Water</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOrderModalOpen(false)}
                                className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-8 space-y-8">
                            <div className="space-y-4">
                                <h4 className="text-[#003366] font-black text-sm uppercase tracking-widest border-l-4 border-[#0081cc] pl-4">Our Core Product</h4>
                                <div className="grid grid-cols-1">
                                    <div className="bg-slate-50 p-6 rounded-2xl border-2 border-[#0081cc]/20 flex flex-col items-center text-center space-y-3 group hover:border-[#0081cc] transition-colors">
                                        <div className="w-14 h-14 bg-white shadow-md rounded-2xl flex items-center justify-center text-[#0081cc]">
                                            <Package size={24} />
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500">Pure Sachet Water (500ml)</span>
                                            <h5 className="text-sm font-black text-[#003366] uppercase">Voltic Cool Pac</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h4 className="text-[#003366] font-black text-sm uppercase tracking-widest border-l-4 border-[#ff8c00] pl-4">Order Details</h4>

                                <div className="space-y-5">
                                    {/* Quantity Selection */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Quantity (Bags)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={orderQuantity}
                                                onChange={(e) => setOrderQuantity(e.target.value)}
                                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 font-black text-[#003366] focus:border-[#0081cc] focus:outline-none transition-all"
                                                placeholder="Enter quantity"
                                            />
                                            <Package className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                                        </div>
                                    </div>

                                    {/* Delivery Method Toggle */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">How do you want it?</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={() => setDeliveryMethod('delivery')}
                                                className={`p-4 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest transition-all ${deliveryMethod === 'delivery' ? 'bg-[#0081cc] border-[#0081cc] text-white shadow-lg' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}
                                            >
                                                <div className="flex flex-col items-center space-y-2">
                                                    <Truck size={20} />
                                                    <span>Delivery</span>
                                                </div>
                                            </button>
                                            <button
                                                onClick={() => setDeliveryMethod('pickup')}
                                                className={`p-4 rounded-2xl border-2 font-black text-[10px] uppercase tracking-widest transition-all ${deliveryMethod === 'pickup' ? 'bg-[#003366] border-[#003366] text-white shadow-lg' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'}`}
                                            >
                                                <div className="flex flex-col items-center space-y-2">
                                                    <ShoppingBag size={20} />
                                                    <span>Self-Pickup</span>
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-4 space-y-3">
                                        <button
                                            onClick={handleWhatsAppOrder}
                                            className="flex items-center justify-center space-x-3 w-full bg-[#25D366] hover:bg-green-600 text-white p-5 rounded-2xl transition-all shadow-xl hover:-translate-y-1 active:scale-95 group font-black uppercase text-xs tracking-widest"
                                        >
                                            <MessageCircle size={20} />
                                            <span>Send Order to WhatsApp</span>
                                        </button>

                                        <div className="relative flex items-center justify-center py-2">
                                            <div className="absolute inset-0 flex items-center">
                                                <div className="w-full border-t border-slate-100"></div>
                                            </div>
                                            <span className="relative bg-white px-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">OR CALL DIRECTLY</span>
                                        </div>

                                        <a
                                            href="tel:0244925320"
                                            className="flex items-center justify-center space-x-3 w-full bg-[#003366] hover:bg-[#001f3f] text-white p-5 rounded-2xl transition-all shadow-lg hover:-translate-y-1 active:scale-95 font-black uppercase text-xs tracking-widest"
                                        >
                                            <PhoneCall size={18} />
                                            <span>Call 0244925320</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Decoration */}
                        <div className="p-6 bg-slate-50 text-center border-t border-slate-100">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Quality Distribution You Can Trust</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Chatbot Interface */}
            <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-500 transform ${showChatbot ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                <div className="flex flex-col items-end space-y-3">
                    {/* Chat Window */}
                    <div className={`bg-white w-[320px] sm:w-[380px] h-[500px] rounded-[2.5rem] shadow-[0_25px_70px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden flex flex-col transition-all duration-500 origin-bottom-right ${isChatOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
                        {/* Chat Header */}
                        <div className="bg-[#003366] p-6 text-white relative">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-[#0081cc] rounded-2xl flex items-center justify-center border-2 border-white/20">
                                    <Bot size={24} className="text-white" />
                                </div>
                                <div>
                                    <h4 className="font-black text-sm uppercase tracking-widest">UniEmmanuel AI</h4>
                                    <p className="text-[10px] font-bold text-blue-300 uppercase tracking-tighter">Assistant • 24/7 Support</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsChatOpen(false)}
                                className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center mt-1">
                                    <Bot size={14} className="text-[#003366]" />
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100 max-w-[80%]">
                                    <p className="text-xs font-bold text-slate-700 leading-relaxed">
                                        Hello! Welcome to UniEmmanuel. I'm your virtual assistant. How can I help you regarding our water services today?
                                    </p>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <div className="bg-[#0081cc] p-4 rounded-2xl rounded-tr-none text-white max-w-[80%] shadow-lg shadow-blue-500/20">
                                    <p className="text-xs font-bold leading-relaxed">
                                        I'd like to order Voltic Cool Pac.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center mt-1">
                                    <Bot size={14} className="text-[#003366]" />
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl rounded-tl-none border border-slate-100 max-w-[80%]">
                                    <p className="text-xs font-bold text-slate-700 leading-relaxed">
                                        Of course! You can tap the "ORDER NOW" button in the hero section, or I can connect you to our sales team right here. Which would you prefer?
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Chat Input */}
                        <div className="p-4 border-t border-slate-50 bg-slate-50/50">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    className="w-full bg-white border border-slate-100 rounded-2xl px-5 py-4 pr-14 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#0081cc]/20 focus:border-[#0081cc] transition-all"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0081cc] text-white rounded-xl flex items-center justify-center hover:bg-[#003366] transition-colors">
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Chat Bubble & Label */}
                    {!isChatOpen && (
                        <div className="bg-white px-5 py-3 rounded-2xl shadow-2xl border border-blue-50 relative animate-in fade-in slide-in-from-bottom duration-500">
                            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-blue-50 rotate-45"></div>
                            <p className="text-[10px] font-black text-[#003366] uppercase tracking-[0.1em] flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                                Talk to UniEmmanuel
                            </p>
                        </div>
                    )}
                    <button
                        onClick={() => setIsChatOpen(!isChatOpen)}
                        className={`w-16 h-16 rounded-[2rem] shadow-[0_20px_50px_rgba(0,129,204,0.3)] flex items-center justify-center transition-all duration-500 hover:scale-110 hover:-rotate-6 group relative border-4 border-white overflow-hidden ${isChatOpen ? 'bg-white text-[#003366]' : 'bg-[#0081cc] text-white'}`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-transparent opacity-0 group-hover:opacity-20 transition-opacity"></div>
                        {isChatOpen ? (
                            <X size={28} />
                        ) : (
                            <>
                                <MessageSquare size={28} className="group-hover:hidden transition-all" />
                                <Bot size={28} className="hidden group-hover:block animate-bounce" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
