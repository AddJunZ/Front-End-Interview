#!/bin/bash

read -p "Please Enter a number:" Line
for ((i=1; i<=Line; i++))
do
  for((j=Line-i; j>0; j--))
  do
    echo -n " "
  done
  for ((h=1; h<=((2*i-1)); h++))
  do
  echo -n "*"
  done
  echo
done
