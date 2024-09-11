import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Board from './pages/Boards/_id';
import Auth from './pages/Auth';
import Register from './pages/Auth/Login';
import Boards from './pages/Boards/Boards';
import Login from './pages/Auth/Login';
import RootLayout from './pages/RootLayout/RootLayout';

function App() {
	return (
		<>
			<BrowserRouter future={{ v7_startTransition: true }}>
				<Routes>
					{/*react router dom */}
					<Route
						path='/'
						element={<Navigate to='/user' />}
					/>
					<Route
						path='/user'
						element={<Auth />}>
						<Route
							path='login'
							element={<Register />}
						/>
						<Route
							path='sign-up'
							element={<Login />}
						/>
					</Route>

					{/*Boards list */}
					<Route
						path='/root'
						element={<RootLayout />}>
						<Route
							path='boards'
							element={<Boards />}>
							<Route
								path=':boardId'
								element={<Board />}
							/>
						</Route>
					</Route>
					{/* 
					<Route
						path='/boards'
						element={<Boards />}>
						<Route
							path=':boardId'
							element={<Board />}
						/>
					</Route> */}
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
