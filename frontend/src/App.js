import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/navBar';
import Home from './pages/home';

const App = () => {
	return (
		<Router>
			<main className=' prose-base bg-slate-100 min-h-[90vh] w-screen font-semibold'>
				<Routes>
					<Route path='/' element={<Home />} />
				</Routes>
			</main>
			<NavBar />
		</Router>
	);
};

export default App;
