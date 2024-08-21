document.getElementById('productForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const form = event.target;
    const formData = new FormData(form);
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    try {
        const response = await axios.post('/admin/products/update', jsonData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const confirmationMessage = document.getElementById('confirmationMessage');

        if (response.status === 200) {
           
            confirmationMessage.textContent = 'Product updated successfully!';
            confirmationMessage.style.display = 'block';
            form.reset(); 
           
        }
         else {
            confirmationMessage.textContent = 'Failed to update product.';
            confirmationMessage.style.display = 'block'; 
            
    } }
 catch (error) {
        const confirmationMessage = document.getElementById('confirmationMessage');
            confirmationMessage.textContent = 'Error: ' + error.message;
            confirmationMessage.style.display = 'block';
        }
    
    setTimeout(() => {
        const confirmationMessage = document.getElementById('confirmationMessage');
        confirmationMessage.style.display = 'none'; // Hide the message box
    }, 5000);
});