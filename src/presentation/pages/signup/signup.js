import { useHistory } from 'react-router';
import { postRequest } from '../../../data/data-source/remote/apiCall';
import { SIGNUP } from '../../../data/data-source/remote/apiList';
import { SIGNUP_SUCCESS_PAGE_ROUTE } from '../../routes/route-paths';
import { useState } from 'react';
const bcrypt = require('bcryptjs');

function Signup() {
  const pattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const navigator = useHistory();
  const [isUsernameValid, setUsernameValid] = useState(false);
  const [isUsernameBlank, setUsernameBlank] = useState(true);
  const [isUsernameLoading, setUsernameLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  let handleUsernameChange = async () => {
    setUsernameLoading(true);
    var username = document.getElementById('usernameField').value;
    setUsernameBlank(username.length == '');
    var verdict = await postRequest('userExists', { username: username });

    if (verdict.message == 'False') setUsernameValid(true);
    else setUsernameValid(false);
    setUsernameLoading(false);
  };

  async function handleSignup(e) {
    e.preventDefault();
    var username = document.getElementById('usernameField').value;
    var password = document.getElementById('passwordField').value;
    var email = document.getElementById('emailField').value;
    var bio = document.getElementById('bioField').value;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hashedPassword) => {
        console.log(hashedPassword);
        var res = await postRequest(SIGNUP, {
          username: username,
          password: hashedPassword,
          email: email,
          about: bio,
        });

        let verdict = res.success;
        if (verdict == false) setErrorMessage(res.error);
        else navigator.push(SIGNUP_SUCCESS_PAGE_ROUTE);
      });
    });
  }

  return (
    <div className="body">
      <p className="headline">Signup.</p>
      <p className="bodyText">
        signup to use the created account <span>with the CLI.</span>
      </p>

      <form action="/" onSubmit={handleSignup} className="form">
        <input
          type="text"
          placeholder="username"
          id="usernameField"
          onChange={handleUsernameChange}
          required
        />
        <input
          type="email"
          placeholder="email"
          id="emailField"
          pattern={pattern}
          required
        />
        <input
          type="text"
          placeholder="about yourself in few lines"
          id="bioField"
          required
        />
        <input
          type="password"
          placeholder="password"
          id="passwordField"
          minLength="8"
          required
        />
        <button
          className={
            isUsernameBlank
              ? 'button'
              : isUsernameLoading
              ? 'disabledButton'
              : isUsernameValid
              ? 'button'
              : 'disabledButton'
          }
          disabled={
            isUsernameBlank
              ? false
              : isUsernameLoading
              ? true
              : isUsernameValid
              ? false
              : true
          }
        >
          {isUsernameBlank
            ? 'Create account'
            : isUsernameLoading
            ? 'Checking username'
            : isUsernameValid
            ? 'Create account'
            : 'Username taken'}
        </button>
      </form>
      <p className="warning">{errorMessage}</p>
    </div>
  );
}

export default Signup;
