# API
The plug-in's API endpoint is published at `/wp-json/continuous-delivery/v1`.

## Authentication and Authorization
The plug-in uses WordPress' natives method for authentication and authorization.
Read
- [Create a deployment user](/configuration/continuous-integration/create-deployment-user)
- [http://v2.wp-api.org/guide/authentication/](http://v2.wp-api.org/guide/authentication/)

## Methods
### POST `/v1/products/:product_id/release`

### Fields
| Field | Type | Required | Description |
| --- | --- | --- | --- 
| `artifact_url` | `string` | __Yes__ | URL to your previously uploaded file in S3 |
| `size` | `int` | No | File size as the plug-in does not resolve the file's size |
| `directory` | `string` | No | A path to the file |
| `mime_type` | `string` | No | MIME type |
| `architecture` | `string` | No | Architecture |
| `os` | `string` | No | Operating System |
| `release` | `object` | __Yes__ | Release information |
| `release.version` | `string` | __Yes__ | Version |
| `release.date` | `string` | No | Release date |
| `release.train` | `string` | No | Release train |
| `release.is_security_related` | `bool` | No | Flag, that the release has been created due to security issues |
| `release.has_breaking_changes` | `bool` | No | Flag, that the release has breaking changes |
| `release.title` | `object:content` | No | Title |
| `release.description` | `object:content` | No | Description |
| `release.changelog` | `object:content` | No | Changelog |
| `build` | `object` | No | Build information |
| `build.date` | `string` | No | Date of build |
| `build.number` | `string` | No | Build number |
| `scm` | `object` | No | Build information |
| `scm.revision` | `string` | No | Revision, e.g. Git commit hash |
| `scm.tag` | `string` | No | Tag |
| `signatures` | `map<string:algorithm,string:hash>` | No | Mapping of file hashes. For Easy Digital Downloads, `crc32, sha1, sha256, md5` will be mapped. |
| `meta` | `map<any:any>` | No | Anything you want to additionally map |

#### `object:content`
| Field | Type | Required | Description |
| --- | --- | --- | --- 
| `type` | `enum { text, html, markdown }` | No | Type of confent |
| `trans` | `map<string:language_key,string:content>` | No | Mapping of language key to content |

#### Sample
```json
{
	"artifact_url": "s3|https|http://...",
	"size": 555,
	"filename": "custom_filename.zip",
	"release": {
		"version": "1.0.0"
	}
}
```