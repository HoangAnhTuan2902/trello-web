// src/hooks/useAuth.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuthAPI } from '~/apis';

const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const checkAuthStatus = async () => {
			try {
				const response = await checkAuthAPI();
				if (response?.status === 200) {
					setIsAuthenticated(true);
					setUser(response.user); // Lưu thông tin người dùng
				} else {
					setIsAuthenticated(false);
					navigate('/user/login'); // Redirect nếu không đăng nhập
				}
			} catch (error) {
				setIsAuthenticated(false);
				navigate('/user/login');
			}
		};

		checkAuthStatus();
	}, [navigate]);

	return { isAuthenticated, user };
};

export default useAuth;
