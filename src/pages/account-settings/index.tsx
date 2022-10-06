import axios from 'axios'

// ** React Imports
import { forwardRef, SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab, { TabProps } from '@mui/material/Tab'
import Snackbar from '@mui/material/Snackbar'
import Stack from '@mui/material/Stack'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabInfo from 'src/views/account-settings/TabInfo'
import TabAccount from 'src/views/account-settings/TabAccount'
import TabSecurity from 'src/views/account-settings/TabSecurity'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const AccountSettings = ({ customer }: any) => {
  // ** State
  const [value, setValue] = useState<string>('account')
  const [open, setOpen] = useState(false)
  const [customerData, setCustomerData] = useState(customer)

  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
  })

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const updateCustomer = async (data: any) => {
    const response = await axios.put(`http://localhost:3000/customers/${data.id}`, data)

    if (response.status === 200) {
      setTimeout(() => {
        setOpen(true)
      }, 1000)
      setCustomerData({ ...response.data })
    }
  }

  const deleteCustomer = async (id: string) => {
    const response = await axios.delete(`http://localhost:3000/customers/${id}`)

    if (response.status === 200) {
    }
  }

  return (
    <Card>
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label='account-settings tabs'
          sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
        >
          <Tab
            value='account'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountOutline />
                <TabName>Account</TabName>
              </Box>
            }
          />
          <Tab
            value='security'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LockOpenOutline />
                <TabName>Security</TabName>
              </Box>
            }
          />
          <Tab
            value='info'
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <InformationOutline />
                <TabName>Info</TabName>
              </Box>
            }
          />
        </TabList>

        <TabPanel sx={{ p: 0 }} value='account'>
          <TabAccount
            data={customerData}
            onDelete={(id: string) => {
              deleteCustomer(id)
            }}
            onSave={(data: any) => {
              updateCustomer(data)
            }}
          />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='security'>
          <TabSecurity />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='info'>
          <TabInfo />
        </TabPanel>
      </TabContext>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
            Customer details successfully updated.
          </Alert>
        </Snackbar>
      </Stack>
    </Card>
  )
}

export async function getServerSideProps() {
  const result = await axios.get('http://localhost:3000/customers/633d1950412174562678bb83')

  if (result.status === 200) {
    return { props: { customer: result.data } }
  }
}

export default AccountSettings
