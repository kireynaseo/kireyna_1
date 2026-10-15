// Vercel / Netlify Serverless Function for Resend Email Relay
// Endpoint: /api/send-email

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
  const DEFAULT_RECIPIENT = process.env.INQUIRY_RECIPIENT || 'kireynaseo74@gmail.com';
  const SENDER_EMAIL = process.env.RESEND_SENDER || '광명리더스부동산 <onboarding@resend.dev>';

  if (!RESEND_API_KEY) {
    return res.status(500).json({ success: false, error: 'RESEND_API_KEY 환경변수가 설정되지 않았습니다.' });
  }

  try {
    const data = req.body;
    const { id = 'GL-N/A', type = '일반 상담', name = '미입력', phone = '미입력', summary = '', time = '', details = {} } = data;

    let detailRows = '';
    if (details && typeof details === 'object') {
      for (const [k, v] of Object.entries(details)) {
        if (v && String(v).trim()) {
          detailRows += `
            <tr>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; background: #f8fafc; font-weight: 600; color: #334155; width: 140px;">${k}</td>
              <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${v}</td>
            </tr>
          `;
        }
      }
    }

    const htmlBody = `
      <!DOCTYPE html>
      <html lang="ko">
      <head><meta charset="utf-8"></head>
      <body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR', sans-serif; background-color: #f1f5f9; color: #1e293b;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          <div style="background: linear-gradient(135deg, #0F2C59 0%, #173b75 100%); padding: 28px 24px; text-align: center; color: #ffffff;">
            <span style="display: inline-block; background: #DDA853; color: #0F2C59; font-size: 12px; font-weight: 800; padding: 4px 10px; border-radius: 20px; margin-bottom: 8px;">
              신규 고객 상담 접수
            </span>
            <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">광명리더스 공인중개사사무소</h1>
            <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9; color: #e2e8f0;">홈페이지를 통해 새로운 고객 문의가 접수되었습니다.</p>
          </div>
          <div style="padding: 24px;">
            <div style="background: #f8fafc; border-left: 4px solid #0F2C59; padding: 16px; border-radius: 6px; margin-bottom: 20px;">
              <div style="font-size: 13px; color: #64748b; margin-bottom: 4px;">접수 유형 & 번호</div>
              <div style="font-size: 17px; font-weight: 700; color: #0F2C59;">
                [${type}] <span style="font-size: 14px; color: #475569; font-weight: normal;">(접수번호: ${id})</span>
              </div>
              <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">접수 시각: ${time}</div>
            </div>
            <h3 style="font-size: 15px; color: #0F2C59; border-bottom: 2px solid #0F2C59; padding-bottom: 6px; margin: 0 0 12px 0;">
              👤 고객 연락처 정보
            </h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
              <tr>
                <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; background: #f8fafc; font-weight: 600; color: #334155; width: 140px;">고객 성함</td>
                <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #0F2C59; font-size: 16px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; background: #f8fafc; font-weight: 600; color: #334155;">연락처</td>
                <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #2563eb; font-size: 16px;">
                  <a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; background: #f8fafc; font-weight: 600; color: #334155;">한줄 요약</td>
                <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #334155;">${summary}</td>
              </tr>
            </table>
            <h3 style="font-size: 15px; color: #0F2C59; border-bottom: 2px solid #0F2C59; padding-bottom: 6px; margin: 0 0 12px 0;">
              📋 상세 접수 내역
            </h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
              ${detailRows}
            </table>
            <div style="text-align: center; margin: 30px 0 10px 0;">
              <a href="tel:${phone}" style="display: inline-block; background: #0F2C59; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 15px; margin-right: 8px;">
                📞 고객에게 바로 전화 걸기
              </a>
              <a href="https://open.kakao.com/o/s222zcSi" style="display: inline-block; background: #FEE500; color: #3C1E1E; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-weight: 800; font-size: 15px;">
                💬 1:1 오픈톡 열기
              </a>
            </div>
          </div>
          <div style="background: #f8fafc; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
            광명리더스 공인중개사사무소 | 경기도 광명시 오리로 854 센트럴타워 1층 102호 | 010-4820-8888<br>
            이 메일은 광명리더스 웹사이트 문의 시스템에서 Resend API를 통해 자동 발송되었습니다.
          </div>
        </div>
      </body>
      </html>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: SENDER_EMAIL,
        to: [DEFAULT_RECIPIENT],
        subject: `[광명리더스 접수] ${type} - ${name} 고객님 (${phone})`,
        html: htmlBody
      })
    });

    const resJson = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ success: false, error: resJson });
    }

    return res.status(200).json({
      success: true,
      id: resJson.id,
      message: '성공적으로 접수 및 대표 이메일로 전송되었습니다.',
      recipient: DEFAULT_RECIPIENT
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
