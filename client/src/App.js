//eslint-disable react-hooks/exhaustive-deps;
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//import './App.css';
import Home from './components/Home';
import News from './components/News';
import DetailNews from './components/NewsDetails';
import SeccionNews from './components/SeccionNews';
import AdminLogin from './admin/Login';
import AdminDashboard from './admin/AdminDashboard';
import NewsManagement from './admin/NewsManagement';
import CommentsManagement from './admin/CommentsManagement';
import UsersManagement from './admin/UsersManagement';
import CategoryManagement from './admin/CategoryManagement';
import AdsLatManagement from './admin/AdsLatManagement';
import AdsBannerManagement from './admin/AdsBannerManagement';
import NewsByCategory from './components/NewsByCategory';

function PrivateRoute ({element}){
  const { isAuthenticated, isAdmin } = useSelector(state => state);
    return isAuthenticated && isAdmin ? element : <Navigate to="/admin/login" />;
}

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/news" element={<News />} />
        <Route exact path="/news/:id" element={<DetailNews />} />
        <Route exact path='/SeccionNews' element={<SeccionNews />} />
        <Route exact path='/news/category/:id' element={<NewsByCategory />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin/dashboard" element={<PrivateRoute element={<AdminDashboard />} />} />
        <Route path='/admin/category' element={<PrivateRoute element={<CategoryManagement/>}/>}/>
        <Route path="/admin/news" element={<PrivateRoute element={<NewsManagement />} />} />
        <Route path="/admin/comments" element={<PrivateRoute element={<CommentsManagement />} />} />
        <Route path="/admin/users" element={<PrivateRoute element={<UsersManagement />} />} />
        <Route path='/admin/ads' element={<PrivateRoute element={<AdsLatManagement />}/>}/>
        <Route path='/admin/adsbanner' element={<PrivateRoute element={<AdsBannerManagement />}/>}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
