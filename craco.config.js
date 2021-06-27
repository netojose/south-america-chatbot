const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  babel: {
    plugins: isProd ? [['react-remove-properties', { properties: ['data-testid'] }]] : [],
  },
};
