import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, GraduationCap, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';

const roleOptions = [
  { value: 'student', label: '师范生', icon: GraduationCap },
  { value: 'teacher', label: '指导教师', icon: User },
  { value: 'admin', label: '管理员', icon: User },
];

const majorOptions = [
  { value: 'math', label: '数学教育', category: '理科' },
  { value: 'chinese', label: '语文教育', category: '文科' },
  { value: 'physics', label: '物理教育', category: '理科' },
  { value: 'chemistry', label: '化学教育', category: '理科' },
  { value: 'biology', label: '生物教育', category: '理科' },
  { value: 'english', label: '英语教育', category: '文科' },
  { value: 'history', label: '历史教育', category: '文科' },
  { value: 'geography', label: '地理教育', category: '理科' },
  { value: 'music', label: '音乐教育', category: '艺术' },
  { value: 'art', label: '美术教育', category: '艺术' },
  { value: 'pe', label: '体育教育', category: '体育' },
  { value: 'tech', label: '教育技术学', category: '综合' },
  { value: 'primary', label: '小学教育', category: '综合' },
  { value: 'preschool', label: '学前教育', category: '综合' },
  { value: 'computer', label: '计算机师范', category: '理科' },
  { value: 'special', label: '特殊教育', category: '综合' },
];

export function Register() {
  const navigate = useNavigate();
  const { setUser } = useAppStore();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    major: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = '请输入用户名';
    } else if (formData.username.length < 2) {
      newErrors.username = '用户名至少需要2个字符';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = '请输入邮箱';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }
    
    if (!formData.password) {
      newErrors.password = '请输入密码';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码至少需要6个字符';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '请确认密码';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }
    
    if (!formData.major) {
      newErrors.major = '请选择专业方向';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const user = {
      id: `user_${Date.now()}`,
      name: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role as 'student' | 'teacher' | 'admin',
      major: formData.major,
      className: formData.role === 'student' ? `${formData.major}专业2024级` : '',
      avatar: '',
      school: '教育学院',
      department: majorOptions.find(m => m.value === formData.major)?.label || '教育系',
    };
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('registeredUsers', JSON.stringify([
      ...JSON.parse(localStorage.getItem('registeredUsers') || '[]'),
      user
    ]));
    
    setUser(user);
    setMessage('注册成功！正在跳转...');
    
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-12 text-center">
            <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Thinks行世教育</h1>
            <p className="text-white/80">AI智联体赋能强师工程</p>
          </div>
          
          <div className="p-8">
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center"
              >
                {message}
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">用户名</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleChange('username', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.username ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-purple-500'
                      }`}
                      placeholder="请输入用户名"
                    />
                  </div>
                  {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-purple-500'
                      }`}
                      placeholder="example@thinks.edu.cn"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">密码</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-purple-500'
                      }`}
                      placeholder="请输入密码"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">确认密码</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.confirmPassword ? 'border-red-300 focus:ring-red-500' : 'border-gray-200 focus:ring-purple-500'
                      }`}
                      placeholder="再次输入密码"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">身份类型</label>
                <div className="grid grid-cols-3 gap-3">
                  {roleOptions.map((role) => (
                    <button
                      key={role.value}
                      type="button"
                      onClick={() => handleChange('role', role.value)}
                      className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
                        formData.role === role.value
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                      }`}
                    >
                      <role.icon className="w-6 h-6" />
                      <span className="text-sm font-medium">{role.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  专业方向 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  {majorOptions.map((major) => (
                    <button
                      key={major.value}
                      type="button"
                      onClick={() => handleChange('major', major.value)}
                      className={`px-3 py-2 rounded-lg text-sm border transition-all ${
                        formData.major === major.value
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      {major.label}
                    </button>
                  ))}
                </div>
                {errors.major && <p className="mt-2 text-sm text-red-500">{errors.major}</p>}
              </div>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
              >
                注册账号
              </motion.button>
            </form>
            
            <div className="mt-6 text-center">
              <span className="text-gray-500">已有账号？</span>
              <button
                onClick={() => navigate('/login')}
                className="ml-2 text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1 inline-flex"
              >
                立即登录 <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
