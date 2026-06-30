// api/alertas.js
export default async function handler(req, res) {
    const koboApiUrl = 'https://kf.kobotoolbox.org/api/v2/assets/aBPaxBtjgtDYEBUvAeH3MQ/data.json';
    
    // El Token se leerá de forma ultra segura desde las variables de Vercel
    const token = process.env.KOBO_TOKEN;

    try {
        const response = await fetch(koboApiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: `Error de Kobo: ${response.statusText}` });
        }

        const data = await response.json();

        // IMPORTANTE: Aquí permitimos que tu mapa en GitHub Pages lea los datos sin error de CORS
        res.setHeader('Access-Control-Allow-Origin', 'https://geosig-cpu.github.io');
        res.setHeader('Access-Control-Allow-Methods', 'GET');
        res.setHeader('Content-Type', 'application/json');
        
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
