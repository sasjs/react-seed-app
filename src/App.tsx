import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SASProvider } from './context/sasContext'
import Shell from './components/Shell'
import HomePage from './pages/home-page'
import DataPage from './pages/data-page'
import UploaderPage from './pages/uploader-page'

/**
 * Hash routing, so one build works from a domain root, an app-stream path and a
 * Pages subfolder without a server that rewrites URLs.
 */
export const App = () => (
  <SASProvider>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Shell />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="data" element={<DataPage />} />
          <Route path="file-uploader" element={<UploaderPage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  </SASProvider>
)

export default App
