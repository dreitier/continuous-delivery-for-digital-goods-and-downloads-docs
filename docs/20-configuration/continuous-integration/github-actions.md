# GitHub Actions

Add the following secrets to your GitHub project or organization:

| Secret | Value |
| --- | --- |
| `${BUCKET}` | see [AWS S3](/configuration/storage/aws-s3) |
| `${AWS_REGION}` | see [AWS S3](/configuration/storage/aws-s3) |
| `${AWS_CI_ACCESS_KEY}` | see [AWS S3](/configuration/storage/aws-s3) |
| `${AWS_CI_SECRET_ACCESS_KEY}` | see [AWS S3](/configuration/storage/aws-s3) |
| `${WORDPRESS_DEPLOYER_USERNAME}` | see [Deployment user](create-deployment-user)|
| `${WORDPRESS_DEPLOYER_APPLICATION_PASSWORD}` | see [Deployment user](create-deployment-user) |
| `${WORDPRESS_PLUGIN_ENDPOINT}` | Set it to `https://${YOUR_DOMAIN_TLD}/wp-json/continuous-delivery/v1`
| `${WORDPRESS_PRODUCT_ID}` |[Easy Digital Downloads](/configuration/wordpress/easy-digital-downloads) or [Download Monitor](/configuration/wordpress/download-monitor)|

In your GitHub Actions YAML file, use the following steps to upload and publish artifacts:

```yaml
jobs:
  upload:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - name: upload
        uses: hkusu/s3-upload-action@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_CI_ACCESS_KEY}}
          aws-secret-access-key: ${{ secrets.AWS_CI_SECRET_ACCESS_KEY}}
          aws-bucket: ${{ secrets.BUCKET }}
          aws-region: ${{ secrets.AWS_REGION }}
          file-path: ./your-file-to-upload.zip
          destination-dir: /some-dir
          output-file-url: 'true'

      - name: Show uploaded file path
        id: debug
        run: | 
          echo '${{ steps.upload.outputs.file-url }}'
          echo '${{ steps.upload.outputs.result }}'

      - name: Release in WordPress
        id: release
        run: |
          response=$(curl --insecure -XPOST -i \
          -H 'Accept: application/json' \
          -H 'Content-Type: application/json' \
          --user "${{ secrets.WORDPRESS_DEPLOYER_USERNAME }}:${{ secrets.WORDPRESS_DEPLOYER_APPLICATION_PASSWORD}}" \
          -d '{
              "artifact_url": "${{ env.ARTIFACT_URL }}",
              "signatures": { "sha256": "some-custom-sha" },
              "release": { "version": "${{ env.YOUR_RELEASE_VERSION}}"},
              "meta": {
                "readme": "This is a meta field"
              }
            }' \
          "${{ env.WORDPRESS_PLUGIN_ENDPOINT}}/products/${{ env.WORDPRESS_PRODUCT_ID }}/release")
          
          echo "Response: $response"
        env:
          ARTIFACT_URL: ${{ steps.upload.outputs.file-url }}
          YOUR_RELEASE_VERSION: 1.0.0
```

:::tip
Look into the [API](/api) definition if you want to publish more release information.
:::tip

