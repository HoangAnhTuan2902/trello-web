import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { default as Login, default as Register } from './pages/Auth/Login'
import Auth from './pages/Auth'
import Board from './pages/Boards/_id'
import Boards from './pages/Boards/Boards'
import Template from './pages/Boards/Template/Template'
import WorkSpace from './pages/Boards/WorkSpace/WorkSpace'
import RootLayout from './pages/RootLayout/RootLayout'

function App() {
  return (
    <>
      <BrowserRouter future={{ v7_startTransition: true }}>
        <Routes>
          {/*react router dom */}
          <Route path="/" element={<Navigate to="/user" />} />
          <Route path="/user" element={<Auth />}>
            <Route path="login" element={<Login />} />
            <Route path="sign-up" element={<Register />} />
          </Route>

          {/*Boards list */}
          <Route path="/root" element={<RootLayout />}>
            <Route path="boards" element={<Boards />}>
              <Route path="workspace" element={<WorkSpace />} />
              <Route path="template" element={<Template />} />
            </Route>
            <Route path="boards/:boardId" element={<Board />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
