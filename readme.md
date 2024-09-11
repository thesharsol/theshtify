![Built with JavaScript](https://img.shields.io/badge/Built%20with-JavaScript-red?style=for-the-badge&logo=javascript)

<!-- [![Thesharsol notifyer](https://img.shields.io/badge/vaui-notif--js-1.0.0-brightgreen.svg)](https://www.npmjs.com/package/vaui-notif) -->
![MIT License](https://img.shields.io/npm/l/toastify-js)

Thesharsol notifyer is a lightweight, vanilla JS toast notification library.it is completely customisable, allowing you to adapt the graphics window perfectly to the design of your project


### Installation

```
npm i theshtify
```
### CDN

``` javascript
<script src="https://cdn.jsdelivr.net/npm/theshtify/lib/theshtifyCDN.js"> </script>
```

### ES6

``` javascript
import { theshtify } from "theshtify/lib/theshtify";
import "theshtify/css/theshtify.css";
```

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
    theshtify(
        {
            message: 'welcome to theshtify',
            x_align: 'middle',
            y_align: 'middle',
            type: 'danger',
            duration: 6000,
            font: {
                size: 14,
                weigth: 900,
                family: 'corbel'
            },
            duration:300,
            colors: {
                bg: '#efefef',
                color: 'black',
                border: {
                    type: 'solid',
                    color: 'gray'
                },
                progress: {
                    bg: 'gray'
                }
            },
            radius: 2,
            bordered: true,
            // closer: true,
            progress_height: 2,
            progress: true

        }
    );

```
