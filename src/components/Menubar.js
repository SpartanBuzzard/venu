//Chris Solinsky
// 3/25/21

//Naviagion Component
//Dynamic links based on user authentication and number of bookmarked stories

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav, Navbar, Badge } from 'react-bootstrap';

function Menubar({ user, setUser, bookmarks, setBookmarks }) {
	const location = useLocation();

	function logout() {
		//Clear the user from state and localStorage on logout
		setUser(null);
		setBookmarks([]);
		localStorage.clear();
	}

	return (
		<Navbar bg="light" expand="lg">
			<Navbar.Brand as={Link} to="/venu/">
				<h1>News Hacker</h1>
			</Navbar.Brand>
			{user && (
				<>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<Nav.Link
								as={Link}
								to="/news"
								active={location.pathname === '/venu/news'}
							>
								| News
							</Nav.Link>
							{bookmarks.length > 0 && (
								<Nav.Link
									as={Link}
									to="/venu/reading-list"
									active={location.pathname === '/venu/reading-list'}
								>
									| Reading List <Badge>({bookmarks.length})</Badge>
								</Nav.Link>
							)}
							<Nav.Link onClick={logout}>| Logout</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</>
			)}
		</Navbar>
	);
}

export default Menubar;
