
const config = require( '../config/index' );

const getPasswordResetEmailTemplate = ( userId, name, resetToken ) => {

  return `

  <!doctype html>
  <html lang="und" dir="auto" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  
  <head>
    <title></title>
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
      #outlook a {
        padding: 0;
      }
  
      body {
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
  
      table,
      td {
        border-collapse: collapse;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
  
      img {
        border: 0;
        height: auto;
        line-height: 100%;
        outline: none;
        text-decoration: none;
        -ms-interpolation-mode: bicubic;
      }
  
      p {
        display: block;
        margin: 13px 0;
      }
  
    </style>
    <!--[if mso]>
      <noscript>
      <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
      </xml>
      </noscript>
      <![endif]-->
    <!--[if lte mso 11]>
      <style type="text/css">
        .mj-outlook-group-fix { width:100% !important; }
      </style>
      <![endif]-->
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
    <style type="text/css">
      @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
  
    </style>
    <!--<![endif]-->
    <style type="text/css">
      @media only screen and (min-width:480px) {
        .mj-column-per-100 {
          width: 100% !important;
          max-width: 100%;
        }
  
        .mj-column-px-400 {
          width: 400px !important;
          max-width: 400px;
        }
      }
  
    </style>
    <style media="screen and (min-width:480px)">
      .moz-text-html .mj-column-per-100 {
        width: 100% !important;
        max-width: 100%;
      }
  
      .moz-text-html .mj-column-px-400 {
        width: 400px !important;
        max-width: 400px;
      }
  
    </style>
  </head>
  
  <body style="word-spacing:normal;">
    <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">Reset Your Password</div>
    <div style="" lang="und" dir="auto">
      <!-- Company Header -->
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#f0f0f0" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div style="background:#f0f0f0;background-color:#f0f0f0;margin:0px auto;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f0f0f0;background-color:#f0f0f0;width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                    <tbody>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:20px;font-style:italic;line-height:1;text-align:center;color:#626262;">Scrapbook Concierge Requests</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--[if mso | IE]></td></tr></table><![endif]-->
      <!-- Intro text -->
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#fafafa" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div style="background:#fafafa;background-color:#fafafa;margin:0px auto;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fafafa;background-color:#fafafa;width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:400px;" ><![endif]-->
                <div class="mj-column-px-400 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                    <tbody>
                      <tr>
                        <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:30px;word-break:break-word;">
                          <div style="font-family:Helvetica Neue;font-size:20px;font-style:italic;line-height:1.5;text-align:left;color:#626262;text-transform:capitalize;">Hi ${ name },</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="font-size:0px;padding:0px 25px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1.5;text-align:left;color:#525252;">You requested a password reset.</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" style="font-size:0px;padding:0px 25px;padding-bottom:50px;word-break:break-word;">
                          <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1.5;text-align:left;color:#525252;">Please, click the link below within the next 60 minutes to reset your password.</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                            <tbody>
                              <tr>
                                <td align="center" bgcolor="#F45E43" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#F45E43;" valign="middle">
                                  <a href="${ config.CLIENT_URL }/password-reset?token=${ resetToken }&id=${ userId }" style="display:inline-block;background:#F45E43;color:#ffffff;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:10px 25px;mso-padding-alt:0px;border-radius:3px;" target="_blank"> Reset password </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--[if mso | IE]></td></tr></table><![endif]-->
      <!-- Social icons -->
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#e7e7e7" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
      <div style="background:#e7e7e7;background-color:#e7e7e7;margin:0px auto;max-width:600px;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#e7e7e7;background-color:#e7e7e7;width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                    <tbody>
                      <tr>
                        <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                          <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td><![endif]-->
                          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                            <tbody>
                              <tr>
                                <td style="padding:4px;vertical-align:middle;">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#3b5998;border-radius:3px;width:20px;">
                                    <tbody>
                                      <tr>
                                        <td style="font-size:0;height:20px;vertical-align:middle;width:20px;">
                                          <a href="https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/ScrapbookConcierge/" target="_blank">
                                            <img alt="" height="30" src="https://www.mailjet.com/images/theme/v1/icons/ico-social/facebook.png" style="border-radius:3px;display:block;" width="30" />
                                          </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <!--[if mso | IE]></td><td><![endif]-->
                          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                            <tbody>
                              <tr>
                                <td style="padding:4px;vertical-align:middle;">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#3f729b;border-radius:3px;width:20px;">
                                    <tbody>
                                      <tr>
                                        <td style="font-size:0;height:20px;vertical-align:middle;width:20px;">
                                          <a href="https://www.instagram.com/scrapbookconcierge/?hl=en" target="_blank">
                                            <img alt="" height="30" src="https://www.mailjet.com/images/theme/v1/icons/ico-social/instagram.png" style="border-radius:3px;display:block;" width="30" />
                                          </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <!--[if mso | IE]></td><td><![endif]-->
                          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                            <tbody>
                              <tr>
                                <td style="padding:4px;vertical-align:middle;">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#bd081c;border-radius:3px;width:20px;">
                                    <tbody>
                                      <tr>
                                        <td style="font-size:0;height:20px;vertical-align:middle;width:20px;">
                                          <a href="https://pinterest.com/pin/create/button/?url=https://www.etsy.com/shop/ScrapbookConciergeCO&media=&description=" target="_blank">
                                            <img alt="" height="30" src="https://www.mailjet.com/images/theme/v1/icons/ico-social/pinterest.png" style="border-radius:3px;display:block;" width="30" />
                                          </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <!--[if mso | IE]></td><td><![endif]-->
                          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                            <tbody>
                              <tr>
                                <td style="padding:4px;vertical-align:middle;">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:20px;">
                                    <tbody>
                                      <tr>
                                        <td style="font-size:0;height:20px;vertical-align:middle;width:20px;">
                                          <a href="https://www.pinterest.com/scrapbookcc/_saved/" target="_blank">
                                            <img alt="" height="30" style="border-radius:3px;display:block;" width="30" />
                                          </a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <!--[if mso | IE]></td></tr></table><![endif]-->
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--[if mso | IE]></td></tr></table><![endif]-->
    </div>
  </body>
  
  </html>

  `;

};

const getNotificationEmailTemplate = ( username, email, requests, emailOptIn='false' ) => {

  return `

    <!doctype html>
    <html lang="und" dir="auto" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
      <title></title>
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <!--<![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
        #outlook a {
          padding: 0;
        }
    
        body {
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
    
        table,
        td {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
    
        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
        }
    
        p {
          display: block;
          margin: 13px 0;
        }
    
      </style>
      <!--[if mso]>
        <noscript>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        </noscript>
        <![endif]-->
      <!--[if lte mso 11]>
        <style type="text/css">
          .mj-outlook-group-fix { width:100% !important; }
        </style>
        <![endif]-->
      <!--[if !mso]><!-->
      <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
      <style type="text/css">
        @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);
    
      </style>
      <!--<![endif]-->
      <style type="text/css">
        @media only screen and (min-width:480px) {
          .mj-column-per-100 {
            width: 100% !important;
            max-width: 100%;
          }
    
          .mj-column-px-400 {
            width: 400px !important;
            max-width: 400px;
          }
        }
    
      </style>
      <style media="screen and (min-width:480px)">
        .moz-text-html .mj-column-per-100 {
          width: 100% !important;
          max-width: 100%;
        }
    
        .moz-text-html .mj-column-px-400 {
          width: 400px !important;
          max-width: 400px;
        }
    
      </style>
    </head>
    
    <body style="word-spacing:normal;">
      <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">New Scrapbook Kits Released</div>
      <div style="" lang="und" dir="auto">
        <!-- Company Header -->
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#f0f0f0" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#f0f0f0;background-color:#f0f0f0;margin:0px auto;max-width:600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f0f0f0;background-color:#f0f0f0;width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                      <tbody>
                        <tr>
                          <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:20px;font-style:italic;line-height:1;text-align:center;color:#626262;">Scrapbook Concierge Requests</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
        <!-- Intro text -->
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#fafafa" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#fafafa;background-color:#fafafa;margin:0px auto;max-width:600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#fafafa;background-color:#fafafa;width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:20px 0;padding-bottom:30px;padding-top:30px;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:400px;" ><![endif]-->
                  <div class="mj-column-px-400 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                      <tbody>
                        <tr>
                          <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:30px;word-break:break-word;">
                            <div style="font-family:Helvetica Neue;font-size:20px;font-style:italic;line-height:1;text-align:left;color:#626262;text-transform:capitalize;">Hi ${ username },</div>
                          </td>
                        </tr>
                        <tr>
                          <td align="left" style="font-size:0px;padding:10px 25px;padding-bottom:16px;word-break:break-word;">
                            <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;line-height:1.5;text-align:left;color:#525252;">We are happy to announce that some of the scrapbook layouts you've been waiting for are now available:</div>
                          </td>
                        </tr>
                        <tr>
                          <td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                              <tbody>
                                ${ requests.map( ( { title, url } ) => {
                                  return `
                                  <tr>
                                    <td align="left" bgcolor="#fafafa" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:0px 30px;background:#fafafa;" valign="middle">
                                      <a href="${ url }" style="display:inline-block;background:#fafafa;color:#196ad4;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:16px;font-weight:normal;line-height:1.5;margin:0;text-decoration:underline;text-transform:none;padding:0px 30px;mso-padding-alt:0px;border-radius:3px;" target="_blank"> ${ title } </a>
                                    </td>
                                  </tr>
                                  `                           
                                } ).join('') }
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
        <!-- Social icons -->
        <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" bgcolor="#e7e7e7" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
        <div style="background:#e7e7e7;background-color:#e7e7e7;margin:0px auto;max-width:600px;">
          <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#e7e7e7;background-color:#e7e7e7;width:100%;">
            <tbody>
              <tr>
                <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                  <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                      <tbody>
                        <tr>
                          <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" ><tr><td><![endif]-->
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                              <tbody>
                                <tr>
                                  <td style="padding:4px;vertical-align:middle;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#3b5998;border-radius:3px;width:30px;">
                                      <tbody>
                                        <tr>
                                          <td style="font-size:0;height:30px;vertical-align:middle;width:30px;">
                                            <a href="https://www.facebook.com/sharer/sharer.php?u=https://www.facebook.com/ScrapbookConcierge/" target="_blank">
                                              <img alt="" height="30" src="https://www.mailjet.com/images/theme/v1/icons/ico-social/facebook.png" style="border-radius:3px;display:block;" width="30" />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <!--[if mso | IE]></td><td><![endif]-->
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                              <tbody>
                                <tr>
                                  <td style="padding:4px;vertical-align:middle;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#3f729b;border-radius:3px;width:30px;">
                                      <tbody>
                                        <tr>
                                          <td style="font-size:0;height:30px;vertical-align:middle;width:30px;">
                                            <a href="https://www.instagram.com/scrapbookconcierge/?hl=en" target="_blank">
                                              <img alt="" height="30" src="https://www.mailjet.com/images/theme/v1/icons/ico-social/instagram.png" style="border-radius:3px;display:block;" width="30" />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <!--[if mso | IE]></td><td><![endif]-->
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                              <tbody>
                                <tr>
                                  <td style="padding:4px;vertical-align:middle;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#bd081c;border-radius:3px;width:30px;">
                                      <tbody>
                                        <tr>
                                          <td style="font-size:0;height:30px;vertical-align:middle;width:30px;">
                                            <a href="https://pinterest.com/pin/create/button/?url=https://www.etsy.com/shop/ScrapbookConciergeCO&media=&description=" target="_blank">
                                              <img alt="" height="30" src="https://www.mailjet.com/images/theme/v1/icons/ico-social/pinterest.png" style="border-radius:3px;display:block;" width="30" />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <!--[if mso | IE]></td><td><![endif]-->
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="float:none;display:inline-table;">
                              <tbody>
                                <tr>
                                  <td style="padding:4px;vertical-align:middle;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-radius:3px;width:30px;">
                                      <tbody>
                                        <tr>
                                          <td style="font-size:0;height:30px;vertical-align:middle;width:30px;">
                                            <a href="https://www.pinterest.com/scrapbookcc/_saved/" target="_blank">
                                              <img alt="" height="30" style="border-radius:3px;display:block;" width="30" />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <!--[if mso | IE]></td></tr></table><![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                  <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                      <tbody>
                        <tr>
                          <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                              <tbody>
                                <tr>
                                  <td align="center" bgcolor="#e7e7e7" role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:0px 30px;background:#e7e7e7;" valign="middle">
                                    <a href="${config.CLIENT_URL}/subscription?email=${email}&emailOptIn=true" style="display:inline-block;background:#e7e7e7;color:#196ad4;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:12px;font-weight:normal;line-height:120%;margin:0;text-decoration:underline;text-transform:none;padding:0px 30px;mso-padding-alt:0px;border-radius:3px;" target="_blank"> Unsubscribe </a>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!--[if mso | IE]></td></tr></table><![endif]-->
      </div>
    </body>
    
    </html>
  `
  
}

module.exports = { getNotificationEmailTemplate, getPasswordResetEmailTemplate }
