document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.querySelector('.loginBtn');
  const welcomeSpan = document.querySelector('.home > span'); 

  // localStorage에서 로그인 여부와 사용자 정보 가져오기
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userDataString = localStorage.getItem('user');
  let userData = null;

  if (userDataString) {
    userData = JSON.parse(userDataString); // { id, pw, username }
  }

  // 로그인 상태 "로그아웃" 버튼 + 환영 문구 표시
  if (isLoggedIn && userData) {
    welcomeSpan.textContent = `안녕하세요👋🏻 ${userData.username}님!`;
    loginBtn.textContent = '로그아웃';

    // 로그아웃 버튼 누르면
    loginBtn.addEventListener('click', () => {
      localStorage.removeItem('isLoggedIn');
      location.reload();
    });
  } else {
    loginBtn.textContent = '로그인';
    loginBtn.addEventListener('click', () => {
      window.location.href = './login/login.html';
    });
  }
});
