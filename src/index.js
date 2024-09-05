

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from "./pages/Layout";
import GoogleBooks from "./pages/GoogleBooks/GoogleBooks";
import OurLibrary from "./pages/OurLibrary/OurLibrary";
import Reviews from "./pages/Review/AllReviews";
import ReviewById from "./pages/Review/ReviewById";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="GoogleBooks" element={<GoogleBooks />} />
          <Route path="library" element={<OurLibrary />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="reviews/:id" element={<ReviewById />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);