try {
  const res = await fetch("./db.json");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  const products = await res.json();
  productDetailPage(products);
} catch (error) {
  console.error("에러!", error);
}


function addToCart(product) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push(product);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  alert("상품이 장바구니에 추가되었습니다!");
}

function orderToCart(product) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push(product);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  alert(`${product.productName}을 주문하시겠습니까?`);

  window.location.href = "./purchase/purchase.html";
}

function removeFromCart(productId) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
  cartItems = cartItems.filter(item => item.id !== productId);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  const cartBtn = document.querySelector(`#cart-${productId}`);
  if (cartBtn) {
    cartBtn.disabled = false;
  }
}

function productDetailPage(products) {
  const productList = document.getElementById("product-wrap");
  let currentIndex = 0;
  const itemsPerLoad = 5;

  function loadMore() {
    if (currentIndex >= products.length) return;

    const nextItems = products.slice(currentIndex, currentIndex + itemsPerLoad);

    nextItems.forEach((data, index) => {
      const li = document.createElement("li");
      li.classList.add("fade-in");
      li.innerHTML = `
        <div class="img_box">
          <img src="./imgs/${data.productImgFileName}" width="140" />
        </div>
        <div class="info_box">
          <h3>${data.productName}</h3>
          <span>${data.productPrice}</span>
          <button id="cart-${data.id}">cart</button>
          <button id="order-${data.id}">Order</button>
        </div>
      `;
      productList.appendChild(li);


      const cartBtn = li.querySelector(`#cart-${data.id}`);
      cartBtn.addEventListener("click", () => {
        addToCart(data);

        cartBtn.disabled = true;
      });

      const orderBtn = li.querySelector(`#order-${data.id}`);
      orderBtn.addEventListener("click", () => {
        orderToCart(data);
      });
  
  
    });

    currentIndex += itemsPerLoad;
  }

  loadMore();

  productList.addEventListener("scroll", () => {
    if (productList.scrollTop + productList.clientHeight >= productList.scrollHeight - 2) {
      loadMore();
    }
  });
}
