import React, { useState, useRef } from 'react';
import ListItem from './ListItem';
export default function ListPage({ list, setList }) {
	const [todo, setTodo] = useState('');
	const inputRef = useRef();
	const onFormSubmit = (e) => {
		e.preventDefault();
		inputRef.current.value = '';
		setList((prev) => [...prev, todo]);
	};

	const onInputChange = (e) => {
		setTodo(e.target.value);
	};

	return (
		<div>
			{list.map((text, ind) => {
				return <ListItem ind={ind} key={ind} text={text} setList={setList} />;
			})}
			<form onSubmit={onFormSubmit}>
				<input ref={inputRef} onChange={onInputChange} type='text' />
			</form>
		</div>
	);
}
