import React from 'react';

const Pagination = ({ pageIndex, allListings, setPageIndex }) => {
	return (
		<span className={`flex py-8 gap-5 `}>
			<button
				disabled={pageIndex === 1}
				className={
					pageIndex === 1 ? '' : 'active:scale-110 hover:border py-1 px-4 '
				}
				onClick={() => {
					setPageIndex(Number(pageIndex) + -1);
				}}
			>
				prev
			</button>
			{}
			<button
				disabled={pageIndex === allListings}
				className={
					pageIndex === allListings
						? ''
						: 'active:scale-110 hover:border py-1 px-4 '
				}
				onClick={() => {
					setPageIndex(Number(pageIndex) + 1);
				}}
			>
				next
			</button>
		</span>
	);
};

export default Pagination;
