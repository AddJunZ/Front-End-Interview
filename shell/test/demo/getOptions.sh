#!/bin/bash
while getopts "d:t:" opt; do
  case $opt in
    d ) DD="$OPTARG" ;;
    t ) TD="$OPTARG" ;;
  esac
done
echo "$DD$TD" #,.