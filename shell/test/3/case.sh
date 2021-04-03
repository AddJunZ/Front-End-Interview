#! /bin/bash

echo "**************"
echo "Please select your operations:"
echo " 1 Copy"
echo " 2 Delete"
echo " 3 Backup"
echo " 4 Quit"
echo "**************"

read op
case $op in
C)
echo "your selection is Copy"
;;
D) echo "your selection is Delete"
;;
# 还是喜欢用B)这种形式的
B) echo "your selection is Backup";;
Q) echo "Quit";;
*) echo "invalided selection";;
esac
