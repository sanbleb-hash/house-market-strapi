/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				anek: ['Anek Malayalam', 'sans-serif'],
			},
			backgroundImage: {
				rent: 'url("https://cdn.pixabay.com/photo/2014/11/21/17/17/house-540796__340.jpg")',
			},
			sale: 'url("https://cdn.pixabay.com/photo/2014/11/21/17/17/house-540796__340.jpg")',
		},
	},
	plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
