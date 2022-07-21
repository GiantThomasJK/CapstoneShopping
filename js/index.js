

var productList = [];
var qty = [];

function getEle(id) {

    return document.getElementById(id);
}


function getListProduct() {

    axios({
        url: "https://62bc4dce6b1401736cf76213.mockapi.io/api/technology",
        method: "GET",
    })
        .then(function (result) {
            renderProducts(result.data);
            showProduct();
            console.log(result);
        })

        .catch(function (err) {
            console.log(err);
        });


}
getListProduct();
showProduct();


function renderProducts(data) {

    let result = "";

    for (var i = 0; i < data.length; i++) {

        var json = JSON.stringify(data[i]).replace(/\"/g, "'");

        result += `
        <div class="card">
        <div class="top-title">
            <i class="fab fa-apple"></i>
            <em class="stock">In Stock</em>
        </div>
        <div class="img-container">
            <img class="product-img" src="${data[i].img}" alt="">
        </div>
        <div class="details">
            <div class="name-fav">
                <strong style="font-size: 16px; color:#fff;" class="product-name">${data[i].name}</strong>
            </div>
            <div class="wrapper">
                <h5>${data[i].desc}</h5>
                <p>Màn hình : ${data[i].screen}</p>
                <p>Back Camera: ${data[i].backCamera}</p>
                <p>Front Camera : ${data[i].frontCamera}</p>
            </div>
            <div class="purchase">
                <p class="product-price">$ ${data[i].price}</p>
                <span class="btn-add">
                    <button class="add-btn" onclick="addProduct(${json})">
                        Add
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </span>
            </div>

        </div>
    </div>

        `;
    }

    getEle("productList").innerHTML = result;

}

function addProduct(data) {
    // var indexQty = 1;

    var index = productList.findIndex(item => item.id === data.id);

    if (index !== -1) {
        productList[index].qty = ++productList[index].qty
    } else {
        productList.push({ ...data, qty: 1 });
    }

    saveLocalStorage();
    showProduct();

    console.log("click");

}

function getLocalStorage() {

    var taskProductJSON = localStorage.getItem("TaskProduct");

    if (taskProductJSON === null) return;


    productList = JSON.parse(taskProductJSON);

}

function saveLocalStorage() {

    var taskProductJSON = JSON.stringify(productList);// nhận vào object trả về chuỗi JSON


    localStorage.setItem("TaskProduct", taskProductJSON);

}

function showProduct() {

    getLocalStorage();


    var result = "";
    for (var i = 0; i < productList.length; i++) {
        var currentProduct = productList[i]
        // console.log(currentProduct)

        result += `
        <div class="cart-item">
            <div class="cart-img">
                <img src="${currentProduct.img}" alt="">
            </div>
            <strong class="name">${currentProduct.name}</strong>
            <span class="qty-change">
                <div style="display: flex;">
                    <button class="btn-qty" onclick="decreaseProduct('${currentProduct.id}')"><i class="fas fa-chevron-left"></i></button>
                    <p class="qty">${currentProduct.qty}</p>
                    <button class="btn-qty" onclick="incrementProduct('${currentProduct.id}')"><i class="fas fa-chevron-right"></i></button>
                </div>
            </span>
            <p class="price">$ ${currentProduct.price}</p>
            <button onclick="deleteProduct(${i})"><i class="fas fa-trash"></i></button>
        </div>

        `
    }

    document.getElementById("cart-container").innerHTML = result;
    if (productList.length != 0) {
        document.getElementById("emty-cart").style.display = "none";

    } else {
        document.getElementById("emty-cart").style.display = "block";

    }

    document.getElementById("total-qty").innerHTML = productList.reduce((acc, cur) => {
        return acc += cur.qty

    }, 0);
    document.querySelector(".total").innerHTML = productList.reduce((acc, cur) => {
        return acc += +cur.price*cur.qty;
    }, 0);
    // console.log(productList.length);
}

function incrementProduct(id) {
    var index = productList.findIndex(item => item.id === id)
    if (index !== -1) {
        productList[index].qty = productList[index].qty += 1
        saveLocalStorage()
        showProduct()
    }
}

function decreaseProduct(id) {
    var index = productList.findIndex(item => item.id === id);

    if (index !== -1) {
        if (productList[index].qty > 1) {
            productList[index].qty = productList[index].qty -= 1
            saveLocalStorage()
            showProduct()
        } else {
            productList.splice(index, 1)
            saveLocalStorage()
            showProduct()
        }

    }
}

function deleteProduct(i) {
    productList.splice(i, 1);

    saveLocalStorage();
    showProduct();
}


function clearProduct(){

    productList
}



