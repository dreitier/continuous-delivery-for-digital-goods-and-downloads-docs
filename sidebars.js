/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
		'intro',
		'concept',
		'quick-start',
		{
			type: 'category',
			label: 'Configuration',
			items: [
				'configuration/storage/aws-s3',
				{
					type: 'category',
					label: 'WordPress',
					items: [
						'configuration/wordpress/easy-digital-downloads',
						'configuration/wordpress/download-monitor'
					]
				},
				{
					type: 'category',
					label: 'Continuous Integration',
					link: {
						type: 'doc',
						id: 'configuration/continuous-integration/create-deployment-user',
					},
					items: [
						'configuration/continuous-integration/github-actions'
					]
				}
			],
		},
		'faq',
		'api',
	],
};

module.exports = sidebars;
