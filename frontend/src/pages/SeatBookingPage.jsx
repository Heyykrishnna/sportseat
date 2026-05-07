import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, Calendar, MapPin, CheckCircle2, Download, Home, Share2, Ticket, User, CreditCard } from "lucide-react";
import { QRCodeSVG } from 'qrcode.react';
import { getEventBySlug } from '../data/events';

const SeatBookingPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  useEffect(() => {
    const eventData = getEventBySlug(slug);
    if (eventData) {
      setEvent(eventData);
    }
  }, [slug]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FD]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4AB4FF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-bold">Loading Event Details...</p>
        </div>
      </div>
    );
  }

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  const parsePrice = (priceStr) => {
    return parseInt(priceStr.replace(/[^\d]/g, ''));
  };

  const basePrice = event ? parsePrice(event.price) : 0;
  const premiumPrice = event ? parsePrice(event.pricePremium) : 0;
  const midPrice = Math.round((basePrice + premiumPrice) / 2);

  const sections = [
    { name: 'Platinum', price: premiumPrice, rows: ['A', 'B'], color: '#FF4A4A' },
    { name: 'Gold', price: midPrice, rows: ['C', 'D', 'E'], color: '#FFAD4A' },
    { name: 'Silver', price: basePrice, rows: ['F', 'G', 'H', 'I', 'J'], color: '#4AB4FF' }
  ];

  const seatsPerRow = 14;
  const occupiedSeats = ['A-5', 'A-6', 'C-2', 'C-3', 'F-8', 'F-9', 'J-1', 'J-2', 'B-10', 'B-11', 'H-4'];

  const getSeatPrice = (row) => {
    const section = sections.find(s => s.rows.includes(row));
    return section ? section.price : 0;
  };

  const getTotalPrice = () => {
    return selectedSeats.reduce((total, seatId) => {
      const [row] = seatId.split('-');
      return total + getSeatPrice(row);
    }, 0);
  };

  const formatSeatId = (id) => {
    const [row, num] = id.split('-');
    return `${row}${num}`;
  };

  const toggleSeat = (row, num) => {
    const seatId = `${row}-${num}`;
    if (occupiedSeats.includes(seatId)) return;
    
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(s => s !== seatId) 
        : [...prev, seatId]
    );
  };

  if (isSuccess) {
    const totalPaid = Math.round(getTotalPrice() * 1.13).toLocaleString();
    const orderId = `SPT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    return (
      <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center p-4 md:p-8 overflow-hidden relative font-sans">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100/30 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100/30 rounded-full blur-[120px] animate-pulse"></div>
        
        <div className="max-w-4xl w-full relative z-10 pt-20">
          <div className="text-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3 tracking-tight">Booking Confirmed!</h1>
            <p className="text-gray-500 font-medium text-lg">Your seats are reserved. Get ready for the game!</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-stretch animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            <div className="flex-1 bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden flex flex-col">
              <div className="p-8 md:p-10 flex-1">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Event</p>
                    <h2 className="text-2xl font-black text-gray-900 leading-tight">{event.title}</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Order ID</p>
                    <p className="text-sm font-black text-gray-900">{orderId}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <p className="text-[10px] font-black uppercase tracking-widest">Date & Time</p>
                    </div>
                    <p className="font-bold text-gray-900">{event.date}</p>
                    <p className="text-sm text-gray-500 font-medium">{event.time}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-3.5 h-3.5" />
                      <p className="text-[10px] font-black uppercase tracking-widest">Venue</p>
                    </div>
                    <p className="font-bold text-gray-900">{event.venue}</p>
                    <p className="text-sm text-gray-500 font-medium">Gate 4, Sector B</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Ticket className="w-3.5 h-3.5" />
                      <p className="text-[10px] font-black uppercase tracking-widest">Seats</p>
                    </div>
                    <p className="font-bold text-gray-900">{selectedSeats.map(s => s.replace('-', '')).join(', ')}</p>
                    <p className="text-sm text-gray-500 font-medium">{selectedSeats.length} Tickets</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-400">
                      <CreditCard className="w-3.5 h-3.5" />
                      <p className="text-[10px] font-black uppercase tracking-widest">Amount Paid</p>
                    </div>
                    <p className="font-bold text-gray-900 text-xl">₹{totalPaid}</p>
                    <p className="text-xs text-emerald-500 font-bold">Payment Successful</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-gray-100">
                      <Info className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">Important Note</p>
                      <p className="text-[11px] text-gray-500 font-medium leading-relaxed">
                        Please arrive 30 minutes before the start time. Carry a valid photo ID for verification at the entrance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative h-6 flex items-center justify-center">
                <div className="absolute left-[-12px] w-6 h-6 bg-[#F8F9FD] rounded-full border-r border-gray-100"></div>
                <div className="w-full border-t-2 border-dashed border-gray-100 mx-6"></div>
                <div className="absolute right-[-12px] w-6 h-6 bg-[#F8F9FD] rounded-full border-l border-gray-100"></div>
              </div>

              <div className="p-8 md:p-10 bg-gray-50/50 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#1A1C1E] rounded-xl flex items-center justify-center text-white">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer</p>
                    <p className="text-sm font-bold text-gray-900">Piyush Yadav</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-2xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all active:scale-95">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-3 rounded-2xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all active:scale-95">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:w-[320px] bg-[#1A1C1E] rounded-[40px] p-8 text-white flex flex-col items-center justify-center relative overflow-hidden shadow-2xl shadow-gray-300">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-emerald-500 to-blue-500"></div>
              
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-10">Entry Pass</p>
              
              <div className="w-full aspect-square bg-white rounded-[32px] p-6 mb-8 relative group flex items-center justify-center">
                <QRCodeSVG
                  value={JSON.stringify({
                    orderId,
                    event: event.title,
                    venue: event.venue,
                    date: event.date,
                    time: event.time,
                    seats: selectedSeats.map(s => s.replace('-', '')),
                    customer: 'Piyush Yadav'
                  })}
                  size={200}
                  level="H"
                  includeMargin={false}
                  imageSettings={{
                    src: "/favicon.ico",
                    x: undefined,
                    y: undefined,
                    height: 40,
                    width: 40,
                    excavate: true,
                  }}
                />
              </div>

              <div className="text-center space-y-2 mb-10">
                <p className="text-xs font-black uppercase tracking-widest text-emerald-400">Scan for Entry</p>
                <p className="text-[10px] text-white/50 font-medium">Valid for one-time entry only</p>
              </div>

              <button 
                onClick={() => navigate('/events')}
                className="w-full bg-white/10 hover:bg-white/20 text-white py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 border border-white/10"
              >
                <Home className="w-4 h-4" />
                Go to Events
              </button>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-400 text-xs font-medium">
              Need help? <span className="text-gray-900 font-black cursor-pointer hover:underline">Contact Support</span> or call +91 1800-SPORT-SEAT
            </p>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-[#F8F9FD] font-sans text-[#1A1C1E]">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate(-1)}
              className="p-2.5 hover:bg-gray-50 rounded-xl border border-gray-100 transition-all group"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                  <h1 className="text-xl font-black tracking-tight text-gray-900">{event.title}</h1>
              </div>
              <p className="text-xs text-gray-500 font-medium flex items-center gap-3">
                <span className="flex items-center gap-1 group cursor-pointer hover:text-[#4AB4FF] transition-colors"><MapPin className="w-3 h-3" /> {event.venue}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="flex items-center gap-1 group cursor-pointer hover:text-[#4AB4FF] transition-colors"><Calendar className="w-3 h-3" /> {event.date}, {event.time}</span>
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 bg-gray-50/50 px-6 py-2.5 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded-md bg-white border-2 border-gray-200"></div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Available</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded-md bg-[#4AB4FF] shadow-[0_0_8px_rgba(74,180,255,0.4)]"></div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Selected</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded-md bg-gray-200"></div>
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Sold</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row gap-10">
        <div className="flex-1 space-y-8 min-w-0">
          <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 p-6 md:p-10 relative overflow-hidden">
            <div className="mb-16 relative flex flex-col items-center">
              <div className="relative w-full max-w-xl py-4 border-x-2 border-t-2 border-emerald-500/10 rounded-t-[40px] flex items-center justify-center bg-emerald-50/30 overflow-hidden">
                <div className="text-[10px] font-black text-emerald-600/60 uppercase tracking-[0.3em] z-10">Primary Field View</div>
              </div>
            </div>

            <div className="overflow-x-auto pb-6 scrollbar-hide">
              <div className="flex flex-col items-center gap-6 min-w-[600px]">
                {sections.map((section) => (
                  <div key={section.name} className="w-full space-y-4">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-px flex-1 bg-gray-100"></div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{section.name} Section • ₹{section.price.toLocaleString()}</span>
                      <div className="h-px flex-1 bg-gray-100"></div>
                    </div>
                    
                    <div className="space-y-3">
                      {section.rows.map(row => (
                        <div key={row} className="flex items-center justify-center gap-4">
                          <span className="w-5 text-[10px] font-black text-gray-300 text-right">{row}</span>
                          <div className="flex items-center gap-2.5">
                            {Array.from({ length: seatsPerRow }).map((_, i) => {
                              const num = i + 1;
                              const seatId = `${row}-${num}`;
                              const isOccupied = occupiedSeats.includes(seatId);
                              const isSelected = selectedSeats.includes(seatId);
                              const marginClass = num === 7 ? 'mr-10' : '';

                              return (
                                <button
                                  key={seatId}
                                  onClick={() => toggleSeat(row, num)}
                                  disabled={isOccupied}
                                  className={`
                                    w-7 h-7 rounded-lg text-[9px] font-black transition-all duration-300
                                    flex items-center justify-center relative group
                                    ${marginClass}
                                    ${isOccupied 
                                      ? 'bg-gray-100 text-gray-300 cursor-not-allowed border border-transparent' 
                                      : isSelected 
                                        ? 'bg-[#1A1C1E] text-white shadow-xl shadow-gray-200 scale-110 z-10' 
                                        : 'bg-white border-2 border-gray-100 text-gray-400 hover:border-[#4AB4FF] hover:text-[#4AB4FF] hover:scale-105'
                                    }
                                  `}
                                  style={isSelected ? { backgroundColor: section.color } : {}}
                                >
                                  {num}
                                  {isSelected && (
                                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center">
                                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                          <span className="w-5 text-[10px] font-black text-gray-300 text-left">{row}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-gray-50 flex flex-wrap justify-center gap-8 md:hidden">
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100/50 flex items-start gap-4">
              <div>
                <h4 className="text-xs font-bold text-emerald-900 mb-1">Secure Booking</h4>
                <p className="text-[10px] text-emerald-700/70 leading-relaxed">Your data is protected by 256-bit SSL encryption.</p>
              </div>
            </div>
            <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100/50 flex items-start gap-4">
              <div>
                <h4 className="text-xs font-bold text-blue-900 mb-1">Digital Entry</h4>
                <p className="text-[10px] text-blue-700/70 leading-relaxed">No need to print. Show QR at the gate.</p>
              </div>
            </div>
            <div className="bg-orange-50/50 p-6 rounded-3xl border border-orange-100/50 flex items-start gap-4">
              <div>
                <h4 className="text-xs font-bold text-orange-900 mb-1">Instant Refund</h4>
                <p className="text-[10px] text-orange-700/70 leading-relaxed">100% refund if event is cancelled.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[420px] shrink-0">
          <div className="bg-white rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 overflow-hidden sticky top-32">
            <div className="bg-[#1A1C1E] p-8 text-white relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
              <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2">Order Review</p>
                <h2 className="text-2xl font-black tracking-tight">Final Summary</h2>
              </div>
            </div>

            <div className="p-8 relative">
              <div className="absolute -top-3 left-0 right-0 flex justify-between px-[-10px] overflow-hidden pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="w-6 h-6 bg-[#F8F9FD] rounded-full mt-[-12px]"></div>
                ))}
              </div>

              {selectedSeats.length > 0 ? (
                <div className="space-y-8 mt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider">Seats Selection</span>
                      <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">{selectedSeats.length} Reserved</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedSeats.map(id => (
                        <div key={id} className="group relative">
                          <span className="flex items-center justify-center w-12 h-10 rounded-xl bg-gray-50 border border-gray-100 text-xs font-black text-gray-700 group-hover:bg-[#1A1C1E] group-hover:text-white transition-all cursor-default">
                            {formatSeatId(id)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50/50 rounded-[24px] p-6 space-y-4 border border-gray-100">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-medium">Tickets Subtotal</span>
                      <span className="font-bold text-gray-900">₹{getTotalPrice().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-1.5 group cursor-help">
                        <span className="text-gray-500 font-medium">Convenience Fee</span>
                        <Info className="w-3.5 h-3.5 text-gray-300" />
                      </div>
                      <span className="font-bold text-gray-900">₹{Math.round(getTotalPrice() * 0.08).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-medium">Service Tax (GST)</span>
                      <span className="font-bold text-gray-900">₹{Math.round(getTotalPrice() * 0.05).toLocaleString()}</span>
                    </div>
                    
                    <div className="pt-4 mt-2 border-t border-dashed border-gray-200">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Payable</p>
                          <p className="text-3xl font-black text-gray-900 tracking-tight">₹{Math.round(getTotalPrice() * 1.13).toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-gray-400 font-medium italic">Incl. all taxes</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button 
                      onClick={handlePayment}
                      disabled={isProcessing}
                      className="w-full bg-[#1A1C1E] text-white py-5 rounded-2xl font-black text-sm tracking-wide shadow-xl shadow-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          Confirm & Pay
                          <div className="w-5 h-5 bg-white/10 rounded-lg flex items-center justify-center group-hover:translate-x-1 transition-transform">
                            <ChevronLeft className="w-3 h-3 rotate-180" />
                          </div>
                        </>
                      )}
                    </button>
                    <p className="text-[10px] text-center text-gray-400 px-6 leading-relaxed">
                      By proceeding, you agree to our <span className="text-gray-900 font-bold underline underline-offset-4 cursor-pointer">Terms of Service</span> and <span className="text-gray-900 font-bold underline underline-offset-4 cursor-pointer">Refund Policy</span>.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                  <h3 className="text-base font-bold text-gray-900 mb-2">No Seats Selected</h3>
                  <p className="text-xs text-gray-400 max-w-[200px] mx-auto leading-relaxed">
                    Please select your preferred seats from the layout to proceed with booking.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SeatBookingPage;

