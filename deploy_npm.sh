#!/bin/bash

VENDOR_DIR=assets/vendor/

mkdir -p $VENDOR_DIR
cp node_modules/jquery/dist/jquery.min.js $VENDOR_DIR
cp node_modules/popper.js/dist/umd/popper.min.js $VENDOR_DIR
cp node_modules/bootstrap/dist/js/bootstrap.min.js $VENDOR_DIR
cp node_modules/chart.js/dist/Chart.bundle.js $VENDOR_DIR
