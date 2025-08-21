// app/page.js
'use client';
import {useState, useEffect, useRef} from 'react';
import {motion, AnimatePresence} from 'framer-motion';

export default function AuthPage() {
	const [isLoginMode, setIsLoginMode] = useState(true);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const containerRef = useRef(null);

	const toggleMode = () => {
		setIsLoginMode(!isLoginMode);
		setErrorMessage('');
		setSuccessMessage('');
	};

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
	};

	const handleSubmit = (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		setLoading(true);
		setErrorMessage('');
		setSuccessMessage('');

		// Simulate API call
		setTimeout(() => {
			setLoading(false);
			if (isLoginMode) {
				// Login logic
				if (email === 'user@example.com' && password === 'password') {
					setSuccessMessage('Login successful! Redirecting...');
				} else {
					setErrorMessage('Invalid email or password');
				}
			} else {
				// Signup logic
				if (password !== confirmPassword) {
					setErrorMessage('Passwords do not match');
				} else {
					setSuccessMessage('Account created successfully!');
					setTimeout(() => setIsLoginMode(true), 2000);
				}
			}
		}, 1500);
	};

	// Set dark mode class on body
	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [isDarkMode]);

	return (
		<div
			className={`min-h-screen flex items-center justify-center transition-all duration-700 ${isDarkMode ? 'bg-gradient-to-br from-[#0A0A0A] to-[#1A1A2E]' : 'bg-gradient-to-br from-[#F0F9FF] to-[#E0F7FA]'}`}>
			<motion.div
				ref={containerRef}
				initial={{scale: 0.9, opacity: 0}}
				animate={{scale: 1, opacity: 1}}
				transition={{duration: 0.7, type: 'spring'}}
				className={`relative w-full max-w-4xl mx-4 p-10 rounded-3xl shadow-2xl backdrop-blur-sm transition-all duration-700 ${
					isDarkMode
						? 'bg-[#1F2937]/90 border border-[#374151]'
						: 'bg-white/90 border border-[#E5E7EB]'
				}`}
			>
				<div className="flex flex-col md:flex-row items-center gap-10">
					{/* Left Column - Branding */}
					<motion.div
						className="flex-1 text-center md:text-left"
						initial={{x: -20, opacity: 0}}
						animate={{x: 0, opacity: 1}}
						transition={{delay: 0.2}}
					>
						<div className="flex justify-center md:justify-start mb-6">
							<motion.div
								animate={{
									rotate: [0, 10, -10, 5, 0],
									scale: [1, 1.1, 1.05, 1.1, 1]
								}}
								transition={{
									duration: 2,
									repeat: Infinity,
									repeatType: "reverse"
								}}
								className="bg-gradient-to-r from-[#6366F1] to-[#14B8A6] dark:from-[#818CF8] dark:to-[#2DD4BF] w-24 h-24 rounded-2xl flex items-center justify-center shadow-lg"
							>
								<motion.span
									animate={{scale: [1, 1.2, 1]}}
									transition={{
										duration: 3,
										repeat: Infinity,
										repeatType: "reverse"
									}}
									className="text-white font-bold text-4xl"
								>
									N
								</motion.span>
							</motion.div>
						</div>

						<motion.div
							initial={{y: 20, opacity: 0}}
							animate={{y: 0, opacity: 1}}
							transition={{delay: 0.3}}
						>
							<h1
								className={`text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${isDarkMode ? 'from-[#818CF8] to-[#2DD4BF]' : 'from-[#6366F1] to-[#14B8A6]'}`}>
								NovaCast
							</h1>
							<p
								className={`text-xl transition-colors duration-300 ${isDarkMode ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}>
								{isLoginMode
									? 'Welcome back to your productivity hub'
									: 'Join our community of creators'}
							</p>

							<div className="mt-8 hidden md:block">
								<div className={`h-1 w-20 rounded-full ${isDarkMode ? 'bg-[#2DD4BF]' : 'bg-[#14B8A6]'}`}></div>
								<p className={`mt-4 text-lg italic ${isDarkMode ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}>
									"Where ideas become reality"
								</p>
							</div>
						</motion.div>
					</motion.div>

					{/* Right Column - Form */}
					<div className="flex-1 w-full max-w-md">
						{/* Theme toggle */}
						<motion.button
							whileHover={{scale: 1.1}}
							whileTap={{scale: 0.9}}
							onClick={toggleDarkMode}
							className={`absolute top-6 right-6 p-2 rounded-full transition-all duration-300 z-10 ${
								isDarkMode
									? 'bg-[#374151] text-[#2DD4BF] hover:bg-[#4B5563]'
									: 'bg-[#E5E7EB] text-[#14B8A6] hover:bg-[#D1D5DB]'
							}`}
							aria-label="Toggle dark mode"
						>
							{isDarkMode ? (
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
									<path fillRule="evenodd"
												d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
												clipRule="evenodd"/>
								</svg>
							) : (
								<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
									<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
								</svg>
							)}
						</motion.button>

						{/* Floating Particles Background */}
						<div className="absolute inset-0 overflow-hidden rounded-3xl z-0">
							{[...Array(15)].map((_, i) => (
								<motion.div
									key={i}
									initial={{
										x: Math.random() * 100,
										y: Math.random() * 100,
										scale: 0
									}}
									animate={{
										x: Math.random() * 100,
										y: Math.random() * 100,
										scale: Math.random() * 0.5 + 0.5,
										rotate: Math.random() * 360
									}}
									transition={{
										duration: Math.random() * 10 + 10,
										repeat: Infinity,
										repeatType: "reverse"
									}}
									className={`absolute rounded-full opacity-20 ${
										isDarkMode ? 'bg-[#818CF8]' : 'bg-[#6366F1]'
									}`}
									style={{
										width: `${Math.random() * 40 + 10}px`,
										height: `${Math.random() * 40 + 10}px`,
										top: `${Math.random() * 100}%`,
										left: `${Math.random() * 100}%`,
									}}
								/>
							))}
						</div>

						<div className="relative z-10">
							{/* Title */}
							<motion.div
								initial={{y: 20, opacity: 0}}
								animate={{y: 0, opacity: 1}}
								transition={{delay: 0.2}}
								className="text-center mb-8"
							>
								<h2 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
									{isLoginMode ? 'Sign in to your account' : 'Create a new account'}
								</h2>
								<p className={`transition-colors duration-300 ${isDarkMode ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}>
									{isLoginMode ? 'Enter your credentials to continue' : 'Get started with NovaCast'}
								</p>
							</motion.div>

							{/* Toggle mode */}
							<motion.div
								initial={{y: 20, opacity: 0}}
								animate={{y: 0, opacity: 1}}
								transition={{delay: 0.3}}
								className="flex justify-center mb-8"
							>
								<div
									className={`flex p-1 rounded-xl transition-all duration-500 ${isDarkMode ? 'bg-[#374151]' : 'bg-[#E5E7EB]'}`}>
									<button
										onClick={() => setIsLoginMode(true)}
										className={`px-6 py-2 rounded-xl font-medium transition-all duration-500 ${
											isLoginMode
												? `${isDarkMode ? 'bg-[#2DD4BF] text-[#0D0D0D]' : 'bg-[#14B8A6] text-white'}`
												: `${isDarkMode ? 'text-[#9CA3AF] hover:text-[#F9FAFB]' : 'text-[#6B7280] hover:text-[#111827]'}`
										}`}
									>
										Login
									</button>
									<button
										onClick={() => setIsLoginMode(false)}
										className={`px-6 py-2 rounded-xl font-medium transition-all duration-500 ${
											!isLoginMode
												? `${isDarkMode ? 'bg-[#2DD4BF] text-[#0D0D0D]' : 'bg-[#14B8A6] text-white'}`
												: `${isDarkMode ? 'text-[#9CA3AF] hover:text-[#F9FAFB]' : 'text-[#6B7280] hover:text-[#111827]'}`
										}`}
									>
										Sign Up
									</button>
								</div>
							</motion.div>

							{/* Messages */}
							<AnimatePresence>
								{successMessage && (
									<motion.div
										initial={{height: 0, opacity: 0}}
										animate={{height: 'auto', opacity: 1}}
										exit={{height: 0, opacity: 0}}
										className={`mb-4 p-3 rounded-lg flex items-center transition-all duration-300 ${isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'}`}
									>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20"
												 fill="currentColor">
											<path fillRule="evenodd"
														d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
														clipRule="evenodd"/>
										</svg>
										{successMessage}
									</motion.div>
								)}

								{errorMessage && (
									<motion.div
										initial={{height: 0, opacity: 0}}
										animate={{height: 'auto', opacity: 1}}
										exit={{height: 0, opacity: 0}}
										className={`mb-4 p-3 rounded-lg flex items-center transition-all duration-300 ${isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'}`}
									>
										<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20"
												 fill="currentColor">
											<path fillRule="evenodd"
														d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
														clipRule="evenodd"/>
										</svg>
										{errorMessage}
									</motion.div>
								)}
							</AnimatePresence>

							{/* Form */}
							<motion.form
								onSubmit={handleSubmit}
								initial={{y: 20, opacity: 0}}
								animate={{y: 0, opacity: 1}}
								transition={{delay: 0.4}}
							>
								{!isLoginMode && (
									<motion.div
										initial={{height: 0, opacity: 0, y: -20}}
										animate={{height: 'auto', opacity: 1, y: 0}}
										exit={{height: 0, opacity: 0, y: -20}}
										transition={{duration: 0.4}}
										className="mb-4"
									>
										<label htmlFor="name"
													 className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}>
											Full Name
										</label>
										<input
											id="name"
											type="text"
											value={name}
											onChange={(e) => setName(e.target.value)}
											className={`w-full px-4 py-3 rounded-xl transition-all duration-300 ${
												isDarkMode
													? 'bg-[#374151] border-[#4B5563] text-[#F9FAFB] focus:ring-[#818CF8] focus:border-[#818CF8]'
													: 'bg-white border-[#E5E7EB] text-[#111827] focus:ring-[#6366F1] focus:border-[#6366F1]'
											} border focus:outline-none focus:ring-2`}
											placeholder="Enter your name"
											required={!isLoginMode}
										/>
									</motion.div>
								)}

								<div className="mb-4">
									<label htmlFor="email"
												 className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}>
										Email Address
									</label>
									<input
										id="email"
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className={`w-full px-4 py-3 rounded-xl transition-all duration-300 ${
											isDarkMode
												? 'bg-[#374151] border-[#4B5563] text-[#F9FAFB] focus:ring-[#818CF8] focus:border-[#818CF8]'
												: 'bg-white border-[#E5E7EB] text-[#111827] focus:ring-[#6366F1] focus:border-[#6366F1]'
										} border focus:outline-none focus:ring-2`}
										placeholder="you@example.com"
										required
									/>
								</div>

								<div className="mb-4">
									<label htmlFor="password"
												 className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}>
										Password
									</label>
									<input
										id="password"
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className={`w-full px-4 py-3 rounded-xl transition-all duration-300 ${
											isDarkMode
												? 'bg-[#374151] border-[#4B5563] text-[#F9FAFB] focus:ring-[#818CF8] focus:border-[#818CF8]'
												: 'bg-white border-[#E5E7EB] text-[#111827] focus:ring-[#6366F1] focus:border-[#6366F1]'
										} border focus:outline-none focus:ring-2`}
										placeholder="••••••••"
										required
									/>
								</div>

								{!isLoginMode && (
									<motion.div
										initial={{height: 0, opacity: 0, y: -20}}
										animate={{height: 'auto', opacity: 1, y: 0}}
										exit={{height: 0, opacity: 0, y: -20}}
										transition={{duration: 0.4}}
										className="mb-6"
									>
										<label htmlFor="confirmPassword"
													 className={`block text-sm font-medium mb-2 transition-colors duration-300 ${isDarkMode ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}>
											Confirm Password
										</label>
										<input
											id="confirmPassword"
											type="password"
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											className={`w-full px-4 py-3 rounded-xl transition-all duration-300 ${
												isDarkMode
													? 'bg-[#374151] border-[#4B5563] text-[#F9FAFB] focus:ring-[#818CF8] focus:border-[#818CF8]'
													: 'bg-white border-[#E5E7EB] text-[#111827] focus:ring-[#6366F1] focus:border-[#6366F1]'
											} border focus:outline-none focus:ring-2`}
											placeholder="••••••••"
											required={!isLoginMode}
										/>
									</motion.div>
								)}

								<motion.button
									whileHover={{scale: 1.02}}
									whileTap={{scale: 0.98}}
									type="submit"
									disabled={loading}
									className={`w-full py-4 px-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center shadow-lg ${
										loading
											? 'bg-gray-400 cursor-not-allowed'
											: `bg-gradient-to-r from-[#6366F1] to-[#14B8A6] dark:from-[#818CF8] dark:to-[#2DD4BF] hover:opacity-90 hover:shadow-xl`
									}`}
								>
									{loading ? (
										<>
											<svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
													 fill="none" viewBox="0 0 24 24">
												<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
																strokeWidth="4"></circle>
												<path className="opacity-75" fill="currentColor"
															d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
											</svg>
											Processing...
										</>
									) : (
										<span className="flex items-center">
                      {isLoginMode ? 'Sign In' : 'Create Account'}
											<svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" viewBox="0 0 20 20"
													 fill="currentColor">
                        <path fillRule="evenodd"
															d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
															clipRule="evenodd"/>
                      </svg>
                    </span>
									)}
								</motion.button>
							</motion.form>

							{/* Divider */}
							<motion.div
								initial={{y: 20, opacity: 0}}
								animate={{y: 0, opacity: 1}}
								transition={{delay: 0.5}}
								className="relative flex py-5 items-center mt-8"
							>
								<div
									className={`flex-grow border-t transition-colors duration-300 ${isDarkMode ? 'border-[#374151]' : 'border-[#E5E7EB]'}`}></div>
								<span
									className={`flex-shrink mx-4 text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#9CA3AF]' : 'text-[#6B7280]'}`}>Or continue with</span>
								<div
									className={`flex-grow border-t transition-colors duration-300 ${isDarkMode ? 'border-[#374151]' : 'border-[#E5E7EB]'}`}></div>
							</motion.div>

							{/* Social login */}
							<motion.div
								initial={{y: 20, opacity: 0}}
								animate={{y: 0, opacity: 1}}
								transition={{delay: 0.6}}
								className="flex justify-center gap-4"
							>
								<motion.button
									whileHover={{y: -5, scale: 1.05}}
									whileTap={{scale: 0.95}}
									className={`p-3 rounded-full transition-all duration-300 ${
										isDarkMode
											? 'bg-[#374151] text-[#9CA3AF] hover:bg-[#4B5563] hover:text-white'
											: 'bg-white text-gray-500 hover:bg-gray-100'
									} border ${isDarkMode ? 'border-[#374151]' : 'border-[#E5E7EB]'} shadow-sm`}
								>
									<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
										<path fillRule="evenodd"
													d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
													clipRule="evenodd"/>
									</svg>
								</motion.button>
								<motion.button
									whileHover={{y: -5, scale: 1.05}}
									whileTap={{scale: 0.95}}
									className={`p-3 rounded-full transition-all duration-300 ${
										isDarkMode
											? 'bg-[#374151] text-[#9CA3AF] hover:bg-[#4B5563] hover:text-white'
											: 'bg-white text-gray-500 hover:bg-gray-100'
									} border ${isDarkMode ? 'border-[#374151]' : 'border-[#E5E7EB]'} shadow-sm`}
								>
									<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
										<path
											d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
									</svg>
								</motion.button>
								<motion.button
									whileHover={{y: -5, scale: 1.05}}
									whileTap={{scale: 0.95}}
									className={`p-3 rounded-full transition-all duration-300 ${
										isDarkMode
											? 'bg-[#374151] text-[#9CA3AF] hover:bg-[#4B5563] hover:text-white'
											: 'bg-white text-gray-500 hover:bg-gray-100'
									} border ${isDarkMode ? 'border-[#374151]' : 'border-[#E5E7EB]'} shadow-sm`}
								>
									<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
										<path fillRule="evenodd"
													d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
													clipRule="evenodd"/>
									</svg>
								</motion.button>
							</motion.div>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}