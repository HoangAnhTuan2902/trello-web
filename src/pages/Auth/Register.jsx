import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid2 from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { registerAPI } from '~/apis';
import validateEmail from '~/utils/validateEmail';

export default function Register({ setValue }) {
	const [isLoading, setIsLoading] = useState(false);
	const [registerData, setRegisterData] = useState({
		fullname: '',
		username: '',
		password: '',
		email: '',
	});

	const handleSubmitRegister = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		if (
			registerData.fullname === '' ||
			registerData.username === '' ||
			registerData.password === '' ||
			registerData.email === ''
		) {
			toast.error('Please fill all fields', {
				position: 'top-right',
			});
			setIsLoading(false);
			return;
		}
		if (!validateEmail(registerData.email)) {
			toast.error('Invalid email address', {
				position: 'top-right',
			});
			setIsLoading(false);
			return;
		}

		const res = await registerAPI(registerData);
		if (res.statusCode === 422) {
			toast.error(res.message, {
				position: 'top-right',
			});
			setIsLoading(false);
		}
		console.log('res', res);

		if (res.status === 201) {
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
					<Grid2
						container
						spacing={2}>
						<Grid2 size={6}>
							<TextField
								autoComplete='fname'
								variant='standard'
								required
								fullWidth
								id='firstName'
								label='Full Name'
								autoFocus
								value={registerData.fullname}
								onChange={(e) =>
									setRegisterData({ ...registerData, fullname: e.target.value })
								}
							/>
						</Grid2>
						<Grid2 size={6}>
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
						</Grid2>
						<Grid2 size={12}>
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
						</Grid2>
						<Grid2 size={12}>
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
						</Grid2>
					</Grid2>
					<LoadingButton
						onClick={(e) => handleSubmitRegister(e)}
						fullWidth
						variant='contained'
						color='primary'
						loading={isLoading}
						sx={{ mt: 3, mb: 2 }}>
						Sign Up
					</LoadingButton>
					<Grid2
						container
						justifyContent='flex-end'>
						<Grid2>
							<Link
								sx={{ cursor: 'pointer' }}
								onClick={() => setValue('1')}
								variant='caption'>
								Already have an account? Register
							</Link>
						</Grid2>
					</Grid2>
				</Box>
			</Box>
		</Container>
	);
}
