//Chris Solinsky
// 3/25/21

//Entry to application
//State is managed in hooks at top level and passed down to children as required

import React, { useState, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';

import Home from './pages/Home';
import News from './pages/News';
import ReadingList from './pages/ReadingList';
import Menubar from './components/Menubar';

function App() {
	let history = useHistory();

	if (localStorage.getItem('lastPage')) {
		history.push(localStorage.getItem('lastPage'));
	}

	const [user, setUser] = useState();
	const [bookmarks, setBookmarks] = useState(
		JSON.parse(localStorage.getItem('bookmarks')) || []
	);

	useEffect(() => {
		//On initial app load, attempt to get the user from localStorage
		if (
			localStorage.getItem('firstname') &&
			localStorage.getItem('lastname') &&
			localStorage.getItem('email')
		) {
			setUser({
				firstname: localStorage.getItem('firstname'),
				lastname: localStorage.getItem('lastname'),
				email: localStorage.getItem('email'),
			});
		}
	}, []);

	useEffect(() => {
		//Persist bookmarks in localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}, [bookmarks]);

	return (
		<>
			<Menubar
				user={user}
				setUser={setUser}
				bookmarks={bookmarks}
				setBookmarks={setBookmarks}
			/>
			<Route
				exact
				path="/venu/"
				render={() => (
					<Home user={user} setUser={setUser} bookmarks={bookmarks} />
				)}
			/>
			<Route
				exact
				path="/venu/news"
				render={() => (
					<News
						user={user}
						setUser={setUser}
						bookmarks={bookmarks}
						setBookmarks={setBookmarks}
					/>
				)}
			/>
			<Route
				exact
				path="/venu/reading-list"
				render={() => (
					<ReadingList
						user={user}
						setUser={setUser}
						bookmarks={bookmarks}
						setBookmarks={setBookmarks}
					/>
				)}
			/>{' '}
		</>
	);
}

export default App;
