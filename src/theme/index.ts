import { createTheme, Theme } from '@mui/material/styles'

import palette from './palette'
import typography from './typography'
import overrides from './overrides'

const theme = createTheme({
  palette,
  typography,
  components: {
    MuiButton: {
      styleOverrides: {
        ...overrides.MuiButton
      }
    },
    MuiIconButton: {
      styleOverrides: {
        ...overrides.MuiIconButton
      }
    },
    MuiPaper: {
      styleOverrides: {
        ...overrides.MuiPaper
      }
    },
    MuiTableCell: {
      styleOverrides: {
        ...overrides.MuiTableCell
      }
    },
    MuiTableHead: {
      styleOverrides: {
        ...overrides.MuiTableHead
      }
    },
    MuiTypography: {
      styleOverrides: {
        ...overrides.MuiTypography
      }
    }
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
})

export default theme
