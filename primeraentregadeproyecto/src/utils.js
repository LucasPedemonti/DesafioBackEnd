import { fileURLToPath } from "url";
import { dirname } from "path";

// Obtener la ruta del archivo actual (__filename)
const __filename = fileURLToPath(import.meta.url);

// Obtener el nombre del directorio que contiene el archivo (__dirname)
const __dirname = dirname(__filename);

// Exportar __dirname como módulo predeterminado
export default __dirname;
