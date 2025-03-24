#!/bin/bash

# Function to convert a file from JS to TSX
convert_to_tsx() {
    local file=$1
    local dir=$(dirname "$file")
    local filename=$(basename "$file")
    local name="${filename%.*}"
    local new_file="$dir/$name.tsx"
    
    # Skip if the TypeScript file already exists
    if [ -f "$new_file" ]; then
        echo "Skipping $file - TypeScript version already exists"
        return
    fi
    
    # Convert the file
    mv "$file" "$new_file"
    echo "Converted $file to $new_file"
}

# Find all JavaScript files in src directory
find src -type f -name "*.js" | while read -r file; do
    # Skip test files for now
    if [[ $file == *".test.js" ]]; then
        continue
    fi
    
    convert_to_tsx "$file"
done

# Convert test files
find src -type f -name "*.test.js" | while read -r file; do
    local dir=$(dirname "$file")
    local filename=$(basename "$file")
    local name="${filename%.*}"
    local new_file="$dir/$name.tsx"
    
    mv "$file" "$new_file"
    echo "Converted test file $file to $new_file"
done

echo "Migration complete!" 