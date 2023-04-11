import React from 'react'
import { Routes, Route, HashRouter, Navigate } from 'react-router-dom'
import HomePageComponent from '../components/home-page.component'
import DataPageComponent from '../components/data-page.component'
import FileUploaderComponent from '../components/file-uploader.component'
import MainLayout from '../layouts/Main'
import ThemeProvider from '@material-ui/styles/ThemeProvider'
import theme from '../theme'
import SASProvider from '../context/sasContext'

export default (
  <ThemeProvider theme={theme}>
    <SASProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/home" />} />
            <Route path="home" element={<HomePageComponent />} />
            <Route path="demo" element={<DataPageComponent />} />
            <Route path="file-uploader" element={<FileUploaderComponent />} />
          </Route>
        </Routes>
      </HashRouter>
    </SASProvider>
  </ThemeProvider>
)
