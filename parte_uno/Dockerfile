# Use 22.04 (LTS) instead of 24.04 to avoid Rosetta issues
FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

# Install required dependencies for Godot
RUN apt-get update && apt-get install -y \
    wget \
    unzip \
    libfontconfig1 \
 && rm -rf /var/lib/apt/lists/*

# Download Godot 4.4 stable, unzip, make it executable, and clean up
RUN wget https://github.com/godotengine/godot/releases/download/4.4-stable/Godot_v4.4-stable_linux.x86_64.zip -O /tmp/godot.zip \
 && unzip /tmp/godot.zip -d /tmp \
 && mv /tmp/Godot_v4.4-stable_linux.x86_64 /godot \
 && chmod +x /godot \
 && rm /tmp/godot.zip

# Default command: run Godot headless (no window)
CMD ["/godot", "--headless"]
