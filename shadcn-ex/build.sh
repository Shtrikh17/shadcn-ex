#!/bin/bash
tsc
cp src/components.json dist/

FILES_TO_COPY=(
  "Select/SimpleSelect/SimpleSelect.tsx"
)
SOURCE_DIR="../shadcn-ex-templates/src"
DEST_DIR="./dist"

for file in "${FILES_TO_COPY[@]}"; do
  # Check if the file exists in the source directory
  if [ -f "$SOURCE_DIR/$file" ]; then
    mkdir -p "$DEST_DIR/$(dirname "$file")"
    cp "$SOURCE_DIR/$file" "$DEST_DIR/$file"
  else
    echo "Warning: File not found: $SOURCE_DIR/$file"
  fi
done