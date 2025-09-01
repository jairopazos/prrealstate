/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */

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
import ListingsMap from "../../posts/components/ListingsMap";
import ListingDetails from "../../posts/components/ListingDetails";
import Upload3DTour from "../../posts/components/Upload3DTour";
import Logout from "../../users/components/Logout";
import AdvertiserReviews from "../../posts/components/AdvertiserReview";


const AppContent = () => {
    const location = useLocation(); // Ahora está dentro del contexto del Router
    const showHeader = location.pathname !== '/users/login' && location.pathname !== '/users/signUp';

    return (
        <div>
            {showHeader && <Header />}
            <Routes>
                <Route path="/" element={<Body />} />
                <Route path="users/login" element={<Login />} />
                <Route path="users/logout" element={<Logout />} />
                <Route path="users/signUp" element={<Register />} />
                <Route path="users/details" element={<UserDetails />} />
                <Route path="listings" element={<ListingsPage />} />
                <Route path="listings/favorites" element={<ListingsPage />} />  {/* ✅ esta faltaba */}
                <Route path="listings/user/:userId" element={<ListingsPage />} />
                <Route path="listings/new" element={<PublishPost />} />
                <Route path="listings/new/uploadData" element={<UploadData />} />
                <Route path="listings/new/uploadDataDetails" element={<UploadDataDetails />} />
                <Route path="listings/new/upload3DTour" element={<Upload3DTour />} />
                <Route path="listings/new/uploadContactInformation" element={<UploadContactInformation />} />
                <Route path="listings/map" element={<ListingsMap />} />
                <Route path="listing/details/:id" element={<ListingDetails />} />
                <Route path="user/:userId/reviews" element={<AdvertiserReviews />} />
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
