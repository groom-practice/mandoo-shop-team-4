// 로컬스토리지 키 이름
const LOCAL_STORAGE_KEY = "cartItems";
let cartItems = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

const cartListContainer = document.querySelector(".cart-list-container ul");
const deleteButton = document.querySelector(".delete-button");
const deleteAllButton = document.querySelector(".delete-all-button");

// 장바구니 목록 렌더링
function getCartList() {
  cartListContainer.innerHTML = ""; // 초기화

  if (cartItems.length === 0) {
    cartListContainer.innerHTML = "<li>장바구니에 담긴 상품이 없습니다.</li>";
    return;
  }

  console.log("장바구니 목록 확인 : ", cartItems);

  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" id="${item.id}" />
      <p>${item.productName}</p>
    `;
    cartListContainer.appendChild(li);
  });
}

// 선택 삭제
deleteButton.addEventListener("click", () => {
  const checkedBoxes = document.querySelectorAll(
    ".cart-list-container input[type='checkbox']:checked"
  );

  if (checkedBoxes.length === 0) {
    alert("삭제할 상품을 선택해주세요!");
    return;
  }

  const checkedIds = Array.from(checkedBoxes).map((checkbox) =>
    Number(checkbox.id)
  );

  // 선택된 id 제외하고 남기기
  cartItems = cartItems.filter((item) => !checkedIds.includes(item.id));
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));

  getCartList();
});

// 전체 삭제
deleteAllButton.addEventListener("click", () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
  cartItems = [];
  getCartList();
});

getCartList();
