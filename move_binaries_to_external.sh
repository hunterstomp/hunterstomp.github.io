#!/bin/bash

# Find and handle large binary files
find . \
  \( -name "*.zip" -o -name "*.mp4" -o -name "*.mov" -o -name "*.avi" -o -name "*.tar" -o -name "*.rar" -o -name "*.7z" \) \
  ! -path "./node_modules/*" ! -path "./.git/*" | while read file; do
  echo "REMINDER: Move $file to external storage."
  echo -e "# Moved to external storage\nThis asset was moved to [PASTE LINK HERE]" > "$file.link.txt"
  git rm --cached "$file"
  echo "Added stub for $file"
done