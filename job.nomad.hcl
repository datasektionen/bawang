job "bawang" {
  type = "service"

  group "bawang" {
    network {
      port "http" { }
    }

    service {
      name     = "bawang"
      port     = "http"
      provider = "nomad"
      tags = [
        "traefik-external.enable=true",
        "traefik-external.http.routers.bawang.rule=Host(`datasektionen.se`)||Host(`www.datasektionen.se`)",
        "traefik-external.http.routers.bawang.entrypoints=websecure",
        "traefik-external.http.routers.bawang.tls.certresolver=default",
      ]
    }

    task "bawang" {
      driver = "docker"

      config {
        image = var.image_tag
        ports = ["http"]
      }

      template {
        data        = <<ENV
TAITAN_URL=https://taitan.betasektionen.se
PORT={{ env "NOMAD_PORT_http" }}
ENV
        destination = "local/.env"
        env         = true
      }
    }
  }
}

variable "image_tag" {
  type = string
  default = "ghcr.io/datasektionen/bawang:latest"
}
