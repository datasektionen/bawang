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
        "traefik.enable=true",
        "traefik.http.routers.bawang.rule=Host(`datasektionen.se`)||Host(`www.datasektionen.se`)",
        "traefik.http.routers.bawang.tls.certresolver=default",
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
TAITAN_URL=http://taitan.nomad.dsekt.internal
RAZZLE_TAITAN_URL=https://taitan.datasektionen.se

CALYPSO_URL=http://calypso.nomad.dsekt.internal/api
RAZZLE_CALYPSO_URL=https://calypso.datasektionen.se/api

SLUTA_FIPPLA_MED_MINA_ENV_VARIABLER_RAZZLE__PORT={{ env "NOMAD_PORT_http" }}
ENV
        destination = "local/.env"
        env         = true
      }

      resources {
        memory = 128
      }
    }
  }
}

variable "image_tag" {
  type = string
  default = "ghcr.io/datasektionen/bawang:latest"
}
