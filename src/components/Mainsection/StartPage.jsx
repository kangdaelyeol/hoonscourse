import React, { useState } from 'react';

export default function StartPage({ setList }) {
	const [todo, setTodo] = useState('');

	const onFormSubmit = (e) => {
		e.preventDefault();
		setList((prev) => [...prev, todo]);
	};

	const onInputChange = (e) => {
		setTodo(e.target.value);
	};

	return (
		<div>
			<div className='desctiption'>오늘의 항일을 만들어 보세용!</div>
			<form onSubmit={onFormSubmit}>
				<input onChange={onInputChange} type='text' />
			</form>
		</div>
	);
}
