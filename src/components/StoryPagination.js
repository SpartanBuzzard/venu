//Chris Solinsky
// 3/25/21

//Pagination component for News page

import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';

function StoryPagination({ count, activePage, setActivePage, storiesPerPage }) {
	const [maxPages, setMaxPages] = useState();

	useEffect(() => {
		setMaxPages(Math.ceil(count / storiesPerPage));
	}, [count]);

	function buildPages() {
		//Set up the pagination to include one page on either side of the active page
		let pages = [];
		for (let i = 1; i <= maxPages; i++) {
			if (i == activePage || i == activePage + 1 || i == activePage - 1) {
				pages.push(
					<Pagination.Item
						key={i}
						onClick={() => handlePage(i)}
						active={i === activePage}
					>
						{i}
					</Pagination.Item>
				);
			}
		}
		return pages;
	}

	//Handle the page selection and scroll to the top of the news list
	function handlePage(page) {
		setActivePage(page);
		localStorage.setItem('recentPage', page);
		window.scrollTo(0, 0);
	}

	return (
		<Pagination className="pagination">
			<Pagination.First
				onClick={() => handlePage(1)}
				disabled={activePage === 1}
			/>
			<Pagination.Ellipsis disabled />
			{buildPages()}
			<Pagination.Ellipsis disabled />
			<Pagination.Last
				onClick={() => handlePage(maxPages)}
				disabled={activePage === maxPages}
			/>
		</Pagination>
	);
}

export default StoryPagination;
