import nm from "nodemailer";

export class EmailFactory {
  static instance: nm.Transporter;

  static getInstance() {
    if (!EmailFactory.instance) {
      if (
        process.env.NODE_ENV === "production" &&
        (!process.env.SMTP_HOST ||
          !process.env.SMTP_USER ||
          !process.env.SMTP_PASS)
      ) {
        throw new Error("Missing SMTP configuration");
      }
      if (process.env.NODE_ENV === "production") {
        EmailFactory.instance = nm.createTransport({
          host: process.env.SMTP_HOST,
          port: 465,
          secure: true,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
      }
      if (process.env.NODE_ENV === "development") {
        EmailFactory.instance = nm.createTransport({
          host: "localhost",
          port: 25,
          secure: false,
        });
      }
    }
    return EmailFactory.instance;
  }
}

const EmailTransport = EmailFactory.getInstance();

// Better Auth expects this specific function signature for email verification
export async function sendVerificationEmail({
  user,
  url,
  token,
}: {
  user: { email: string; name: string };
  url: string;
  token: string;
}) {
  await EmailTransport.sendMail({
    to: user.email,
    from: process.env.SMTP_FROM_EMAIL,
    subject: "Verify your email - CentralResume",
    text: `Hi ${user.name}, please verify your email by clicking this link: ${url}`,
    html: `
    <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>CentralResume - Email Verification</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      font-family: Arial, sans-serif;
    "
  >
    <!-- Wrapper Table -->
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      bgcolor="#f9f9f9"
    >
      <tr>
        <td align="center">
          <!-- Container Table -->
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            border="0"
            bgcolor="#ffffff"
            style="
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            "
          >
            <!-- Header -->
            <tr>
              <td
                align="center"
                style="padding: 35px 30px; background-color: #fafafa"
              >
                <img
                  src="https://static.centralresume.me/logo.png"
                  alt="CentralResume Logo"
                  width="150"
                  height="125"
                  style="display: block"
                />
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td
                style="
                  padding: 40px 30px;
                  color: #333333;
                  font-size: 16px;
                  line-height: 1.6;
                "
              >
                <h1
                  style="
                    font-size: 26px;
                    margin-bottom: 24px;
                    font-weight: 700;
                    letter-spacing: -0.5px;
                    color: #333333;
                  "
                >
                  Verify your email address
                </h1>
                <div>
                  <p>Hi ${user.name},</p>
                  <p>Welcome to CentralResume! Please verify your email address to complete your account setup.</p>
                  
                  <div style="text-align: center; margin: 30px 0;">
                    <a
                      href="${url}"
                      style="
                        display: inline-block;
                        padding: 15px 30px;
                        background-color: #4caf50;
                        color: #fff;
                        text-decoration: none;
                        border-radius: 8px;
                        font-weight: 600;
                        font-size: 16px;
                      "
                    >Verify Email Address</a>
                  </div>
                  
                  <p style="margin-top: 20px; font-size: 14px; color: #6c757d;">
                    If the button doesn't work, you can also copy and paste this link into your browser:
                  </p>
                  <p style="word-break: break-all; color: #007bff; font-size: 14px;">
                    ${url}
                  </p>
                  
                  <p style="color: #6c757d;">
                    If you did not create this account, you can safely ignore this email.
                  </p>
                </div>

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="margin: 40px 0"
                >
                  <tr>
                    <td align="center">
                      <span
                        style="
                          display: inline-block;
                          width: 8px;
                          height: 8px;
                          border-radius: 50%;
                          background-color: #ffc107;
                          margin: 0 4px;
                        "
                      ></span>
                      <span
                        style="
                          display: inline-block;
                          width: 8px;
                          height: 8px;
                          border-radius: 50%;
                          background-color: #ff5252;
                          margin: 0 4px;
                        "
                      ></span>
                      <span
                        style="
                          display: inline-block;
                          width: 8px;
                          height: 8px;
                          border-radius: 50%;
                          background-color: #f9638a;
                          margin: 0 4px;
                        "
                      ></span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <!-- End Container Table -->
        </td>
      </tr>
    </table>
    <!-- End Wrapper Table -->
  </body>
</html>
    `,
  });
}

// Better Auth expects this specific function signature for password reset emails
export async function sendPasswordResetEmail({
  user,
  url,
  token,
}: {
  user: { email: string; name: string };
  url: string;
  token: string;
}) {
  await EmailTransport.sendMail({
    to: user.email,
    from: process.env.RESEND_FROM_EMAIL,
    subject: "Reset your password - CentralResume",
    text: `Hi ${user.name}, reset your password by clicking this link: ${url}`,
    html: `
    <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>CentralResume - Password Reset</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
      font-family: Arial, sans-serif;
    "
  >
    <!-- Wrapper Table -->
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      bgcolor="#f9f9f9"
    >
      <tr>
        <td align="center">
          <!-- Container Table -->
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            border="0"
            bgcolor="#ffffff"
            style="
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            "
          >
            <!-- Header -->
            <tr>
              <td
                align="center"
                style="padding: 35px 30px; background-color: #fafafa"
              >
                <img
                  src="https://static.centralresume.me/logo.png"
                  alt="CentralResume Logo"
                  width="150"
                  height="125"
                  style="display: block"
                />
              </td>
            </tr>

            <!-- Main Content -->
            <tr>
              <td
                style="
                  padding: 40px 30px;
                  color: #333333;
                  font-size: 16px;
                  line-height: 1.6;
                "
              >
                <h1
                  style="
                    font-size: 26px;
                    margin-bottom: 24px;
                    font-weight: 700;
                    letter-spacing: -0.5px;
                    color: #333333;
                  "
                >
                  Reset your password
                </h1>
                <div>
                  <p>Hi ${user.name},</p>
                  <p>We received a request to reset your password for your CentralResume account. Click the button below to set a new password:</p>
                  
                  <div style="text-align: center; margin: 30px 0;">
                    <a
                      href="${url}"
                      style="
                        display: inline-block;
                        padding: 15px 30px;
                        background-color: #007bff;
                        color: #fff;
                        text-decoration: none;
                        border-radius: 8px;
                        font-weight: 600;
                        font-size: 16px;
                      "
                    >Reset Password</a>
                  </div>
                  
                  <p style="margin-top: 20px; font-size: 14px; color: #6c757d;">
                    If the button doesn't work, you can also copy and paste this link into your browser:
                  </p>
                  <p style="word-break: break-all; color: #007bff; font-size: 14px;">
                    ${url}
                  </p>
                  
                  <p style="color: #6c757d;">
                    If you did not request a password reset, please ignore this email. Your password will remain unchanged.
                  </p>
                </div>

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="margin: 40px 0"
                >
                  <tr>
                    <td align="center">
                      <span
                        style="
                          display: inline-block;
                          width: 8px;
                          height: 8px;
                          border-radius: 50%;
                          background-color: #ffc107;
                          margin: 0 4px;
                        "
                      ></span>
                      <span
                        style="
                          display: inline-block;
                          width: 8px;
                          height: 8px;
                          border-radius: 50%;
                          background-color: #ff5252;
                          margin: 0 4px;
                        "
                      ></span>
                      <span
                        style="
                          display: inline-block;
                          width: 8px;
                          height: 8px;
                          border-radius: 50%;
                          background-color: #f9638a;
                          margin: 0 4px;
                        "
                      ></span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <!-- End Container Table -->
        </td>
      </tr>
    </table>
    <!-- End Wrapper Table -->
  </body>
</html>
    `,
  });
}
