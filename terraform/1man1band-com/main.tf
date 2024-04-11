# variable "github_token" {}
# variable "github_user" {}
#
# provider "github" {
#   owner = var.github_user
#   token = var.github_token
# }
#
# resource "github_repository" "digital-harbor-josh" {
#   name        = "digital-harbor-josh"
#   description = "Josh's digital harbor"
#
#   visibility = "public"
#
#   # pages {
#   #   build_type = "workflow"
#   #   cname      = "1man1band.com"
#   # }
# }

provider "namecheap" {
  user_name = var.username
  api_user  = var.username
  api_key   = var.api_key
}

resource "namecheap_domain_records" "_1man1band-com" {
  domain     = "1man1band.com"
  email_type = "NONE"

  # GH Pages servers
  dynamic "record" {
    for_each = ["185.199.108.153", "185.199.109.153", "185.199.110.153", "185.199.111.153"]

    content {
      hostname = "@"
      type     = "A"
      address  = record.value
    }
  }

  record {
    hostname = "www"
    type     = "CNAME"
    address  = "pypeaday.github.io"
  }
}

