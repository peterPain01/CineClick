const axios = require('axios');

module.exports = {
    async shortenLink(originalUrl, accessToken) {
        const apiUrl = 'https://api-ssl.bitly.com/v4/shorten';
    
        try {
            const response = await axios.post(apiUrl, {
                long_url: originalUrl,
                domain: 'bit.ly', // Optional: Specify the domain
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
    
            return response.data.id;
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Bitly API error:', error.response.data);
            } else {
                console.error('Error making Bitly API request:', error.message);
            }
            throw error;
        }
    }
    
}