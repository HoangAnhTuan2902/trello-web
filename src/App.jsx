import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Board from './pages/Boards/_id';
import Auth from './pages/Auth';
import Register from './pages/Auth/Login';

function App() {
	return (
		<>
			<BrowserRouter future={{ v7_startTransition: true }}>
				<Routes>
					{/*react router dom */}
					<Route
						path='/user'
						element={<Auth />}>
						<Route
							path='sign-in'
							element={<Register />}
						/>
						<Route
							path='sign-up'
							element={<Register />}
						/>
					</Route>

					{/**Board Details */}
					<Route
						path='/board'
						element={<Board />}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
