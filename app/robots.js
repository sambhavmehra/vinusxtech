export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/s-admin/', '/api/'],
        },
        sitemap: 'https://www.vinusxtech.me/sitemap.xml',
        host: 'https://www.vinusxtech.me',
    };
}
