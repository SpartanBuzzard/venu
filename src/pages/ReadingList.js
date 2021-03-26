//Chris Solinsky
// 3/25/21

//Page to display a list of stories bookmarked by the user on News page
//Unauthenticated user is sent back to Home page

import React from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

import StoryPreview from '../components/StoryPreview';
import Profile from '../components/Profile';

function ReadingList({ user, bookmarks, setBookmarks }) {
	return (
		<>
			{user && bookmarks.length > 0 ? (
				<Container className="page">
					<Profile user={user} />
					<Row>
						<Col xs={12}>
							<Card>
								<Card.Title className="text-center">Reading List</Card.Title>
								{bookmarks.map((id, index) => {
									return (
										<StoryPreview
											key={id}
											number={index + 1}
											id={id}
											bookmarks={bookmarks}
											setBookmarks={setBookmarks}
										/>
									);
								})}
							</Card>
						</Col>
					</Row>
				</Container>
			) : (
				<Redirect to="/" />
			)}
		</>
	);
}

export default ReadingList;
