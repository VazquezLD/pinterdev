import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import { UserCollectionsProvider } from './context/UserColectionsContext';
import {AppWrapper, ContentWrapper} from './styles/AppWrapper'
import RegisterPage from './pages/Login/Register';
import MenuBar from './components/MenuBar';
import LoginPage from './pages/Login/LoginComponent';
import {AddPhotoProvider} from './context/AddPhotoContext';
import ProtectedRoute from './components/ProtectedRoute';
import PhotoPage from './pages/Home/PhotoPage';
import CollectionPage from './pages/Profile/CollectionPage';

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
    <UserCollectionsProvider>
      <AddPhotoProvider>
        <BrowserRouter>
          <Routes>

            <Route element={<ProtectedRoute/>}>
              <Route path="/" element={<AppLayout />}>
                <Route path='/' element={<Home/>}/>
                <Route path='/photo/:id' element={<PhotoPage/>}></Route>
                <Route path="/collections/:id" element={<CollectionPage/>}></Route>
                <Route path='/collections' element={<Profile/>}/>
              </Route>
            </Route>
            
            <Route path='/register' element={<RegisterPage/>}/>
            <Route path="/login" element={<LoginPage/>} />
          
          </Routes>
        </BrowserRouter>
      </AddPhotoProvider>
    </UserCollectionsProvider>
  );
}
export default App;