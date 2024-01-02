import React, { useState } from 'react';
import Styles from './todolist.module.css';
import StartPage from './StartPage';
import ListPage from './ListPage';
/**
 * list = {
 *  title: String
 * }
 *
 */

const Todolist = () => {
	const [list, setList] = useState([]);

	return (
		<div className={Styles.container}>
			{list.length === 0 ? (
				<StartPage setList={setList} />
			) : (
				<ListPage list={list} setList={setList} />
			)}
		</div>
	);
};

export default Todolist;
