'use client'
import { useState, useEffect } from "react"
import { createTheme, WuiProvider } from '@welcome-ui/core'
import { Card } from '@welcome-ui/card'
import { Text } from '@welcome-ui/text'
import { Box } from '@welcome-ui/box'

const theme = createTheme()

export default function Book() {

  const [data, setData] = useState({books: {items: []}})

  useEffect(() => {
    const token = localStorage.getItem("token") || ""
    fetch('https://papyrus-api.kawanhosting.com/v1/books', {
      method: 'GET',
      headers: {
        'x-access-token': 'Bearer '+token,
      }
    }).then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [])
  console.log(data)

  return (<WuiProvider theme={theme}>
    <Box display="flex" w="100%" flexDirection="column" justifyContent="center" alignItems="center" backgroundColor="nude-100">
    {data.books.items.map((book, index) => {
      return (<Card maxWidth={400}>
        <Card.Cover
          w="100%"
          src={`https://papyrus-api.kawanhosting.com/public/$(book.pic)`}
        />
      <Card.Body>
        <Text as="h4" fontWeight="bold" mt={0} mb="lg" color="dark-900">
        {book.title}
        </Text>
        {book.description}
      </Card.Body>
    </Card>)
  })}
  </Box>
  </WuiProvider>
  )
}