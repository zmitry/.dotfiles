#!/bin/bash

# Ask for confirmation before proceeding
read -p "This script will install Brewfiles one by one. Do you want to continue? (y/n) " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  # Install Brewfile_Base
  echo "Installing Brewfile_Base..."
  brew bundle --file Brewfile_Base

  # Install Brewfile_Apps
  echo "Installing Brewfile_Apps..."
  brew bundle --file Brewfile_Apps

  # Install Brewfile_Casks
  echo "Installing Brewfile_Casks..."
  brew bundle --file Brewfile_Casks

  # Install Brewfile_VSCode
  echo "Installing Brewfile_VSCode..."
  brew bundle --file Brewfile_VSCode

  echo "All Brewfiles installed!"
else
    echo "Installation cancelled."
fi
