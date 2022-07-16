import React, { useContext, useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { searchContext } from '../utils/searchContext';

const SearchBar = () => {
	const [searchText, setSearchText] = useState('');

	const { dispatch } = useContext(searchContext);

	const navigate = useNavigate();

	const handleFetchSearch = async () => {
		try {
			dispatch({ type: 'INITIAL_LOAD' });

			const response = await fetch(
				`/api/listings?filters[name][$eq]=${searchText}`
			);
			const data = await response.json();
			dispatch({
				type: 'SEARCH_SUCCESS',

				payload: data.attributes,
			});
			localStorage.setItem('listings', JSON.stringify(data));

			if (data.length >= 1) {
				navigate('/listings-search');
			}
		} catch (error) {
			if (error) {
				dispatch({ type: 'SET_ERROR', payload: error.message });
			}
		}
	};

	useEffect(() => {
		if (searchText.length > 3) {
			handleFetchSearch();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchText]);

	return (
		<div className='md:max-w-[500px]  ml-4 px-5 h-[7vh]  flex items-center justify-center'>
			<form
				onSubmit={handleFetchSearch}
				className=' flex  items-center justify-end  h-full sm:w-full self-end border border-gray-400 hover:border-dashed hover:cursor-pointer '
			>
				<input
					type='text'
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					placeholder='Search'
					className={
						'  text-gray-700 text-lg  md:text-2xl border-none outline-none focus:ring-0 bg-inherit focus:bg-white sm:flex '
					}
				/>
				<button
					type='submit'
					className='bg-purple-400 w-[50px] h-full px-3  text-2xl text-white'
				>
					<FaSearch className='text-center' />
				</button>
			</form>
		</div>
	);
};

export default SearchBar;
