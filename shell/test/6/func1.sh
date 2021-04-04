#!/bin/bash

abc=123
echo $abc
function example ()
{
  abc=456
}
# 调用函数
example
echo $abc