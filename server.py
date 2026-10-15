import os
import sys
import json
import urllib.request
import urllib.error
from http.server import SimpleHTTPRequestHandler, HTTPServer

# Ensure UTF-8 output on Windows console
try:
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    if hasattr(sys.stderr, 'reconfigure'):
        sys.stderr.reconfigure(encoding='utf-8')
except Exception:
    pass

# Load .env file if it exists
env_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(env_path):
    try:
        with open(env_path, 'r', encoding='utf-8') as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith('#') and '=' in line:
                    k, v = line.split('=', 1)
                    k, v = k.strip(), v.strip()
                    if k and k not in os.environ:
                        os.environ[k] = v
    except Exception as e:
        print(f"Warning: Failed to parse .env file: {e}", file=sys.stderr)

RESEND_API_KEY = os.environ.get("RESEND_API_KEY", "")
DEFAULT_RECIPIENT = os.environ.get("INQUIRY_RECIPIENT", "kireynaseo74@gmail.com")
SENDER_EMAIL = os.environ.get("RESEND_SENDER", "광명리더스부동산 <onboarding@resend.dev>")

class CustomHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS for local testing and development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Content-Type', 'text/plain')
        self.end_headers()
        self.wfile.write(b"OK")

    def do_GET(self):
        if self.path == '/api/status':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            status_data = {
                "status": "online",
                "resend_configured": bool(RESEND_API_KEY),
                "recipient": DEFAULT_RECIPIENT,
                "sender": SENDER_EMAIL
            }
            self.wfile.write(json.dumps(status_data, ensure_ascii=False).encode('utf-8'))
            return
        
        super().do_GET()

    def do_POST(self):
        if self.path == '/api/send-email':
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')
            
            try:
                data = json.loads(body)
            except Exception as e:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": f"Invalid JSON: {str(e)}"}, ensure_ascii=False).encode('utf-8'))
                return

            receipt_id = data.get('id', 'GL-N/A')
            inquiry_type = data.get('type', '일반 상담')
            client_name = data.get('name', '미입력')
            client_phone = data.get('phone', '미입력')
            summary = data.get('summary', '')
            inquiry_time = data.get('time', '')
            details = data.get('details', {})

            # Format Details HTML table rows
            detail_rows = ""
            if isinstance(details, dict):
                for k, v in details.items():
                    if v and str(v).strip():
                        detail_rows += f"""
                        <tr>
                            <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; background: #f8fafc; font-weight: 600; color: #334155; width: 140px;">{k}</td>
                            <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">{v}</td>
                        </tr>
                        """

            # Clean Korean HTML Email Template
            html_body = f"""
            <!DOCTYPE html>
            <html lang="ko">
            <head>
                <meta charset="utf-8">
            </head>
            <body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans KR', sans-serif; background-color: #f1f5f9; color: #1e293b;">
                <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
                    
                    <!-- Header -->
                    <div style="background: linear-gradient(135deg, #0F2C59 0%, #173b75 100%); padding: 28px 24px; text-align: center; color: #ffffff;">
                        <span style="display: inline-block; background: #DDA853; color: #0F2C59; font-size: 12px; font-weight: 800; padding: 4px 10px; border-radius: 20px; margin-bottom: 8px;">
                            신규 고객 상담 접수
                        </span>
                        <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px;">광명리더스 공인중개사사무소</h1>
                        <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9; color: #e2e8f0;">홈페이지를 통해 새로운 고객 문의가 접수되었습니다.</p>
                    </div>

                    <!-- Summary Card -->
                    <div style="padding: 24px;">
                        <div style="background: #f8fafc; border-left: 4px solid #0F2C59; padding: 16px; border-radius: 6px; margin-bottom: 20px;">
                            <div style="font-size: 13px; color: #64748b; margin-bottom: 4px;">접수 유형 & 번호</div>
                            <div style="font-size: 17px; font-weight: 700; color: #0F2C59;">
                                [{inquiry_type}] <span style="font-size: 14px; color: #475569; font-weight: normal;">(접수번호: {receipt_id})</span>
                            </div>
                            <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">접수 시각: {inquiry_time}</div>
                        </div>

                        <!-- Customer Info -->
                        <h3 style="font-size: 15px; color: #0F2C59; border-bottom: 2px solid #0F2C59; padding-bottom: 6px; margin: 0 0 12px 0;">
                            👤 고객 연락처 정보
                        </h3>
                        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
                            <tr>
                                <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; background: #f8fafc; font-weight: 600; color: #334155; width: 140px;">고객 성함</td>
                                <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #0F2C59; font-size: 16px;">{client_name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; background: #f8fafc; font-weight: 600; color: #334155;">연락처</td>
                                <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #2563eb; font-size: 16px;">
                                    <a href="tel:{client_phone}" style="color: #2563eb; text-decoration: none;">{client_phone}</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; background: #f8fafc; font-weight: 600; color: #334155;">한줄 요약</td>
                                <td style="padding: 10px 14px; border-bottom: 1px solid #e2e8f0; color: #334155;">{summary}</td>
                            </tr>
                        </table>

                        <!-- Detailed Information -->
                        <h3 style="font-size: 15px; color: #0F2C59; border-bottom: 2px solid #0F2C59; padding-bottom: 6px; margin: 0 0 12px 0;">
                            📋 상세 접수 내역
                        </h3>
                        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
                            {detail_rows}
                        </table>

                        <!-- Quick Actions -->
                        <div style="text-align: center; margin: 30px 0 10px 0;">
                            <a href="tel:{client_phone}" style="display: inline-block; background: #0F2C59; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 15px; margin-right: 8px;">
                                📞 고객에게 바로 전화 걸기
                            </a>
                            <a href="https://open.kakao.com/o/s222zcSi" style="display: inline-block; background: #FEE500; color: #3C1E1E; text-decoration: none; padding: 12px 20px; border-radius: 8px; font-weight: 800; font-size: 15px;">
                                💬 1:1 오픈톡 열기
                            </a>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div style="background: #f8fafc; padding: 16px 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
                        광명리더스 공인중개사사무소 | 경기도 광명시 오리로 854 센트럴타워 1층 102호 | 010-4820-8888<br>
                        이 메일은 광명리더스 웹사이트 문의 시스템에서 Resend API를 통해 자동 발송되었습니다.
                    </div>
                </div>
            </body>
            </html>
            """

            subject = f"[광명리더스 접수] {inquiry_type} - {client_name} 고객님 ({client_phone})"
            
            resend_payload = {
                "from": SENDER_EMAIL,
                "to": [DEFAULT_RECIPIENT],
                "subject": subject,
                "html": html_body
            }

            req = urllib.request.Request(
                "https://api.resend.com/emails",
                data=json.dumps(resend_payload).encode('utf-8'),
                headers={
                    "Authorization": f"Bearer {RESEND_API_KEY}",
                    "Content-Type": "application/json",
                    "User-Agent": "GwangmyeongLeaders/1.0"
                },
                method="POST"
            )

            try:
                with urllib.request.urlopen(req, timeout=10) as response:
                    res_body = response.read().decode('utf-8')
                    res_json = json.loads(res_body)
                    
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json; charset=utf-8')
                    self.end_headers()
                    response_output = {
                        "success": True,
                        "id": res_json.get("id"),
                        "message": "고객 문의가 성공적으로 접수 및 대표 이메일로 전송되었습니다.",
                        "recipient": DEFAULT_RECIPIENT
                    }
                    self.wfile.write(json.dumps(response_output, ensure_ascii=False).encode('utf-8'))
                    print(f"[RESEND SUCCESS] Sent email id: {res_json.get('id')} to {DEFAULT_RECIPIENT}")

            except urllib.error.HTTPError as he:
                err_content = he.read().decode('utf-8')
                print(f"[RESEND HTTP ERROR] {he.code}: {err_content}", file=sys.stderr)
                self.send_response(he.code)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "success": False,
                    "error": f"Resend API error {he.code}: {err_content}"
                }, ensure_ascii=False).encode('utf-8'))

            except Exception as e:
                print(f"[RESEND ERROR] {str(e)}", file=sys.stderr)
                self.send_response(500)
                self.send_header('Content-Type', 'application/json; charset=utf-8')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "success": False,
                    "error": str(e)
                }, ensure_ascii=False).encode('utf-8'))
            
            return

        super().do_POST()

class ReusableHTTPServer(HTTPServer):
    allow_reuse_address = True

def run(port=3000):
    server_address = ('', port)
    httpd = ReusableHTTPServer(server_address, CustomHandler)
    print(f"==================================================")
    print(f" 광명리더스 웹서버 & Resend API 릴레이 구동 완료!")
    print(f" - Local Server: http://localhost:{port}")
    print(f" - Resend Email Relay: POST /api/send-email")
    print(f" - 수신 이메일: {DEFAULT_RECIPIENT}")
    print(f"==================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n서버를 종료합니다.")
        httpd.server_close()

if __name__ == '__main__':
    port = 3000
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            pass
    run(port)
