# Main blog set

## Development

### prepare

```shell
npm install
npm install -g hexo
```

### new post and page

- hexo new [layout] <title>
  - layout = post page draft
  - you can define your own layout template, and then cmd like: hexo new photo "My Gallery Photo"

### generate and deploy

- generate to static file `hexo g`
- start a local server to preview `hexo s`
- deploy to online `hexo g && hexo d`

## Deploy Design

1. local push -> github -> pulled by cvm;
2. cvm github config github hooks (auto build and copy dist to www file);
3. cvm config nginx, special domain to www directory.
4. so it work;

## Problems

1. When `hexo g && hexo d`, error occurred like following:

```javascript
fatal: in unpopulated submodule 'hexo-cactus-website/.deploy_git'
FATAL {
  err: Error: Spawn failed
      at ChildProcess.<anonymous> (/Users/alucard/Code/Alucard/xlog/hexo-cactus-website/node_modules/hexo-util/lib/spawn.js:51:21)
      at ChildProcess.emit (node:events:513:28)
      at Process.ChildProcess._handle.onexit (node:internal/child_process:293:12) {
    code: 128
  }
} Something's wrong. Maybe you can find the solution here: %s https://hexo.io/docs/troubleshooting.html
```

The solution is

```shell
# install deps
npm i hexo-deployer-git -S

# reCreate .deploy_git directory
rm -rf .deploy_git
hexo g
hexo d # then enter cvm root pwd

```
