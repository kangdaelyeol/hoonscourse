import React from 'react';
import Styles from './headeritem.module.css';

const HeaderItem = (props) => {
	const { text, text2 } = props;
	return (
		<div className={Styles.container}>{`${text || '강대렬'} ${
			text2 || '강대렬'
		}`}</div>
	);
};

export default HeaderItem;
