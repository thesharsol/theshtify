![Built with JavaScript](https://img.shields.io/badge/Built%20with-JavaScript-red?style=for-the-badge&logo=javascript)
![npm](https://img.shields.io/npm/v/theshtify)
![MIT License](https://img.shields.io/npm/l/theshtify)

# Theshtify

A lightweight, zero-dependency vanilla JS toast notification library. Fully customizable to match your project's design.

## Installation

### npm

```bash
npm i theshtify
```

### CDN

```html
<script src="https://cdn.jsdelivr.net/npm/theshtify/dist/theshtify.cdn.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/theshtify/css/theshtify.css" />
```

### ES Module

```js
import { theshtify } from "theshtify";
import "theshtify/css/theshtify.css";
```

## Features

- Easy to use with a simple API
- Multiple stacked notifications
- Fully customizable (colors, fonts, borders, positions...)
- Non-blocking execution
- Progress bar with duration tracking
- Fade in/out CSS animations
- Click callback support
- Title support

## Quick start

```js
theshtify({ message: "Welcome to theshtify", type: "success" });
```

## API

```js
theshtify({ message, type, title, config, callback });
```

| Parameter  | Description                              | Type       | Values                                       | Required |
| ---------- | ---------------------------------------- | ---------- | -------------------------------------------- | -------- |
| `message`  | The text to display in the notification  | `String`   | Any string                                   | Yes      |
| `type`     | The notification type                    | `String`   | `success` \| `danger` \| `info` \| `warning` \| `custom` | Yes      |
| `title`    | A title displayed above the message      | `String`   | Any string                                   | No       |
| `config`   | Display and behavior settings            | `Object`   | See configuration below                      | No       |
| `callback` | Function called when the notification is clicked | `Function` |                                        | No       |

## Configuration options

Pass a `config` object to customize the notification appearance and behavior.

| Option | Description | Type | Values | Default |
| --- | --- | --- | --- | --- |
| `duration` | How long the notification is displayed (ms) | `Number` | `1000` - `5000` | `5000` |
| `x_align` | Horizontal position | `String` | `left` \| `right` \| `middle` | `right` |
| `y_align` | Vertical position | `String` | `top` \| `bottom` \| `middle` | `top` |
| `closer` | Show the close button | `Boolean` | `true` \| `false` | `false` |
| `bordered` | Show a border around the notification | `Boolean` | `true` \| `false` | `false` |
| `border_width` | Border thickness in px | `Number` | Any number | `1` |
| `radius` | Border radius in px | `Number` | Any number | `5` |
| `progress` | Show the progress bar | `Boolean` | `true` \| `false` | `false` |
| `progress_height` | Progress bar height in px | `Number` | `1` - `5` | `2` |
| `font` | Font settings | `Object` | `{ family, size, weight }` | - |
| `colors` | Custom colors (only with type `custom`) | `Object` | See below | - |
| `custom_colors` | Override colors for built-in types | `Object` | See below | - |
| `main_box_classes` | Additional CSS class to add to the notification | `String` | Any class name | - |

## Examples

### Basic

```js
theshtify({ message: "File saved successfully", type: "success" });
```

### With title and callback

```js
theshtify({
  message: "Your session will expire soon",
  type: "warning",
  title: "Warning",
  callback: () => {
    console.log("Notification clicked!");
  },
});
```

### Custom type with custom colors

Using the `custom` type, you can define your own color scheme for the notification.

```js
theshtify({
  message: "Welcome to theshtify",
  type: "custom",
  config: {
    colors: {
      bg: "#0C7059",
      color: "#E0BC29",
      border: {
        type: "solid",
        color: "gray",
      },
      progress: {
        bg: "#E0BC29",
      },
    },
  },
});
```

> If you use the `custom` type without specifying colors, theshtify will fall back to default values.

### Override built-in type colors

By default, theshtify provides 4 notification types (`success`, `info`, `danger`, `warning`) with predefined colors. You can override them with `custom_colors`:

```js
theshtify({
  message: "Welcome to theshtify",
  type: "success",
  config: {
    custom_colors: {
      success: {
        bg: "#0C7059",
        color: "#E0BC29",
        border: {
          type: "solid",
          color: "gray",
        },
        progress: {
          bg: "#E0BC29",
        },
      },
    },
  },
});
```

> Only the types you specify in `custom_colors` are overridden. The others keep their default colors.

### Full configuration

```js
const config = {
  x_align: "right",
  y_align: "top",
  duration: 5000,
  font: {
    size: 15,
    weight: 900,
    family: "Arial",
  },
  custom_colors: {
    success: {
      bg: "#0C7059",
      color: "#E0BC29",
      border: { type: "solid", color: "gray" },
      progress: { bg: "#E0BC29" },
    },
    // you can also override danger, info, warning...
  },
  radius: 20,
  bordered: true,
  border_width: 1,
  closer: true,
  progress: true,
  progress_height: 2,
};

theshtify({
  message: "Welcome to theshtify",
  type: "success",
  title: "Hello",
  config: config,
  callback: () => console.log("clicked"),
});
```

> You can define the configuration in a separate file and import it if you're working with ES modules.

### Color object structure

The `colors` and `custom_colors` options share the same structure:

```js
{
  bg: "#efefef",       // background color
  color: "black",      // text color
  border: {
    type: "solid",     // CSS border style
    color: "gray"      // border color
  },
  progress: {
    bg: "gray"         // progress bar color
  }
}
```

## Error handling

If an invalid configuration is passed, theshtify will log a descriptive error in your browser's console.

## License

[MIT](LICENSE)
