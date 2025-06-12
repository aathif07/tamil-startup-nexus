  import React, { useState } from 'react';
  import { motion } from 'framer-motion';
  import { Eye, EyeOff, LogIn } from 'lucide-react';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  import { Link, useNavigate } from 'react-router-dom';
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { doc, getDoc } from 'firebase/firestore';
  import { auth, db } from '@/lib/firebase';

  const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
    
      try {
        // Sign in with Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        // Get user role from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        const userData = userDoc.data();
      
        // Store authentication data
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userId', user.uid);
        localStorage.setItem('userEmail', user.email || '');
      
        // Check if user is admin or regular user
        if (userData?.role === 'admin' || formData.email === 'admin@startup.tn') {
          localStorage.setItem('userRole', 'admin');
          navigate('/admin-dashboard');
        } else {
          localStorage.setItem('userRole', 'user');
          navigate('/user-dashboard');
        }
      } catch (error: any) {
        console.error('Login error:', error);
        let errorMessage = 'Login failed. Please try again.';
      
        switch (error.code) {
          case 'auth/user-not-found':
            errorMessage = 'No account found with this email.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email address.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many failed attempts. Please try again later.';
            break;
        }
      
        alert(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm sm:max-w-md"
        >
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center pb-2 px-4 sm:px-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="text-white" size={20} />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <p className="text-gray-600 text-sm sm:text-base">Sign in to your account</p>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                    className="w-full"
                  />
                </div>
              
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                      disabled={loading}
                      className="w-full pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-red-600 hover:text-red-700 font-medium">
                    Sign up
                  </Link>
                </p>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
                <p className="font-medium mb-1">Demo Admin Credentials:</p>
                <p>Email: admin@startup.tn</p>
                <p>Password: admin123</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  };

  export default Login;
