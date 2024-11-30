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

  export function formatDuration(duration: string): string {
    const regex = /PT(\d+H)?(\d+M)?/; // Captura as horas e minutos
    const matches = duration.match(regex);
  
    if (!matches) return duration;
  
    const hours = matches[1] ? parseInt(matches[1], 10) : 0;
    const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
  
    let formattedTime = "";
  
    if (hours > 0) {
      formattedTime += `${hours} hour${hours > 1 ? "s" : ""}`;
    }
  
    if (minutes > 0) {
      if (formattedTime) formattedTime += " ";
      formattedTime += `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }
  
    return formattedTime || "0 minutes";
  }