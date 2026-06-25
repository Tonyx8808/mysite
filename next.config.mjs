/** @type {import('next').NextConfig} */
const nextConfig = {
  // Elimina il warning "Cross origin request detected"
  // Aggiungi qui l'IP del tuo dispositivo mobile/WSL se cambia
  allowedDevOrigins: [
    '172.23.144.1',   // IP rilevato nel warning
    'localhost',
    '127.0.0.1',
  ],
}

export default nextConfig