import '../../../App.css';
import Header from './Header';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Body from "./Body";
import Login from "../../users/components/Login.js"; // Asegúrate de importar el componente Login si lo necesitas
import Register from "../../users/components/Register.js";
import PublishPost from "../../posts/components/PublishPost"; // Asegúrate de importar el componente Login si lo necesitas
import UploadData from "../../posts/components/UploadData"; // Asegúrate de importar el componente Login si lo necesitas
import { PostProvider } from '../../posts/components/PostContext';
import UploadContactInformation from "../../posts/components/UploadContactInformation";
import UserDetails from "../../users/components/UserDetails";
import ListingsPage from "../../posts/components/ListingsPage";
import UploadDataDetails from "../../posts/components/UploadDataDetails";


const AppContent = () => {
    const location = useLocation(); // Ahora está dentro del contexto del Router
    const showHeader = location.pathname !== '/users/login' && location.pathname !== '/users/signUp';

    return (
        <div>
            {showHeader && <Header />}
            <Routes>
                <Route path="/" element={<Body />} />
                <Route path="users/login" element={<Login />} />
                <Route path="users/signUp" element={<Register />} />
                <Route path="users/details" element={<UserDetails />} />
                <Route path="listings" element={<ListingsPage />} />
                <Route path="listings/new" element={<PublishPost />} />
                <Route path="listings/new/uploadData" element={<UploadData />} />
                <Route path="listings/new/uploadDataDetails" element={<UploadDataDetails />} />
                <Route path="listings/new/uploadContactInformation" element={<UploadContactInformation />} />

            </Routes>
        </div>
    );
};

function App() {
    return (
        <PostProvider>
            <Router>
                <AppContent />
            </Router>
        </PostProvider>
    );
}

export default App;
