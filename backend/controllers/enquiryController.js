import Enquiry from '../models/Enquiry.js';
import Product from '../models/Product.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadBufferToCloudinary } from '../utils/cloudinaryUpload.js';
import { Resend } from 'resend';

const sendEnquiryEmail = async (enquiry, productTitle = null) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[Resend] Warning: RESEND_API_KEY is not defined in .env. Email notification skipped.');
    return;
  }

  const resend = new Resend(apiKey);
  const { name, phone, email, message, attachment } = enquiry;

  try {
    await resend.emails.send({
      from: 'Finique Enquiries <info@finiquewindows.com>',
      to: 'sales@finiquewindows.com',
      subject: `New Enquiry from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1f2f; max-width: 600px; margin: 0 auto; border: 1px solid #d9dee8; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background-color: #000745; padding: 24px; text-align: center; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px; font-weight: bold; tracking: 1px;">NEW ENQUIRY RECEIVED</h2>
          </div>
          <div style="padding: 24px; background-color: #ffffff;">
            <p style="margin-top: 0; font-size: 16px;">Hello Team,</p>
            <p style="font-size: 14px; color: #555555;">A new enquiry has been submitted through the Finique website. Below are the details:</p>
            
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f4f6fa; font-weight: bold; width: 150px; font-size: 14px;">Full Name:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f4f6fa; font-size: 14px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f4f6fa; font-weight: bold; font-size: 14px;">Phone Number:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f4f6fa; font-size: 14px;">
                  <a href="tel:${phone}" style="color: #000745; text-decoration: none; font-weight: 600;">${phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f4f6fa; font-weight: bold; font-size: 14px;">Email Address:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f4f6fa; font-size: 14px;">
                  ${email ? `<a href="mailto:${email}" style="color: #000745; text-decoration: none;">${email}</a>` : '<span style="color: #999; text-decoration: none; font-style: italic;">Not provided</span>'}
                </td>
              </tr>
              ${productTitle ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f4f6fa; font-weight: bold; font-size: 14px;">Inquired Product:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f4f6fa; font-size: 14px; font-weight: 600; color: #000745;">${productTitle}</td>
              </tr>
              ` : ''}
              ${attachment ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f4f6fa; font-weight: bold; font-size: 14px;">Attachment:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f4f6fa; font-size: 14px;">
                  <a href="${attachment}" target="_blank" style="background-color: #000745; color: #ffffff; padding: 6px 12px; border-radius: 4px; text-decoration: none; font-weight: bold; font-size: 12px; display: inline-block;">
                    View Uploaded File
                  </a>
                </td>
              </tr>
              ` : ''}
            </table>
            
            <div style="margin-top: 24px; padding: 16px; background-color: #f4f6fa; border-radius: 8px; border-left: 4px solid #000745;">
              <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #000745;">Project Requirements / Message:</h4>
              <p style="margin: 0; font-size: 14px; color: #333333; white-space: pre-wrap;">${message || '<span style="color: #999; font-style: italic;">No message provided.</span>'}</p>
            </div>
          </div>
          <div style="background-color: #f4f6fa; padding: 16px; text-align: center; border-top: 1px solid #d9dee8;">
            <p style="margin: 0; font-size: 12px; color: #777777;">&copy; ${new Date().getFullYear()} Finique Windows. All rights reserved.</p>
          </div>
        </div>
      `
    });
    console.log('[Resend] Success: Email notification sent to sales@finiquewindows.com');
  } catch (error) {
    console.error('[Resend] Error sending email:', error.message);
  }
};

const sendClientThankYouEmail = async (enquiry, productTitle = null) => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const { name, email } = enquiry;
  if (!email) return;

  const resend = new Resend(apiKey);

  try {
    await resend.emails.send({
      from: 'Finique <info@finiquewindows.com>',
      to: email,
      subject: `Thank you for contacting Finique, ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1f2f; max-width: 600px; margin: 0 auto; border: 1px solid #d9dee8; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background-color: #000745; padding: 24px; text-align: center; color: #ffffff;">
            <h2 style="margin: 0; font-size: 20px; font-weight: bold; tracking: 1.5px;">THANK YOU FOR GETTING IN TOUCH</h2>
          </div>
          <div style="padding: 24px; background-color: #ffffff;">
            <p style="margin-top: 0; font-size: 16px; font-weight: bold; color: #000745;">Dear ${name},</p>
            <p style="font-size: 14px; color: #333333;">Thank you for contacting Finique. We have successfully received your enquiry.</p>
            <p style="font-size: 14px; color: #333333;">Our team is reviewing your requirements, and a Finique representative will contact you shortly to discuss your project.</p>
            
            ${productTitle ? `
            <div style="margin: 20px 0; padding: 16px; background-color: #f4f6fa; border-radius: 8px;">
              <p style="margin: 0; font-size: 14px; color: #555555;"><strong>Inquired Product:</strong> ${productTitle}</p>
            </div>
            ` : ''}

            <p style="font-size: 14px; color: #333333; margin-top: 24px;">If you have any urgent queries, feel free to reply to this email or contact us at <a href="tel:+919961707373" style="color: #000745; text-decoration: none; font-weight: bold;">+91 99617 07373</a>.</p>
            
            <p style="font-size: 14px; color: #555555; margin-top: 32px; border-top: 1px solid #f4f6fa; padding-top: 16px;">
              Best regards,<br />
              <strong>Team Finique</strong><br />
              <a href="https://finiquewindows.com" style="color: #000745; text-decoration: none;">www.finiquewindows.com</a>
            </p>
          </div>
          <div style="background-color: #f4f6fa; padding: 16px; text-align: center; border-top: 1px solid #d9dee8;">
            <p style="margin: 0; font-size: 12px; color: #777777;">This is an automated confirmation of your website submission.</p>
          </div>
        </div>
      `
    });
    console.log(`[Resend] Success: Thank-you email sent to client at ${email}`);
  } catch (error) {
    console.error(`[Resend] Error sending thank-you email to ${email}:`, error.message);
  }
};

export const createEnquiry = asyncHandler(async (req, res) => {
  const { name, phone, email, message, productId } = req.body;

  if (!name || !phone) {
    res.status(400);
    throw new Error('Name and phone are required');
  }

  let attachmentUrl = null;
  if (req.file) {
    try {
      const result = await uploadBufferToCloudinary(
        req.file.buffer,
        'finique/enquiries',
        'auto'
      );
      attachmentUrl = result.secure_url;
    } catch (err) {
      res.status(500);
      throw new Error(`Failed to upload attachment: ${err.message}`);
    }
  }

  const enquiry = await Enquiry.create({
    name,
    phone,
    email: email || null,
    message: message || null,
    productId: productId || null,
    attachment: attachmentUrl
  });

  // Get product title for email if applicable
  let productTitle = null;
  if (productId) {
    try {
      const prod = await Product.findById(productId);
      if (prod) productTitle = prod.title;
    } catch (err) {
      console.error('Failed to fetch product details for email:', err.message);
    }
  }

  // Send email in background
  sendEnquiryEmail(enquiry, productTitle);
  if (enquiry.email) {
    sendClientThankYouEmail(enquiry, productTitle);
  }

  res.status(201).json({ message: 'Enquiry submitted successfully', enquiry });
});

export const getEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await Enquiry.find().populate('productId', 'title slug').sort({ createdAt: -1 });
  res.json(enquiries);
});

export const updateEnquiryStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!['new', 'contacted', 'closed'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status value');
  }

  const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!enquiry) {
    res.status(404);
    throw new Error('Enquiry not found');
  }

  res.json(enquiry);
});
