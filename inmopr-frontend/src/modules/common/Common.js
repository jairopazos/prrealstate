export const fetchStreets = async (input, city = null, province = null, postalCode = null) => {
    try {
        // Construimos la URL base
        let url = `https://nominatim.openstreetmap.org/search?street=${encodeURIComponent(input)}&format=json&countrycodes=es&limit=5`;

        // Añadimos filtros de ciudad y provincia si están disponibles
        if (city) {
            url += `&city=${encodeURIComponent(city)}`;
        }
        if (province) {
            url += `&county=${encodeURIComponent(province)}`;
        }

        if (postalCode) url += `&postalcode=${encodeURIComponent(postalCode)}`;

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'YourAppName/1.0' // Nominatim requiere User-Agent
            }
        });

        const data = await response.json();

        // Filtramos y mapeamos los resultados
        const streets = data.filter(item =>
            item.class === 'highway'
        ).map(item => {
            return item.address?.road ||
                item.name ||
                item.name.split(',')[0];
        });

        return Array.from(new Set(streets)); // Eliminamos duplicados
    } catch (error) {
        console.error("Error fetching street data:", error);
        return [];
    }
};

export const fetchCities = async (input, selectedProvince=null) => {
    try {
        let url = `https://nominatim.openstreetmap.org/search?city=${input}&format=json&limit=5`;
        if (selectedProvince) {
            // Para España usamos 'state' (aunque técnicamente son provincias)
            url += `&county=${encodeURIComponent(selectedProvince)}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        const cities = data.filter(item =>
            item.type === 'city' || item.class === 'boundary' || item.class === 'place'
        );

        return Array.from(new Set(cities.map(item => item.name)));
    } catch (error) {
        console.error("Error fetching city data:", error);
        return [];
    }
};

export const fetchProvinces = async (input) => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${input}&format=json&limit=5`
        );
        const data = await response.json();
        return Array.from(new Set(data.map((item) => item.name)));
    } catch (error) {
        console.error("Error fetching province data:", error);
        return [];
    }
};