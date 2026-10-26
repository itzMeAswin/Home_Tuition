import React, { useState, useEffect } from 'react';
import { 
  Shield, Users, BookOpen, Calendar, MessageSquare, 
  CheckCircle2, Clock, XCircle, Search, RefreshCw, Trash2, Edit3 
} from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings', 'inquiries', 'users'
  const [metrics, setMetrics] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter/search
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const [dashRes, bRes, iRes] = await Promise.all([
        api.get('/dashboard/admin'),
        api.get('/bookings'),
        api.get('/inquiries'),
      ]);
      setMetrics(dashRes.data.metrics);
      setBookings(bRes.data);
      setInquiries(iRes.data);
    } catch (err) {
      console.error(err);
      addToast('Error loading admin records', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateBookingStatus = async (bookingId, newStatus) => {
    try {
      await api.put(`/bookings/${bookingId}`, { status: newStatus });
      addToast(`Booking marked as ${newStatus}!`, 'success');
      loadData();
    } catch (err) {
      addToast('Error updating booking', 'error');
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await api.delete(`/bookings/${bookingId}`);
      addToast('Booking deleted', 'info');
      loadData();
    } catch (err) {
      addToast('Error deleting booking', 'error');
    }
  };

  const handleUpdateInquiryStatus = async (inquiryId, newStatus) => {
    try {
      await api.put(`/inquiries/${inquiryId}`, { status: newStatus });
      addToast(`Inquiry status updated to ${newStatus}`, 'success');
      loadData();
    } catch (err) {
      addToast('Error updating inquiry', 'error');
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    const matchesSearch =
      b.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.bookingRef?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-bronze-50 pb-16 sm:pb-24 w-full overflow-x-hidden">
      {/* Banner - Solid Deep Black Background from your theme */}
      <section className="bg-bronze-950 text-white pt-10 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 border-b-2 border-brand-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-1.5 min-w-0">
            <span className="px-3.5 py-1 rounded-full bg-brand-900 border border-brand-400/40 text-brand-200 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5 shrink-0">
              <Shield className="w-3.5 h-3.5 text-brand-300" /> Institutional Administration Directorate
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white truncate">
              Administrator Console
            </h1>
            <p className="text-bronze-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Manage student inquiries, demo class requests, tutor assignments, and platform analytics.
            </p>
          </div>

          <button
            type="button"
            onClick={loadData}
            className="px-4 py-2.5 rounded-xl bg-bronze-900 hover:bg-bronze-800 border border-bronze-800 text-white text-xs font-bold flex items-center gap-2 transition-colors self-start md:self-auto cursor-pointer shrink-0"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Data</span>
          </button>
        </div>
      </section>

      {/* Main Container - Positioned cleanly below the black banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 space-y-8">
        {/* KPI Analytics Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-3xl p-5 shadow-xl border border-bronze-200">
            <span className="text-[11px] font-bold text-bronze-500 uppercase block">Total Students</span>
            <p className="text-2xl font-heading font-black text-bronze-950 mt-1">
              {metrics?.totalStudents || 12}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-xl border border-bronze-200">
            <span className="text-[11px] font-bold text-bronze-500 uppercase block">Active Tutors</span>
            <p className="text-2xl font-heading font-black text-brand-700 mt-1">
              {metrics?.totalTutors || 4}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-xl border border-bronze-200">
            <span className="text-[11px] font-bold text-bronze-500 uppercase block">Demo Bookings</span>
            <p className="text-2xl font-heading font-black text-brand-600 mt-1">
              {bookings.length}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-xl border border-bronze-200">
            <span className="text-[11px] font-bold text-bronze-500 uppercase block">Pending Review</span>
            <p className="text-2xl font-heading font-black text-amber-600 mt-1">
              {bookings.filter((b) => b.status === 'Pending').length}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-xl border border-bronze-200 col-span-2 md:col-span-1">
            <span className="text-[11px] font-bold text-bronze-500 uppercase block">Inquiries</span>
            <p className="text-2xl font-heading font-black text-brand-800 mt-1">
              {inquiries.length}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 border-b border-bronze-200 pb-3 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'bookings'
                ? 'bg-brand-500 text-white shadow-md'
                : 'bg-white border border-bronze-200 text-bronze-700 hover:bg-bronze-50'
            }`}
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span>Demo Class Requests ({bookings.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inquiries')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0 ${
              activeTab === 'inquiries'
                ? 'bg-brand-500 text-white shadow-md'
                : 'bg-white border border-bronze-200 text-bronze-700 hover:bg-bronze-50'
            }`}
          >
            <MessageSquare className="w-4 h-4 shrink-0" />
            <span>Contact Form Inquiries ({inquiries.length})</span>
          </button>
        </div>

        {/* TAB 1: DEMO CLASS BOOKINGS MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-bronze-200 space-y-6">
            {/* Search & Filter Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-bronze-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search by student, email, subject, or Ref ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-bronze-200 bg-white text-bronze-800 placeholder:text-bronze-400 text-xs outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-semibold text-bronze-600">Filter Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-bronze-200 text-xs font-semibold bg-white text-bronze-800 outline-none focus:border-brand-500 cursor-pointer transition-colors"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="overflow-x-auto rounded-2xl border border-bronze-200">
              <table className="w-full min-w-[650px] text-left text-xs">
                <thead className="bg-bronze-50 text-bronze-950 font-bold uppercase tracking-wider border-b border-bronze-200">
                  <tr>
                    <th className="py-3.5 px-4">Ref ID</th>
                    <th className="py-3.5 px-4">Student & Contact</th>
                    <th className="py-3.5 px-4">Subject & Class</th>
                    <th className="py-3.5 px-4">Slot</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-bronze-100 font-medium">
                  {filteredBookings.map((b) => (
                    <tr key={b._id} className="hover:bg-brand-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-brand-700">
                        {b.bookingRef}
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-bold text-bronze-950">{b.studentName}</p>
                        <p className="text-[11px] text-bronze-500">{b.email} • {b.phone}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-bronze-900">{b.subject}</span>
                        <span className="text-bronze-500 block text-[11px]">{b.grade} • {b.curriculum}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-bronze-800">{b.preferredDate}</span>
                        <span className="text-[11px] text-bronze-500 block">{b.preferredTime}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            b.status === 'Confirmed'
                              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                              : b.status === 'Pending'
                              ? 'bg-amber-50 border border-amber-200 text-amber-800'
                              : b.status === 'Completed'
                              ? 'bg-brand-50 border border-brand-200 text-brand-800'
                              : 'bg-rose-50 border border-rose-200 text-rose-800'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                        {b.status === 'Pending' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateBookingStatus(b._id, 'Confirmed')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] transition-colors cursor-pointer"
                          >
                            Confirm
                          </button>
                        )}
                        {b.status === 'Confirmed' && (
                          <button
                            type="button"
                            onClick={() => handleUpdateBookingStatus(b._id, 'Completed')}
                            className="px-2.5 py-1 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-bold text-[10px] transition-colors cursor-pointer"
                          >
                            Mark Completed
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleDeleteBooking(b._id)}
                          className="p-1 rounded-lg hover:bg-rose-50 text-rose-600 transition-colors cursor-pointer inline-flex items-center"
                          title="Delete Booking"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredBookings.length === 0 && (
                <div className="text-center py-10 text-bronze-400 text-xs">
                  No bookings found matching filter criteria.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: INQUIRIES MANAGEMENT */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-bronze-200 space-y-6">
            <h3 className="font-heading font-bold text-lg text-bronze-950">
              Visitor Contact Inquiries
            </h3>

            <div className="space-y-3">
              {inquiries.map((inq) => (
                <div key={inq._id} className="p-4 rounded-2xl bg-bronze-50 border border-bronze-200 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-bronze-950 text-sm truncate">{inq.name}</h4>
                      <span className="text-xs text-bronze-500 truncate">({inq.email} • {inq.phone})</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-50 border border-brand-200 text-brand-900 shrink-0">
                        {inq.source}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-brand-800">Subject: {inq.subject}</p>
                    <p className="text-xs text-bronze-700 leading-relaxed bg-white p-3 rounded-xl border border-bronze-200">
                      "{inq.message}"
                    </p>
                  </div>

                  <div className="flex sm:flex-col items-center gap-2 shrink-0 self-start sm:self-auto">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        inq.status === 'Resolved'
                          ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                          : inq.status === 'Contacted'
                          ? 'bg-brand-50 border border-brand-200 text-brand-800'
                          : 'bg-amber-50 border border-amber-200 text-amber-800'
                      }`}
                    >
                      {inq.status}
                    </span>
                    {inq.status !== 'Resolved' && (
                      <button
                        type="button"
                        onClick={() => handleUpdateInquiryStatus(inq._id, 'Resolved')}
                        className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Mark Resolved
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {inquiries.length === 0 && !loading && (
                <div className="text-center py-10 text-bronze-400 text-xs">
                  No inquiries recorded yet.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;