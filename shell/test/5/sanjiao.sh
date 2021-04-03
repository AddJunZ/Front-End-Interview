#!/bin/bash
# 例1:
# echo "Please Enter the line number"
# read Line
# echo "Please Enter the char number"
# read Char
# # echo $Char 不行 不能直接执行echo * 只能写成echo "*"
# echo "$Line $Char"

# 例2:
read -p "Please Enter the line number: " Line
read -p "Please Enter the char number: " Char
echo "$Line $Char"
Vline=1
while ((Vline<=Line))
do
  temp=1
  while ((temp<=Vline))
  do
    # 不换行，同行输出
    echo -n "$Char"
    temp=`expr $temp + 1`
  done
  # 换行
  echo
  Vline=`expr $Vline + 1`
done

# 结果2
# Please Enter the line number: 5
# Please Enter the char number: *
# 5 *
# *
# **
# ***
# ****
# *****