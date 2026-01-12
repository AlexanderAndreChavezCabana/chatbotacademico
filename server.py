"""
Servidor HTTP simple para servir los archivos HTML con CORS habilitado
Usar este servidor para evitar problemas de CORS con Dialogflow
"""
import http.server
import socketserver
import os

PORT = 8080

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Habilitar CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🌐 Servidor HTTP iniciado en http://localhost:{PORT}")
        print(f"📂 Sirviendo archivos desde: {os.getcwd()}")
        print(f"🤖 Abre en tu navegador: http://localhost:{PORT}/page.html")
        print(f"\n💡 Presiona Ctrl+C para detener el servidor\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n✅ Servidor detenido")
