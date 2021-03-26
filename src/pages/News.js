//Chris Solinsky
// 3/25/21

//Retrieve list of top stories from Hacker News API
//Displayed stories are based on active page and load individually on each render
//Unauthenticated user is sent back to Home page

import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';

import StoryPreview from '../components/StoryPreview';
import StoryPagination from '../components/StoryPagination';
import Profile from '../components/Profile';

function News({ user, bookmarks, setBookmarks }) {
	const storiesPerPage = 10;

	const [topStories, setTopStories] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [activePage, setActivePage] = useState(
		Number(localStorage.getItem('recentPage')) || 1
	);
	const [displayStories, setDisplayStories] = useState();

	useEffect(() => {
		//fetch the ids of the top stories
		let isMounted = true;
		if (isMounted) {
			axios
				.get('https://hacker-news.firebaseio.com/v0/topstories.json')
				.then((res) => {
					setTopStories(res.data);
					setLoaded(true);
				});
		}
		return () => (isMounted = false);
	}, []);

	useEffect(() => {
		//Set up the displayed stories based on active page
		//select from updated stories on each initial render of News
		let isMounted = true;
		if (isMounted) {
			let stories = [];
			for (
				let i = storiesPerPage * (activePage - 1);
				i != topStories.length && i < storiesPerPage * activePage;
				i++
			) {
				stories.push(
					<StoryPreview
						key={topStories[i]}
						number={i + 1}
						id={topStories[i]}
						bookmarks={bookmarks}
						setBookmarks={setBookmarks}
					/>
				);
			}
			setDisplayStories(stories);
		}
		return () => (isMounted = false);
	}, [topStories, activePage, bookmarks]);

	return (
		<>
			{user ? (
				<Container className="page">
					<Profile user={user} />
					<Row>
						<Col xs={12}>
							<Card>
								<Card.Title className="text-center">Top Stories</Card.Title>
								{loaded ? (
									<Card.Body>
										<StoryPagination
											count={topStories.length}
											storiesPerPage={storiesPerPage}
											activePage={activePage}
											setActivePage={setActivePage}
										/>
										{displayStories &&
											displayStories.map((story) => {
												return story;
											})}
										<StoryPagination
											count={topStories.length}
											storiesPerPage={storiesPerPage}
											activePage={activePage}
											setActivePage={setActivePage}
										/>
									</Card.Body>
								) : (
									<Card className="loading-spinner">
										<Card.Body>
											<Spinner animation="border" role="status" />
											<div>Loading...</div>
										</Card.Body>
									</Card>
								)}
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

export default News;
