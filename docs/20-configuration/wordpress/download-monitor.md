# Download Monitor

For using [Download Monitor](https://wordpress.org/plugins/download-monitor/), in WordPress go to __Downloads > `${YOUR_DOWNLOAD}` > Edit Download__. Note down the download's ID (`${WORDPRESS_PRODUCT_ID}`) in the right box and select the option __Redirect to file__.

![download-monitor.png](download-monitor.png)

Click on __Update__.

:::caution
If you click on a download link and DLM opens a window without anything happening, check that your website is using HTTPS. Our plug-in uses HTTPS URLs for the S3 redirects.  When using __HTTP__ and having a *Same-Origin Policy* enabled, the download will fail.

Either switch to HTTPS or disable the SOP for your development environment.
:::caution