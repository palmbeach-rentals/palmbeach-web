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

const LOGO_URL = 'https://www.palmbeachexoticrental.com/media/images/logo/logo-white.png';
const SITE_URL = 'https://www.palmbeachexoticrental.com';

function buildBusinessEmailHtml(data: ReservationData): string {
  const submittedAt = new Date().toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'long', timeStyle: 'short' });
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#050505;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#050505;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;">

          <!-- Logo Bar -->
          <tr>
            <td style="padding:30px 40px;text-align:center;">
              <a href="${SITE_URL}" style="text-decoration:none;">
                <img src="${LOGO_URL}" alt="Palm Beach Exotic Rentals" width="80" style="width:80px;height:auto;display:inline-block;" />
              </a>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0d0d0d;border:1px solid #1a1a1a;border-radius:2px;">
                <!-- Gold accent top line -->
                <tr><td style="height:2px;background:linear-gradient(90deg,#0d0d0d,#C9A961,#0d0d0d);font-size:0;line-height:0;">&nbsp;</td></tr>

                <!-- Header -->
                <tr>
                  <td style="padding:35px 40px 25px;">
                    <p style="margin:0 0 6px;font-size:11px;color:#C9A961;letter-spacing:3px;text-transform:uppercase;font-weight:600;">New Reservation</p>
                    <h1 style="margin:0;font-size:26px;color:#ffffff;font-weight:300;letter-spacing:-0.3px;">
                      ${data.fullName}
                    </h1>
                    <p style="margin:8px 0 0;font-size:13px;color:#555555;">Submitted ${submittedAt} EST</p>
                  </td>
                </tr>

                <!-- Divider -->
                <tr><td style="padding:0 40px;"><div style="height:1px;background-color:#1a1a1a;"></div></td></tr>

                <!-- Details Grid -->
                <tr>
                  <td style="padding:30px 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <!-- Row: Email & Phone -->
                      <tr>
                        <td width="50%" style="padding:0 10px 22px 0;vertical-align:top;">
                          <p style="margin:0 0 5px;font-size:10px;color:#C9A961;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Email</p>
                          <a href="mailto:${data.email}" style="font-size:14px;color:#ffffff;text-decoration:none;word-break:break-all;">${data.email}</a>
                        </td>
                        <td width="50%" style="padding:0 0 22px 10px;vertical-align:top;">
                          <p style="margin:0 0 5px;font-size:10px;color:#C9A961;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Phone</p>
                          <a href="tel:${data.phone}" style="font-size:14px;color:#ffffff;text-decoration:none;">${data.phone}</a>
                        </td>
                      </tr>
                      <!-- Row: Vehicle & Dates -->
                      <tr>
                        <td width="50%" style="padding:0 10px 22px 0;vertical-align:top;">
                          <p style="margin:0 0 5px;font-size:10px;color:#C9A961;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Vehicle</p>
                          <p style="margin:0;font-size:14px;color:#ffffff;">${data.vehicle}</p>
                        </td>
                        <td width="50%" style="padding:0 0 22px 10px;vertical-align:top;">
                          <p style="margin:0 0 5px;font-size:10px;color:#C9A961;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Preferred Dates</p>
                          <p style="margin:0;font-size:14px;color:#ffffff;">${data.dates}</p>
                        </td>
                      </tr>
                      ${data.message ? `
                      <!-- Row: Message -->
                      <tr>
                        <td colspan="2" style="padding:0 0 8px;">
                          <p style="margin:0 0 5px;font-size:10px;color:#C9A961;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Additional Details</p>
                          <p style="margin:0;font-size:14px;color:#cccccc;line-height:1.7;background-color:#0a0a0a;border-left:2px solid #C9A961;padding:14px 18px;">${data.message}</p>
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>

                <!-- Quick Actions -->
                <tr><td style="padding:0 40px;"><div style="height:1px;background-color:#1a1a1a;"></div></td></tr>
                <tr>
                  <td style="padding:22px 40px 28px;text-align:center;">
                    <a href="mailto:${data.email}" style="display:inline-block;padding:12px 32px;background-color:#C9A961;color:#0a0a0a;text-decoration:none;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:600;">Reply to Client</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 40px;text-align:center;">
              <p style="margin:0 0 4px;font-size:11px;color:#333333;">This is an automated notification from your website.</p>
              <a href="${SITE_URL}" style="font-size:11px;color:#555555;text-decoration:none;">palmbeachexoticrental.com</a>
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
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#050505;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#050505;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;">

          <!-- Logo -->
          <tr>
            <td style="padding:30px 40px;text-align:center;">
              <a href="${SITE_URL}" style="text-decoration:none;">
                <img src="${LOGO_URL}" alt="Palm Beach Exotic Rentals" width="80" style="width:80px;height:auto;display:inline-block;" />
              </a>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0d0d0d;border:1px solid #1a1a1a;border-radius:2px;">
                <!-- Gold accent top line -->
                <tr><td style="height:2px;background:linear-gradient(90deg,#0d0d0d,#C9A961,#0d0d0d);font-size:0;line-height:0;">&nbsp;</td></tr>

                <!-- Hero Section -->
                <tr>
                  <td style="padding:50px 40px 35px;text-align:center;">
                    <!-- Gold circle checkmark -->
                    <table cellpadding="0" cellspacing="0" style="margin:0 auto 28px;">
                      <tr>
                        <td style="width:64px;height:64px;border:2px solid #C9A961;border-radius:50%;text-align:center;vertical-align:middle;font-size:26px;color:#C9A961;line-height:64px;">&#10003;</td>
                      </tr>
                    </table>
                    <h1 style="margin:0 0 10px;font-size:28px;color:#ffffff;font-weight:300;letter-spacing:-0.3px;">
                      Thank You, ${data.fullName}
                    </h1>
                    <div style="width:40px;height:2px;background-color:#C9A961;margin:0 auto 18px;"></div>
                    <p style="margin:0;font-size:15px;color:#888888;line-height:1.8;max-width:420px;display:inline-block;">
                      Your reservation request has been received. Our concierge team is reviewing the details and will reach out to you shortly.
                    </p>
                  </td>
                </tr>

                <!-- Divider -->
                <tr><td style="padding:0 40px;"><div style="height:1px;background-color:#1a1a1a;"></div></td></tr>

                <!-- Reservation Summary -->
                <tr>
                  <td style="padding:30px 40px;">
                    <p style="margin:0 0 20px;font-size:10px;color:#C9A961;letter-spacing:3px;text-transform:uppercase;font-weight:600;">Your Reservation Summary</p>
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#080808;border:1px solid #151515;">
                      <tr>
                        <td style="padding:20px 24px;border-bottom:1px solid #151515;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td width="50%" style="vertical-align:top;">
                                <p style="margin:0 0 4px;font-size:10px;color:#666666;text-transform:uppercase;letter-spacing:1.5px;">Vehicle</p>
                                <p style="margin:0;font-size:15px;color:#ffffff;font-weight:400;">${data.vehicle}</p>
                              </td>
                              <td width="50%" style="vertical-align:top;">
                                <p style="margin:0 0 4px;font-size:10px;color:#666666;text-transform:uppercase;letter-spacing:1.5px;">Preferred Dates</p>
                                <p style="margin:0;font-size:15px;color:#ffffff;font-weight:400;">${data.dates}</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ${data.message ? `
                      <tr>
                        <td style="padding:20px 24px;">
                          <p style="margin:0 0 4px;font-size:10px;color:#666666;text-transform:uppercase;letter-spacing:1.5px;">Your Notes</p>
                          <p style="margin:0;font-size:14px;color:#cccccc;line-height:1.6;">${data.message}</p>
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>

                <!-- What's Next -->
                <tr><td style="padding:0 40px;"><div style="height:1px;background-color:#1a1a1a;"></div></td></tr>
                <tr>
                  <td style="padding:30px 40px;">
                    <p style="margin:0 0 18px;font-size:10px;color:#C9A961;letter-spacing:3px;text-transform:uppercase;font-weight:600;">What Happens Next</p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:0 0 14px;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width:28px;vertical-align:top;padding-top:2px;">
                                <div style="width:20px;height:20px;border-radius:50%;background-color:#C9A961;color:#0a0a0a;text-align:center;line-height:20px;font-size:11px;font-weight:700;">1</div>
                              </td>
                              <td style="padding-left:12px;">
                                <p style="margin:0 0 2px;font-size:14px;color:#ffffff;">Review</p>
                                <p style="margin:0;font-size:13px;color:#666666;">Our team reviews your request and checks availability.</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0 0 14px;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width:28px;vertical-align:top;padding-top:2px;">
                                <div style="width:20px;height:20px;border-radius:50%;background-color:#C9A961;color:#0a0a0a;text-align:center;line-height:20px;font-size:11px;font-weight:700;">2</div>
                              </td>
                              <td style="padding-left:12px;">
                                <p style="margin:0 0 2px;font-size:14px;color:#ffffff;">Personalize</p>
                                <p style="margin:0;font-size:13px;color:#666666;">We'll contact you to tailor every detail of your experience.</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:0;">
                          <table cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="width:28px;vertical-align:top;padding-top:2px;">
                                <div style="width:20px;height:20px;border-radius:50%;background-color:#C9A961;color:#0a0a0a;text-align:center;line-height:20px;font-size:11px;font-weight:700;">3</div>
                              </td>
                              <td style="padding-left:12px;">
                                <p style="margin:0 0 2px;font-size:14px;color:#ffffff;">Confirm</p>
                                <p style="margin:0;font-size:13px;color:#666666;">Receive your confirmed itinerary and get ready to enjoy.</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- CTA -->
                <tr><td style="padding:0 40px;"><div style="height:1px;background-color:#1a1a1a;"></div></td></tr>
                <tr>
                  <td style="padding:30px 40px;text-align:center;">
                    <p style="margin:0 0 18px;font-size:13px;color:#666666;">We typically respond within 2-4 hours during business hours.</p>
                    <a href="${SITE_URL}" style="display:inline-block;padding:14px 36px;background-color:#C9A961;color:#0a0a0a;text-decoration:none;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:600;">Explore Our Fleet</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:32px 40px;text-align:center;">
              <p style="margin:0 0 6px;font-size:12px;color:#C9A961;letter-spacing:2.5px;text-transform:uppercase;font-weight:400;">
                Palm Beach Exotic Rentals
              </p>
              <p style="margin:0 0 16px;font-size:12px;color:#444444;">
                Palm Beach, Florida
              </p>
              <p style="margin:0;font-size:11px;color:#333333;line-height:1.6;">
                <a href="${SITE_URL}" style="color:#555555;text-decoration:none;">palmbeachexoticrental.com</a>
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
