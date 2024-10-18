document.getElementById('fetchEmails').addEventListener('click', async () => {
    try {
        const response = await fetch('/emails');  // Request email subjects from Flask API
        const data = await response.json();  // Parse JSON response

        const emailList = document.getElementById('emailList');
        emailList.innerHTML = '';  // Clear previous email subjects

        data.forEach(subject => {
            const emailItem = document.createElement('p');  // Create a new paragraph
            emailItem.textContent = subject;  // Set paragraph content to the email subject
            emailList.appendChild(emailItem);  // Add the paragraph to the email list
        });
    } catch (error) {
        console.error('Error fetching emails:', error);  // Log any errors to the console
    }
});
