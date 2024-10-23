document.getElementById('fetchEmails').addEventListener('click', async () => {
    try {
        const response = await fetch('/emails');  // Request email subjects from Flask API
        const data = await response.json();  // Parse JSON response

        const chatbox = document.getElementById('chatbox');
        chatbox.innerHTML = '';  // Clear previous chat messages

        data.forEach(email => {
            const subjectItem = document.createElement('p');  // Create a new message
            subjectItem.classList.add('email-subject');
            subjectItem.textContent = email.subject;  // Set content to email subject
            subjectItem.addEventListener('click', () => showEmailContent(email.id));  // Attach event listener
            chatbox.appendChild(subjectItem);  // Add to chatbox
        });
    } catch (error) {
        console.error('Error fetching emails:', error);
    }
});

// Function to fetch and display email content
async function showEmailContent(emailId) {
    try {
        const response = await fetch(`/email/${emailId}`);  // Request email content
        const data = await response.json();  // Parse JSON response

        const contentItem = document.createElement('div');  // Create content div
        contentItem.classList.add('email-content');
        contentItem.innerHTML = `<strong>Subject:</strong> ${data.subject}<br><strong>Content:</strong> ${data.body}`;
        
        const chatbox = document.getElementById('chatbox');
        chatbox.appendChild(contentItem);  // Add content to chatbox
        chatbox.scrollTop = chatbox.scrollHeight;  // Scroll to bottom
    } catch (error) {
        console.error('Error fetching email content:', error);
    }
}
