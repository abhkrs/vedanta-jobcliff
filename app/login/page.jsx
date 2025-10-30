'use client'
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import PreloaderLink from '@/components/PreloaderLink';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { login } from '../../utils/apihelper';
import { login as loginApi } from '@/utils/apihelper';
import Image from 'next/image';

export default function Page() {
  const [activeTab, setActiveTab] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', mobile: '', password: '' });
  const router = useRouter();

  const validate = () => {
    let valid = true;
    let newErrors = { email: '', mobile: '', password: '' };
    if (activeTab === 'email') {
      if (!email) {
        newErrors.email = 'Email is required';
        valid = false;
      } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        newErrors.email = 'Enter a valid email';
        valid = false;
      }
    } else {
      if (!mobile) {
        newErrors.mobile = 'Mobile number is required';
        valid = false;
      } else if (!/^\d{10}$/.test(mobile.replace(/\D/g, ''))) {
        newErrors.mobile = 'Enter a valid 10-digit mobile number';
        valid = false;
      }
    }
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }
    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    let data = { password };
    if (activeTab === 'email') {
      data.identifier = email;
    } else {
      data.identifier = mobile;
    }
    const result = await loginApi(data);

    if (result.success) {
      toast.success('Login successful!');
      if (result.data.token) {
        localStorage.setItem('token', result.data.token);
      }
      setTimeout(() => {
        router.push('/register');
      }, 1000);
    } else {
      toast.error(result.message || 'Login failed');
    }
  };

  // Clear error on type
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) setErrors({ ...errors, email: '' });
  };
  const handleMobileChange = (e) => {
    setMobile(e.target.value);
    if (errors.mobile) setErrors({ ...errors, mobile: '' });
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) setErrors({ ...errors, password: '' });
  };

  return (
    <section className="bg-[url('/bg.webp')] bg-cover bg-center pt-8">
      <div className="flex container relative z-10">

        <div className="hidden lg:flex lg:w-1/2  items-center justify-center p-12 relative">
          <Image src="/ing.webp" fill alt="img" className="object-contain mt-auto mx-auto" />
        </div>


        <div className="w-full lg:w-1/2 flex items-center justify-center md:p-8 mb-12">
          <div className="w-full max-w-md ">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-3">Welcome Back</h1>
              <p className="text-sm">Please login to your account to discover latest career opportunity.</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex gap-2 mb-4 bg-prime/10 p-1 rounded-full text-center">
                <button
                  onClick={() => setActiveTab('email')}
                  className={`py-1 px-3 font-medium text-sm flex-1 ${activeTab === 'email'
                    ? 'bg-white rounded-full shadow'
                    : ''
                    }`}
                >
                  Email Id
                </button>
                <button
                  onClick={() => setActiveTab('mobile')}
                  className={`py-1 px-3 font-medium text-sm flex-1 ${activeTab === 'mobile'
                    ? 'bg-white rounded-full shadow'
                    : ''
                    }`}
                >
                  Mobile
                </button>
              </div>

              <div className="space-y-4">
                {activeTab === 'email' ? (
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Id
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="jhondoe@gmail.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                ) : (
                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      value={mobile}
                      onChange={handleMobileChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none"
                    />
                    {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                  </div>
                )}

                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      placeholder="••••••••••••••••"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none pr-12"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                    >
                      {!showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center font-semibold cursor-pointer">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Remember Me</span>
                  </label>
                  <PreloaderLink href="#" className="text-sm hover:text-prime underline">
                    Forgot Password?
                  </PreloaderLink>
                </div>

                <button
                  onClick={handleLogin}
                  className="w-full bg-prime text-white py-3 rounded-full font-medium hover:opacity-90"
                >
                  Login
                </button>

                <p className="text-center text-sm">
                  Don't have an account?{' '}
                  <PreloaderLink href="/join" className="text-prime font-medium">
                    Register Now
                  </PreloaderLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}