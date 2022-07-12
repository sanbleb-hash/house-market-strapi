import React, { useEffect, useState } from 'react';

import { FaArrowLeft } from 'react-icons/fa';
import { RiLoader5Line } from 'react-icons/ri';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Pagination from '../components/pagination';

const Type = () => {
	const navigate = useNavigate();

	const [listings, setListings] = useState([]);
	const [pageIndex, setPageIndex] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const { typeId } = useParams();
	const page = 6;

	const fetchType = async () => {
		setIsLoading(true);

		const listings = await fetch(
			`/api/listings?filters[type][$eq]=${typeId}&pagination[page]=${Number(
				pageIndex
			)}&pagination[pageSize]=${page}`
		);
		const { data } = await listings.json();
		setIsLoading(false);
		setListings(data);
	};
	useEffect(() => {
		fetchType();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pageIndex]);

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
						Type {typeId}
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
										className='w-[300px] md:w-[450px] lg:w-[350px] md:h-[150px] h-[250px] bg-slate-200 shadow-lg  shadow-white flex   items-start 
                              mx-auto 
                              justify-center overflow-hidden rounded-lg  '
										key={listing.attributes.id}
									>
										<div className='w-1/2 h-full bg-rent'></div>
										<div className='w-1/2 h-full my-auto bg-yellow-100 flex flex-col items-center justify-center   p-3  '>
											<h1 className='text-lg text-gray-500 self-start first-letter:capitalize '>
												{listing.attributes.name.substring(0, 15)}
											</h1>
											<span className='inline-block text-gray-400 leading-4 pb-2'>
												<h5 className='text-xs self-start first-letter:capitalize '>
													{listing.attributes.parking}
												</h5>
												<h5 className='text-xs self-start first-letter:capitalize '>
													{listing.attributes.bathrooms}
													{listing.attributes.bathrooms === 1
														? ' bathroom'
														: ' bathrooms'}
												</h5>
												<h5 className='text-xs self-start first-letter:capitalize '>
													{listing.attributes.bedrooms}
													{listing.attributes.bathrooms === 1
														? ' bathroom'
														: ' bathrooms'}
												</h5>
											</span>
											<button
												type='button'
												className=' text-gray-600 border border-gray-300 hover:bg-yellow-200 rounded-md w-full
                                    text-sm py-1
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

					{!listings.length <= page && (
						<Pagination
							pageIndex={pageIndex}
							setPageIndex={setPageIndex}
							allListings={listings.length}
						/>
					)}
				</main>
			)}
		</>
	);
};

export default Type;
