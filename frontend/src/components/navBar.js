import {
	MdOutlineExplore,
	MdOutlineLocalOffer,
	MdOutlinePersonOutline,
} from 'react-icons/md';

import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../utils/authContext';

const NavBar = () => {
	const { state, dispatch } = useContext(AuthContext);
	const [showPopup, setShowPopup] = useState(false);
	const { user } = state;

	const active =
		' text-slate-800 border-b-2 border-blue-400 pb-3 transition-all duration-100  ';
	return (
		<footer className=' text-slate-500 w-screen h-[10vh] bg-slate-200 '>
			<nav className='w-[80vw] mx-auto flex items-center justify-between my-auto py-3  '>
				<NavLink
					to='/'
					className={(navData) =>
						navData.isActive ? `active:${active}` : ' text-slate-600'
					}
				>
					<span className=' items-center justify-center gap-1 flex'>
						<MdOutlineExplore size={25} /> explore
					</span>
				</NavLink>

				<NavLink
					to='/offers'
					className={(navData) =>
						navData.isActive ? `active:${active}` : ' text-slate-600'
					}
				>
					<span className=' items-center justify-center gap-1 flex'>
						<MdOutlineLocalOffer size={25} />
						offers
					</span>
				</NavLink>
				<NavLink
					to='/profile'
					className={(navData) =>
						navData.isActive ? `active:${active}` : ' relative text-slate-600'
					}
				>
					{user && showPopup && (
						<span
							className=' items-center justify-center absolute bottom-[3rem] right-0 shadow-lg shadow-yellow-700 bg-white px-4 py-2 gap-1 z-50 flex'
							onClick={() => {
								setShowPopup(false);
								dispatch({ type: 'LOGOUT_USER' });
							}}
						>
							logout
						</span>
					)}
					<span
						className=' items-center justify-center  capitalize flex gap-3  '
						onMouseEnter={() => setShowPopup(!showPopup)}
						onClick={() => setShowPopup(!showPopup)}
					>
						{user ? user.username : <MdOutlinePersonOutline size={25} />}
						<h5>profile</h5>
					</span>
				</NavLink>
			</nav>
		</footer>
	);
};

export default NavBar;
