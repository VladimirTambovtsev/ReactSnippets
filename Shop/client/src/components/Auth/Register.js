import React from 'react';

import MyButton from '../common/MyButton'

const RegisterLogin = () => {
	return (
		<div className="page_wrapper">
			<div className="container">
				<div className="register_login_container">
					<div>
						<h1>Sign Up</h1>
						<MyButton title="Create an account" linkTo="/signup" style={{ margin: '10px' }} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default RegisterLogin;
