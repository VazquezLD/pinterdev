import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
//import CollectionDetailPage from './pages/CollectionDetailPage';
import {AppWrapper, ContentWrapper} from './styles/AppWrapper'
import RegisterPage from './pages/Login/Register';
import MenuBar from './components/MenuBar';
import LoginPage from './pages/Login/LoginComponent';

const AppLayout = () => (
  <AppWrapper>
    <ContentWrapper>
      <Outlet />
    </ContentWrapper>
    <MenuBar/>
  </AppWrapper>
);

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home/>}/>
        </Route>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path="/login" element={<LoginPage/>} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;


{/*<Route path="profile/:userId" element={<ProfilePage />} />}
{/*<Route path="search" element={<SearchPage />} />}
{/*<Route path="collection/:collectionId" element={<CollectionDetailPage />} */}