//Chris Solinsky
// 3/25/21

import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Login from '../components/Login';

function Home({ user, setUser, bookmarks }) {
	return (
		<>
			{!user ? (
				<Container className="page">
					<Row>
						<Col xs={12} md={{ span: 6, offset: 3 }}>
							<Login user={user} setUser={setUser} />
						</Col>
					</Row>
				</Container>
			) : (
				<Redirect
					to={
						localStorage.getItem('lastPage') == '/reading-list' &&
						bookmarks.length != 0
							? '/reading-list'
							: '/news'
					}
				/>
			)}
		</>
	);
}

export default Home;
