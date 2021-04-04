#! /bin/sh

while true
do
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
continue
echo "your selection is Copy";;
D) echo "your selection is Delete";;
B) echo "your selection is Backup";;
Q) echo "Quit..." break;;
*) echo "invalided selection";;
esac
done

