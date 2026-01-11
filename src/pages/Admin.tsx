import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Users, UserPlus, Shield, Key, ArrowLeft, Trash2, Wrench, MessageSquare } from 'lucide-react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
}

interface DashboardStats {
  total_users: number;
  admin_users: number;
  regular_users: number;
}

interface AboutPageContent {
  heroTitle: string;
  heroSubtitle: string;
  whoHeading: string;
  whoParagraph1: string;
  whoParagraph2: string;
  whoParagraph3: string;
  stats: { number: string; label: string }[];
  buildingHeading: string;
  buildingSubtitle: string;
  europeHeading: string;
  europeAddressLine1: string;
  europeAddressLine2: string;
  europeFeatures: { title: string; description: string }[];
  valuesHeading: string;
  values: { title: string; description: string }[];
}

interface ContactSettings {
  email: string;
  phone: string;
  address_line1: string;
  address_line2: string | null;
}

interface Service {
  id: number;
  name: string;
  description: string | null;
  price: number | null;
  available: boolean;
  created_at: string;
  updated_at: string;
}

type AdminView =
  | 'dashboard'
  | 'users'
  | 'create-user'
  | 'about-settings'
  | 'contact-settings'
  | 'bookings'
  | 'customer-queries';

export default function Admin() {
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [aboutSettings, setAboutSettings] = useState<AboutPageContent | null>(null);
  const [contactSettings, setContactSettings] = useState<ContactSettings | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [queries, setQueries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchDashboardData();
      if (currentView === 'users') {
        fetchAllUsers();
      }
      if (currentView === 'about-settings') {
        fetchAboutSettings();
      }
      if (currentView === 'contact-settings') {
        fetchContactSettings();
      }
      if (currentView === 'bookings') {
        fetchBookings();
      }
      if (currentView === 'customer-queries') {
        fetchQueries();
      }
    } else {
      setLoading(false);
    }
  }, [user, currentView]);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setStats(response.data.stats);
    } catch (err: any) {
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const fetchQueries = async () => {
    try {
      const response = await axios.get('/api/admin/customer-queries', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setQueries(response.data.data);
    } catch (err: any) {
      setError('Failed to load customer queries');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get('/api/admin/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAllUsers(response.data.data);
    } catch (err: any) {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/admin/bookings', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBookings(response.data.data);
    } catch (err: any) {
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const fetchAboutSettings = async () => {
    try {
      const response = await axios.get('/api/admin/about/content', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = response.data as Record<string, string>;
      const settings: AboutPageContent = {
        heroTitle: data['about.hero.title'] ?? 'About',
        heroSubtitle: data['about.hero.subtitle'] ?? 'Little moments of greatness',
        whoHeading: data['about.who_we_are.heading'] ?? 'Who we are',
        whoParagraph1:
          data['about.who_we_are.paragraph_1'] ??
          "We're Frame 2 Complex - a premier sports and recreation center located in Bradford, United Kingdom. We're dedicated to providing exceptional sporting facilities and entertainment options for individuals, families, and teams who are passionate about an active lifestyle.",
        whoParagraph2:
          data['about.who_we_are.paragraph_2'] ??
          "Our complex is more than just a sports venue. It's a destination where athletes, gamers, and sports enthusiasts of all levels come together to pursue their passions, compete, train, and create lasting memories. From competitive matches to casual fun, we offer something for everyone.",
        whoParagraph3:
          data['about.who_we_are.paragraph_3'] ??
          'With professional-grade football grounds, a premier cricket field, dedicated boxing facilities, premium snooker tables, a cutting-edge game arena, and comfortable accommodation rooms, we provide everything you need for sports, recreation, and relaxation - all in one convenient location.',
        stats: [
          {
            number: data['about.stats.1.number'] ?? '6',
            label: data['about.stats.1.label'] ?? 'Premium Facilities',
          },
          {
            number: data['about.stats.2.number'] ?? '5000+',
            label: data['about.stats.2.label'] ?? 'Happy Visitors',
          },
          {
            number: data['about.stats.3.number'] ?? '50+',
            label: data['about.stats.3.label'] ?? 'Expert Staff',
          },
        ],
        buildingHeading:
          data['about.building.heading'] ?? 'Premium facilities designed for you',
        buildingSubtitle:
          data['about.building.subtitle'] ??
          'Every detail matters when creating spaces for sports and recreation',
        europeHeading:
          data['about.europe.heading'] ?? 'Your Premier Sports Complex in Bradford',
        europeAddressLine1:
          data['about.europe.address_line1'] ?? 'Feather Rd, Bradford BD3 9DJ',
        europeAddressLine2:
          data['about.europe.address_line2'] ?? 'United Kingdom',
        europeFeatures: [1, 2, 3, 4].map((i) => ({
          title:
            data[`about.europe.features.${i}.title`] ??
            ['Prime Location', 'Extended Hours', 'Online Booking', 'Free WiFi'][
            i - 1
            ],
          description:
            data[`about.europe.features.${i}.description`] ??
            [
              'Easy access from Bradford city center',
              'Open 7 days a week',
              'Book facilities anytime',
              'Stay connected throughout',
            ][i - 1],
        })),
        valuesHeading: data['about.values.heading'] ?? 'Our Values',
        values: [1, 2, 3, 4].map((i) => ({
          title:
            data[`about.values.${i}.title`] ??
            ['Passion', 'Community', 'Excellence', 'Experience'][i - 1],
          description:
            data[`about.values.${i}.description`] ??
            [
              'We love sports and recreation, and it shows in everything we create - from our facilities to our visitor experiences.',
              'We bring people together, creating spaces where friendships form, teams unite, and families enjoy quality time.',
              'We never settle for good enough. We constantly maintain and improve our facilities to deliver the very best.',
              "We believe in creating memorable moments - whether you're playing, training, gaming, or simply relaxing.",
            ][i - 1],
        })),
      };
      setAboutSettings(settings);
    } catch (err: any) {
      setError('Failed to load About Us settings');
    }
  };

  const fetchContactSettings = async () => {
    try {
      const response = await axios.get('/api/admin/contact/settings', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setContactSettings(response.data as ContactSettings);
    } catch (err: any) {
      setError('Failed to load contact settings');
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    // ... (keep logic)
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post('/api/admin/users', newUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSuccess('User created successfully');
      setNewUser({ name: '', email: '', password: '', role: 'user' });
      fetchDashboardData();
      if (currentView === 'users') fetchAllUsers();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create user');
    }
  };

  const handleDeleteBooking = async (bookingId: number) => {
    if (!confirm('Are you sure you want to delete this booking? This will free up the time slot.')) return;
    setError('');
    setSuccess('');

    try {
      await axios.delete(`/api/admin/bookings/${bookingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSuccess('Booking deleted successfully');
      fetchBookings();
    } catch (err: any) {
      setError('Failed to delete booking');
    }
  };

  const handleUpdateRole = async (userId: number, newRole: string) => {
    try {
      await axios.put(
        `/api/admin/users/${userId}/role`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setSuccess('User role updated successfully');
      fetchAllUsers();
    } catch (err: any) {
      setError('Failed to update user role');
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSuccess('User deleted successfully');
      fetchAllUsers();
      fetchDashboardData();
    } catch (err: any) {
      setError('Failed to delete user');
    }
  };

  const handleResetPassword = async (userId: number) => {
    if (!confirm('Are you sure you want to reset the password for this user?')) return;
    try {
      await axios.post(
        `/api/admin/users/${userId}/reset-password`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setSuccess('Password reset successfully to: user123');
    } catch (err: any) {
      setError('Failed to reset password');
    }
  };

  const handleDeleteQuery = async (queryId: number) => {
    if (!confirm('Are you sure you want to delete this query?')) return;
    try {
      await axios.delete(`/api/admin/customer-queries/${queryId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSuccess('Query deleted successfully');
      fetchQueries();
    } catch (err: any) {
      setError('Failed to delete query');
    }
  };

  // ... (keeping render logic for loading/auth check/navbar)
  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto py-16 px-4 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Please Login</h1>
          <p className="text-gray-600">You need to be logged in to access this page.</p>
        </div>
      </div>
    );
  }

  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-4xl mx-auto py-16 px-4 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-purple-900 mb-4">Admin Dashboard</h1>
          <p className="text-xl text-gray-600">Manage your application and users</p>
        </div>

        {/* Breadcrumb */}
        {currentView !== 'dashboard' && (
          <div className="mb-6">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center text-purple-600 hover:text-purple-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </button>
          </div>
        )}

        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        {/* Dashboard View */}
        {currentView === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">System Statistics</h2>
              {stats ? (
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-900">
                    <div className="flex items-center">
                      <Users className="h-8 w-8 text-purple-900 mr-3" />
                      <div>
                        <p className="text-2xl font-bold text-gray-800">{stats.total_users}</p>
                        <p className="text-gray-600">Total Users</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-900">
                    <div className="flex items-center">
                      <Shield className="h-8 w-8 text-purple-900 mr-3" />
                      <div>
                        <p className="text-2xl font-bold text-gray-800">{stats.admin_users}</p>
                        <p className="text-gray-600">Admin Users</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-900">
                    <div className="flex items-center">
                      <UserPlus className="h-8 w-8 text-purple-900 mr-3" />
                      <div>
                        <p className="text-2xl font-bold text-gray-800">{stats.regular_users}</p>
                        <p className="text-gray-600">Regular Users</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
                  <p className="text-gray-600">Loading statistics...</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div
                  className="bg-purple-900 text-white rounded-lg p-6 cursor-pointer hover:bg-purple-800 transition-colors"
                  onClick={() => setCurrentView('users')}
                >
                  <div className="text-center">
                    <Users className="h-12 w-12 mx-auto mb-3" />
                    <h3 className="text-lg font-bold mb-1">User Management</h3>
                    <p className="text-purple-100 text-sm">Manage users and roles</p>
                  </div>
                </div>

                <div
                  className="bg-purple-900 text-white rounded-lg p-6 cursor-pointer hover:bg-purple-800 transition-colors"
                  onClick={() => setCurrentView('create-user')}
                >
                  <div className="text-center">
                    <UserPlus className="h-12 w-12 mx-auto mb-3" />
                    <h3 className="text-lg font-bold mb-1">Create User</h3>
                    <p className="text-purple-100 text-sm">Add new user accounts</p>
                  </div>
                </div>

                <div
                  className="bg-purple-900 text-white rounded-lg p-6 cursor-pointer hover:bg-purple-800 transition-colors"
                  onClick={() => setCurrentView('about-settings')}
                >
                  <div className="text-center">
                    <Shield className="h-12 w-12 mx-auto mb-3" />
                    <h3 className="text-lg font-bold mb-1">About Us Setting</h3>
                    <p className="text-purple-100 text-sm">Manage About page content</p>
                  </div>
                </div>

                <div
                  className="bg-purple-900 text-white rounded-lg p-6 cursor-pointer hover:bg-purple-800 transition-colors"
                  onClick={() => setCurrentView('contact-settings')}
                >
                  <div className="text-center">
                    <Key className="h-12 w-12 mx-auto mb-3" />
                    <h3 className="text-lg font-bold mb-1">Contact details setting</h3>
                    <p className="text-purple-100 text-sm">Edit email, phone and address</p>
                  </div>
                </div>

                <div
                  className="bg-purple-900 text-white rounded-lg p-6 cursor-pointer hover:bg-purple-800 transition-colors"
                  onClick={() => setCurrentView('bookings')}
                >
                  <div className="text-center">
                    <div className="h-12 w-12 mx-auto mb-3 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /><path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" /></svg>
                    </div>
                    <h3 className="text-lg font-bold mb-1">Booking Details</h3>
                    <p className="text-purple-100 text-sm">View and manage bookings</p>
                  </div>
                </div>
                <div
                  className="bg-purple-900 text-white rounded-lg p-6 cursor-pointer hover:bg-purple-800 transition-colors"
                  onClick={() => setCurrentView('customer-queries')}
                >
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 mx-auto mb-3" />
                    <h3 className="text-lg font-bold mb-1">Customer Queries</h3>
                    <p className="text-purple-100 text-sm">View contact form submissions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bookings View - NEW */}
        {currentView === 'bookings' && (
          <div className="bg-white rounded-lg shadow-xl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Booking Management</h2>
            </div>
            <div className="overflow-x-auto pb-4">
              <table className="w-full min-w-[1000px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Booking ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking: any) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#{booking.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="text-sm font-medium text-gray-900">{booking.user?.name}</div>
                        <div className="text-sm text-gray-500">{booking.user?.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>{booking.category?.name}</div>
                        <div className="text-xs text-gray-500">{booking.sub_category?.name}</div>
                        <div className="text-xs text-gray-500">{booking.instance?.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>{booking.booking_date}</div>
                        <div className="text-xs text-gray-500">{booking.start_time} - {booking.end_time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDeleteBooking(booking.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {bookings.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                        No bookings found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Customer Queries View */}
        {currentView === 'customer-queries' && (
          <div className="bg-white rounded-lg shadow-xl">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">Customer Queries</h2>
            </div>
            <div className="overflow-x-auto pb-4">
              <table className="w-full min-w-[1000px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {queries.map((query: any) => (
                    <tr key={query.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(query.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="font-medium">{query.first_name} {query.last_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>{query.email}</div>
                        <div className="text-gray-500">{query.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {query.subject}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title={query.message}>
                        {query.message}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleDeleteQuery(query.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete Query"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {queries.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                        No queries found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}


        {/* About Us Setting View */}
        {currentView === 'about-settings' && aboutSettings && (
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <h2 className="text-4xl font-bold text-purple-900 mb-8 text-center">About Us Setting</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!aboutSettings) return;
                setError('');
                setSuccess('');
                try {
                  const contents: Record<string, string> = {
                    'about.hero.title': aboutSettings.heroTitle,
                    'about.hero.subtitle': aboutSettings.heroSubtitle,
                    'about.who_we_are.heading': aboutSettings.whoHeading,
                    'about.who_we_are.paragraph_1': aboutSettings.whoParagraph1,
                    'about.who_we_are.paragraph_2': aboutSettings.whoParagraph2,
                    'about.who_we_are.paragraph_3': aboutSettings.whoParagraph3,
                    'about.stats.1.number': aboutSettings.stats[0]?.number ?? '6',
                    'about.stats.1.label': aboutSettings.stats[0]?.label ?? 'Premium Facilities',
                    'about.stats.2.number': aboutSettings.stats[1]?.number ?? '5000+',
                    'about.stats.2.label': aboutSettings.stats[1]?.label ?? 'Happy Visitors',
                    'about.stats.3.number': aboutSettings.stats[2]?.number ?? '50+',
                    'about.stats.3.label': aboutSettings.stats[2]?.label ?? 'Expert Staff',
                    'about.building.heading': aboutSettings.buildingHeading,
                    'about.building.subtitle': aboutSettings.buildingSubtitle,
                    'about.europe.heading': aboutSettings.europeHeading,
                    'about.europe.address_line1': aboutSettings.europeAddressLine1,
                    'about.europe.address_line2': aboutSettings.europeAddressLine2,
                    'about.europe.features.1.title': aboutSettings.europeFeatures[0]?.title ?? 'Prime Location',
                    'about.europe.features.1.description':
                      aboutSettings.europeFeatures[0]?.description ??
                      'Easy access from Bradford city center',
                    'about.europe.features.2.title': aboutSettings.europeFeatures[1]?.title ?? 'Extended Hours',
                    'about.europe.features.2.description':
                      aboutSettings.europeFeatures[1]?.description ?? 'Open 7 days a week',
                    'about.europe.features.3.title': aboutSettings.europeFeatures[2]?.title ?? 'Online Booking',
                    'about.europe.features.3.description':
                      aboutSettings.europeFeatures[2]?.description ?? 'Book facilities anytime',
                    'about.europe.features.4.title': aboutSettings.europeFeatures[3]?.title ?? 'Free WiFi',
                    'about.europe.features.4.description':
                      aboutSettings.europeFeatures[3]?.description ?? 'Stay connected throughout',
                    'about.values.heading': aboutSettings.valuesHeading,
                    'about.values.1.title': aboutSettings.values[0]?.title ?? 'Passion',
                    'about.values.1.description':
                      aboutSettings.values[0]?.description ??
                      'We love sports and recreation, and it shows in everything we create - from our facilities to our visitor experiences.',
                    'about.values.2.title': aboutSettings.values[1]?.title ?? 'Community',
                    'about.values.2.description':
                      aboutSettings.values[1]?.description ??
                      'We bring people together, creating spaces where friendships form, teams unite, and families enjoy quality time.',
                    'about.values.3.title': aboutSettings.values[2]?.title ?? 'Excellence',
                    'about.values.3.description':
                      aboutSettings.values[2]?.description ??
                      'We never settle for good enough. We constantly maintain and improve our facilities to deliver the very best.',
                    'about.values.4.title': aboutSettings.values[3]?.title ?? 'Experience',
                    'about.values.4.description':
                      aboutSettings.values[3]?.description ??
                      "We believe in creating memorable moments - whether you're playing, training, gaming, or simply relaxing.",
                  };

                  const response = await axios.put(
                    '/api/admin/about/content',
                    { contents },
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                      },
                    },
                  );
                  const data = response.data as Record<string, string>;
                  // Refresh local state from response to keep in sync
                  const updated: AboutPageContent = {
                    ...aboutSettings,
                    heroTitle: data['about.hero.title'] ?? aboutSettings.heroTitle,
                    heroSubtitle:
                      data['about.hero.subtitle'] ?? aboutSettings.heroSubtitle,
                  };
                  setAboutSettings(updated);
                  setSuccess('About Us settings updated successfully');
                } catch (err: any) {
                  setError(
                    err.response?.data?.message ||
                    'Failed to update About Us settings',
                  );
                }
              }}
              className="space-y-8 max-w-4xl mx-auto"
            >
              {/* Hero section */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hero title
                  </label>
                  <input
                    type="text"
                    value={aboutSettings.heroTitle}
                    onChange={(e) =>
                      setAboutSettings({
                        ...aboutSettings,
                        heroTitle: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hero subtitle
                  </label>
                  <input
                    type="text"
                    value={aboutSettings.heroSubtitle}
                    onChange={(e) =>
                      setAboutSettings({
                        ...aboutSettings,
                        heroSubtitle: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Who we are */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  Who we are section
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={aboutSettings.whoHeading}
                    onChange={(e) =>
                      setAboutSettings({
                        ...aboutSettings,
                        whoHeading: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                {[1, 2, 3].map((idx) => (
                  <div key={idx}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Paragraph {idx}
                    </label>
                    <textarea
                      value={
                        idx === 1
                          ? aboutSettings.whoParagraph1
                          : idx === 2
                            ? aboutSettings.whoParagraph2
                            : aboutSettings.whoParagraph3
                      }
                      onChange={(e) => {
                        if (idx === 1) {
                          setAboutSettings({
                            ...aboutSettings,
                            whoParagraph1: e.target.value,
                          });
                        } else if (idx === 2) {
                          setAboutSettings({
                            ...aboutSettings,
                            whoParagraph2: e.target.value,
                          });
                        } else {
                          setAboutSettings({
                            ...aboutSettings,
                            whoParagraph3: e.target.value,
                          });
                        }
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[80px]"
                    />
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Stats section</h3>
                {[0, 1, 2].map((idx) => {
                  const stat = aboutSettings.stats[idx] ?? { number: '', label: '' };
                  return (
                    <div key={idx} className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Stat {idx + 1} number
                        </label>
                        <input
                          type="text"
                          value={stat.number}
                          onChange={(e) => {
                            const updated = [...aboutSettings.stats];
                            updated[idx] = { ...stat, number: e.target.value };
                            setAboutSettings({ ...aboutSettings, stats: updated });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Stat {idx + 1} label
                        </label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const updated = [...aboutSettings.stats];
                            updated[idx] = { ...stat, label: e.target.value };
                            setAboutSettings({ ...aboutSettings, stats: updated });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Building banner */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Building banner</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heading
                  </label>
                  <input
                    type="text"
                    value={aboutSettings.buildingHeading}
                    onChange={(e) =>
                      setAboutSettings({
                        ...aboutSettings,
                        buildingHeading: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={aboutSettings.buildingSubtitle}
                    onChange={(e) =>
                      setAboutSettings({
                        ...aboutSettings,
                        buildingSubtitle: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* Europe / location */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Location (Europe section)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section heading
                    </label>
                    <input
                      type="text"
                      value={aboutSettings.europeHeading}
                      onChange={(e) =>
                        setAboutSettings({
                          ...aboutSettings,
                          europeHeading: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address line 1
                    </label>
                    <input
                      type="text"
                      value={aboutSettings.europeAddressLine1}
                      onChange={(e) =>
                        setAboutSettings({
                          ...aboutSettings,
                          europeAddressLine1: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address line 2
                  </label>
                  <input
                    type="text"
                    value={aboutSettings.europeAddressLine2}
                    onChange={(e) =>
                      setAboutSettings({
                        ...aboutSettings,
                        europeAddressLine2: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-gray-800">
                    Features
                  </h4>
                  {[0, 1, 2, 3].map((idx) => {
                    const feature =
                      aboutSettings.europeFeatures[idx] ?? {
                        title: '',
                        description: '',
                      };
                    return (
                      <div key={idx} className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Feature {idx + 1} title
                          </label>
                          <input
                            type="text"
                            value={feature.title}
                            onChange={(e) => {
                              const updated = [...aboutSettings.europeFeatures];
                              updated[idx] = {
                                ...feature,
                                title: e.target.value,
                              };
                              setAboutSettings({
                                ...aboutSettings,
                                europeFeatures: updated,
                              });
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Feature {idx + 1} description
                          </label>
                          <textarea
                            value={feature.description}
                            onChange={(e) => {
                              const updated = [...aboutSettings.europeFeatures];
                              updated[idx] = {
                                ...feature,
                                description: e.target.value,
                              };
                              setAboutSettings({
                                ...aboutSettings,
                                europeFeatures: updated,
                              });
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[60px]"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Values */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Our values</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section heading
                  </label>
                  <input
                    type="text"
                    value={aboutSettings.valuesHeading}
                    onChange={(e) =>
                      setAboutSettings({
                        ...aboutSettings,
                        valuesHeading: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                {[0, 1, 2, 3].map((idx) => {
                  const valueItem =
                    aboutSettings.values[idx] ?? { title: '', description: '' };
                  return (
                    <div key={idx} className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Value {idx + 1} title
                        </label>
                        <input
                          type="text"
                          value={valueItem.title}
                          onChange={(e) => {
                            const updated = [...aboutSettings.values];
                            updated[idx] = {
                              ...valueItem,
                              title: e.target.value,
                            };
                            setAboutSettings({
                              ...aboutSettings,
                              values: updated,
                            });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Value {idx + 1} description
                        </label>
                        <textarea
                          value={valueItem.description}
                          onChange={(e) => {
                            const updated = [...aboutSettings.values];
                            updated[idx] = {
                              ...valueItem,
                              description: e.target.value,
                            };
                            setAboutSettings({
                              ...aboutSettings,
                              values: updated,
                            });
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[60px]"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="submit"
                className="w-full bg-purple-900 text-white py-3 px-6 rounded-lg hover:bg-purple-950 transition-colors font-medium text-lg"
              >
                Save About Us settings
              </button>
            </form>
          </div>
        )}

        {/* Contact details setting View */}
        {currentView === 'contact-settings' && contactSettings && (
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <h2 className="text-4xl font-bold text-purple-900 mb-8 text-center">
              Contact details setting
            </h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!contactSettings) return;
                setError('');
                setSuccess('');
                try {
                  const response = await axios.put(
                    '/api/admin/contact/settings',
                    contactSettings,
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                      },
                    },
                  );
                  setContactSettings(response.data as ContactSettings);
                  setSuccess('Contact details updated successfully');
                } catch (err: any) {
                  setError(
                    err.response?.data?.message ||
                    'Failed to update contact details',
                  );
                }
              }}
              className="space-y-6 max-w-xl mx-auto"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={contactSettings.email}
                  onChange={(e) =>
                    setContactSettings({
                      ...contactSettings,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  value={contactSettings.phone}
                  onChange={(e) =>
                    setContactSettings({
                      ...contactSettings,
                      phone: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address line 1
                </label>
                <input
                  type="text"
                  value={contactSettings.address_line1}
                  onChange={(e) =>
                    setContactSettings({
                      ...contactSettings,
                      address_line1: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address line 2
                </label>
                <input
                  type="text"
                  value={contactSettings.address_line2 ?? ''}
                  onChange={(e) =>
                    setContactSettings({
                      ...contactSettings,
                      address_line2: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-900 text-white py-3 px-6 rounded-lg hover:bg-purple-950 transition-colors font-medium text-lg"
              >
                Save contact details
              </button>
            </form>
          </div>
        )}

        {/* Users View */}
        {currentView === 'users' && (
          <div
            className="bg-white rounded-lg shadow-xl p-4 md:p-8"
          >
            <h2 className="text-4xl font-bold text-purple-900 mb-8 text-center">User Management</h2>
            <div className="overflow-x-auto pb-4">
              <table className="w-full min-w-[800px] table-auto">
                <thead>
                  <tr className="bg-purple-900 text-white">
                    <th className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Email</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Role</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Created</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((userItem) => (
                    <tr key={userItem.id} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{userItem.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{userItem.email}</td>
                      <td className="px-4 py-3 text-sm">
                        <select
                          value={userItem.role}
                          onChange={(e) => handleUpdateRole(userItem.id, e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                          disabled={userItem.id === user?.id} // Can't change own role
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(userItem.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm min-w-[170px]">
                        <div className="flex flex-wrap items-center gap-3 justify-start">
                          <button
                            onClick={() => handleResetPassword(userItem.id)}
                            className="bg-white border-2 border-indigo-200 text-indigo-900 px-4 py-2 rounded-lg text-sm hover:bg-indigo-50 hover:border-indigo-300 transition-all shadow-sm flex items-center gap-2 font-bold"
                            title="Reset password to user123"
                          >
                            <Key className="h-4 w-4 text-indigo-700" />
                            <span>Reset</span>
                          </button>
                          {userItem.id !== user?.id && (
                            <button
                              onClick={() => handleDeleteUser(userItem.id)}
                              className="bg-white border-2 border-red-200 text-red-900 px-4 py-2 rounded-lg text-sm hover:bg-red-50 hover:border-red-300 transition-all shadow-sm flex items-center gap-2 font-bold"
                              title="Delete user"
                            >
                              <Trash2 className="h-4 w-4 text-red-700" />
                              <span>Delete</span>
                            </button>
                          )}
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

        {/* Services View */}
        {
          currentView === 'services' && (
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h2 className="text-4xl font-bold text-purple-900 mb-8 text-center">Services Management</h2>
              <div className="mb-8">
                <button
                  onClick={() => setEditingService(null)}
                  className="bg-purple-900 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors"
                >
                  Add New Service
                </button>
              </div>
              <div className="overflow-x-auto mb-8">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-purple-900 text-white">
                      <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Price</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Available</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service) => (
                      <tr key={service.id} className="border-b border-gray-200">
                        <td className="px-4 py-3 text-sm">{service.name}</td>
                        <td className="px-4 py-3 text-sm">{service.description || '-'}</td>
                        <td className="px-4 py-3 text-sm">{service.price ? `$${service.price}` : '-'}</td>
                        <td className="px-4 py-3 text-sm">{service.available ? 'Yes' : 'No'}</td>
                        <td className="px-4 py-3 text-sm">
                          <button
                            onClick={() => setEditingService(service)}
                            className="text-blue-600 hover:text-blue-800 mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteService(service.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {(editingService || !editingService) && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-purple-900 mb-4">
                    {editingService ? 'Edit Service' : 'Add New Service'}
                  </h3>
                  <form onSubmit={editingService ? handleUpdateService : handleCreateService} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={editingService ? editingService.name : newService.name}
                        onChange={(e) => editingService ? setEditingService({ ...editingService, name: e.target.value }) : setNewService({ ...newService, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={editingService ? editingService.description || '' : newService.description}
                        onChange={(e) => editingService ? setEditingService({ ...editingService, description: e.target.value }) : setNewService({ ...newService, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <input
                        type="number"
                        step="0.01"
                        value={editingService ? editingService.price || '' : newService.price}
                        onChange={(e) => editingService ? setEditingService({ ...editingService, price: parseFloat(e.target.value) || null }) : setNewService({ ...newService, price: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={editingService ? editingService.available : newService.available}
                          onChange={(e) => editingService ? setEditingService({ ...editingService, available: e.target.checked }) : setNewService({ ...newService, available: e.target.checked })}
                          className="mr-2"
                        />
                        Available
                      </label>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="bg-purple-900 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-colors"
                      >
                        {editingService ? 'Update Service' : 'Create Service'}
                      </button>
                      {editingService && (
                        <button
                          type="button"
                          onClick={() => setEditingService(null)}
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              )}
            </div>
          )
        }

        {/* Create User View */}
        {
          currentView === 'create-user' && (
            <div
              className="bg-white rounded-lg shadow-xl p-8"
            >
              <h2 className="text-4xl font-bold text-purple-900 mb-8 text-center">Add New User</h2>
              <form onSubmit={handleCreateUser} className="max-w-md mx-auto" autoComplete="off">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                      autoComplete="off"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                      autoComplete="new-password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-purple-900 text-white py-3 px-6 rounded-lg hover:bg-purple-950 transition-colors font-medium text-lg"
                  >
                    Create User
                  </button>
                </div>
              </form>
            </div>
          )
        }
      </div >
      <Footer />
    </div >
  );
}