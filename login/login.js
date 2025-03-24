document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const loginIdInput = document.getElementById('loginId');
  const loginPwInput = document.getElementById('loginPw');
  const saveIdCheckbox = document.getElementById('saveId');
  const signUpBtn = document.getElementById('signUpBtn');
  const backBtn = document.getElementById('backBtn');

  //회원가입 정보 유무 확인
  const userData = localStorage.getItem('user');
  if (!userData) {
    alert('회원가입 정보가 없습니다. 회원가입을 먼저 진행해주세요.');
    window.location.href = '../signup/signup.html';
  }

  const savedId = localStorage.getItem('savedId');
  if (savedId) {
    loginIdInput.value = savedId;
    saveIdCheckbox.checked = true;
  }

  // 로그인 폼 제출
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const loginId = loginIdInput.value.trim();
    const loginPw = loginPwInput.value.trim();
    const { id, pw } = JSON.parse(userData);

    if (loginId === id && loginPw === pw) {
      localStorage.setItem('isLoggedIn', 'true');

      if (saveIdCheckbox.checked) {
        localStorage.setItem('savedId', loginId);
      } else {
        localStorage.removeItem('savedId');
      }

      alert('로그인 성공!');
      window.location.href = '../index.html';
    } else {
      alert('아이디 또는 비밀번호가 잘못되었습니다.');
    }
  });

  signUpBtn.addEventListener('click', () => {
    window.location.href = '../signup/signup.html';
  });

  backBtn.addEventListener('click', () => {
    window.history.back();
  });
});
