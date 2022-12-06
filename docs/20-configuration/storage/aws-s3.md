# AWS S3

To keep your delivery pipeline secured, we are setting up dedicated permissions for CI (write-only) and CD (read-only).

1. Create a new bucket (`${BUCKET}`) in AWS (__Amazon S3 > Buckets > Create Bucket). Note down the region (`${AWS_REGION}`).

![aws-create-s3-bucket.png](aws-create-s3-bucket.png)

2. Create a new IAM policy write-only access (`${IAM_POLICY_WRITE_ONLY}`):
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject"
            ],
            "Resource": [
                "arn:aws:s3:::${BUCKET}/*"
            ]
        }
    ]
}
```

3. Create a new IAM policy with read-only access (`${IAM_POLICY_READ_ONLY}`):
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::${BUCKET}/*"
            ]
        }
    ]
}
```

3. Create a new user `${AWS_CI_USER_WRITE_ONLY}` with programmatic access and attach the `${IAM_POLICY_WRITE_ONLY}` policy to it. Note down the __Access Key__ (`${AWS_CI_ACCESS_KEY}`) and __Secret Access Key__ (`${AWS_CI_SECRET_ACCESS_KEY}`). This user is used in Jenkins/GitHub Actions to push new artifacts to AWS S3.
4. Create a new user `${AWS_WORDPRESS_USER_READ_ONLY}` with programmatic access and attach the `${IAM_POLICY_READ_ONLY}` policy to it. Note down the __Access Key__  (`${AWS_WORDPRESS_ACCESS_KEY}`) and __Secret Access Key__(`${AWS_WORDPRESS_SECRET_ACCESS_KEY}`). This user is used in WordPress to generate one-time links and let customers download artifacts.