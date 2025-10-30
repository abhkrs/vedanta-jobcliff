'use client'
import { FolderUp } from 'lucide-react';
import { useState } from 'react';
import PreloaderLink from '@/components/PreloaderLink';
import { toast } from 'react-toastify';
import { register as registerApi } from '@/utils/apihelper';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Page() {
      const router = useRouter();
    
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [designation, setDesignation] = useState('');
    const [password, setPassword] = useState('');
    const [resume, setResume] = useState(null);
    const [whatsappAlerts, setWhatsappAlerts] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        phone: '',
        designation: '',
        password: '',
        resume: '',
    });

    const validateField = (field) => {
        let message = '';
        if (field === 'fullName') {
            if (!fullName.trim()) message = 'Full name is required';
        }
        if (field === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) message = 'Enter a valid email address';
        }
        if (field === 'phone') {
            // Normalize by removing non-digit characters
            const cleaned = (phone || '').replace(/\D/g, '');
            if (!cleaned) {
                message = 'Phone number is required';
            } else if (cleaned.length !== 10) {
                message = 'Enter a valid 10-digit phone number';
            }
        }
        if (field === 'designation') {
            if (!designation.trim()) message = 'Designation is required';
        }
        if (field === 'password') {
            if (!password || password.length < 6) message = 'Password must be at least 6 characters';
        }
        if (field === 'resume') {
            if (!resume) message = 'Resume is required';
            else {
                const allowed = [
                    'application/pdf',
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                ];
                if (!allowed.includes(resume.type)) message = 'Resume must be PDF or DOC/DOCX';
                const maxSize = 5 * 1024 * 1024; // 5MB
                if (!message && resume.size > maxSize) message = 'Resume must be under 5MB';
            }
        }
        setErrors(prev => ({ ...prev, [field]: message }));
        return message;
    };

    const validateAll = () => {
        const fields = ['fullName', 'email', 'phone', 'designation', 'password', 'resume'];
        const messages = fields.map(validateField);
        return messages.every(m => !m);
    };

    const handleRegister = async () => {
        const ok = validateAll();
        if (!ok) return;
        setSubmitting(true);
        try {
            const result = await registerApi({
                fullName,
                email,
                phone,
                password,
                designation,
                resume,
                whatsappAlerts,
            });
            if (result?.success) {
                toast.success(result.message || 'Registration successful');
                // Optionally reset form
                setFullName('');
                setEmail('');
                setPhone('');
                setDesignation('');
                setResume(null);
                setWhatsappAlerts(false);
                setErrors({ fullName: '', email: '', phone: '', designation: '', resume: '' });
           
           if (result.data.token) {
        localStorage.setItem('token', result.data.token);
      }
      setTimeout(() => {
        router.push('/register');
      }, 1000);
           
            } else {
                toast.error(result?.message || 'Registration failed');
            }
        } catch (e) {
            toast.error(e?.message || 'Registration failed');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="bg-[url('/bg.webp')] bg-cover bg-center pt-4">
            <div className="flex container relative z-10">

                <div className="hidden lg:flex lg:w-1/2  items-center justify-center relative mb-28">
                    <Image src="/ing.webp" fill alt="img" className="object-contain mx-auto -ms-18" />
                </div>

                <div className="w-full lg:w-1/2 flex items-center justify-center md:p-8 mb-12">
                    <div className="w-full max-w-xl">
                        <div className="mb-8">
                            <h1 className="text-3xl font-bold mb-3">Create Account</h1>
                            <p className="text-sm">Create an account using valid details to discover latest career opportunities.</p>
                        </div>

                        <div className="bg-white rounded-xl shadow p-6">
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="fullName" className="block text-sm font-medium mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            value={fullName}
                                            onChange={(e) => { setFullName(e.target.value); if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' })); }}
                                            onBlur={() => validateField('fullName')}
                                            placeholder="Jhon Doe"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none"
                                        />
                                        {errors.fullName && (<p className="text-xs text-red-600 mt-1">{errors.fullName}</p>)}
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                                            Email Id
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors(prev => ({ ...prev, email: '' })); }}
                                            onBlur={() => validateField('email')}
                                            placeholder="jhondoe@gmail.com"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none"
                                        />
                                        {errors.email && (<p className="text-xs text-red-600 mt-1">{errors.email}</p>)}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={phone}
                                            onChange={(e) => { setPhone(e.target.value); if (errors.phone) setErrors(prev => ({ ...prev, phone: '' })); }}
                                            onBlur={() => validateField('phone')}
                                            placeholder="98765 43210"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none"
                                        />
                                        {errors.phone && (<p className="text-xs text-red-600 mt-1">{errors.phone}</p>)}
                                    </div>
                                    <div>
                                        <label htmlFor="designation" className="block text-sm font-medium mb-2">
                                            Experience
                                        </label>
                                        <input
                                            type="text"
                                            id="designation"
                                            value={designation}
                                            onChange={(e) => { setDesignation(e.target.value); if (errors.designation) setErrors(prev => ({ ...prev, designation: '' })); }}
                                            onBlur={() => validateField('designation')}
                                            placeholder="Fresher"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none"
                                        />
                                        {errors.designation && (<p className="text-xs text-red-600 mt-1">{errors.designation}</p>)}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-2">
                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium mb-2">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(e) => { setPassword(e.target.value); if (errors.password) setErrors(prev => ({ ...prev, password: '' })); }}
                                            onBlur={() => validateField('password')}
                                            placeholder="At least 6 characters"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-prime focus:border-prime outline-none"
                                        />
                                        {errors.password && (<p className="text-xs text-red-600 mt-1">{errors.password}</p>)}
                                    
                                </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Upload Resume
                                    </label>
                                    <div className="border border-gray-300 rounded-lg p-6 text-center">
                                        <FolderUp className='fill-prime text-white mx-auto' size={50} />
                                        <p className="text-sm text-gray-500 mb-2">Drop your Resume to Upload</p>
                                        <div className="text-xs text-gray-400 mb-3">
                                            <div className="relative w-46 mx-auto">
                                                <span className="border-b absolute w-20 left-0 bottom-2"></span>
                                                OR
                                                <span className="border-b absolute w-20 right-0 bottom-2"></span>
                                            </div>
                                        </div>
                                        <input
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => { setResume(e.target.files[0]); if (errors.resume) setErrors(prev => ({ ...prev, resume: '' })); }}
                                            className="hidden"
                                            id="resume"
                                        />
                                        <label htmlFor="resume" className="!text-prime cursor-pointer rounded-full border border-prime px-4 py-1.5">
                                            {resume ? 'Change File' : 'Browse Files'}
                                        </label>
                                        {resume && (
                                            <p className="text-sm text-gray-600 mt-2">Selected: {resume.name}</p>
                                        )}
                                        <p className="text-xs text-red-600 mt-2">Maximum file size: 2 MB</p>
                                    </div>
                                    {errors.resume && (<p className="text-xs text-red-600 mt-1">{errors.resume}</p>)}
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="whatsapp"
                                        checked={whatsappAlerts}
                                        onChange={(e) => setWhatsappAlerts(e.target.checked)}
                                        className="mr-2"
                                    />
                                    <label htmlFor="whatsapp" className="text-sm font-medium cursor-pointer">
                                        Receive Job Alerts on WhatsApp
                                    </label>
                                </div>

                                <button
                                    onClick={handleRegister}
                                    disabled={submitting}
                                    className="w-full bg-prime text-white py-2 rounded-full font-medium hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {submitting ? 'Submitting...' : 'Register'}
                                </button>

                                <p className="text-center text-sm">
                                    Already have an account?{' '}
                                    <PreloaderLink href="/login" className="text-prime font-medium">
                                        Login
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