#   Script to push changes on git configuration/steup
#   @author Ritosh Yadav
#   @since 01 Jan @2019

#clear Screen
clear

#check status of files
git status

#add files to commit
git add .
echo 'Files added  !!!!!'

#commit files with message
read -p "Enter commit message :" message

git commit -m "$message"

echo 'Files commited successfully'
read -p "Enter Branch name : " branch_name

git push origin "$branch_name"


