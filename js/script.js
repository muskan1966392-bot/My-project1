function getCart(){return JSON.parse(localStorage.getItem('myCart'))||[]}
function saveCart(c){localStorage.setItem('myCart',JSON.stringify(c));updateCartCount();}

function updateCartCount(){
 let cart=getCart();
 let el=document.getElementById('cart-count');
 if(el) el.innerText = cart.reduce((s,i)=>s+i.qty,0);
}

function addToCart(name, price, img){
 let cart=getCart();
 let p=parseFloat(price.replace('$',''));
 let existing=cart.find(i=>i.name===name);
 if(existing){existing.qty+=1}else{cart.push({name, price:p, qty:1, img})}
 saveCart(cart);

 
 let toast=document.createElement('div');
 toast.innerHTML=`✓ ${name} added to cart`;
 toast.style.cssText="position:fixed;bottom:30px;right:30px;background:#d4af37;color:#000;padding:14px 24px;border-radius:12px;font-weight:700;z-index:9999;box-shadow:0 10px 30px rgba(0,0,0,0.5);font-family:Arial;";
 document.body.appendChild(toast);
 setTimeout(()=>toast.remove(),2500);
}

document.addEventListener('DOMContentLoaded',()=>{
  updateCartCount();
  document.querySelectorAll('.add-to-cart-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      let card=btn.closest('.product-card');
      let name=card.querySelector('.product-name').innerText;
      let price=card.querySelector('.product-price').innerText;
      let img=card.querySelector('img').src;
      addToCart(name,price,img);
    });
  });
});