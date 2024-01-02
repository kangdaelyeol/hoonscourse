import React from 'react';
import Styles from './listitem.module.css';

export default function ListItem({ ind, text, setList }) {
	const onBtnClick = (e) => {
		setList((prev) => {
			const nlist = prev.filter((i, indd) => {
				return ind !== indd;
			});
			return nlist;
		});
	};
	return (
		<div className={Styles.container}>
			<div className={Styles.text}>{text}</div>
			<div onClick={onBtnClick} className={Styles.removeBtn}>
				OK
			</div>
		</div>
	);
}
