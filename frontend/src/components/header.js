import React from 'react';
import { FaBars } from 'react-icons/fa';
import SearchBar from './searchBar';

const Header = () => {
	return (
		<header className='w-screen bg-purple-300/30 h-[10vh] fixed top-0 left-0 mb-10 '>
			<div className='mx-7 container sm:mx-auto flex items-center justify-center  h-full'>
				<h1 className=' text-2xl md:text-4xl text-gray-700 pt-5 '>
					house market place
				</h1>
				<SearchBar />
			</div>
		</header>
	);
};

export default Header;
