import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import HomePage from './pages/HomePage/HomePage'
import OrganizationsPage from './pages/OrganizationsPage/OrganizationsPage'
import SettingsPage from './pages/SettingsPage/SettingsPage'
import Layout from './components/Layout/Layout'
import ChatPage from './pages/ChatPage/ChatPage'
import AuthPage from './pages/AuthPage/AuthPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import AccountPage from './pages/AccountPage/AccountPage'
import NoMatch from './pages/NoMatch/NoMatch'
import RequireAuth from './hoc/RequireAuth'
import AuthProvider from './hoc/AuthProvider'

const getProtectedPage = (page) => {
  return <RequireAuth>{page}</RequireAuth>
}

const App = () => {
  return (
    <>
    <AuthProvider>
      <ChakraProvider>
        <BrowserRouter>
            <Layout>
              <Routes>
                <Route index element={<HomePage />} />
                <Route path='/auth' element={<AuthPage/>}/> 
                <Route path='/reg' element={<RegistrationPage />}/>
                <Route path='/organizations' element={getProtectedPage(<OrganizationsPage />)} />
                <Route path='/account' element={getProtectedPage(<AccountPage />)}/>
                <Route path='/chat/:id' element={getProtectedPage(<ChatPage />)} />
                <Route path='/setting' element={getProtectedPage(<SettingsPage />)} />
                <Route path='*' element={getProtectedPage(<NoMatch/>)}/>
              </Routes>
            </Layout>
        </BrowserRouter>
      </ChakraProvider>
    </AuthProvider>
    </>
  )
}

export default App
