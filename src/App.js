import './App.css'
import Header from './components/Headersection/Header'
import Todolist from './components/Mainsection/Todolist'
import Footer from './components/Footer'
import Temple from './components/Temple'

function App() {
    return (
        <div className="app">
            <div className="container">
                <Temple />
            </div>
        </div>
    )
}

export default App
