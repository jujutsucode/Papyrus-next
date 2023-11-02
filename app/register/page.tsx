'use client';
import React, {Component, FormEvent} from 'react'
import { createTheme, WuiProvider } from '@welcome-ui/core'
import { Button } from '@welcome-ui/button'
import { InputText } from '@welcome-ui/input-text'
import { Field } from '@welcome-ui/field'
import { Box } from '@welcome-ui/box'
import { Badge } from '@welcome-ui/badge'
import { StarIcon } from '@welcome-ui/icons'
import { Link } from '@welcome-ui/link'
import { PasswordInput } from '@welcome-ui/password-input'
import { Alert } from '@welcome-ui/alert'

import '../styles.css'

const theme = createTheme()

class Page extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      error: [],
      success: false,
    };
  }

  handleRegistration = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const object = {};
    formData.forEach(function(value, key){
      console.log(value);
      object[key] = value;
    });
    const json = JSON.stringify(object);
    const resp = await fetch('https://papyrus-api.kawanhosting.com/v1/users/register', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: json
    });

    const data = await resp.json();
    //error
    this.setState({error: data.body});
    if (resp.status === 200) {
      this.setState({success: true});
    }
  }

  render(){
    return (
      <>
      <WuiProvider theme={theme}>
      <Box display="flex" w="100%" justifyContent="center" alignItems="center" backgroundColor="nude-100">
        <Box backgroundColor="light-900" borderRadius="sm" boxShadow="sm" margin="xl" maxWidth={360}>
          <Box
            as="img"
            src="https://res.cloudinary.com/djuyt5yew/image/upload/v1698806283/9570956_x88cww.jpg"
            alt="presentation"
            maxWidth="100%"
          />
          <Box p="md">
            <Box display="flex" mb="xs" alignItems="center">
              <Badge variant="primary">Mendaftar</Badge>
              <StarIcon ml="xs" size="sm" color="primary-500" />
            </Box>
            <Box>
              { this.state.error ? this.state.error.map((err, index) => { return (<Alert variant="error">{err.message}</Alert>) }): null}
            </Box>
            <form onSubmit={this.handleRegistration}>
            <Field label="Nama">
              <InputText type="text" name="name"/>
            </Field>
            <Field label="Email">
              <InputText type="email" name="email"/>
            </Field>
            <Field label="Password">
              <PasswordInput type="password" name="password"/>
            </Field>
            <Box>
              {this.state.success ? (<Alert variant="success"><span>Pendaftaran telah dinyatakan berhasil. Anda sekarang dapat <Link href='/'>log in.</Link></span></Alert>): null }
            </Box>
            <Box className='loginbox'>
              <Button variant="primary" w="100%" type="submit">Mendaftar</Button>
            </Box>
            <Box className='loginbox' display="flex" justifyContent='center' alignItems='center'>
              <Link href="/">Atau Log in.</Link>
            </Box>
            </form>
          </Box>
        </Box>
      </Box>
      </WuiProvider>
      </>
    )
  }
}

export default Page;
