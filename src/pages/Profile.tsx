import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { motion } from 'framer-motion';
import {
  Camera,
  User,
  Mail,
  Lock,
  Save,
  LogOut,
  Shield,
  CheckCircle,
  AlertCircle,
  Calendar,
  Clock,
  DollarSign
} from 'lucide-react';

export default function Profile() {
  const { user, login, register, logout, updateProfile, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [activeTab, setActiveTab] = useState('general'); // 'general', 'security', or 'bookings'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const [passwordData, setPasswordData] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bookings state
  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);

  // Fetch bookings when Bookings tab is selected
  useEffect(() => {
    if (activeTab === 'bookings' && user) {
      fetchBookings();
    }
  }, [activeTab, user]);

  const fetchBookings = async () => {
    setBookingsLoading(true);
    try {
      const response = await axios.get('/api/user/bookings', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBookings(response.data.bookings || []);
    } catch (err: any) {
      console.error('Failed to fetch bookings:', err);
      setBookings([]);
    } finally {
      setBookingsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // Create a preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        setSuccess('Welcome back!');
      } else {
        await register(formData.name, formData.email, formData.password, formData.password_confirmation);
        setSuccess('Account created successfully!');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message ||
        (err.response?.data?.errors ? Object.values(err.response.data.errors).flat().join(', ') : err.message || String(err));
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    const data = new FormData();
    data.append('name', profileData.name);
    data.append('email', profileData.email);
    if (selectedFile) {
      data.append('profile_picture', selectedFile);
    }

    try {
      await updateProfile(data);
      setSuccess('Profile updated successfully!');
      setSelectedFile(null);
      setPreviewUrl(null);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message ||
        (err.response?.data?.errors ? Object.values(err.response.data.errors).flat().join(', ') : err.message || String(err));
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordData.password !== passwordData.password_confirmation) {
      setError('New passwords do not match');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post('/api/profile/update-password', passwordData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSuccess('Password updated successfully!');
      setPasswordData({ current_password: '', password: '', password_confirmation: '' });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message ||
        (err.response?.data?.errors ? Object.values(err.response.data.errors).flat().join(', ') : err.message || String(err));
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />

      {/* Messages Toast-style */}
      {(error || success) && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-24 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-3 w-auto max-w-sm ${error ? 'bg-red-50 text-red-800 border border-red-200' : 'bg-green-50 text-green-800 border border-green-200'
            }`}
        >
          {error ? <AlertCircle className="w-5 h-5 flex-shrink-0" /> : <CheckCircle className="w-5 h-5 flex-shrink-0" />}
          <p className="font-medium text-sm">{error || success}</p>
          <button onClick={() => { setError(''); setSuccess(''); }} className="ml-auto text-sm opacity-60 hover:opacity-100">✕</button>
        </motion.div>
      )}

      <div className="flex-grow pt-32 pb-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto w-full">
          {user ? (
            // LOGGED IN VIEW
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100/50 overflow-hidden"
            >
              {/* Header / Cover */}
              <div className="h-32 bg-purple-900 relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
              </div>

              <div className="px-6 sm:px-8 pb-8">
                {/* Profile Picture & Basic Info - Row */}
                <div className="relative flex flex-col sm:flex-row items-center sm:items-end -mt-12 mb-8 gap-4 sm:gap-6 text-center sm:text-left">
                  <div className="relative group flex-shrink-0">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200">
                      <img
                        src={
                          previewUrl ||
                          (user.profile_picture
                            ? `/storage/${user.profile_picture}`
                            : 'https://ui-avatars.com/api/?name=' + user.name + '&background=random')
                        }
                        alt={user.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://ui-avatars.com/api/?name=' + user.name + '&background=random';
                        }}
                      />
                    </div>
                    <label
                      htmlFor="profile-upload"
                      className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center cursor-pointer shadow-sm hover:bg-purple-700 transition-colors z-10"
                      title="Change Profile Picture"
                    >
                      <Camera size={16} />
                    </label>
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                  <div className="flex-grow pt-2 sm:pb-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{user.name}</h1>
                    <p className="text-gray-500">{user.email}</p>
                  </div>

                  <button
                    onClick={logout}
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium mt-2 sm:mt-0"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>

                {/* Tabs */}
                <div className="relative flex border-b border-gray-100 mb-10">
                  <button
                    type="button"
                    onClick={() => setActiveTab('general')}
                    className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 relative z-10
                      ${activeTab === 'general' ? 'text-purple-900' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Personal Information
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('security')}
                    className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 relative z-10
                      ${activeTab === 'security' ? 'text-purple-900' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Security & Password
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('bookings')}
                    className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 relative z-10
                      ${activeTab === 'bookings' ? 'text-purple-900' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Bookings
                  </button>

                  {/* Animated Underline Indicator */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[3px] bg-purple-900 rounded-full z-20"
                    initial={false}
                    animate={{
                      left: activeTab === 'general' ? '0%' : activeTab === 'security' ? '33.33%' : '66.66%'
                    }}
                    style={{ width: '33.33%' }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                </div>

                {/* Tab Content */}
                <div className="max-w-2xl">
                  {activeTab === 'general' ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {selectedFile && (
                        <div className="mb-6 bg-blue-50 text-blue-800 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                          <AlertCircle size={16} />
                          Click "Save Changes" to upload your new picture.
                        </div>
                      )}

                      <form onSubmit={handleProfileUpdate} className="space-y-6">
                        <div className="grid gap-6 sm:grid-cols-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                              type="text"
                              name="name"
                              value={profileData.name}
                              onChange={handleProfileChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                              type="email"
                              name="email"
                              value={profileData.email}
                              onChange={handleProfileChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-purple-900 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition-colors shadow-sm disabled:opacity-70 text-sm font-medium"
                          >
                            {isSubmitting ? 'Saving...' : 'Save Changes'}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  ) : activeTab === 'security' ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <form onSubmit={handlePasswordUpdate} className="space-y-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                          <input
                            type="password"
                            name="current_password"
                            value={passwordData.current_password}
                            onChange={handlePasswordChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                          />
                        </div>

                        <div className="grid gap-6 sm:grid-cols-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input
                              type="password"
                              name="password"
                              value={passwordData.password}
                              onChange={handlePasswordChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <input
                              type="password"
                              name="password_confirmation"
                              value={passwordData.password_confirmation}
                              onChange={handlePasswordChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-purple-900 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition-colors shadow-sm disabled:opacity-70 text-sm font-medium"
                          >
                            {isSubmitting ? 'Updating...' : 'Update Password'}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="w-full max-w-full"
                    >
                      {bookingsLoading ? (
                        <div className="flex items-center justify-center py-12">
                          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-900"></div>
                        </div>
                      ) : bookings.length === 0 ? (
                        <div className="text-center py-12">
                          <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Bookings Yet</h3>
                          <p className="text-gray-500 text-sm">You haven't made any bookings. Start exploring our services!</p>
                        </div>
                      ) : (
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="bg-gray-50 border-b-2 border-gray-200">
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Booking ID</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Service</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Date & Time</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Price</th>
                              </tr>
                            </thead>
                            <tbody>
                              {bookings.map((booking, index) => (
                                <tr key={booking.id || index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                  <td className="px-6 py-4 text-sm font-medium text-gray-900">#{booking.id || 'N/A'}</td>
                                  <td className="px-6 py-4 text-sm text-gray-700">
                                    <div className="font-medium">{booking.category || 'N/A'}</div>
                                    <div className="text-xs text-gray-500">{booking.subcategory || ''}</div>
                                  </td>
                                  <td className="px-6 py-4 text-sm text-gray-700">
                                    <div className="flex items-center gap-2">
                                      <Calendar className="w-4 h-4 text-gray-400" />
                                      <span>{booking.date || 'N/A'}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Clock className="w-4 h-4 text-gray-400" />
                                      <span>{booking.time || 'N/A'}</span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4 text-sm">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${booking.status === 'confirmed' ? 'bg-purple-100 text-purple-800' :
                                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                          booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                      }`}>
                                      {booking.status ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1) : 'Unknown'}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                    <div className="flex items-center gap-1">
                                      <DollarSign className="w-4 h-4 text-gray-400" />
                                      {booking.price || '0'}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            // LOGGED OUT VIEW (Login/Register)
            <div className="max-w-[260px] mx-auto my-20 mt-20 mb-20">
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100/50 overflow-hidden">
                <div className="p-10 text-center bg-purple-900 text-white relative">
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent)] pointer-events-none"></div>
                  <h2 className="text-3xl font-bold mb-3 tracking-tight">
                    {isLogin ? 'Welcome Back' : 'Get Started'}
                  </h2>
                  <p className="text-purple-100/80 text-sm leading-relaxed px-4">
                    {isLogin
                      ? 'Access your account to manage your profile.'
                      : 'Join us today and experience premium wellness.'}
                  </p>
                </div>

                <div className="p-8 sm:p-10">
                  {/* Custom Tab Navigation with Animated Underline */}
                  <div className="relative flex mb-10 border-b border-gray-100">
                    <button
                      type="button"
                      className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 relative z-10
                        ${isLogin ? 'text-purple-900' : 'text-gray-400 hover:text-gray-600'}`}
                      onClick={() => setIsLogin(true)}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      className={`flex-1 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 relative z-10
                        ${!isLogin ? 'text-purple-900' : 'text-gray-400 hover:text-gray-600'}`}
                      onClick={() => setIsLogin(false)}
                    >
                      Register
                    </button>

                    {/* Animated Underline Indicator */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-[3px] bg-purple-900 rounded-full z-20"
                      initial={false}
                      animate={{
                        left: isLogin ? '0%' : '50%'
                      }}
                      style={{ width: '50%' }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                        <div className="relative group">
                          <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 h-16 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-purple-900/20 focus:ring-4 focus:ring-purple-900/5 outline-none transition-all text-gray-800 placeholder:text-gray-300"
                            placeholder="John Doe" />
                        </div>
                      </motion.div>
                    )}

                    <motion.div
                      layout
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                      <div className="relative group">
                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 h-16 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-purple-900/20 focus:ring-4 focus:ring-purple-900/5 outline-none transition-all text-gray-800 placeholder:text-gray-300"
                          placeholder="you@example.com"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      layout
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
                      <div className="relative group">
                        <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                        <input
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="w-full pl-12 pr-4 h-16 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-purple-900/20 focus:ring-4 focus:ring-purple-900/5 outline-none transition-all text-gray-800"
                          placeholder="••••••••"
                        />
                      </div>
                    </motion.div>

                    {!isLogin && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Confirm Password</label>
                        <div className="relative group">
                          <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                          <input
                            type="password"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleInputChange}
                            className="w-full pl-12 pr-4 h-16 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-purple-900/20 focus:ring-4 focus:ring-purple-900/5 outline-none transition-all text-gray-800"
                            placeholder="••••••••"
                          />
                        </div>
                      </motion.div>
                    )}

                    <motion.button
                      layout
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full h-14 bg-purple-900 text-white rounded-2xl hover:bg-purple-950 transition-all font-bold shadow-xl shadow-purple-900/20 mt-4 disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        isLogin ? 'Sign In' : 'Create Account'
                      )}
                    </motion.button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}