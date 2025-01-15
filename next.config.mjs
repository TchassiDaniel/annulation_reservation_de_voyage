/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['bougna.net', 'st.depositphotos.com', 'c.wallhere.com','media.istockphoto.com'],
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
};
export default nextConfig;
