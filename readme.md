![Built with JavaScript](https://img.shields.io/badge/Built%20with-JavaScript-red?style=for-the-badge&logo=javascript)

<!-- [![Thesharsol notifyer](https://img.shields.io/badge/vaui-notif--js-1.0.0-brightgreen.svg)](https://www.npmjs.com/package/vaui-notif) -->
![MIT License](https://img.shields.io/npm/l/toastify-js)

Thesharsol notifyer is a lightweight, vanilla JS toast notification library.


### Installation

```
npm i theshtify
```

## Demo

[Click here](https://apvarun.github.io/toastify-js/)

## Features

* Easy use
* Multiple stacked notifications
* Customizable
* No blocking of execution thread

## Customization options

* Notification Text
* Duration
* Background color
* Close icon display
* Display position
* Offset position
* font
* progress
* border radius
* borders

## example
```js
Notif.Notifier.notify(
    {
        message: 'text',
        x_align:'middle',
        y_align:'top',
        type:'custom',
        colors:{
            bg:'yellow',
            color:'black',
            border:2
        },
        radius:5,
        bordered:false,

    }
);
```