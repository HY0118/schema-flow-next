// UserInfo.jsx
import React from 'react';
import { useRouter } from 'next/navigation';
// import { useNavigate } from 'react-router-dom';

// recoil
import { useSetRecoilState } from 'recoil';
import { TokenState, AccState } from '../../common/RecoilAtom/recoilHomeState';

// components
import { SvgDropdown, SvgLogOut, SvgLogin } from '../icons/IconSvgSet';
import { Tooltip } from '../common/Tooltip';

// css
import './UserInfo.css';

function DropDownButton({ name = 'ANONYMOUS' }) {
	return (
		<div id='userDropDownButton'>
			<div className='buttonContent'>
				<div id='userIcon'>{name.charAt(0).toUpperCase()}</div>
				<div id='userName'>{name}</div>
				<div className='userDropdownIconContainer'>
					<SvgDropdown />
				</div>
			</div>
		</div>
	);
}

function LogOutButton({ setToken, setAcc }) {
  const router = useRouter();
	// const navigate = useNavigate();

	const onClickLogout = async () => {
		setToken('');
		setAcc('');
		router.push('../login');
		// navigate('../login');
	};

	return (
		<Tooltip content='Logout' postion='down'>
			<div className='logIn-OutButtonIcon' onClick={onClickLogout}>
				<SvgLogOut />
			</div>
		</Tooltip>
	);
}

function LogInButton() {
	const router = useRouter();
	// const navigate = useNavigate();

	return (
		<Tooltip content='Login' postion='down'>
			<div
				className='logIn-OutButtonIcon'
				onClick={() => {
					router.push('../login');
					// navigate('../login');
				}}
			>
				<SvgLogin />
			</div>
		</Tooltip>
	);
}

export default function UserInfo({ userInfo }) {
	const setToken = useSetRecoilState(TokenState);
	const setAcc = useSetRecoilState(AccState);

	return (
		<div id='userInfo'>
			<DropDownButton name={userInfo?.id ? userInfo.email : 'ANONYMOUS'} />
			{!userInfo?.id ? <LogInButton /> : <LogOutButton setToken={setToken} setAcc={setAcc} />}
		</div>
	);
}
