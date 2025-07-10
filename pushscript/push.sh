cd ..
mkdir temp
GITHUB_URL=https://oauth:${PushKey}@github.com/OrbiterStellarTrek/OrbiterStellarTrek.github.io
git clone ${GITHUB_URL} temp

rm -rf temp/*
mv /home/runner/work/NapcatAdapterDocs/NapcatAdapterDocs/.vitepress/dist/* temp

cd ./temp

git config --global init.defaultBranch main
git remote add origin ${GITHUB_URL}
git branch -M main

git config --global user.name "Page Build"
git config --global user.email "pimeng7143@gmail.com"
git add *
git commit -m "docs: 构建更新"
git push -f