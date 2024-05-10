// event el

const addEventOnElement = function (elem, type, callback) {
    if (elem.length > 1) {
        for (let i = 0; i < elem.length; i++) {
            elem[i].addEventListener(type, callback)
        }
    } else {
        elem.addEventListener(type, callback)
    }
}



// toggle navbar
const navbar = document.querySelector("[data-navbar]");
const navLinks = document.querySelectorAll("[data-navlink]");
const navToggler = document.querySelector("[data-nav-toggler]");
const header = document.querySelector('[data-header]');
const backTop = document.querySelector('[data-back-to-top]');
// drop down menu info
const dropdownBtn = document.querySelectorAll(".dropdown-btn");
const dropdown = document.querySelectorAll(".dropdwon-menu");
const links = document.querySelectorAll(".navbar-link");
const dropdownBtnB = document.querySelectorAll('#drop-btn2');
// shop section information
const buyBtn = document.querySelectorAll(".buy-btn");
const addRemoveBtn = document.querySelectorAll(".add-remove span");
const productQuantity = parseInt(document.querySelector(".add-remove output"));
const popUpContainer = document.querySelector('.popup-container');
const closePopUp = document.querySelector('.close-btn');
var changeNumber = (document.getElementById('output'));
// const itemPrice = document.querySelectorAll('.price');

// form information's
const nameOfProduct = document.querySelector('.product-name');
var subTotal = parseInt(document.querySelector('.subtotal-element'));
var taxes = document.querySelector('.taxes');
var total = document.querySelector('.total-element');
const orderBtn = document.querySelector('.oreder-now');
const restBtn = document.querySelector('.rest-form')

// for values 
const orderForm = document.querySelector('#order-form')
const nameElement = document.querySelector('.name')
const emailElement = document.querySelector('.email')
const addressElement = document.querySelector('.address')
const postalCodeElement = document.querySelector('.postal-code')
const cityElement = document.querySelector('.city')
const numberElement = document.querySelector('.number')
const companyElement = document.querySelector('.company')

let globalProductName = ""
var newChangeNumber = 4




// var newValue = document.getElementById("output").innerHTML


buyBtn.forEach((btn) => {
    // console.log(btn)
    btn.addEventListener('click', (event) => {
        // console.log('working')
        popUpContainer.classList.add('active')
        const parentCard = event.target.closest('.shop-card');
        // console.log(parentCard)
        const priceElement = parentCard.querySelector('.price');
        const productElement = parentCard.querySelector('.card-title');
        const productName = productElement.textContent.trim();
        var price = parseFloat(priceElement.textContent.trim());
        // console.log('Name:', productName);
        console.log('Price:', price);
        nameOfProduct.innerHTML = productName;
        globalProductName = productName;
        subTotal = price;
        document.querySelector('.subtotal-element').innerHTML = `$ ${price}`;
        calculateTax(subTotal);
        calculateTotal(subTotal, calculateTax(subTotal));
    })
})

if (restBtn) {
    restBtn.onclick = () => {
        restForm()
    }
}

if (orderBtn) {
    orderBtn.onclick = (e) => {
        const requiredFields = orderForm.querySelectorAll('input[required]')
        let isFormValid = true;

        requiredFields.forEach(input => {
            if (input.value.trim() === "") {
                isFormValid = false;
                return;
            }
        })
        if (isFormValid) {
            console.log('form length', orderForm.value)
            buyItem()
            orderForm.reset()
            // window.location.href = ('orderconfirmed.html')
        } else {
            alert('Make sure your form is filled ')
        }

        // popUpContainer.classList.remove('active')
    }
}

if (closePopUp) {
    closePopUp.onclick = () => {
        popUpContainer.classList.remove('active')
        // console.log(popUpContainer == true)
        newChangeNumber = 4
        document.getElementById("output").innerHTML = newChangeNumber
    }

}

addRemoveBtn.forEach((click) => {
    // console.log(click)
    click.addEventListener('click', function () {
        const addRemoveBtnInput = click.innerText
        console.log(addRemoveBtnInput)
        if (addRemoveBtnInput === '-' && newChangeNumber > 4) {
            console.log('decrease')
            newChangeNumber -= 1
            console.log((newChangeNumber))
            document.getElementById("output").innerHTML = newChangeNumber
            subTotal -= 31.25
            document.querySelector('.subtotal-element').innerHTML = `$ ${Math.floor(subTotal * 100) / 100}`
            calculateTax(subTotal)
            calculateTotal(subTotal, calculateTax(subTotal))


        } else if (addRemoveBtnInput === '+') {
            // console.log(0 )
            console.log('increase')
            newChangeNumber += 1
            console.log((newChangeNumber))
            document.getElementById("output").innerHTML = newChangeNumber
            subTotal += 31.25
            document.querySelector('.subtotal-element').innerHTML = `$ ${Math.floor(subTotal * 100) / 100}`
            calculateTax(subTotal)
            calculateTotal(subTotal, calculateTax(subTotal))

        }
        else {
            alert('Can not make orders less than 4 ')
        }
    })
})


function calculateTax(amount) {
    pluTaxAmount = (amount * 0.13)
    return document.querySelector('.taxes').innerHTML = `$ ${Math.floor(pluTaxAmount * 100) / 100}`
}

function calculateTotal(subtotal, taxes) {
    var cleanedTaxes = "";
    for (var i = 0; i < taxes.length; i++) {
        if (taxes[i] !== ' ' && taxes[i] !== '$') {
            // console.log(taxes[i])
            cleanedTaxes += taxes[i];
        }
    }
    var cleanedTaxes = parseInt(cleanedTaxes)
    total = subtotal + (cleanedTaxes)
    console.log(total)
    return document.querySelector('.total-element').innerHTML = `$ ${Math.floor(total * 100) / 100}`
}


function restForm() {
    return (
        document.querySelector('.subtotal-element').innerHTML = 124.99,
        console.log(subTotal),
        taxes.innerHTML = 16.24,
        document.querySelector('.total-element').innerHTML = 150.99,
        subTotal = 124.99,
        calculateTotal(subTotal, calculateTax(subTotal)),
        newChangeNumber = 4,
        (document.getElementById('output').innerHTML) = newChangeNumber

    )
}



const togglerNavbar = function () {
    navbar.classList.toggle("active")
    navToggler.classList.toggle("active")

}

addEventOnElement(navToggler, 'click', togglerNavbar);

const closeNavbar = function () {
    navbar.classList.remove("active")
    navToggler.classList.remove("active")

}

addEventOnElement(navLinks, "click", closeNavbar)


// header active

window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
        header.classList.add('active');
        backTop.classList.add('active');
    } else {
        header.classList.remove("active");
        backTop.classList.remove('active')
    }
});


// dropdown function 
function setAriaExpandedFalse() {
    dropdownBtn.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
}

function closeDropdown() {
    dropdown.forEach((drop) => {
        drop.classList.remove("remove")
        drop.addEventListener("click", (e) => e.stopPropagation())
    });
}

dropdownBtn.forEach((btn) => {
    btn.addEventListener("click", function (e) {
        const dropdownIndex = e.currentTarget.dataset.dropdown;
        // console.log(dropdownIndex)
        const dropdownElement = document.getElementById(dropdownIndex);

        dropdownElement.classList.toggle("active");
        // console.log(dropdownElement)



        // dropdown.forEach((drop) => {
        //     if (drop.id !== btn.dataset["dropdown"]) {
        //         drop.classList.remove("active")
        //     }
        // });
        btn.setAttribute(
            "aria-expanded",
            btn.getAttribute("aria-expanded") === "false" ? "true" : "false"
        )
        e.stopPropagation()
    });

});

//  close dropdown menu when the dropdown links are clicked

links.forEach((link) => {
    link.addEventListener("click", (e) => {
        // console.log(link)
        e.stopPropagation();
        closeDropdown();
        setAriaExpandedFalse();
    });
});

// close dropdown menu when you click on the document body
document.documentElement.addEventListener("click", () => {
    closeDropdown();
    setAriaExpandedFalse();
});

// close dropdown when the escape key is pressed
document.addEventListener("keydown", (e) => {
    if (e.key === 'Escape') {
        closeDropdown();
        setAriaExpandedFalse();
    }
})

// dropdownBtnB.forEach((btn) => {
//     btn.addEventListener('click', (e) => {e.stopPropagation();}

//     )
// })

// when click on oreder now.
function buyItem() {
    console.log('working');
    var phoneNumber = '2898002041';
    var productName = globalProductName;
    var quantity = newChangeNumber;
    var costumerName = nameElement.value;
    var costumerEmail = emailElement.value;
    var costumerAddress = `${addressElement.value} ${postalCodeElement.value} ${cityElement.value}`;
    var costumerCompany = companyElement.value;
    var costumerNumber = numberElement.value;
    const currentDay = new Date();
    const day = currentDay.toLocaleString('default', { weekday: 'long' })
    const month = currentDay.toLocaleString('default', { month: 'long' })
    const date = `${day[0] + day[1] + day[2]}` +
        ` ${currentDay.getDate()}` +
        ` ${month}` +
        ` ${currentDay.getFullYear()}` +
        ` ${currentDay.toLocaleTimeString()}`


    var message = `Placing an order from ${costumerName}. ` + `\nProduct: ${productName}. ` + `\nQuantity: ${quantity}. ` +
        `\nCompany: ${costumerCompany}. ` +
        `\nAddress: ${costumerAddress}. ` +
        `\nEmail: ${costumerEmail}. ` +
        `\nCostumer Number: ${costumerNumber}. ` +
        `\nTotal: $ ${subTotal}. ` +
        `\nOrder Date: ${date}`


    console.log(message)

    window.location.href = 'sms: ' + phoneNumber + '?&body=' + encodeURIComponent(message)
}



// CREATE UPDATE DELETE product page functionality ...
const onSubmit = async () => {

    console.log('submitting is working')


    const productForm = document.getElementById('product-formB')
    var productName = document.getElementById('product-name').value
    var productPrice = document.getElementById('product-price').value
    var productImg = document.getElementById('product-img').value
    var productQuantity = document.getElementById('product-quan').value


    const data = {
        productName,
        productPrice,
        productImg,
        productQuantity
    }
    const url = `http://127.0.0.1:5000/create-product`;
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }


    const response = await fetch(url, options)
    if (response.status !== 201 && response.status !== 200) {
        const data = await response.json()
        alert('Couldn\'t post product check the server ')
    } else {
        console.log('data is uploaded', data)
    }

}



const fetchProducts = async () => {
    try {
        const response = await fetch('http://127.0.0.1:5000/product')
        const data = await response.json()
        // console.log(data.products)
        const products = data.products
        // console.log(products)
        // products.map((product) => {
        //     console.log(product.id)
        //     var node = document.getElementById('manage-product');
        //     console.log(node)
        //     node.innerHTML`<p>some dynamic html  </p>`;
        // })
        return products

    } catch (error) {
        console.error('Not able to fetch data', error)
    }
}

const deleteProduct = async (id) => {
    try {
        console.log(id)
        const url = `http://127.0.0.1:5000/delete-product/${id}`
        const options = {
            method: "DELETE"
        }
        const response = await fetch(url, options)
        console.log(response)
        if (response.status === 200) {
            console.log('Product was deleted successfully ')
        } else { console.error('Failed to delete product') }
    } catch (error) { alert(error) }
}

// rendering products on the update page 
const createProductCard = (product) => {
    const li = document.createElement('li');
    li.innerHTML = `
    <div class="shop-card grid">
    <figure class="card-banner img-holder" style="--width: 860; --height: 645;">
      <img src="${product.productImg}" width="860" height="646" loading="lazy" alt="${product.productName}" class="img-cover">
    </figure>
    <div class="card-content">
      <h3 class="h3">
        <a href="#" class="card-title">${product.productName}</a>
      </h3>
      <p class="price-tag"> $<span class="price">${product.productPrice}</span> </p>
      <p class="price-tag"> Quantity: <span class="price"> ${product.productQuantity}</span> </p>
      <button class="btn btn-secondary edit" onClick=handleUpdating(${product.id})>Edit product</button>
      <button class="btn btn-secondary" onClick=handleId(${product.id}) >Delete product</button>
    </div>
  </div>
    `;

    const updateBtn = li.querySelector('.edit');


    return li;
}
//  rendering products on the index (home ) page 
const createProductCardInHome = (product) => {
    const li = document.createElement('li');
    li.innerHTML = `
    <div class="${product.id === 1 ? "shop-card" : "shop-card grid"}"  id="first-grid">

    <figure class="card-banner img-holder" style="--width: 860; --height: 645;">
        <img src=${product.productImg}
            width="860" height="646" loading="lazy" alt=${product.productName} class="img-cover">
    </figure>

    <div class="card-content">
        
        <h3 class="h3">
            <a href="#" class="card-title">${product.productName}</a>
        </h3>
        <p class="price-tag"> $<span class="price">${product.productPrice}</span> </p>
        <div class="container buy-add-btn">
        
            <button class="btn btn-secondary buy-btn" onclick=anyThing() >Buy now</button>
        </div>
    </div>

    </div>
    `;

    return li;
}
const anyThing = () => {
    popUpContainer.classList.add('active')
}
// rendering products on the shop page 
const createProductCardInShop = (product) => {
    const li = document.createElement('li');
    li.innerHTML = `
        <div class="project-card">

            <figure class="card-banner img-holder" style="--width:510 ; --height:700 ;">
                <img src=${product.productImg}
                    alt="Equipments" width="510" height="700" class="img-cover">
            </figure>

            <div class="card-content">

                <h3 class="h3">${product.productName}</h3>

                <p class="card-subtitle">
                    ${product.productPrice}
                </p>
                <button class="btn btn-secondary buy-btn">Buy now</button>


            </div>

        </div>
        `;


    return li;
}


const handleId = (id) => {
    console.log('id', id)
    deleteProduct(id)
    window.location.href = ('post-product.html')

}

const handleUpdating = async (id) => {
    products = await fetchProducts()
    const productForm = document.getElementById('product-formB')
    var productName = document.getElementById('product-name').value
    var productPrice = document.getElementById('product-price').value
    var productImg = document.getElementById('product-img').value
    var productQuantity = document.getElementById('product-quan').value
    let updateNow = false



    popUpContainer.classList.add('active')
    console.log('updating is true what do u want to do ')
    console.log(products)
    item = (products.find(item => item.id === id))
    productForm[0].value = item.productName
    productForm[1].value = item.productPrice
    productForm[2].value = item.productImg
    productForm[3].value = item.productQuantity
    const updateBtn = document.getElementById('update-product')

    const data = {
        productName,
        productPrice,
        productImg,
        productQuantity
    }

    data.productName = item.productName
    data.productPrice = item.productPrice
    data.productImg = item.productImg
    data.productQuantity = item.productQuantity

    console.log(data)

    productForm[0].addEventListener("change", (e) => {
        data.productName = e.target.value
        console.log(productName)
    })
    productForm[1].addEventListener("change", (e) => {
        data.productPrice = e.target.value
    })
    productForm[2].addEventListener("change", (e) => {
        data.productImg = e.target.value
    })
    productForm[3].addEventListener("change", (e) => {
        data.productQuantity = e.target.value
    })




    updateBtn.onclick = () => {
        if (data.productName === item.productName && data.productPrice === item.productPrice && data.productImg === item.productImg && data.productQuantity === item.productQuantity) {
            alert("No updates are made make sure to update the product ")
        }

        else {

            getUpdatesInfo(data, id)
            // window.location.href = ('post-product.html')
        }
    }
}

const getUpdatesInfo = async (data, id) => {
    console.log(data)
    console.log(id)

    const url = `http://127.0.0.1:5000/update-product/${id}`
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }


    const response = await fetch(url, options)
    if (response.status !== 201 && response.status !== 200) {
        const data = await response.json()
        alert('Couldn\'t post product check the server ', data)
    } else { console.log('Data is updated successfully ') }


}

const renderProductCard = async () => {
    const productList = document.querySelector('.container .ul');
    const productList2 = document.querySelector('.container .pro');
    try {
        const products = await fetchProducts();
        console.log(products)
        products.forEach(product => {
            // console.log(product)
            const card = createProductCard(product)
            const secondCard = createProductCardInHome(product)
            const thirdCard = createProductCardInShop(product)
            if (window.location.pathname === "/post-product.html") {

                productList.appendChild(card)
            } else if (window.location.pathname === "/shop.html") {

                productList.appendChild(thirdCard)

            } else {

                productList2.appendChild(secondCard)
            }
        })
    } catch (error) { console.error('Error rendering product card: ', error) }
}


renderProductCard()

