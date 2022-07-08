import React from 'react';

import { useNavigate } from 'react-router-dom';

const Home = () => {
	const navigate = useNavigate();

	return (
		<main className=' container mx-auto w-full min-h-full flex pt-20 flex-col items-center justify-between gap-4 py-5 bg-slate-50 px-9 sm:px-5 z-10'>
			<section className='w-full h-[40vh] bg-gray-300 bg-hero bg-cover bg-center rounded-md'></section>
			<section className='w-full h-[30vh] bg-slate-100 items-center flex-col sm:flex-row gap-4 flex'>
				<div
					className=' sm:flex-1 rounded-lg overflow-hidden w-full bg-slate-50 h-full bg-rent bg-cover bg-center grid place-items-center before:absolute before:bg-black/20 before:inset-0 relative z-10 cursor-pointer'
					onClick={() => navigate('/type/rent')}
				>
					<h3 className='text-3xl text-gray-300 z-50 '>for rent</h3>
				</div>
				<div
					className=' sm:flex-1 w-full rounded-lg overflow-hidden bg-slate-50 h-full bg-sale object-cover bg-cover bg-center bg-no-repeat grid place-items-center before:absolute before:bg-black/20 before:inset-0 relative z-10 cursor-pointer  '
					onClick={() => navigate('/type/sale')}
				>
					<h3 className=' text-gray-300 text-3xl z-50 '>for sale</h3>
				</div>
			</section>
		</main>
	);
};

export default Home;
