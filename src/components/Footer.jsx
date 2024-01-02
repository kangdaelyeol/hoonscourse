import React, { useState } from 'react';
import Styles from './footer.module.css';

const Footer = () => {
	const [orange, setOrange] = useState(false);

	const onFooterClick = (e) => {
		setOrange((prev) => {
			return !prev;
		});
	};
	let style;
	style = orange ? Styles.orange : Styles.blue;
	return (
		<div onClick={onFooterClick} className={`${Styles.container} ${style}`}>
			나는 강대렬
		</div>
	);
};

export default Footer;
