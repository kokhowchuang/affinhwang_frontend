// ** React Imports
import { SyntheticEvent } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// import InputLabel from '@mui/material/InputLabel'
// import IconButton from '@mui/material/IconButton'
// import FormControl from '@mui/material/FormControl'
// import OutlinedInput from '@mui/material/OutlinedInput'
// import InputAdornment from '@mui/material/InputAdornment'
// import FormHelperText from '@mui/material/FormHelperText'

// ** Icons Imports
// import EyeOutline from 'mdi-material-ui/EyeOutline'
// import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// interface State {
//   password: string
//   showPassword: boolean
// }

const FormLayoutsBasic = () => {
  // ** States
  // const [values, setValues] = useState<State>({
  //   password: '',
  //   showPassword: false
  // })
  // const [confirmPassValues, setConfirmPassValues] = useState<State>({
  //   password: '',
  //   showPassword: false
  // })

  // const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
  //   setValues({ ...values, [prop]: event.target.value })
  // }

  // const handleConfirmPassChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
  //   setConfirmPassValues({ ...confirmPassValues, [prop]: event.target.value })
  // }
  // const handleClickShowPassword = () => {
  //   setValues({ ...values, showPassword: !values.showPassword })
  // }

  // const handleClickConfirmPassShow = () => {
  //   setConfirmPassValues({ ...confirmPassValues, showPassword: !confirmPassValues.showPassword })
  // }

  // const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
  //   event.preventDefault()
  // }

  return (
    <Card>
      <CardHeader title='Basic' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField fullWidth label='First Name' placeholder='John' />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label='Last Name' placeholder='Doe' />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='email'
                label='Email'
                placeholder='carterleonard@gmail.com'
                helperText='You can use letters, numbers & periods'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label='Address' placeholder='' />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label='City' placeholder='' />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label='Postcode' placeholder='' />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label='State' placeholder='' />
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Button type='submit' variant='contained' size='large'>
                  Get Started!
                </Button>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography sx={{ mr: 2 }}>Already have an account?</Typography>
                  <Link href='/' onClick={(e: SyntheticEvent) => e.preventDefault()}>
                    Log in
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormLayoutsBasic
