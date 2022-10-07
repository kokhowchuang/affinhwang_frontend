import axios from 'axios'

// ** React Imports
import { useState, ElementType, ChangeEvent, SyntheticEvent, useEffect } from 'react'
import { useForm } from 'react-hook-form'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import Button, { ButtonProps } from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

type ICustomerProps = {
  data: {
    id: string
    firstName: string
    lastName: string
    email: string
    address: string
    city: string
    postcode: number
    state: string
  }
  onSave: any
  onDelete: any
}

const TabAccount = ({ data, onSave, onDelete }: ICustomerProps) => {
  // ** State
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(true)
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [address, setAddress] = useState<string>(data.address)
  const [city, setCity] = useState<string>(data.city)
  const [postcode, setPostcode] = useState<number>(data.postcode)
  const [state, setState] = useState<string>(data.state)

  const defaultValues = {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    address: data.address,
    city: data.city,
    postcode: data.postcode,
    state: data.state
  }

  const {
    register,
    getValues,
    handleSubmit,
    unregister,
    formState: { errors, isSubmitted },
    setValue,
    control,
    trigger
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: defaultValues
  })

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [data])

  const onChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)

      reader.readAsDataURL(files[0])
    }
  }

  const onErrors = (errors: any) => console.error(errors)
  const onSubmit = () => {
    onSave && onSave(getValues())
    setIsLoading(true)
  }

  const handleDelete = (id: string) => {
    onDelete && onDelete(id)
  }

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit, onErrors)}>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>

                <ResetButtonStyled color='error' variant='outlined' onClick={() => handleDelete(defaultValues.id)}>
                  Delete Account
                </ResetButtonStyled>
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl error={true ? errors.firstName?.type === 'required' : false} variant='standard' fullWidth>
              <TextField
                fullWidth
                label='First Name'
                placeholder='John'
                {...register('firstName', { required: true })}
                onChange={e => setValue('firstName', e.target.value)}
                error={errors.firstName?.type === 'required' ? true : false}
              />
              {errors.firstName?.type === 'required' && (
                <FormHelperText className='error'>First name is required</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl error={true ? errors.lastName?.type === 'required' : false} variant='standard' fullWidth>
              <TextField
                fullWidth
                label='Last Name'
                placeholder='Doe'
                {...register('lastName', { required: true })}
                onChange={e => setValue('lastName', e.target.value)}
                error={errors.lastName?.type === 'required' ? true : false}
              />
              {errors.lastName?.type === 'required' && (
                <FormHelperText className='error'>Last name is required</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl error={true ? typeof errors.email !== undefined : false} variant='standard' fullWidth>
              <TextField
                fullWidth
                label='Email'
                placeholder='johnDoe@example.com'
                {...register('email', {
                  required: 'required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Invalid email address'
                  }
                })}
                onChange={e => setValue('email', e.target.value)}
                error={errors.email ? true : false}
              />
              {errors.email?.type === 'required' && (
                <FormHelperText className='error'>Email address is required</FormHelperText>
              )}
              {errors.email && errors.email?.type !== 'required' && (
                <FormHelperText className='error'>{errors.email.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ marginBottom: 0 }} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body2' sx={{ fontWeight: 600 }}>
              2. Customer Address
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Address'
              placeholder=''
              {...register('address')}
              onChange={e => setValue('address', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='City'
              placeholder=''
              {...register('city')}
              onChange={e => setValue('city', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label='Postcode'
              placeholder=''
              {...register('postcode')}
              onChange={e => setValue('postcode', parseInt(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                label='State'
                select
                {...register('state')}
                onChange={e => setValue('state', e.target.value)}
                defaultValue={getValues('state')}
              >
                <MenuItem value='Penang'>Penang</MenuItem>
                <MenuItem value='Kuala Lumpur'>Kuala Lumpur</MenuItem>
                <MenuItem value='Perak'>Perak</MenuItem>
                <MenuItem value='Selangor'>Selangor</MenuItem>
              </TextField>
            </FormControl>
          </Grid>

          {openAlert ? (
            <Grid item xs={12} sx={{ mb: 3 }}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={(e: SyntheticEvent) => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null}

          <Grid item xs={12}>
            <LoadingButton
              loading={true ? isLoading === true : false}
              loadingPosition='start'
              startIcon={<SaveIcon />}
              variant='contained'
              color='primary'
              sx={{ marginRight: 3.5 }}
              type='submit'
            >
              Save
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
