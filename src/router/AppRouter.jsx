import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import {  CurriculumPage } from '../pages/CurriculumPage'
import { LoginPage } from '../pages/LoginPage'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import { RegisterPage } from '../pages/RegisterPage'

export const AppRouter = () => {
  return (
   <>
        <Routes >
            <Route element={ <PublicRoute /> } >
                <Route path='/' element ={ <Navigate to='/login' />} />
                <Route path='/Registrarse' element ={ <RegisterPage />} />
                <Route path='/Ingresar' element ={ <LoginPage />} />
                <Route path='/*' element ={ <LoginPage />} />
            </Route>


            <Route element={<PrivateRoute />}>
            <Route path='/curriculum' element ={ <CurriculumPage />} />
            </Route>

        </Routes>

   </>
  )
}
