'use client';
import React, {Component} from 'react'
import { createTheme, WuiProvider } from '@welcome-ui/core'
import { Button } from '@welcome-ui/button'

const theme = createTheme()

class Page extends Component {
  render(){
    return (
      <>
      <WuiProvider theme={theme}>
        <Button variant="secondary">Welcome!</Button>
      </WuiProvider>
      </>
    )
  }
}

export default Page;
