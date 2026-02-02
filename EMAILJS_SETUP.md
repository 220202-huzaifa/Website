# EmailJS Setup Instructions

To enable email sending from the contact form to `zhuzaifa011@gmail.com`, follow these steps:

## Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create an Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your email account (the one that will send emails)
5. Note down your **Service ID**

## Step 3: Create Email Templates

### Template 1: Admin Notification (for receiving form details)
1. Go to "Email Templates" in EmailJS dashboard
2. Click "Create New Template"
3. Use this template structure:

```
Subject: New Contact Form Submission from {{from_name}}

Hello,

You have received a new message from your website contact form:

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Phone: {{phone}}
Service Interested In: {{service}}

Message:
{{message}}

---
This message was sent from your TechSoft website.
Reply to: {{from_email}}
```

4. Set the "To Email" field to: `zhuzaifa011@gmail.com`
5. Save the template and note down your **Template ID** (this will be `template_7aj29ys`)

### Template 2: User Confirmation Email
1. Create another new template
2. Use this template structure:

```
Subject: Thank you for contacting TechSoft!

Hi {{to_name}},

Thank you for reaching out to us! We've received your request regarding "{{service_requested}}" and will get back to you within 24 hours.

Best regards,
The TechSoft Team
```

3. Set the "To Email" field to: `{{to_email}}`
4. Save the template and note down your **Template ID** (this will be `template_user_confirmation`)

## Step 4: Get Your User ID
1. Go to "Account" in EmailJS dashboard
2. Copy your **User ID** (Public Key)

## Step 5: Update the Contact Form Code
In `src/pages/Contact.tsx`, update these lines:

```typescript
// Replace these with your actual EmailJS credentials
const serviceID = 'your_actual_service_id';
const templateID = 'your_actual_template_id';
const userID = 'your_actual_user_id';
```

## Step 6: Enable Email Sending
In `src/pages/Contact.tsx`, uncomment this line in the `handleSubmit` function:

```typescript
// Uncomment this line after EmailJS setup
sendEmail(e);
```

And comment out or remove the alert line:

```typescript
// Remove this line after setup
// alert('Email functionality requires EmailJS setup...');
```

## Step 7: Test the Form
1. Fill out the contact form on your website
2. Click "Send Message"
3. Check your email (zhuzaifa011@gmail.com) for the message
4. The form should also show a success message

## Important Notes:
- The free EmailJS plan allows 200 emails per month
- Emails will be sent from the email account you connected in Step 2
- The recipient email is hardcoded to `zhuzaifa011@gmail.com`
- Make sure your EmailJS service is properly configured before enabling the send function

## Troubleshooting:
- If emails don't send, check your EmailJS service configuration
- Ensure all template variables match exactly
- Verify your User ID, Service ID, and Template ID are correct
- Check browser console for any error messages
