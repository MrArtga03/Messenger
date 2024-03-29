import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import {
  homeUrl,
  authUrl,
  chatIdUrl,
  regUrl,
  noMatchUrl,
  settingsUrl,
  accountUrl,
  noChatsUrl,
  mainPage,
} from './constants/urls'
import HomePage from './pages/HomePage/HomePage'
import SettingsPage from './pages/SettingsPage/SettingsPage'
import Layout from './components/Layout/Layout'
import ChatPage from './pages/ChatPage/ChatPage'
import AuthPage from './pages/AuthPage/AuthPage'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import AccountPage from './pages/AccountPage/AccountPage'
import NoMatch from './pages/NoMatch/NoMatch'
import AuthProvider from './hoc/AuthProvider'
import NoChats from './pages/NoChats/NoChats'
import { getProtectedPage } from './helper/getProtectedPage'

const App = () => {
  return (
    <>
      <AuthProvider>
        <ChakraProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route
                  path={homeUrl}
                  element={getProtectedPage(<HomePage />)}
                />
                <Route path={authUrl} element={<AuthPage />} />
                <Route path={regUrl} element={<RegistrationPage />} />
                <Route path={mainPage} element={<Layout />} />
                <Route
                  path={accountUrl}
                  element={getProtectedPage(<AccountPage />)}
                />
                <Route
                  path={chatIdUrl}
                  element={getProtectedPage(<ChatPage />)}
                />
                <Route
                  path={settingsUrl}
                  element={getProtectedPage(<SettingsPage />)}
                />
                <Route
                  path={noChatsUrl}
                  element={getProtectedPage(<NoChats />)}
                />
                <Route path={noMatchUrl} element={<NoMatch />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </ChakraProvider>
      </AuthProvider>
    </>
  )
}

export default App
