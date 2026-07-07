import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { MapPin, Calendar, CreditCard, Clock, CheckCircle, Plane, Hotel, Train, Bus, Briefcase, X, FileText, AlertTriangle, XCircle, Download, ArrowRightLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";

export default function MyTrips() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [filterType, setFilterType] = useState("upcoming"); // upcoming, completed, cancelled
  
  // Modal State
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalType, setModalType] = useState(null); // 'details' or 'manage'
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    let allBookings = JSON.parse(localStorage.getItem("travel_test_lab_bookings") || "[]");
    
    // Seed mock bookings ONLY for shweta@tester.com if she doesn't have the rich data yet
    const userBookingsCount = allBookings.filter(b => b.userId === currentUser.id).length;
    if (currentUser.email === "shweta@tester.com" && userBookingsCount <= 10) {
      const now = new Date();
      const past = new Date(now.getTime() - 7 * 86400000).toISOString(); 
      const farPast = new Date(now.getTime() - 45 * 86400000).toISOString(); 
      const future = new Date(now.getTime() + 14 * 86400000).toISOString(); 
      const farFuture = new Date(now.getTime() + 60 * 86400000).toISOString();
      
      const mockBookings = [
        // Hotels
        { id: `b_${Date.now()}_1`, userId: currentUser.id, bookingType: 'hotel', details: { type: 'hotel', name: 'Taj Mahal Palace' }, packageTitle: 'Taj Mahal Palace', date: future, amount: 25000, status: 'upcoming' },
        { id: `b_${Date.now()}_2`, userId: currentUser.id, bookingType: 'hotel', details: { type: 'hotel', name: 'Goa Beach Resort' }, packageTitle: 'Goa Beach Resort', date: past, amount: 15000, status: 'completed' },
        { id: `b_${Date.now()}_3`, userId: currentUser.id, bookingType: 'hotel', details: { type: 'hotel', name: 'JW Marriott Pune' }, packageTitle: 'JW Marriott Pune', date: farPast, amount: 18000, status: 'completed' },
        
        // Flights
        { id: `b_${Date.now()}_4`, userId: currentUser.id, bookingType: 'flight', details: { type: 'flight', origin: 'BOM', destination: 'DEL' }, packageTitle: 'Flight: BOM to DEL', date: future, amount: 5400, status: 'upcoming' },
        { id: `b_${Date.now()}_5`, userId: currentUser.id, bookingType: 'flight', details: { type: 'flight', origin: 'PNQ', destination: 'GOI' }, packageTitle: 'Flight: PNQ to GOI', date: past, amount: 3200, status: 'completed' },
        { id: `b_${Date.now()}_6`, userId: currentUser.id, bookingType: 'flight', details: { type: 'flight', origin: 'BLR', destination: 'CCU' }, packageTitle: 'Flight: BLR to CCU', date: farFuture, amount: 6100, status: 'upcoming' },
        { id: `b_${Date.now()}_7`, userId: currentUser.id, bookingType: 'flight', details: { type: 'flight', origin: 'DEL', destination: 'BOM' }, packageTitle: 'Flight: DEL to BOM', date: farPast, amount: 4800, status: 'completed' },

        // Trains
        { id: `b_${Date.now()}_8`, userId: currentUser.id, bookingType: 'train', details: { type: 'train', name: 'Rajdhani Express' }, packageTitle: 'Train: Rajdhani Express', date: future, amount: 2800, status: 'upcoming' },
        { id: `b_${Date.now()}_9`, userId: currentUser.id, bookingType: 'train', details: { type: 'train', name: 'Shatabdi Express' }, packageTitle: 'Train: Shatabdi Express', date: past, amount: 1500, status: 'completed' },
        
        // Buses
        { id: `b_${Date.now()}_10`, userId: currentUser.id, bookingType: 'bus', details: { type: 'bus', name: 'Volvo AC Sleeper' }, packageTitle: 'Bus: Volvo AC Sleeper', date: past, amount: 1200, status: 'completed' },
        { id: `b_${Date.now()}_11`, userId: currentUser.id, bookingType: 'bus', details: { type: 'bus', name: 'Neeta Travels AC' }, packageTitle: 'Bus: Neeta Travels', date: farPast, amount: 900, status: 'cancelled' },
        { id: `b_${Date.now()}_12`, userId: currentUser.id, bookingType: 'bus', details: { type: 'bus', name: 'Orange Travels Semi-Sleeper' }, packageTitle: 'Bus: Orange Travels', date: farFuture, amount: 1400, status: 'upcoming' },

        // Packages
        { id: `b_${Date.now()}_13`, userId: currentUser.id, bookingType: 'holiday_package', packageTitle: 'Majestic Kerala Tour', date: future, amount: 45000, status: 'upcoming' },
        { id: `b_${Date.now()}_14`, userId: currentUser.id, bookingType: 'holiday_package', packageTitle: 'Dubai City Escape', date: farFuture, amount: 85000, status: 'upcoming' },
        { id: `b_${Date.now()}_15`, userId: currentUser.id, bookingType: 'holiday_package', packageTitle: 'Golden Triangle India', date: farPast, amount: 35000, status: 'completed' }
      ];
      
      // Remove the sparse default bookings and inject the rich ones
      allBookings = [...allBookings.filter(b => b.userId !== currentUser.id), ...mockBookings];
      localStorage.setItem("travel_test_lab_bookings", JSON.stringify(allBookings));
    }

    const userBookings = allBookings.filter(b => b.userId === currentUser.id);
    
    // Automatically determine status based on date if not present
    const processedBookings = userBookings.map(b => {
      const bDate = new Date(b.date || b.travelDate);
      const isPast = bDate < new Date();
      // If status is explicitly cancelled, keep it. Otherwise compute based on date.
      let computed = b.status;
      if (!computed || computed !== 'cancelled') {
        computed = isPast ? 'completed' : 'upcoming';
      }
      return { ...b, computedStatus: computed };
    });

    setBookings(processedBookings);
  }, [currentUser]);

  const filteredBookings = bookings.filter(b => {
    // Type Filter
    const typeMatch = activeTab === 'all' || b.bookingType === activeTab || (activeTab === 'package' && b.bookingType === 'holiday_package') || (activeTab === 'flight' && b.details?.type === 'flight') || (activeTab === 'hotel' && b.details?.type === 'hotel');
    
    // Status Filter
    const statusMatch = b.computedStatus === filterType;

    return typeMatch && statusMatch;
  }).sort((a, b) => {
    // Sort logic (if upcoming, nearest first; if completed/cancelled, most recent first)
    const dateA = new Date(a.date || a.travelDate).getTime();
    const dateB = new Date(b.date || b.travelDate).getTime();
    if (filterType === 'upcoming') return dateA - dateB;
    return dateB - dateA;
  });

  const handleCancelBooking = () => {
    const bookingIdToCancel = selectedBooking.bookingId || selectedBooking.id;
    
    // Update in Local Storage
    let allBookings = JSON.parse(localStorage.getItem("travel_test_lab_bookings") || "[]");
    const updatedBookings = allBookings.map(b => {
      if ((b.bookingId || b.id) === bookingIdToCancel) {
        return { ...b, status: 'cancelled' };
      }
      return b;
    });
    localStorage.setItem("travel_test_lab_bookings", JSON.stringify(updatedBookings));

    // Update in State
    setBookings(prevBookings => prevBookings.map(b => {
      if ((b.bookingId || b.id) === bookingIdToCancel) {
        return { ...b, status: 'cancelled', computedStatus: 'cancelled' };
      }
      return b;
    }));

    toast({
      title: "Booking Cancelled",
      description: `Your booking for ${selectedBooking.packageTitle || selectedBooking.details?.name || 'this trip'} has been successfully cancelled.`,
      variant: "destructive",
    });
    setSelectedBooking(null);
  };

  const handleRescheduleBooking = () => {
    toast({
      title: "Redirecting...",
      description: `Taking you to the modification page for ${selectedBooking.bookingId || selectedBooking.id}.`,
    });
    setSelectedBooking(null);
  };

  const handleDownloadInvoice = async () => {
    const bookingId = selectedBooking.bookingId || selectedBooking.id;
    const element = document.getElementById(`booking-card-${bookingId}`);
    
    if (element) {
      setIsDownloading(true);
      try {
        const canvas = await html2canvas(element, {
          backgroundColor: '#ffffff', // Force white background for visibility
          scale: 2, // High resolution
        });
        
        const image = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = image;
        link.download = `Booking_${bookingId}.png`;
        link.click();
        
        toast({
          title: "Download Complete!",
          description: "Your booking details have been saved as an image.",
        });
      } catch (error) {
        toast({
          title: "Download Failed",
          description: "Could not capture the booking image.",
          variant: "destructive",
        });
      }
      setIsDownloading(false);
    }
  };

  const tabs = [
    { id: 'all', label: 'All Bookings', icon: Briefcase },
    { id: 'hotel', label: 'Hotels', icon: Hotel },
    { id: 'flight', label: 'Flights', icon: Plane },
    { id: 'train', label: 'Trains', icon: Train },
    { id: 'bus', label: 'Buses', icon: Bus },
    { id: 'package', label: 'Packages', icon: MapPin },
  ];

  return (
    <div className="container mx-auto py-12 px-4 max-w-6xl min-h-[80vh] relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-foreground mb-2">My Bookings</h1>
          <p className="text-muted-foreground font-medium">Manage all your travel plans in one place.</p>
        </div>
        
        {/* Status Filters (Upcoming / Completed / Cancelled) */}
        <div className="flex bg-muted p-1 rounded-xl shadow-inner">
          <button 
            onClick={() => setFilterType('upcoming')}
            className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-bold transition-all ${filterType === 'upcoming' ? 'bg-primary text-primary-foreground shadow-md' : 'text-foreground/70 hover:text-foreground'}`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setFilterType('completed')}
            className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-bold transition-all ${filterType === 'completed' ? 'bg-white text-foreground shadow-md' : 'text-foreground/70 hover:text-foreground'}`}
          >
            Completed
          </button>
          <button 
            onClick={() => setFilterType('cancelled')}
            className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-bold transition-all ${filterType === 'cancelled' ? 'bg-destructive text-destructive-foreground shadow-md' : 'text-foreground/70 hover:text-foreground'}`}
          >
            Cancelled
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 pb-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${isActive ? 'bg-primary/10 border-primary text-primary shadow-sm' : 'glass border-transparent text-foreground/70 hover:bg-muted'}`}
            >
              <Icon size={18} /> {tab.label}
            </button>
          );
        })}
      </div>
      
      {filteredBookings.length === 0 ? (
        <div className="text-center py-24 glass rounded-3xl border border-white/20 shadow-soft">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <Briefcase size={40} className="text-muted-foreground opacity-50" />
          </div>
          <p className="text-2xl font-black mb-2 text-foreground">No {filterType} bookings found</p>
          <p className="text-muted-foreground font-medium mb-8 max-w-md mx-auto">
            You don't have any {filterType} bookings in this category. Time to plan your next adventure!
          </p>
          <Link to="/home" className="inline-flex bg-primary text-primary-foreground font-bold px-8 py-3 rounded-full hover:bg-primary/90 transition-all shadow-md hover-lift">
            Start Exploring
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBookings.map(booking => {
            const bId = booking.bookingId || booking.id;
            const bTitle = booking.packageTitle || booking.details?.name || `${booking.details?.origin} to ${booking.details?.destination}`;
            const bDate = new Date(booking.date || booking.travelDate).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' });
            const bAmount = booking.amount || booking.totalAmount;
            
            return (
              <div id={`booking-card-${bId}`} key={bId} className="glass bg-white dark:bg-card rounded-3xl border border-border shadow-soft hover-lift overflow-hidden flex flex-col md:flex-row relative">
                
                {/* Cancelled overlay strike-through effect */}
                {filterType === 'cancelled' && (
                  <div className="absolute inset-0 bg-red-500/5 backdrop-blur-[1px] z-10 pointer-events-none flex items-center justify-center">
                    <div className="border-4 border-red-500/20 text-red-500/30 font-black text-4xl uppercase tracking-widest p-4 rounded-xl rotate-12">
                      Cancelled
                    </div>
                  </div>
                )}

                <div className="md:w-1/3 bg-gradient-to-br from-primary/5 to-secondary/5 p-6 border-b md:border-b-0 md:border-r border-border/50 flex flex-col justify-center items-center text-center">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
                    filterType === 'upcoming' ? 'bg-primary/20 text-primary' : 
                    filterType === 'completed' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {filterType === 'upcoming' ? <Clock size={28} /> : 
                     filterType === 'completed' ? <CheckCircle size={28} /> : <XCircle size={28} />}
                  </div>
                  <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${
                    filterType === 'upcoming' ? 'text-primary' : 
                    filterType === 'completed' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {filterType}
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mt-2">Booking ID</div>
                  <div className="font-bold text-sm bg-background/50 px-3 py-1 rounded-md mt-1">{bId.substring(0, 10).toUpperCase()}</div>
                </div>
                
                <div className="p-6 md:w-2/3 flex flex-col justify-between z-20">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-black uppercase tracking-wider text-secondary bg-secondary/10 px-2 py-1 rounded-md">
                        {booking.bookingType.replace('_', ' ')}
                      </span>
                    </div>
                    <h3 className="text-xl font-black mb-4 text-foreground line-clamp-2">{bTitle}</h3>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-sm font-medium text-muted-foreground">
                        <Calendar size={16} className="mr-3 text-primary" />
                        {bDate}
                      </div>
                      <div className="flex items-center text-sm font-medium text-muted-foreground">
                        <CreditCard size={16} className="mr-3 text-primary" />
                        ₹{bAmount?.toLocaleString()} Paid
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 mt-auto">
                    <button 
                      onClick={() => { setSelectedBooking(booking); setModalType('details'); }}
                      className="px-4 py-2 bg-muted text-foreground font-bold rounded-lg hover:bg-muted/80 transition-all text-sm"
                    >
                      View Details
                    </button>
                    {filterType === 'upcoming' && (
                      <button 
                        onClick={() => { setSelectedBooking(booking); setModalType('manage'); }}
                        className="px-4 py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-all text-sm border border-primary/20"
                      >
                        Manage
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Overlay */}
      {selectedBooking && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-background rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-border">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-border flex justify-between items-center bg-muted/30">
              <h2 className="text-2xl font-black text-foreground">
                {modalType === 'details' ? 'Booking Details' : 'Manage Booking'}
              </h2>
              <button 
                onClick={() => setSelectedBooking(null)}
                className="p-2 bg-muted rounded-full hover:bg-muted/80 transition-all text-foreground/50 hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              {/* Dynamic Title Context */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full text-primary mb-4">
                  {modalType === 'details' ? <FileText size={32} /> : <AlertTriangle size={32} />}
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {selectedBooking.packageTitle || selectedBooking.details?.name || `${selectedBooking.details?.origin} to ${selectedBooking.details?.destination}`}
                </h3>
                <p className="text-muted-foreground font-semibold uppercase tracking-wider text-sm mt-1">
                  ID: {selectedBooking.bookingId || selectedBooking.id}
                </p>
              </div>

              {modalType === 'details' ? (
                <div className="space-y-4">
                  <div className="flex justify-between p-4 bg-muted/50 rounded-xl border border-border/50">
                    <span className="text-muted-foreground font-medium flex items-center gap-2"><CheckCircle size={16} className={selectedBooking.computedStatus === 'cancelled' ? 'text-red-500' : 'text-green-500'} /> Status</span>
                    <span className={`font-black uppercase tracking-wider text-sm ${selectedBooking.computedStatus === 'cancelled' ? 'text-red-500' : 'text-green-600'}`}>
                      {selectedBooking.computedStatus === 'cancelled' ? 'Cancelled' : 'Confirmed'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-xl border border-border/50">
                      <span className="text-muted-foreground font-medium text-sm flex items-center gap-1.5 mb-1"><Calendar size={14} /> Date</span>
                      <span className="font-bold text-foreground">
                        {new Date(selectedBooking.date || selectedBooking.travelDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-xl border border-border/50">
                      <span className="text-muted-foreground font-medium text-sm flex items-center gap-1.5 mb-1"><CreditCard size={14} /> Total Amount</span>
                      <span className="font-bold text-foreground text-lg text-primary">₹{(selectedBooking.amount || selectedBooking.totalAmount)?.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Dynamic Extra Details Based on Booking Type */}
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-3">Booking Particulars</h4>
                    
                    <div className="flex justify-between items-center pb-2 border-b border-border/50">
                      <span className="text-muted-foreground text-sm font-medium">Primary Traveler</span>
                      <span className="font-bold text-foreground text-sm">{currentUser.name}</span>
                    </div>

                    {(selectedBooking.bookingType === 'flight' || selectedBooking.details?.type === 'flight') && (
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-muted-foreground text-sm font-medium">Route</span>
                        <div className="flex items-center gap-2 font-bold text-sm">
                          {selectedBooking.details?.origin} <Plane size={14} className="text-primary"/> {selectedBooking.details?.destination}
                        </div>
                      </div>
                    )}

                    {(selectedBooking.bookingType === 'train' || selectedBooking.bookingType === 'bus' || selectedBooking.bookingType === 'cab') && selectedBooking.details?.origin && (
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-muted-foreground text-sm font-medium">Route</span>
                        <div className="flex items-center gap-2 font-bold text-sm">
                          {selectedBooking.details?.origin} <ArrowRightLeft size={14} className="text-primary"/> {selectedBooking.details?.destination}
                        </div>
                      </div>
                    )}

                    {selectedBooking.details?.name && (
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-muted-foreground text-sm font-medium">Provider / Name</span>
                        <span className="font-bold text-sm">{selectedBooking.details?.name}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-1">
                      <span className="text-muted-foreground text-sm font-medium">Payment Status</span>
                      <span className="font-bold text-green-600 text-sm">Paid in Full</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleDownloadInvoice}
                    disabled={isDownloading}
                    className="w-full mt-6 bg-primary text-primary-foreground font-bold p-4 rounded-xl hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 hover-lift"
                  >
                    {isDownloading ? (
                      "Capturing Image..."
                    ) : (
                      <>
                        <Download size={20} />
                        Download Booking Card Image
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-secondary/10 border border-secondary/30 rounded-xl text-secondary-foreground text-sm font-medium mb-6">
                    Managing this booking allows you to reschedule dates or cancel the trip entirely. Standard cancellation policies apply.
                  </div>
                  
                  <button 
                    onClick={handleRescheduleBooking}
                    className="w-full bg-muted text-foreground font-bold p-4 rounded-xl hover:bg-muted/80 transition-all text-left flex justify-between items-center"
                  >
                    Change Dates / Reschedule
                    <Clock size={18} className="text-muted-foreground"/>
                  </button>

                  <button 
                    onClick={handleCancelBooking}
                    className="w-full bg-destructive/10 text-destructive font-bold p-4 rounded-xl hover:bg-destructive/20 transition-all text-left flex justify-between items-center"
                  >
                    Cancel Booking
                    <X size={18} />
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
