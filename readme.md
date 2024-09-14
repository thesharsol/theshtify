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
<link rel="styleSheet" href="https://cdn.jsdelivr.net/npm/theshtify@1.0.1/css/theshtify.css"/>
```

### ESModule

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
* font
* progress
* border radius
* borders
  
## Presentation
The theshtify function takes as a parameter an object describing your notifications. the various options are available in the descriptions shown below.

## Options
<table style="width:100%">
<tr>
<th style="border:1px solid">option</th>
<th style="border:1px solid">Description</th>
<th style="border:1px solid">Type</th>
<th style="border:1px solid">values</th>
<th style="border:1px solid">Required</th>
</tr>
<!-- message -->
<tr>
<td style="border:1px solid">message</td>
<td style="border:1px solid">the message to display in the notification</td>
<td style="border:1px solid">String</td>
<td style="border:1px solid">true,false</td>
<td style="border:1px solid;"><span style="color:green">yes</span></td>
</tr>
<!-- type -->
<tr>
<td style="border:1px solid">type</td>
<td style="border:1px solid">the type of the notification</td>
<td style="border:1px solid">String</td>
<td style="border:1px solid">success | danger | info | warning</td>
<td style="border:1px solid;"><span style="color:green">yes</span></td>
</tr>
<!-- config -->
<tr>
<td style="border:1px solid">config</td>
<td style="border:1px solid">is an object that describe the notifications display settings</td>
<td style="border:1px solid">Object</td>
<td style="border:1px solid"></td>
<td style="border:1px solid;"><span style="color:red">no</span></td>
</tr>

</table>

## Basic example

```js
theshtify({message: 'welcome to theshtify',type:'success'});
```
## Configuration options

the configuration options allow you to fully adapt theshtify to the context of your application. the different options are described below

<table>
<!-- duration -->
<tr>
<th style="border:1px solid">Option</th>
<th style="border:1px solid">Description</th>
<th style="border:1px solid">Type</th>
<th style="border:1px solid">Values</th>
<th style="border:1px solid">Required</th>
</tr>
<tr>
<td style="border:1px solid">duration</td>
<td style="border:1px solid">how long the notice is displayed</td>
<td style="border:1px solid">Number</td>
<td style="border:1px solid">between 1000 and 5000</td>
<td style="border:1px solid;"><span style="color:red">no</span></td>
</tr>
<!-- font -->
<tr>
<td style="border:1px solid">font</td>
<td style="border:1px solid">object describing the various properties of the font: family, size and weight</td>
<td style="border:1px solid">Object</td>
<td style="border:1px solid">
{<br>
    size: 14,<br/>
    weigth: 900,<br/>
    family: 'corbel'
    <br/>
}
</td>
<td style="border:1px solid;"><span style="color:red">no</span></td>
</tr>
<!-- x_align -->
<tr>
<td style="border:1px solid">x_align</td>
<td style="border:1px solid">defines the horizontal position of the notification</td>
<td style="border:1px solid">String</td>
<td style="border:1px solid">left | right | middle</td>
<td style="border:1px solid;"><span style="color:red">no</span></td>
</tr>
<!-- y_align -->
<tr>
<td style="border:1px solid">y_align</td>
<td style="border:1px solid">defines the vertical position of the notification</td>
<td style="border:1px solid">String</td>
<td style="border:1px solid">top | bottom | middle</td>
<td style="border:1px solid;"><span style="color:red">no</span></td>
</tr>
<!-- close -->
<tr>
<td style="border:1px solid">closer</td>
<td style="border:1px solid">allows you to condition the display of the part allowing you to close the notification</td>
<td style="border:1px solid">Boolean</td>
<td style="border:1px solid">true | false</td>
<td style="border:1px solid;"><span style="color:red">no</span></td>
</tr>
<tr>
<!-- bordered -->
<td style="border:1px solid">bordered</td>
<td style="border:1px solid">specifies whether the notification will have a border</td>
<td style="border:1px solid">Boolean</td>
<td style="border:1px solid">true | false</td>
<td style="border:1px solid;"><span style="color:red">no</span></td>
</tr>
<!-- borderWidth -->
<td style="border:1px solid">border_width</td>
<td style="border:1px solid">specifies the notification border-width</td>
<td style="border:1px solid">Number</td>
<td style="border:1px solid">any number</td>
<td style="border:1px solid;"><span style="color:red">no</span></td>
</tr>
<!-- radius -->
<td style="border:1px solid">radius</td>
<td style="border:1px solid">specifies the notification border-radius</td>
<td style="border:1px solid">Number</td>
<td style="border:1px solid">any number</td>
<td style="border:1px solid;"><span style="color:red">no</span></td>
</tr>
<!-- progress -->
<td style="border:1px solid">progress</td>
<td style="border:1px solid">is used to condition the display of the progress bar representing the notification display duration.</td>
<td style="border:1px solid">Boolean</td>
<td style="border:1px solid">true | false</td>
<td style="border:1px solid;"><span style="color:red">no</span></td>
</tr>
<!-- progress_height -->
<td style="border:1px solid">progress_height</td>
<td style="border:1px solid">specifies the notification progress bar height</td>
<td style="border:1px solid">Number</td>
<td style="border:1px solid">between 1 and 5</td>
<td style="border:1px solid;"><span style="color:red">no</span></td>
</tr>
<!-- colors -->
<tr>
<td style="border:1px solid">colors</td>
<td style="border:1px solid">this property can only be used if the type is “custom” and allows you to define the colors and types of the different parts of the notification, such as: background color, text color, borders and progress bar.</td>
<td style="border:1px solid">Object</td>
<td style="border:1px solid">
{</br>
    bg: '#efefef',</br>
    color: 'black',</br>
    border: {</br>
        type: 'solid',</br>
        color: 'gray'</br>
    },</br>
    progress: {</br>
        bg: 'gray'</br>
    }</br>
}
</td>
<td style="border:1px solid;"><span style="color:red">no</span></td>
</tr>
<!-- custom_colors -->
<tr>
<td style="border:1px solid">custom_colors</td>
<td style="border:1px solid">this property lets you configure the colors of the different types of notifications to perfectly align the library with your platform's charter.</td>
<td style="border:1px solid">Object</td>
<td style="border:1px solid">
{</br>
    bg: '#efefef',</br>
    color: 'black',</br>
    border: {</br>
        type: 'solid',</br>
        color: 'gray'</br>
    },</br>
    progress: {</br>
        bg: 'gray'</br>
    }</br>
}
</td>
<td style="border:1px solid;"><span style="color:red">no</span></td>
</tr>
</table>

## Example with type "custom"
Using the **“custom”** type you can (as described in the table above) describe custom colors for different parts of your notification.
```js
theshtify(
    {
        message: 'welcome to theshtify',
        type: 'custom',
        config:{
            colors: {
                bg: '#0C7059',/** notification background */
                color: '#E0BC29',/** text-color*/
                border: {
                    type: 'solid',/** border-type support all css types */
                    color: 'gray'/**the border color */
                },
                progress: {
                    bg: '#E0BC29'/** the progress bar color */
                }
            }            
        }

    }
);
```
>If you use the **“custom”** type without describing the colors as in the example, or omit certain parameters, theshtify will use the default values configured for the type

## Colors configuration example


By default theshtify provides 4 types of notifications **success, infos, danger and warning** with corresponding colors. it may be that in the context of your project you want to redefine these colors, to do this simply redefine the description of the type in the **“customColors”**.

```js
theshtify(
    {
        message: 'welcome to theshtify',
        type: 'success',
        config: {
            custom_colors: {
                success: {
                    bg: '#0C7059',
                    color: '#E0BC29',
                    border: {
                        type: 'solid',
                        color: 'gray'
                    },
                    progress: {
                        bg: '#E0BC29'
                    }
                },
            },
        }

    }
)
```

>In the previous example, theshtify will use the configurations you specified for the **“success”** type. naturally, the other types will use theshtify's default colors, since we only specified custom configurations for the **“success”** type.

## Full example

```js
let config = {
    x_align: 'right',
    y_align: 'top',
    duration: 5000,
    font: {
        size: 15,
        weight: 900,
        family: 'arlon'
    },
    custom_colors: {
        success: {
            bg: '#0C7059',
            color: '#E0BC29',
            border: {
                type: 'solid',
                color: 'gray'
            },
            progress: {
                bg: '#E0BC29'
            }
        },
        /** you can also add other types configs */
    },
    radius: 20,
    bordered: true,
    border_width: 1,
    closer: true,
    progress: true,
    progress_height: 2

}
theshtify({ message: 'welcome to theshtify', type: 'success', config: config });
```
>if you're working with modules, you can define the configuration in a separate file and import it at runtime

## Errors

in the event of an error, theshtify will generate an error visible in your browser's console