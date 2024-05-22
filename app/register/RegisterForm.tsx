'use client';

import * as React from 'react';

import { signIn } from 'next-auth/react';
import { Controller, useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


interface FormInput {
    username: string
    email: string
    password: string
    confirmPassword: string
}

const defaultValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
}

export default function RegisterForm() {
    const [ loading, setLoading ] = React.useState(false);
    const [ error, setError ] = React.useState({ error: false, message: '' });

    const { handleSubmit, control, getValues } = useForm<FormInput>({
        defaultValues: defaultValues,
    });

    const onSubmit = async (data: FormInput) => {
        if(loading) return;
        setLoading(true);

        await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((res) => {
                if(res.status === 'fail') throw {message: res.message};
                signIn('credentials', {
                    username: data.username,
                    password: data.password,
                    redirect: true,
                    callbackUrl: '/user/' + data.username + '/create-pokedex'
                });
            })
            .catch((e) => {
                setError({ error: true, message: e.message })
            });

        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box
                display='flex'
                flexDirection='column'
                rowGap='24px'
                onKeyDown={(e) => {
                    if(e.key === 'Enter') onSubmit
                }}
                sx={{
                    overflowWrap: 'break-word'
                }}
            >
                { error.error ?
                    <Box width='100%' bgcolor='#f7bcbc' >
                        <Typography textAlign='center' color='#fa0505' textOverflow='wrap' p='8px' > { error.message } </Typography>
                    </Box>
                    :
                    null
                }
                <Controller
                    control={control}
                    name='username'
                    defaultValue=''
                    rules={{
                        required: true,
                        minLength: 3,
                        maxLength: 20,
                        pattern: /^[A-Za-z0-9_-]*$/
                    }}
                    render={({field, fieldState: { error } }) => {
                        return (
                            <TextField 
                                { ...field }
                                label='username'
                                type='text'
                                variant='outlined'
                                error={error !== undefined}
                                helperText={error ? <Typography>{ getUsernameError(error.type) }</Typography> : ''}
                                fullWidth
                            />
                        )
                        
                    }}
                />
                <Controller
                    control={control}
                    name='email'
                    defaultValue=''
                    rules={{
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                    }}
                    render={({field, fieldState: { error } }) => {
                        return (
                            <TextField 
                                { ...field }
                                label='email'
                                type='email'
                                variant='outlined'
                                error={error !== undefined}
                                helperText={error ? <Typography>Invalid Email Address</Typography> : ''} 
                                fullWidth
                            />
                        )
                        
                    }}
                />
                <Controller
                    control={control}
                    name='password'
                    defaultValue=''
                    rules={{
                        required: true,
                        minLength: 8,
                        maxLength: 20,
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
                    }}
                    render={({field, fieldState: { error } }) => {
                        return (
                            <TextField 
                                { ...field }
                                label='password'
                                type='password'
                                variant='outlined'
                                error={error !== undefined}
                                helperText={error ? <Typography>{ getPasswordError(error.type) }</Typography> : ''}
                                fullWidth
                            />
                        )
                        
                    }}
                />
                <Controller
                    control={control}
                    name='confirmPassword'
                    defaultValue=''
                    rules={{
                        required: true,
                        validate: {
                            passwordEqual: value => (value === getValues().password )
                        }
                    }}
                    render={({field, fieldState: { error } }) => {
                        return (
                            <TextField 
                                { ...field }
                                label='confirm password'
                                type='password'
                                variant='outlined'
                                error={error !== undefined}
                                helperText={error ? <Typography>Passwords must match</Typography> : ''}
                                fullWidth
                            />
                        )
                        
                    }}
                />
                <Button 
                    type='submit'
                    variant='contained'
                >
                    Register
                </Button>
            </Box>
        </form>
    )
}

function getUsernameError(type: string) {
    if (type === 'required') return 'Username is required'
    else if (type === 'minLength') return 'Username must be at least 3 characters'
    else if (type === 'maxLength') return 'Username cannot exceed 20 characters'
    else if (type === 'pattern') return 'Username must only contain characters (A-Z) and numbers (0-9)'
    
    return 'Invalid username'
}

function getPasswordError(type: string){
    if (type === 'required') return 'Password is required'
    else if (type === 'minLength') return 'Password must be at least 8 characters'
    else if (type === 'maxLength') return 'Password cannot exceed 20 characters'
    else if (type === 'pattern') return 'Password must contain a special character, number, and lowercase and uppercase character'

    return 'Invalid password'
}