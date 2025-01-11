// http://localhost:5502/product/list
// handling buying btn
function handleBuyBtn(productId) {
	const storage = window.localStorage
	const localData = storage.getItem('productData')
	const productData = JSON.parse(localData)
	const userSelectedProduct = productData.filter((item) => item.id == productId)
    storage.setItem('userSelectedProduct',JSON.stringify(userSelectedProduct))

    window.location.href = './orderRecipt.html'
}

const productDetails = fetch('http://localhost:5502/product/list', {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
	},
})

let newData
productDetails
	.then((res) => res.json())
	.then((item) => {
		const storeData = window.localStorage

		if (!storeData.getItem('productData')) {
			storeData.setItem('productData', JSON.stringify(item))
		}

		const productTitleEle = document.querySelectorAll('.product-title')
		const productPriceEle = document.querySelectorAll('.product-price')
		Array.from(productTitleEle).forEach((element, index) => {
			if (index < item.length) {
				element.innerHTML = item[index].product_name
			}
		})
		Array.from(productPriceEle).forEach((element, index) => {
			if (index < item.length) {
				element.innerHTML = item[index].price
			}
		})
	})

