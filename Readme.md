# ![](https://raw.githubusercontent.com/jalmx/dashboard-iot/master/src/assets/favicon/android-icon-72x72.png) Dashboard Iot Manager

## [Go to Dashboard with SSL - Host 1](https://xizuth-iot.web.app/)

## [Go to Dashboard with SSL - Host 2](https://www.alejandro-leyva.com/dashboard-iot/)

## [Go to Dashboard without SSL - Host 2](http://www.alejandro-leyva.com/dashboard-iot/)

## Install

``` bash
npm install # install dependencies
```

**then**

``` bash
npx gulp build
```

## Develop


``` bash
npm install  # install dependencies
```

**then**

``` bash
npx gulp 
```


This gonna build all project and launch Browser

## Screenshot

![](https://raw.githubusercontent.com/jalmx/dashboard-iot/master/imgs/screencapture-1.png)

![](https://raw.githubusercontent.com/jalmx/dashboard-iot/master/imgs/screencapture-2.png)

![](https://raw.githubusercontent.com/jalmx/dashboard-iot/master/imgs/screencapture-3.png)


## Solutions 

if launch a Error in `Linux` like
`System limit for number of file watchers reached, watch 'src' `

solution for linux:

```bash
sudo sysctl -w fs.inotify.max_user_watches=100000
```

in the file `/etc/sys.conf` put:

`fs.inotify.max_user_watches = 100000`

or create `/etc/sysctl.d/10-user-watches.conf` with 

`fs.inotify.max_user_watches = 100000`