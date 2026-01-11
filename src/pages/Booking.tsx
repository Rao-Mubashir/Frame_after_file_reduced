import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { Eye, EyeOff, CheckCircle2, AlertCircle, Calendar, Clock } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../components/ui/select';
import axios from 'axios';

const API_BASE_URL = '/api';

type BookingFormData = {
  category_id: string;
  sub_category_id: string;
  instance_id: string;
  booking_date: string;
  time_slot: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

type Category = {
  id: number;
  name: string;
  slug: string;
};

type SubCategory = {
  id: number;
  name: string;
  price_per_hour: number;
};

type Instance = {
  id: number;
  name: string;
  identifier: string;
};

type TimeSlot = {
  start: string;
  end: string;
  label: string;
};

export default function Booking() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Data states
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [instances, setInstances] = useState<Instance[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<BookingFormData>();

  const password = watch('password');
  const categoryId = watch('category_id');
  const subCategoryId = watch('sub_category_id');
  const instanceId = watch('instance_id');
  const bookingDate = watch('booking_date');

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get(`${API_BASE_URL}/user`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data) {
            setIsAuthenticated(true);
          }
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/categories`);
        console.log('Fetched categories:', response.data);
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);
  // Fetch sub-categories when category changes
  useEffect(() => {
    if (categoryId) {
      const fetchSubCategories = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/categories/${categoryId}/sub-categories`);
          const seenNames = new Set();
          const uniqueSubCats = response.data.filter((item: SubCategory) => {
            if (seenNames.has(item.name)) return false;
            seenNames.add(item.name);
            return true;
          });
          setSubCategories(uniqueSubCats as SubCategory[]);
          setInstances([]);
          setTimeSlots([]);
          setValue('sub_category_id', '');
          setValue('instance_id', '');
        } catch (err) {
          console.error('Error fetching sub-categories:', err);
        }
      };
      fetchSubCategories();
    }
  }, [categoryId, setValue]);

  // Fetch instances when sub-category changes
  useEffect(() => {
    if (subCategoryId) {
      const fetchInstances = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/sub-categories/${subCategoryId}/instances`);
          setInstances(response.data);
          setTimeSlots([]);
          setValue('instance_id', '');

          // Set price
          const subCat = subCategories.find(sc => sc.id === parseInt(subCategoryId));
          if (subCat) {
            setSelectedPrice(subCat.price_per_hour);
          }
        } catch (err) {
          console.error('Error fetching instances:', err);
        }
      };
      fetchInstances();
    }
  }, [subCategoryId, setValue, subCategories]);

  // Fetch time slots when instance and date are selected
  useEffect(() => {
    if (instanceId && bookingDate) {
      const fetchTimeSlots = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/bookings/available-slots`, {
            params: { instance_id: instanceId, date: bookingDate }
          });
          setTimeSlots(response.data.slots || []);
        } catch (err) {
          console.error('Error fetching time slots:', err);
        }
      };
      fetchTimeSlots();
    }
  }, [instanceId, bookingDate]);

  const onSubmit = async (data: BookingFormData) => {
    setLoading(true);
    setError('');

    try {
      const [startTime, endTime] = data.time_slot.split('-');

      const bookingData = {
        category_id: data.category_id,
        sub_category_id: data.sub_category_id,
        instance_id: data.instance_id,
        booking_date: data.booking_date,
        start_time: startTime.trim(),
        end_time: endTime.trim(),
        ...((!isAuthenticated) && {
          name: data.name,
          email: data.email,
          password: data.password,
        })
      };

      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData, { headers });

      // If new user was created, save token
      if (response.data.user && !isAuthenticated) {
        // You might want to get a token from the response
        setIsAuthenticated(true);
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Booking failed. Please try again.');
      console.error('Booking error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-[#F5F1E8] via-white to-[#FAF8F4] flex items-center justify-center px-4 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl w-full bg-white rounded-[3rem] shadow-2xl p-16 text-center border border-gray-100"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto mb-8" />
            </motion.div>
            <h2 className="text-gray-900 mb-6">Booking Confirmed!</h2>
            <p className="text-gray-600 text-xl mb-8 leading-relaxed">
              Your booking has been successfully confirmed. We look forward to seeing you at Frame 2 Complex!
            </p>
            <button
              onClick={() => window.location.href = '/'}
              className="px-10 py-4 bg-purple-900 text-white rounded-full hover:bg-purple-950 transition-all hover:scale-105 transform shadow-lg"
            >
              Return to Home
            </button>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#F5F1E8] via-white to-[#FAF8F4] py-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-gray-900 mb-6 text-4xl font-bold">Book Your Experience</h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
              Select your preferred activity, date, and time slot to complete your booking.
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-[3rem] shadow-2xl p-12 border border-gray-100"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  <p className="text-red-800">{error}</p>
                </motion.div>
              )}

              {/* Category Selection */}
              <div>
                <label htmlFor="category" className="block text-gray-800 mb-3 text-lg font-medium">
                  Select Category <span className="text-purple-900">*</span>
                </label>
                <Controller
                  name="category_id"
                  control={control}
                  rules={{ required: 'Please select a category' }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <SelectTrigger
                        id="category"
                        className={`bg-[#F5F1E8] border-2 border-transparent ${errors.category_id ? 'border-red-500' : ''}`}
                      >
                        <SelectValue placeholder="Choose a category..." />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id.toString()}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category_id && (
                  <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    {errors.category_id.message}
                  </p>
                )}
              </div>

              {/* Sub-Category Selection */}
              {categoryId && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="sub_category" className="block text-gray-800 mb-3 text-lg font-medium">
                    Select Service Type <span className="text-purple-900">*</span>
                  </label>
                  <Controller
                    name="sub_category_id"
                    control={control}
                    rules={{ required: 'Please select a service type' }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <SelectTrigger
                          id="sub_category"
                          className={`bg-[#F5F1E8] border-2 border-transparent ${errors.sub_category_id ? 'border-red-500' : ''}`}
                        >
                          <SelectValue placeholder="Choose a service..." />
                        </SelectTrigger>
                        <SelectContent>
                          {subCategories.map((subCat) => (
                            <SelectItem key={subCat.id} value={subCat.id.toString()}>
                              {subCat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.sub_category_id && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.sub_category_id.message}
                    </p>
                  )}
                </motion.div>
              )}

              {/* Instance Selection */}
              {subCategoryId && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="instance" className="block text-gray-800 mb-3 text-lg font-medium">
                    Select Specific Unit <span className="text-purple-900">*</span>
                  </label>
                  <Controller
                    name="instance_id"
                    control={control}
                    rules={{ required: 'Please select a unit' }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <SelectTrigger
                          id="instance"
                          className={`bg-[#F5F1E8] border-2 border-transparent ${errors.instance_id ? 'border-red-500' : ''}`}
                        >
                          <SelectValue placeholder="Choose a unit..." />
                        </SelectTrigger>
                        <SelectContent>
                          {instances.map((inst) => (
                            <SelectItem key={inst.id} value={inst.id.toString()}>
                              {inst.name} ({inst.identifier})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.instance_id && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.instance_id.message}
                    </p>
                  )}
                </motion.div>
              )}

              {/* Date Selection */}
              {instanceId && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <label htmlFor="booking_date" className="block text-gray-800 mb-3 text-lg font-medium">
                    Select Date <span className="text-purple-900">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                      id="booking_date"
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      {...register('booking_date', { required: 'Please select a date' })}
                      className={`w-full pl-14 pr-6 py-4 bg-[#F5F1E8] border-2 rounded-2xl focus:outline-none focus:border-purple-900 transition-colors text-gray-800 ${errors.booking_date ? 'border-red-500' : 'border-transparent'
                        }`}
                    />
                  </div>
                  {errors.booking_date && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.booking_date.message}
                    </p>
                  )}
                </motion.div>
              )}

              {/* Time Slot Selection */}
              {bookingDate && timeSlots.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="block text-gray-800 mb-3 text-lg font-medium">
                    Select Time Slot <span className="text-purple-900">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {timeSlots.map((slot, index) => (
                      <label
                        key={index}
                        className="relative cursor-pointer"
                      >
                        <input
                          type="radio"
                          value={`${slot.start}-${slot.end}`}
                          {...register('time_slot', { required: 'Please select a time slot' })}
                          className="peer sr-only"
                        />
                        <div className="px-4 py-3 bg-[#F5F1E8] border-2 border-transparent rounded-xl text-center transition-all peer-checked:border-purple-900 peer-checked:bg-purple-50 hover:border-purple-300">
                          <Clock className="w-4 h-4 mx-auto mb-1 text-gray-600 peer-checked:text-purple-900" />
                          <p className="text-sm font-medium text-gray-800">{slot.label}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {errors.time_slot && (
                    <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {errors.time_slot.message}
                    </p>
                  )}
                </motion.div>
              )}

              {bookingDate && timeSlots.length === 0 && instanceId && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4">
                  <p className="text-yellow-800">No available time slots for this date. Please select a different date.</p>
                </div>
              )}

              {/* User Information - Only if not authenticated */}
              {!isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-t-2 border-gray-200 pt-8 space-y-6"
                >
                  <h3 className="text-gray-900 text-2xl font-bold mb-6">Your Information</h3>

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-gray-800 mb-3 text-lg">
                      Full Name <span className="text-purple-900">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      {...register('name', { required: !isAuthenticated && 'Name is required' })}
                      className={`w-full px-6 py-4 bg-white border-2 rounded-2xl focus:outline-none focus:border-purple-900 transition-all text-gray-800 ${errors.name ? 'border-red-500' : 'border-transparent shadow-sm'
                        }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-gray-800 mb-3 text-lg">
                      Email <span className="text-purple-900">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register('email', {
                        required: !isAuthenticated && 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className={`w-full px-6 py-4 bg-white border-2 rounded-2xl focus:outline-none focus:border-purple-900 transition-all text-gray-800 ${errors.email ? 'border-red-500' : 'border-transparent shadow-sm'
                        }`}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-gray-800 mb-3 text-lg">
                      Password <span className="text-purple-900">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', {
                          required: !isAuthenticated && 'Password is required',
                          minLength: {
                            value: 8,
                            message: 'Password must be at least 8 characters',
                          },
                        })}
                        className={`w-full px-6 py-4 bg-white border-2 rounded-2xl focus:outline-none focus:border-purple-900 transition-all text-gray-800 pr-14 ${errors.password ? 'border-red-500' : 'border-transparent shadow-sm'
                          }`}
                        placeholder="Create a password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-gray-800 mb-3 text-lg">
                      Confirm Password <span className="text-purple-900">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...register('confirmPassword', {
                          required: !isAuthenticated && 'Please confirm your password',
                          validate: (value) => !isAuthenticated && (value === password || 'Passwords do not match'),
                        })}
                        className={`w-full px-6 py-4 bg-white border-2 rounded-2xl focus:outline-none focus:border-purple-900 transition-all text-gray-800 pr-14 ${errors.confirmPassword ? 'border-red-500' : 'border-transparent shadow-sm'
                          }`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-600 text-sm mt-2 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Price Display */}


              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`w-full py-5 bg-purple-900 text-white rounded-2xl hover:bg-purple-950 transition-all shadow-lg text-lg font-medium ${loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
              >
                {loading ? 'Processing...' : 'Complete Booking'}
              </motion.button>
            </form>
          </motion.div>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-gray-600 mt-8 text-sm"
          >
            By submitting this form, you agree to our Terms & Conditions and Privacy Policy
          </motion.p>
        </div>
      </div>
      <Footer />
    </>
  );
}