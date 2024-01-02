import './App.css';
import Header from './components/Headersection/Header';
import Todolist from './components/Mainsection/Todolist';
import Footer from './components/Footer';
function App() {
	return (
		<div className='app'>
			<div className='container'>
				<Header />
				<Todolist />
				<Footer />
			</div>
		</div>
	);
}

export default App;
