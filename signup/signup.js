document.addEventListener('DOMContentLoaded', () => {
  const signUpForm = document.getElementById('signUpForm');
  const signUpIdInput = document.getElementById('signUpId');
  const signUpPwInput = document.getElementById('signUpPw');
  const signUpUsernameInput = document.getElementById('signUpUsername');
  const backBtn = document.getElementById('backBtn');
  const homeBtn = document.getElementById('homeBtn');

  signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = signUpIdInput.value.trim();
    const pw = signUpPwInput.value.trim();
    const username = signUpUsernameInput.value.trim();

    if (id.length < 6) {
      alert('아이디는 6자 이상이어야 합니다.');
      return;
    }

    if (pw.length < 8) {
      alert('비밀번호는 8자 이상이어야 합니다.');
      return;
    }

    const userInfo = { id, pw, username };
    localStorage.setItem('user', JSON.stringify(userInfo));

    alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
    window.location.href = '../login/login.html';
  });

  backBtn.addEventListener('click', () => {
    window.history.back();
  });

  homeBtn.addEventListener('click', () => {
    window.location.href = '../index.html';
  });
});

