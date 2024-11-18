import type { NextConfig } from "next";

module.exports = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: 'http://localhost:8080/',  // Endereço do seu backend
      },
    ]
  },
}
