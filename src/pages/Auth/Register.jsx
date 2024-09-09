import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { registerAPI } from '~/apis';
import validateEmail from '~/utils/validateEmail';

export default function Register({ setValue }) {
	const [registerData, setRegisterData] = useState({
		fullName: '',
		username: '',
		password: '',
		email: '',
	});

	const handleSubmitRegister = async (e) => {
		e.preventDefault();
		if (
			registerData.fullName === '' ||
			registerData.username === '' ||
			registerData.password === '' ||
			registerData.email === ''
		) {
			toast.error('Please fill all fields', {
				position: 'top-right',
			});
			return;
		}
		if (!validateEmail(registerData.email)) {
			toast.error('Invalid email address', {
				position: 'top-right',
			});
			return;
		}

		const res = await registerAPI(registerData);
		if (res.statusCode === 422) {
			toast.error(res.message, {
				position: 'top-right',
			});
		}

		if (res.success) {
			toast.success(res.message, {
				position: 'top-right',
			});
			setValue('1');
		}
	};

	return (
		<Container
			component='main'
			maxWidth='xs'>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}>
				<Typography
					component='h1'
					variant='h5'>
					Register
				</Typography>
				<Box
					component='form'
					sx={{ width: '100%', marginTop: 3 }}
					noValidate>
					<Grid
						container
						spacing={2}>
						<Grid
							item
							xs={12}
							sm={6}>
							<TextField
								autoComplete='fname'
								variant='standard'
								required
								fullWidth
								id='firstName'
								label='Full Name'
								autoFocus
								value={registerData.fullName}
								onChange={(e) =>
									setRegisterData({ ...registerData, fullName: e.target.value })
								}
							/>
						</Grid>
						<Grid
							item
							xs={12}
							sm={6}>
							<TextField
								variant='standard'
								required
								fullWidth
								id='lastName'
								label='User Name'
								value={registerData.username}
								onChange={(e) =>
									setRegisterData({ ...registerData, username: e.target.value })
								}
							/>
						</Grid>
						<Grid
							item
							xs={12}>
							<TextField
								variant='standard'
								required
								fullWidth
								id='email'
								label='Email Address'
								autoComplete='email'
								value={registerData.email}
								onChange={(e) =>
									setRegisterData({ ...registerData, email: e.target.value })
								}
							/>
						</Grid>
						<Grid
							item
							xs={12}>
							<TextField
								variant='standard'
								required
								fullWidth
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
								value={registerData.password}
								onChange={(e) =>
									setRegisterData({ ...registerData, password: e.target.value })
								}
							/>
						</Grid>
					</Grid>
					<Button
						onClick={(e) => handleSubmitRegister(e)}
						fullWidth
						variant='contained'
						color='primary'
						sx={{ mt: 3, mb: 2 }}>
						Sign Up
					</Button>
					<Grid
						container
						justifyContent='flex-end'>
						<Grid item>
							<Link
								sx={{ cursor: 'pointer' }}
								onClick={() => setValue('1')}
								variant='caption'>
								Already have an account? Register
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
