import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Welcome.css';

const Welcome = () => {
	return (
		<>
			<h1>How I utilized the start code</h1>

			<ol>
				<li>Forked, cloned the main repository</li>
				<li>
					Followed the frontend guide:{' '}
					<a href="https://github.com/Runi-VN/CA3/blob/master/frontend/README.md">
						https://github.com/Runi-VN/CA3/blob/master/frontend/README.md
					</a>
				</li>
				<li>
					Deployed using surge HTTPS:{' '}
					<a href="	https://surge.sh/help/using-https-by-default">
						https://surge.sh/help/using-https-by-default
					</a>
				</li>
				<li>
					Found an error:{' '}
					<a href="https://github.com/facebook/create-react-app/issues/3294#issuecomment-339835457">
						https://github.com/facebook/create-react-app/issues/3294#issuecomment-339835457
					</a>
					<ul>
						<li>
							Github Pages use <code>homepage</code> in{' '}
							<code>package.json</code>
						</li>
						<li>
							Surge is not very fond of this and tries erroneously to refer to{' '}
							<code>homepage</code>
						</li>
					</ul>
				</li>
				<li>Actually deployed</li>
			</ol>

			<p>
				<Link to="#/login">Login</Link> using the credentials you set in the
				backend <code>utils\SetupTestUsers.java</code>
			</p>
		</>
	);
};

export default Welcome;
