#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Function to update and upgrade the system
system_update_upgrade() {
    echo "Updating and upgrading the system..."
    sudo apt update && sudo apt upgrade -y
}

# Function to install build-essential and other dependencies
install_dependencies() {
    echo "Installing build-essential and other dependencies..."
    sudo apt install build-essential curl -y
}

# Function to install Rust using rustup
install_rust() {
    echo "Installing Rust..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
}

# Function to source the Rust environment
source_rust_env() {
    echo "Sourcing Rust environment..."
    . "$HOME/.cargo/env"
}

# Function to add the wasm32-wasi target
add_wasi_target() {
    echo "Adding wasm32-wasi target..."
    rustup target add wasm32-wasi
}

# Function to add the wasm32-wasip1 target
add_wasip1_target() {
    echo "Adding wasm32-wasip1 target..."
    rustup target add wasm32-wasip1
}

# Function to verify the installation
verify_installation() {
    echo "Verifying Rust installation..."
    rustc --version
    rustup target list --installed
}

# Start by updating and upgrading the system
system_update_upgrade

# Install necessary dependencies
install_dependencies

# Check if rustc is already installed
if ! command -v rustc &> /dev/null
then
    install_rust
    source_rust_env
else
    echo "Rust is already installed."
    source_rust_env
fi

# Add wasm32-wasi target
add_wasi_target

# Add wasm32-wasip1 target
add_wasip1_target

# Verify installation
verify_installation

echo "Rust environment setup complete."
