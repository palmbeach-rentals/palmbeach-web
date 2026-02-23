import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const BUSINESS_EMAIL = 'palmbeacher.web@gmail.com';
const FROM_EMAIL = 'Palm Beach Exotic Rentals <reservations@palmbeachexoticrental.com>';

interface ReservationData {
  fullName: string;
  email: string;
  phone: string;
  vehicle: string;
  dates: string;
  message?: string;
}

function buildBusinessEmailHtml(data: ReservationData): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#111111;border:1px solid #222222;">
          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 30px;text-align:center;border-bottom:1px solid #C9A961;">
              <h1 style="margin:0;font-size:24px;color:#C9A961;letter-spacing:3px;text-transform:uppercase;font-weight:400;">
                Palm Beach Exotic Rentals
              </h1>
              <p style="margin:8px 0 0;font-size:11px;color:#888888;letter-spacing:2px;text-transform:uppercase;">
                New Reservation Request
              </p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:35px 40px;">
              <h2 style="margin:0 0 25px;font-size:18px;color:#ffffff;font-weight:400;">
                A new reservation request has been submitted:
              </h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
                    <span style="display:inline-block;width:140px;font-size:11px;color:#C9A961;text-transform:uppercase;letter-spacing:1.5px;">Name</span>
                    <span style="font-size:15px;color:#ffffff;">${data.fullName}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
                    <span style="display:inline-block;width:140px;font-size:11px;color:#C9A961;text-transform:uppercase;letter-spacing:1.5px;">Email</span>
                    <a href="mailto:${data.email}" style="font-size:15px;color:#ffffff;text-decoration:none;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
                    <span style="display:inline-block;width:140px;font-size:11px;color:#C9A961;text-transform:uppercase;letter-spacing:1.5px;">Phone</span>
                    <a href="tel:${data.phone}" style="font-size:15px;color:#ffffff;text-decoration:none;">${data.phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
                    <span style="display:inline-block;width:140px;font-size:11px;color:#C9A961;text-transform:uppercase;letter-spacing:1.5px;">Vehicle</span>
                    <span style="font-size:15px;color:#ffffff;">${data.vehicle}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #1a1a1a;">
                    <span style="display:inline-block;width:140px;font-size:11px;color:#C9A961;text-transform:uppercase;letter-spacing:1.5px;">Dates</span>
                    <span style="font-size:15px;color:#ffffff;">${data.dates}</span>
                  </td>
                </tr>
                ${data.message ? `
                <tr>
                  <td style="padding:12px 0;">
                    <span style="display:block;font-size:11px;color:#C9A961;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px;">Message</span>
                    <span style="font-size:15px;color:#ffffff;line-height:1.6;">${data.message}</span>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:25px 40px;text-align:center;border-top:1px solid #222222;">
              <p style="margin:0;font-size:11px;color:#555555;">
                This notification was sent from the website reservation form.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildClientConfirmationHtml(data: ReservationData): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#111111;border:1px solid #222222;">
          <!-- Header -->
          <tr>
            <td style="padding:40px 40px 30px;text-align:center;border-bottom:1px solid #C9A961;">
              <h1 style="margin:0;font-size:24px;color:#C9A961;letter-spacing:3px;text-transform:uppercase;font-weight:400;">
                Palm Beach Exotic Rentals
              </h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;text-align:center;">
              <!-- Checkmark -->
              <div style="width:60px;height:60px;border:1px solid #C9A961;margin:0 auto 25px;line-height:60px;font-size:28px;color:#C9A961;">
                &#10003;
              </div>
              <h2 style="margin:0 0 15px;font-size:22px;color:#ffffff;font-weight:400;">
                Request Received
              </h2>
              <div style="width:50px;height:1px;background:linear-gradient(to right,transparent,#C9A961,transparent);margin:0 auto 20px;"></div>
              <p style="margin:0 0 30px;font-size:15px;color:#999999;line-height:1.7;max-width:420px;display:inline-block;">
                Thank you, ${data.fullName}. We have received your reservation request and our concierge team will be in touch shortly.
              </p>
              <!-- Summary -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;border:1px solid #1a1a1a;text-align:left;">
                <tr>
                  <td style="padding:25px 30px 10px;">
                    <p style="margin:0 0 4px;font-size:11px;color:#C9A961;text-transform:uppercase;letter-spacing:1.5px;">Vehicle</p>
                    <p style="margin:0 0 15px;font-size:15px;color:#ffffff;">${data.vehicle}</p>
                    <p style="margin:0 0 4px;font-size:11px;color:#C9A961;text-transform:uppercase;letter-spacing:1.5px;">Preferred Dates</p>
                    <p style="margin:0 0 15px;font-size:15px;color:#ffffff;">${data.dates}</p>
                  </td>
                </tr>
              </table>
              <p style="margin:25px 0 0;font-size:13px;color:#666666;line-height:1.6;">
                We typically respond within 2-4 hours during business hours.<br>
                If you need immediate assistance, call us directly.
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:25px 40px;text-align:center;border-top:1px solid #222222;">
              <p style="margin:0 0 5px;font-size:11px;color:#C9A961;letter-spacing:2px;text-transform:uppercase;">
                Palm Beach Exotic Rentals
              </p>
              <p style="margin:0;font-size:11px;color:#555555;">
                Palm Beach, Florida
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fullName, email, phone, vehicle, dates, message } = req.body as ReservationData;

  if (!fullName || !email || !phone || !vehicle || !dates) {
    return res.status(400).json({ error: 'Missing required fields: fullName, email, phone, vehicle, dates' });
  }

  const data: ReservationData = { fullName, email, phone, vehicle, dates, message };

  try {
    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: BUSINESS_EMAIL,
        subject: `New Reservation Request — ${fullName}`,
        html: buildBusinessEmailHtml(data),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'Your Reservation Request — Palm Beach Exotic Rentals',
        html: buildClientConfirmationHtml(data),
      }),
    ]);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to send reservation emails:', error);
    return res.status(500).json({ error: 'Failed to send reservation emails' });
  }
}
