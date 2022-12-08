# GitHub Actions

## Adding required secrets
Add the following secrets to your GitHub project or organization:

| Secret | Value |
| --- | --- |
| `${DELIVERY_AWS_REGION}` | see [AWS S3](/configuration/storage/aws-s3) |
| `${DELIVERY_AWS_ACCESS_KEY}` | see [AWS S3](/configuration/storage/aws-s3) |
| `${DELIVERY_AWS_SECRET_ACCESS_KEY}` | see [AWS S3](/configuration/storage/aws-s3) |
| `${DELIVERY_AWS_S3_BUCKET}` | see [AWS S3](/configuration/storage/aws-s3) |
| `${DELIVERY_WORDPRESS_DEPLOYER_USERNAME}` | see [Deployment user](create-deployment-user)|
| `${DELIVERY_WORDPRESS_DEPLOYER_APPLICATION_PASSWORD}` | see [Deployment user](create-deployment-user) |
| `${DELIVERY_WORDPRESS_PLUGIN_ENDPOINT}` | Set it to `https://${YOUR_DOMAIN_TLD}/wp-json/continuous-delivery/v1`
| `${DELIVERY_WORDPRESS_PRODUCT_ID}` |[Easy Digital Downloads](/configuration/wordpress/easy-digital-downloads) or [Download Monitor](/configuration/wordpress/download-monitor)|

:::tip
If you need to update multiple private GitHub projects at once and you are on a free GitHub plan, you can use `gh` to update multiple projects at once.

Create a new file `secrets.env` and update each property value:

```env
DELIVERY_AWS_S3_BUCKET=
DELIVERY_AWS_REGION=
DELIVERY_AWS_ACCESS_KEY=
DELIVERY_AWS_SECRET_ACCESS_KEY=
DELIVERY_WORDPRESS_DEPLOYER_USERNAME=
DELIVERY_WORDPRESS_DEPLOYER_APPLICATION_PASSWORD=
DELIVERY_WORDPRESS_PLUGIN_ENDPOINT=https://${YOUR_DOMAIN_TLD}/wp-json/continuous-delivery/v1
```

Create a new file `update-secrets.sh`:

```bash
#!/usr/bin/env bash
organization="your-organization"
repositories="repo-1 repo-2 repo-3"

for repository in $repositories; do
        use_repository=$organization/$repository
        gh secret set -f secrets.env -R $use_repository
done
```

Update the secrets in each of the repositories:

```bash
chmod +x update-secrets.sh
./update-secrets.sh
```

After that, add the `DELIVERY_WORDPRESS_PRODUCT_ID` secret for each repository manually.
:::

## Add new delivery step for GitHub Actions
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
          aws-access-key-id: ${{ secrets.DELIVERY_AWS_ACCESS_KEY}}
          aws-secret-access-key: ${{ secrets.DELIVERY_AWS_SECRET_ACCESS_KEY}}
          aws-bucket: ${{ secrets.DELIVERY_AWS_S3_BUCKET }}
          aws-region: ${{ secrets.DELIVERY_AWS_REGION }}
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
          --user "${{ secrets.DELIVERY_WORDPRESS_DEPLOYER_USERNAME }}:${{ secrets.DELIVERY_WORDPRESS_DEPLOYER_APPLICATION_PASSWORD }}" \
          -d '{
              "artifact_url": "${{ env.ARTIFACT_URL }}",
              "signatures": { "sha256": "some-custom-sha" },
              "release": { "version": "${{ env.YOUR_RELEASE_VERSION}}"},
              "meta": {
                "readme": "This is a meta field"
              }
            }' \
          "${{ env.DELIVERY_WORDPRESS_PLUGIN_ENDPOINT}}/products/${{ env.DELIVERY_WORDPRESS_PRODUCT_ID }}/release")
          
          echo "Response: $response"
        env:
          ARTIFACT_URL: ${{ steps.upload.outputs.file-url }}
          YOUR_RELEASE_VERSION: 1.0.0
```

:::tip
Look into the [API](/api) definition if you want to publish more release information.
:::tip

