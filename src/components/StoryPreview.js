//Chris Solinsky
// 3/25/21

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

function StoryPreview({ id, number, bookmarks, setBookmarks }) {
	const location = useLocation();

	const [story, setStory] = useState();

	useEffect(() => {
		//fetch the story details
		let isMounted = true;
		if (isMounted) {
			axios
				.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
				.then((res) => {
					setStory(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		return () => (isMounted = false);
	}, [id]);

	function bookmark(e) {
		//bookmark the story to be viewed on the Reading List page
		if (bookmarks) {
			setBookmarks([...bookmarks, id]);
		} else {
			setBookmarks([id]);
		}
		e.target.blur();
	}
	function removeBookmark(e) {
		//remove the bookmark for a story --> removes the story from Reading List page
		let temp = [...bookmarks];
		const index = bookmarks.indexOf(id);
		temp.splice(index, 1);
		setBookmarks(temp);
		e.target.blur();
	}
	function markLastPage() {
		//save the page to return to on site exit to story url
		localStorage.setItem('lastPage', location.pathname);
	}

	return (
		<Row>
			<Col xs={12}>
				{story ? (
					<Card className="preview">
						{!bookmarks.includes(id) ? (
							<Button
								variant="outline-info"
								className="bookmark"
								onClick={bookmark}
								title="Add to Reading List"
							>
								<FontAwesomeIcon icon={faBookmark} />
							</Button>
						) : (
							<Button
								variant="info"
								className="bookmark"
								onClick={removeBookmark}
								title="Remove from Reading List"
							>
								<FontAwesomeIcon icon={faBookmark} />
							</Button>
						)}
						<a
							href={story.url}
							title="Read the full story."
							onClick={markLastPage}
						>
							{' '}
							<Card.Title>
								{number}. {story.title}
							</Card.Title>
							<Card.Body>
								<div className="details">
									Points: {story.score} | By: {story.by} | Comments:{' '}
									{story.descendants}
								</div>
							</Card.Body>
						</a>{' '}
					</Card>
				) : (
					<Card className="loading-spinner">
						<Card.Body>
							<Spinner animation="border" role="status" />
							<div>Loading...</div>
						</Card.Body>
					</Card>
				)}
			</Col>
		</Row>
	);
}

export default StoryPreview;
