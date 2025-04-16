FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# dependencias necesarias
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    libfontconfig1 \
 && rm -rf /var/lib/apt/lists/*

# hacerlo ejecutable y descargar godot
RUN wget https://github.com/godotengine/godot/releases/download/4.4-stable/Godot_v4.4-stable_linux.x86_64.zip -O /tmp/godot.zip \
 && unzip /tmp/godot.zip -d /tmp \
 && mv /tmp/Godot_v4.4-stable_linux.x86_64 /godot \
 && chmod +x /godot \
 && rm /tmp/godot.zip

CMD ["/godot", "--headless"]
