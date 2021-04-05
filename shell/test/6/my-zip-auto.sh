# 这里用了相对路径 。。
# 用绝对路径好点

# 怎么用pwd进行路径拼接呢

PATH1=./test/test1
PATH2=../test2

cd $PATH1
# awk -F . 指定输入文件分隔符
for i in `find . -name "*.zip"|awk -F . '{print $2}' `
do
  sudo unzip -o .$i.zip -d $PATH2
done