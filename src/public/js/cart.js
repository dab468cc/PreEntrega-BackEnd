const cartId = document.querySelector('.cart-id').dataset.cart;
const btnsDec = document.querySelectorAll('.btn-quantity-dec');
const btnsInc = document.querySelectorAll('.btn-quantity-inc');

btnsDec.forEach(btn => {
	btn.addEventListener('click', async () => {
		const res = await fetch(`/api/carts/${cartId}/products/${btn.dataset.prodid}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ quantity: -1 })
		});
		if (res.ok) {
			window.location.reload();
		}
	});
});

btnsInc.forEach(btn => {
	btn.addEventListener('click', async () => {
		const res = await fetch(`/api/carts/${cartId}/products/${btn.dataset.prodid}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ quantity: 1 })
		});
		if (res.ok) {
			window.location.reload();
		}
	});
});
