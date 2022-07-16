import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/navBar';
import Protect from './components/protect';
import Home from './pages/home';
import Listing from './pages/listing';
import Offers from './pages/offers';
import Profile from './pages/profile';
import Type from './pages/type';
import { ToastContainer } from 'react-toastify';
import Login from './pages/login';
import Create from './pages/create';
import Header from './components/header';
import Search from './pages/search';

const App = () => {
	return (
		<Router>
			<main className=' prose-base bg-slate-100 min-h-[90vh] w-screen font-semibold'>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/offers' element={<Offers />} />
					<Route path='/profile' element={<Protect />}>
						<Route path='/profile' element={<Profile />} />
					</Route>
					<Route path='/create' element={<Protect />}>
						<Route path='/create' element={<Create />} />
					</Route>
					<Route path='/login' element={<Login />} />
					<Route path='/listings-search' element={<Search />} />
					<Route path='/type/:typeId' element={<Type />} />
					<Route path='/listing/:listingId' element={<Listing />} />
				</Routes>
				<ToastContainer />
			</main>
			<NavBar />
		</Router>
	);
};

export default App;
