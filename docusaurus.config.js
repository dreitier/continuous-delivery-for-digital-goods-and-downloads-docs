// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Continuous Delivery for Digital Goods and Downloads',
  tagline: 'Expanding your WordPress download portal to a fully-fledged Continuous Delivery pipeline',
  url: 'https://wordpress.org/plug-ins/continuous-delivery',
  baseUrl: '/continuous-delivery-for-digital-goods-and-downloads-docs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'dreitier', // Usually your GitHub org/user name.
  projectName: 'continuous-delivery-for-digital-goods-and-downloads', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/dreitier/continuous-delivery-for-digital-goods-and-downloads-docs/tree/main/docs/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
		sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Continuous Delivery for Digital Goods and Downloads',
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://github.com/dreitier/continuous-delivery-for-digital-goods-and-downloads',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://dreitier.com',
            label: 'dreitier',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
        ],
        copyright: `Sharing experience.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
	  metadata: [
	    {name: 'google-site-verification', content: 'iff1yw0ykLoAP7Z_BKK-S4XDRckQps3kLvK0byz-5WE'},
	    {name: 'msvalidate.01', content: 'FF94065F279E18FFAB402CDF11131567'},
	  ],
    }),
};

module.exports = config;
