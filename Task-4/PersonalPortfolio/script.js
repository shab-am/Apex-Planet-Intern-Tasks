// Footer Year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', e=>{
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const msg = document.getElementById('message').value.trim();
    const out = document.getElementById('formMsg');
    out.textContent='';
    if(!name || !email || !msg){out.textContent='Please fill all fields.'; return;}
    if(!/^[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$/.test(email)){out.textContent='Enter a valid email.'; return;}
    out.textContent='Thanks! Your message has been received.';
    contactForm.reset();
  });
}
