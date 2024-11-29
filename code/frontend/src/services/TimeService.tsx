export function parseISODuration(duration: string): string {
    const regex = /P(?:\d+Y)?(?:\d+M)?(?:\d+W)?(?:\d+D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = duration.match(regex);
  
    if (!matches) return "Invalid duration";
  
    const hours = matches[1] ? parseInt(matches[1], 10) : 0;
    const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
    const seconds = matches[3] ? parseInt(matches[3], 10) : 0;
  
    if (hours > 0) return `${hours}h ${minutes}m`;
    if (minutes > 0) return `${minutes}m`;
    if (seconds > 0) return `${seconds}s`;
  
    return "0m";
  }

 export function formatTime(milliseconds: number): string {
    // Verifica se o valor é um número válido
    if (isNaN(milliseconds) || milliseconds === 0) {
      return "0"; // Ou retorna outro valor de fallback, como "0m"
    }
  
    const totalMinutes = Math.floor(milliseconds / 60000); // Converte ms para minutos
    const hours = Math.floor(totalMinutes / 60); // Calcula horas
    const minutes = totalMinutes % 60; // Restante para minutos
  
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }