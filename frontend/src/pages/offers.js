import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { RiLoader5Line } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';

const Offers = () => {
	const navigate = useNavigate();

	const [listings, setListings] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchType = async () => {
		setIsLoading(true);
		const listings = await fetch(
			`http://localhost:1337/api/listings?filters[discount][$gte]=1`
		);
		const { data } = await listings.json();
		setIsLoading(false);
		setListings(data);
	};
	useEffect(() => {
		fetchType();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			{isLoading ? (
				<div className='flex justify-center items-center  animate-spin h-screen w-screen'>
					<RiLoader5Line className='text-5xl text-blue-300' />
				</div>
			) : (
				<main className='container mx-auto min-height-[80ph] pt-20 '>
					<h1
						className=' text-3xl md:5xl text-gray-600
         '
					>
						Offers
					</h1>
					<Link to={-1}>
						<button
							type='button'
							className=' hover:text-gray-500 hover:scale-105'
						>
							<FaArrowLeft style={{ paddingRight: 4, display: 'inline' }} /> go
							back
						</button>
					</Link>
					<div className=' container sm:w-[70vw] flex items-start justify-start bg-gray-300 min-h-[70vh]   flex-wrap gap-3 overflow-hidden px-12 mx-auto p-5'>
						{listings &&
							listings.map((listing) => {
								return (
									<div
										className='w-[300px] md:w-[450px] lg:w-[350px] md:h-[150px] h-[250px] bg-slate-200 shadow-lg mx-auto shadow-white flex   items-start overflow-hidden rounded-lg  '
										key={listing.attributes.id}
									>
										<div className='w-1/2 h-full bg-rent'></div>
										<div className='w-1/2 h-[150px] my-auto bg-yellow-100 flex flex-col items-center justify-between px-3 mb-6 '>
											<h2 className=' text-gray-500 text-xl '>
												{listing.attributes.name}
											</h2>
											<span className=' text-gray-400 text-sm'>
												{' '}
												{listing.attributes.bedrooms}{' '}
												{listing.attributes.bedrooms === 1
													? 'bedroom'
													: 'bedrooms'}{' '}
											</span>
											<span className=' text-gray-400 text-sm'>
												{listing.attributes.parking}
											</span>
											<button
												type='button'
												className=' text-gray-600 border border-gray-600 hover:bg-yellow-200 rounded-md
                                    mb-2
                                    shadow-lg transition-all duration-200  ease-in-out'
												onClick={() => navigate(`/listing/${listing.id}`)}
											>
												see details
											</button>
										</div>
									</div>
								);
							})}
					</div>
				</main>
			)}
		</>
	);
};

export default Offers;
