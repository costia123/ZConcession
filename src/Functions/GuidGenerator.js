//Creates a random id
const guidGenerator = () => {
	var S4 = function() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	};
	return (
		S4() +
		S4() +
		String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
		S4() +
		Date.now() +
		String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
		S4() +
		String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
		S4() +
		String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
		S4() +
		S4() +
		S4()
	);
};

export default guidGenerator;
