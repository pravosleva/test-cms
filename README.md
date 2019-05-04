# TEST CMS

## Stack
- Strapi 3.0.0-alpha.26.1
- SQLite
- React 16.8.6 by `create-react-app` _(ejected)_

## Install & build & start
```
$ yarn add global strapi@alpha
$ cd frontend && yarn install && yarn build
$ cd ../backend && yarn install
$ strapi start
```

Will be started on [localhost:1337](http://localhost:1337/).

## TODO
- [x] redux / redux-thunk
- [ ] socket.io for content updating
- [ ] Relations: employee / boss | Ability to select the boss for the employee (for the **boss** role only?)
- [x] Login form for _withAuth HOC_ | Will be set to cookie as `jwt`

Will be built to `/backend/public/` as distr folder.
