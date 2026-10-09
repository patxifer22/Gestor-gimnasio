"""
FitTrack - Servidor Local para Pruebas en PC y Móvil
Ejecuta este archivo con Python para abrir la app en tu navegador
y acceder desde tu teléfono móvil conectado a la misma red Wi-Fi.
"""

import http.server
import socket
import socketserver
import webbrowser
import os
import sys

# La consola de Windows usa cp1252 por defecto, que no soporta los emojis
# del banner: forzamos UTF-8 en la salida para evitar UnicodeEncodeError.
if sys.stdout and hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

PORT = 8000

def get_local_ip():
    """Detecta la IP local de la máquina en la red Wi-Fi / LAN"""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Permite caching adecuado y acceso cross-origin si se requiere
        self.send_header('Cache-Control', 'no-cache, must-revalidate')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()


class ReusableThreadingTCPServer(socketserver.ThreadingTCPServer):
    """TCPServer que permite reutilizar el puerto tras reiniciar y atiende varias peticiones en paralelo."""
    allow_reuse_address = True
    daemon_threads = True

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    local_ip = get_local_ip()

    print("=" * 60)
    print("      🏋️‍♂️ FitTrack - Servidor de Aplicación Móvil 🏋️‍♂️")
    print("=" * 60)
    print(f"\n[+] En tu ordenador:")
    print(f"    http://localhost:{PORT}")
    print(f"\n[+] En tu móvil (conectado a la misma red Wi-Fi):")
    print(f"    http://{local_ip}:{PORT}")
    print("\n[i] Para instalar la app en tu teléfono:")
    print("    - Android (Chrome): Menú de 3 puntos -> 'Añadir a pantalla de inicio'")
    print("    - iPhone (Safari): Botón Compartir -> 'Añadir a pantalla de inicio'")
    print("\n[i] Presiona Ctrl + C para detener el servidor.\n")
    print("=" * 60)

    # Abrir navegador automáticamente en PC (el puerto ya está reservado)
    with ReusableThreadingTCPServer(("", PORT), CustomHandler) as httpd:
        try:
            webbrowser.open(f"http://localhost:{PORT}")
        except Exception:
            pass

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\nServidor detenido. ¡Buen entrenamiento!")

if __name__ == "__main__":
    main()
