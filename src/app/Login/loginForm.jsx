// app/LoginForm.jsx
'use client'; // 클라이언트 컴포넌트로 지정

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { TokenState, AccState } from '../../common/RecoilAtom/recoilHomeState';
import { fetchFunction } from '../../common/models/fetch';

export default function LoginForm({ id, setId, pwd, setPwd}) {
	const router = useRouter();
	const setToken = useSetRecoilState(TokenState);
	const setAcc = useSetRecoilState(AccState);
	const [isFetching, setIsFetching] = React.useState(false);
	const [showProgressMessage, setShowProgressMessage] = React.useState(false);
	const [isLoginFailed, setIsLoginFailed] = React.useState(false);
	const [isLoginSuccessed, setIsLoginSuccessed] = React.useState(false);
	const [dotText, setDotText] = React.useState('.');
	const [loginMessage, setLoginMessage] = React.useState('Logging in');

	React.useEffect(() => {
		if (isFetching) {
			const interval = setInterval(() => {
				setDotText((prev) => (prev === '....' ? '.' : prev + '.'));
			}, 500);
			return () => clearInterval(interval);
		} else {
			if (isLoginFailed) {
				setLoginMessage('Login Failed');
			} else if (isLoginSuccessed) {
				setLoginMessage('Login Successed');
			}

			const interval = setInterval(() => {
				setShowProgressMessage(false);
				setLoginMessage('Logging in');
				if (isLoginSuccessed) {
					router.push('../home');
				}
			}, 2000);
			return () => clearInterval(interval);
		}
	}, [isFetching]);

	React.useEffect(() => {
		if (isFetching) {
			setLoginMessage('Logging in' + dotText);
		}
	}, [dotText]);

	const onClickLogin = React.useCallback(async () => {
		setIsFetching(true);
		setShowProgressMessage(true);
		const res = await fetchFunction({
			baseUrl: 'https://members.midasuser.com/auth/api/v1/login',
			method: 'POST',
			body: { email: id, password: pwd },
		});
		if (res.ok) {
			const data = await res.json();
			setToken(data.token);
			setAcc(JSON.stringify({ id, pwd }));

			setIsLoginSuccessed(true);
			setIsLoginFailed(false);
		} else {
			setToken('');
			setAcc('');

			setIsLoginSuccessed(false);
			setIsLoginFailed(true);
		}

		const interval = setInterval(() => {
			setIsFetching(false);
		}, 2000);
		return () => clearInterval(interval);
	}, [id, pwd]);

	function onChangeId(e) {
		if (e.nativeEvent.inputType === 'deleteContentBackward') {
			setId(e.target.value);
			return;
		}
		if (
			e.target.value.lastIndexOf('@') === e.target.value.length - 1 &&
			e.target.value.split('@').length === 2
		) {
			if (!e.target.value) {
				setId('');
				return;
			} else {
				const id = e.target.value;
				const email = id + 'midasit.com';
				setId(email);
				return;
			}
		}
		setId(e.target.value);
	}

	return (
		<div key='loginForm_div' style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
			<input
				className='login-input'
				type='text'
				value={id}
				onChange={onChangeId}
				placeholder='user@midasit.com'
			/>
			<input
				className='login-input'
				type='password'
				value={pwd}
				onChange={(e) => setPwd(e.target.value)}
				placeholder='password'
			/>
			<div
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between',
					marginTop: '25px',
					gap: '20px',
				}}
			>
				{showProgressMessage ? (
					<div className={`login-message-container ${isLoginFailed ? 'login-failed' : ''}`}>
						{loginMessage}
					</div>
				) : (
					<>
						<button className='login-button back' onClick={() => router.push('../home')}>
							Back
						</button>
						<button className='login-button login' onClick={onClickLogin}>
							Login
						</button>
					</>
				)}
			</div>
		</div>
	);
}
