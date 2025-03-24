async function DataList() {
  try {
    const response = await fetch("../db.json");
    const data = await response.json();
    console.log(data);
    console.log(data[0].imgUrl);

    const productName = document.querySelector(".productName");
    const productPrice = document.querySelector(".productPrice");
    const productImg = document.querySelector(".productImg");

    productName.textContent = data[0].productName;
    productPrice.textContent = `${data[0].productPrice} 원`;
    productImg.src = `../imgs/${data[0].productImgFileName}`;
  } catch (error) {
    console.error(error);
  }
}

function buy() {
  const name = document.querySelector("#name").value;
  const phoneNumber = document.querySelector("#phoneNumber").value;
  const address = document.querySelector("#address").value;
  const productName = document.querySelector(".productName").textContent;
  const productPrice = document.querySelector(".productPrice").textContent;
  const purchaseHistory = {
    name,
    phoneNumber,
    address,
    product: { productName, productPrice },
  };

  localStorage.setItem("purchaseHistory", JSON.stringify(purchaseHistory));

  alert("구매가 완료되었습니다. 메인화면으로 돌아갑니다.");
  window.open("../index.html", "_self");
}

DataList();
