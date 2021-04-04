#!/bin/bash

if [ $# -le 0 ]
  then
  echo "err!: Not enough parameters"
  exit 124
  fi
sum=0
while [ $# -gt 0 ]
  do
  sum=`expr $sum + $1`
  shift
  done
echo $sum

