FROM ubuntu:22.04

#variables de entorno ENV se queda pos construccion
ENV DEBIAN_FRONTEND=noninteractive
ARG GODOT_VER=3.5.3-stable

RUN apt-get update && apt-get install -y --no-install-recommends \
        wget unzip git ca-certificates libx11-6 libxcursor1 libxi6 libxinerama1 \
        libxrandr2 libgl1 libasound2 libpulse0 libfontconfig1 \
    && rm -rf /var/lib/apt/lists/*

#quedarte con el binario
RUN wget -q https://github.com/godotengine/godot/releases/download/${GODOT_VER}/Godot_v${GODOT_VER}_linux_headless.64.zip \
 && unzip Godot_v${GODOT_VER}_linux_headless.64.zip \
 && mv Godot_v${GODOT_VER}_linux_headless.64 /usr/local/bin/godot \
 && chmod +x /usr/local/bin/godot \
 && rm Godot_v${GODOT_VER}_linux_headless.64.zip


RUN git clone --depth 1 --branch 3.5-9e68af3 \
      https://github.com/godotengine/godot-demo-projects.git /demo

WORKDIR /demo/networking/websocket_multiplayer

CMD ["godot", "--no-window", "--path", "/demo/networking/websocket_multiplayer"]
