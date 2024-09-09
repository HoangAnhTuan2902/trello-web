/* eslint-disable quotes */
import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { loginAPI } from '~/apis';
import validateEmail from '~/utils/validateEmail';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Login({ setValue }) {
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});

	const navigate = useNavigate();

	const handleSubmitLogin = async (e) => {
		e.preventDefault();

		if (loginData.email === '' || loginData.password === '') {
			toast.error('Please fill all fields', {
				position: 'top-right',
			});
			return;
		}

		if (!validateEmail(loginData.email)) {
			toast.error('Invalid email address', {
				position: 'top-right',
			});
			return;
		}

		const res = await loginAPI(loginData);
		if (res.status === 200) {
			toast.success(res.message, {
				position: 'top-right',
			});
			navigate('/board');
		}

		if (res.statusCode === 422) {
			toast.error('Invalid email or password', {
				position: 'top-right',
			});
			return;
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
					Login
				</Typography>
				<Box
					component='form'
					sx={{
						width: '100%',
						marginTop: 1,
					}}>
					<TextField
						variant='standard'
						margin='normal'
						required
						fullWidth
						id='email'
						label='Email Address'
						autoComplete='email'
						autoFocus
						value={loginData.email}
						onChange={(e) =>
							setLoginData({ ...loginData, email: e.target.value })
						}
					/>
					<TextField
						variant='standard'
						margin='normal'
						required
						fullWidth
						label='Password'
						type='password'
						id='password'
						autoComplete='current-password'
						value={loginData.password}
						onChange={(e) =>
							setLoginData({ ...loginData, password: e.target.value })
						}
					/>
					<FormControlLabel
						control={
							<Checkbox
								value='remember'
								color='primary'
							/>
						}
						label='Remember me'
					/>
					<Button
						onClick={(e) => handleSubmitLogin(e)}
						fullWidth
						variant='contained'
						color='primary'
						sx={{ mb: 2 }}>
						Login
					</Button>
					<Grid
						container
						sx={{
							justifyContent: 'flex-end',
						}}>
						{/* <Grid
							item
							xs>
							<Link
								href='#'
								variant='caption'>
								Forgot password?
							</Link>
						</Grid> */}
						<Grid item>
							<Link
								sx={{ cursor: 'pointer' }}
								onClick={() => setValue('2')}
								variant='caption'>
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}
