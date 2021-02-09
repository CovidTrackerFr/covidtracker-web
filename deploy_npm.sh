#!/bin/bash

VENDOR_DIR=assets/vendor/

mkdir -p $VENDOR_DIR
cp node_modules/jquery/dist/jquery.min.js $VENDOR_DIR
cp node_modules/popper.js/dist/umd/popper.min.js $VENDOR_DIR
cp node_modules/bootstrap/dist/js/bootstrap.bundle.min.js $VENDOR_DIR
cp node_modules/jquery.easing/jquery.easing.min.js $VENDOR_DIR
cp node_modules/chart.js/dist/Chart.bundle.js $VENDOR_DIR
cp node_modules/select2/dist/js/select2.min.js $VENDOR_DIR
cp node_modules/startbootstrap-sb-admin-2/js/sb-admin-2.min.js $VENDOR_DIR
cp node_modules/raphael/raphael.min.js $VENDOR_DIR
cp node_modules/justgage/dist/justgage.min.js $VENDOR_DIR


mkdir -p $VENDOR_DIR"fontawesome"
mkdir -p $VENDOR_DIR"webfonts"
cp node_modules/@fortawesome/fontawesome-free/css/all.min.css $VENDOR_DIR"fontawesome/all.min.css"
cp node_modules/@fortawesome/fontawesome-free/webfonts/* $VENDOR_DIR"webfonts/"
