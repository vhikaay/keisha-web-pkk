const product = [
  {
    id: "1",
    name: "𝗍0ᥕᥱᥣ ᥴᥲkᥱ mᥲᥒggᥲ🥭",
    image: "https://mediapijar.com/wp-content/uploads/2024/11/Cover-kuliner.png",
    price: 13000
  },
  {
    id: "2",
    name: "𝗍0ᥕᥱᥣ ᥴᥲkᥱ ძᥙrіᥲᥒ🍈",
    image: "https://down-id.img.susercontent.com/file/id-11134207-7rasj-m4o77jdtu8vs6c",
    price: 18000
  },
  {
    id: "3",
    name: "𝗍0ᥕᥱᥣ ᥴᥲkᥱ s𝗍rᥲᥕᑲᥱrrу🍓",
    image: "https://img-global.cpcdn.com/recipes/67ea09574188a7f6/680x482cq70/towel-crepe-roll-strawberry-foto-resep-utama.jpg",
    price: 13000
  },
  {
    id: "4",
    name: "K𝖗𝖎𝖕𝖈𝖆 𝖕𝖊𝖉𝖆𝖘🔥",
    image: "https://cdn.linkumkm.id/uploads/library/7/6/5/3/3/76533_840x576.jpeg",
    price: 5000
  },
  {
    id: "5",
    name: "K𝖗𝖎𝖕𝖈𝖆 𝖔𝖗𝖎𝖌𝖎𝖓𝖆𝖑💨",
    image: "https://down-id.img.susercontent.com/file/1f05a8a231fc60c0f4debd09ce7e8ec1",
    price: 5000
  }
];

const divContainer = document.getElementById("product-list");
const cart = [];

product.forEach(function(produk) {
  const divCard = document.createElement("div");
  divCard.className = "product-card";
  divCard.innerHTML = ` 
    <img src="${produk.image}" alt="${produk.name}">
    <h1>${produk.name}</h1>
    <p>Harga : Rp. ${produk.price.toLocaleString()}</p>
    <button onclick="tambahkeranjang(${produk.id})">Simpan Ke Keranjang</button>
  `;
  divContainer.append(divCard);
});

function tambahkeranjang(id) {
  let produk_yg_dipilih = product.find(product => product.id == id);
  let produk = {
    id: produk_yg_dipilih.id,
    name: produk_yg_dipilih.name,
    price: produk_yg_dipilih.price,
    quantity: 1
  };

  let produk_ada = cart.find(cart => cart.id == id);
  if (produk_ada) {
    produk_ada.quantity += 1;
  } else {
    cart.push(produk);
  }

  let cart_items = document.getElementById("cart-items");
  cart_items.innerHTML = "";

  cart.forEach(cart => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div>
        <b>${cart.name}</b>
        <p>Rp.${cart.price.toLocaleString()} x ${cart.quantity} pcs</p>
        <p>Total : Rp.${(cart.price * cart.quantity).toLocaleString()}</p>
      </div>
    `;
    cart_items.append(div);
  });

  if (!document.getElementById("checkout-button")) {
    const buttonCheckout = document.createElement("button");
    buttonCheckout.id = "checkout-button";
    buttonCheckout.textContent = "Checkout Via Wa";
    buttonCheckout.onclick = checkoutKeWa;
    cart_items.appendChild(buttonCheckout);
  }
}

function checkoutKeWa() {
  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  let pesan = "Pesanan saya:%0A";
  cart.forEach(item => {
    pesan += `- ${item.name} (${item.quantity} pcs): Rp.${(item.price * item.quantity).toLocaleString()}%0A`;
  });

  const urlWa = `https://wa.me/6285719421304?text=${pesan}`;
  window.open(urlWa, "_blank");
}
