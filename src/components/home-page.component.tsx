import React from 'react'
import { Box, Typography, Link } from '@mui/material'
import { styled } from '@mui/material/styles'

const HomePageContainer = styled(Box)(({ theme }) => ({
  padding: '16px',
  color: '#1c1c1c',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}))

const CodeText = styled('span')(({ theme }) => ({
  fontFamily: 'Monaco, Courier, monospace',
  border: '1px solid #d9d9d9',
  padding: '5px',
  borderRadius: '3px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.main,
  fontWeight: 'bold'
}))

const StyledLink = styled(Link)(({ theme }) => ({
  marginLeft: '5px',
  color: theme.palette.text.link, // Use the link color from your palette
  textDecoration: 'underline', // Underline to indicate it's a link
  '&:hover': {
    color: theme.palette.text.link, // Keep the same color on hover
    textDecoration: 'none' // Optional: Remove underline on hover
  }
}))
const links = [
  { label: 'App Source Code', url: 'https://github.com/sasjs/react-seed-app' },
  { label: 'SASjs Source Code', url: 'https://github.com/sasjs' },
  { label: 'SASjs on NPM', url: 'https://www.npmjs.com/package/@sasjs/adapter' }
]

const HomePageComponent = () => {
  return (
    <HomePageContainer>
      <Typography variant="h4">
        Hello!{' '}
        <span role="img" aria-label="wave">
          👋
        </span>
      </Typography>
      <Typography variant="h6">
        Welcome to the React Seed App for <CodeText>SASjs</CodeText>.
      </Typography>

      {links.map(({ label, url }) => (
        <Box key={url} mt={2}>
          <Typography>
            {label}:{' '}
            <StyledLink href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </StyledLink>
          </Typography>
        </Box>
      ))}
    </HomePageContainer>
  )
}

export default HomePageComponent
