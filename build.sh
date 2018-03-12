#!/bin/bash
set -x #echo on

echo "Installing packages"
npm install
echo "Building package"
node_modules/@angular/cli/bin/ng build --aot --dev