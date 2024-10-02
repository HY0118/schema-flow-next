import * as React from 'react';

import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
// import { motion, AnimatePresence } from 'framer-motion';
import preval from 'preval.macro';

// components
import { SvgLoginBackground } from '../../components/icons/IconSvgSet';

// css
import './Login.css';

import LoginForm from './LoginForm'; // 클라이언트 컴포넌트 import

export default function Login() {
	const [id, setId] = React.useState('');
	const [pwd, setPwd] = React.useState('');

	// LoginForm에 전달할 props
	const formProps = {
		id,
		setId,
		pwd,
		setPwd,
	};

	return (
		<div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }} key='FlowLogin'>
			<div
				key="login_div"
				// initial={{ opacity: 0 }}
				// animate={{ opacity: 1 }}
				// exit={{ opacity: 0 }}
				// transition={{ duration: 0.5, type: 'easeInOut' }}
			>
				{/* <AnimatePresence> */}
					<div
						key="background_div"
						// initial={{ opacity: 0 }}
						// animate={{ opacity: 1 }}
						// exit={{ opacity: 0 }}
						// transition={{ duration: 0.5, type: 'easeInOut' }}
					>
						<SvgLoginBackground key='chat-login-background' />
					</div>
				{/* </AnimatePresence> */}

				{/* <AnimatePresence mode='popLayout'> */}
					<Stack
						position='absolute'
						top={0}
						bottom={0}
						left={0}
						right={0}
						width='30rem'
						height='25rem'
						margin='auto'
						direction='column'
					>
						<div
							style={{
								height: '100%',
								width: '100%',
								display: 'inherit',
								alignItems: 'center',
								justifyContent: 'center',
								backdropFilter: 'blur(20px)',
								backgroundColor: 'rgba(255, 255, 255, 0.5)',
								borderRadius: '10px',
							}}
							data-glow
						>
							<div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
								<div>
									<div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
										<Typography variant='h3'>Flow Login</Typography>
									</div>
									<div style={{ height: '1rem' }} />
									<Divider flexItem />
									<div style={{ height: '0.8rem' }} />
									<Typography variant='caption'>
										Release date{' '}
										{`${preval`module.exports = new Date().toLocaleString("ko-kr", { timeZone : "Asia/Seoul" });`}`}
									</Typography>
									<div style={{ height: '2.5rem' }} />
								</div>
								{/* 클라이언트 컴포넌트로 로그인 폼 렌더링 */}
								{/* <LoginForm {...formProps} /> */}
							</div>
						</div>
					</Stack>
				{/* </AnimatePresence> */}
			</div>
		</div>
	);
}
