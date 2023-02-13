import { Routes, Route, BrowserRouter } from 'react-router-dom'

import AccountPage from './pages/AccountPage/AccountPage'
import HomePage from './pages/HomePage/HomePage'
import OrganizationsPage from './pages/OrganizationsPage/OrganizationsPage'
import SettingsPage from './pages/SettingsPage/SettingsPage'
import MenuPage from './pages/MenuPage/MenuPage'
import Navigation from './components/Navigation/Navigation'
import ChatPage from './pages/ChatPage/ChatPage'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/organizations' element={<OrganizationsPage />} />
          <Route path='/chat' element={<ChatPage />} />
          <Route path='/menu' element={<MenuPage />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/setting' element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
