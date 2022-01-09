# SimpleCrm

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.1.

## Note:

Because of object-oriented programming, every user is converted into a model.

## Experiences that are getted from this project:

### git reset --hard d01fbe83f8d189de4a757f46364860cb3bc2b0c5

Because firebase was installed with error (see the commit <a href="https://github.com/daotunglam/simple-crm/commit/52a5084dd0199b6365b758141f9d3d299f1a35b3">52a5084</a>), I had to delete all the firebase-relationships in my project, in order to config them again.

Thank God the old commit is on github. I found the command to clone it back into the local:

<code>git reset --hard d01fbe83f8d189de4a757f46364860cb3bc2b0c5</code>

### resolving the git merge

After reset the entire code like the old commit, <code>git push</code> return the requests 

<code>git pull</code> and merge.

In order to choose all current changes from local, I have to give this command:

<code>git checkout --ours .</code>

before git-push all again.

## The questions I still have:

0.