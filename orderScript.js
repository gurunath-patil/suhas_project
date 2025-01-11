function getCurrentDate() {
	const today = new Date()
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]
	const day = String(today.getDate()).padStart(2, '0')
	const month = monthNames[today.getMonth()]
	const year = today.getFullYear()

	return `${month} ${day}, ${year}`
}

// ritesh developed code
let rate = document.getElementById('rate') // rate or origin product price element
let quantityElement = document.getElementById('quantity') // quantity ele
let itemNameEle = document.getElementById('item-name') // product item name element
let dateEle = document.getElementById('date-ele') // date element
let amountElement = document.getElementById('amt') // amt ele
let ShippingAmt = document.getElementById('fees') // shipping charges ele
let taxAmt = document.getElementById('tax') // tax ele
let totalAmt = document.getElementById('total') // total amt ele

let storage = window.localStorage
const productData = JSON.parse(storage.getItem('userSelectedProduct'))

itemNameEle.innerHTML = productData[0]?.product_name
rate.innerHTML = productData[0]?.price
amountElement.innerHTML = productData[0]?.price
totalAmt.innerHTML = productData[0]?.price + 10.5 + 7
dateEle.innerHTML = getCurrentDate()

function updateAmount() {
	const quantity = parseInt(quantityElement.innerText)
	const total = parseInt(rate.innerText) * quantity
	amountElement.innerText = total.toFixed(2)
	totalAmt.innerHTML = total + 10.5 + 7
}

document.querySelector('.decrement').addEventListener('click', () => {
	let quantity = parseInt(quantityElement.innerText)
	if (quantity > 1) {
		quantityElement.innerText = quantity - 1
		updateAmount()
	}
})

document.querySelector('.increment').addEventListener('click', () => {
	let quantity = parseInt(quantityElement.innerText)
	if (quantity > 0 && quantity < 10) {
		quantityElement.innerText = quantity + 1
		updateAmount()
	}
})

function formatDate() {
	let date = new Date()
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
	const day = String(date.getDate()).padStart(2, '0')

	return `${year}${month}${day}`
}

document.getElementById('buy-now-btn').addEventListener('click', (res) => {
	res.preventDefault()
	let orderProductData = {
		productId: productData[0].id,
		orderQuantity: parseInt(quantityElement.innerText),
		totalamt: parseInt(totalAmt.innerText),
		orderStatus: true,
		userId: 1,
		date: formatDate(),
	}

	const orderConfirmation = window.confirm('are you wanted to confirm this order')
	if (orderConfirmation) {
		const orderDataStatus = fetch('http://localhost:5502/buy-product', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(orderProductData),
		})

		orderDataStatus
			.then((res) => res.json())
			.then((res) => {
				if (res.msg === 'saved') {
					storage.removeItem('userSelectedProduct')
					alert('your order is successfully placed & this window will be show for 30 sec')
					setTimeout(() => {
						window.location.href = './Product.html'
					}, 30000)
				} else {
					alert('something went wrong please try again!')
				}
			})
			.catch((error) => {
				console.error('Error:', error)
			})
	}
})
