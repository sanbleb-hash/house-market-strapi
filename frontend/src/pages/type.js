import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';

const Type = () => {
	const image =
		'https://cdn.pixabay.com/photo/2019/08/30/08/55/rain-4440791_640.jpg';

	const navigate = useNavigate();

	const [listings, setListings] = useState();
	const { typeId } = useParams();
	const fetchType = async () => {
		const listings = await fetch(
			`http://localhost:1337/api/listings?filters[type][$eq]=${typeId}`
		);
		const { data } = await listings.json();
		setListings(data);
	};
	useEffect(() => {
		fetchType();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<main className='container mx-auto min-height-[80ph]'>
			<h1>Type {typeId}</h1>
			<Link to={-1}>
				<button type='button' className=' hover:text-gray-500 hover:scale-105'>
					<FaArrowLeft style={{ paddingRight: 4, display: 'inline' }} /> go back
				</button>
			</Link>
			<div className=' container sm:w-[70vw] flex items-center justify-center gap-4 md:items-start md:justify-between flex-wrap mx-auto'>
				{listings &&
					listings.map((listing) => {
						return (
							<div
								key={listing.id}
								className='card max-w-[300px] md:w-[250px] shadow-lg rounded-lg overflow-hidden h-[300px]  bg-slate-900  flex flex-col md:flex-row items-start'
							>
								<div
									className='h-full w-full flex flex-col md:flex-row items-center justify-center cursor-pointer '
									onClick={() => navigate(`/listing/${listing.id}`)}
								>
									<img
										src={listing.image || image}
										alt={listing.name}
										className='card-mage w-full h-3/4 object-cover  md:w-1/2 md:h-full'
									/>
									<div className='  h-full p-3'>
										<h2>{listing.attributes.name}</h2>
										<p>{listing.attributes.description}</p>
									</div>
								</div>
							</div>
						);
					})}
			</div>
		</main>
	);
};

export default Type;
