import React from 'react';
import Styles from './header.module.css';
import HeaderItem from './Headeritem';

const Header = () => {
	return (
		<div className={Styles.container}>
			<div className={Styles.logo}>
				<HeaderItem text={'Logo'} text2='gd' />
			</div>
			<div className={Styles.title}>Title</div>
			<div className={Styles.login}>Login</div>
		</div>
	);
};

export default Header;
