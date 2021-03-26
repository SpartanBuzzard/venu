//Chris Solinsky
// 3/25/21

//Displays the information supplied by the user on the login screen
//TODO: Handle account creation and link bookmarked articles, move persistence out of localStorage

import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Profile({ user }) {
	return (
		<>
			{user && (
				<Row>
					<Col xs={12}>
						<Card id="profile">
							<FontAwesomeIcon icon={faUser} />
							<div>
								{user.firstname} {user.lastname} | {user.email}
							</div>
						</Card>
					</Col>
				</Row>
			)}
		</>
	);
}

export default Profile;
