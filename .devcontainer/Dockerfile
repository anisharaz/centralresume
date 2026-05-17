FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bullseye

# Create the workspace directory and set permissions
RUN mkdir -p /workspace && chown -R node:node /workspace

# Set up git config
RUN git config --system core.editor "code --wait" \
    && git config --system core.autocrlf input

# Switch to non-root user
USER node

WORKDIR /workspace