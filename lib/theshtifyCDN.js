let theshtify_infos = {
    message: '',
    type: '',
    lang: 'en',
    config: {
        x_pos: 'right',
        y_pos: 'top',
        font: {
            family: 'arial',
            size: 14,
            weight: ''
        },
        min_duration: 1000,
        max_duration: 5000,
        duration: 5000,
        borderWidth: 2,
        bordered: false,
        progress: false,
        progressHeight: 2,
        closer: false,
        trans: false,
        display: {
            width: 300,
            colors: {
                custom: {
                    color: 'white',
                    bg: '#000',
                    border: {
                        type: 'solid',
                        color: 'transparent',
                    },
                    progress: {
                        bg: '#fff'
                    }
                },
                success: {
                    color: 'white',
                    bg: 'rgba(1, 191, 102, 0.822)',
                    border: {
                        type: 'solid',
                        color: 'transparent',
                    },
                    progress: {
                        bg: '#fff'
                    }
                },
                danger: {
                    bg: 'red',
                    color: 'white',
                    border: {
                        type: 'solid',
                        color: 'transparent',
                    },
                    progress: {
                        bg: '#fff'
                    }
                },
                info: {
                    bg: 'rgba(7, 133, 250, 0.822)',
                    color: 'white',
                    border: {
                        type: 'solid',
                        color: 'transparent',
                    },
                    progress: {
                        bg: '#fff'
                    }
                },
                warning: {
                    bg: '#f89406',
                    color: 'black',
                    border: {
                        type: 'solid',
                        color: 'transparent',
                    },
                    progress: {
                        bg: '#fff'
                    }
                },
            },
            padding: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10
            },
            margin: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
            },
            radius: 5,
        }
    }
};
const types = ['success', 'info', 'danger', 'warning', 'custom'];
const positions = {
    x: ["middle", "left", "right"],
    y: ["middle", "top", "bottom"],
}
const messages = {
    en: {
        errors: {
            type_error: 'the {name} have to be {type}  ',
            type: '{name} is {type}',
            duration: "the {type} duration is {ms}MS ({sec}s)",
            position: "the {axis}_pos property have to be one the listed values {values}"
        },
        labels: {
            empty: "empty",
            undefined: "undefined",
            min: "min",
            max: "max",
        }
    }
}
/**
 * 
 * @param {*} infos 
 */
function theshtify(infos) {
    let notif = buildBox(infos);
    if (notif != false) {
        addAndPositionNotif(notif);
        animProgress(notif);
        moveDisplayedNotifications(notif)
        fadeShow(notif);
        fadeHide(notif);
    }
}
/**
 * Allow to set all the notification box configuration
 * @param {*} config 
 * @returns 
 */
function configure(config) {
    // trying to set message
    try {
        config.message ? message(config.message) : '';
        config.duration ? duration(config.duration) : '';
        config.customColors ? setCustomColors(config.customColors) : '';
        config.type ? type(config.type) : '';
        config.bordered ? bordered(config.border) : '';
        config.bordered && config.border_width ? borderWidth(config.border_width) : '';
        config.radius ? radius(config.radius) : '';
        config.colors ? customColors(config.colors) : '';
        config.x_align ? setBoxPosition('x', config.x_align) : '';
        config.y_align ? setBoxPosition('y', config.y_align) : '';
        config.font ? font(config.font) : '';
        config.closer ? withCloser(config.closer) : '';
        config.progress ? haveProgress(config.progress) : '';
        config.progress && config.progress_height ? progressHeight(config.progress_height) : '';
    } catch (error) {
        console.error(`theshtify error \n ${error}`);
        return false
    }
    return true;
}
/**
 * 
 */
function setCustomColors(customColors) {
    for (const key in customColors) {
        if (Object.prototype.hasOwnProperty.call(customColors, key)) {
            if (getColor(key)) {
                theshtify_infos.type = key;
                configureColor(customColors[key]);
            }

        }
    }
}
/**
 * 
 * @param {*} notif 
 */
function addAndPositionNotif(notif) {
    document.querySelector("body").before(notif);

    let pos = getPosition({ width: notif.offsetWidth, height: notif.offsetHeight });
    notif.style.left = `${pos.x}px`;
    notif.style.top = `${pos.y}px`;
}

/**setters */
/**
 * set or return the message
 * @param {*} message 
 * @returns 
 */
function message(message = null) {
    if (message != null) {
        switch (true) {
            case message == '':
                throw (cMessages().errors.type, { name: "message", type: cMessages().labels.empty });
            case checkType(message, "undefined"):
                throw (cMessages().errors.type, { name: "message", type: cMessages().labels.undefined });
            case !checkType(message, "string"):
                throw (getMessage(cMessages().errors.type_error, { name: "message", type: "string" }));

            default:
                theshtify_infos.message = message;
                break;
        }
    } else {
        return message
    }
}
/**
 * 
 */
function setBoxPosition(axis, value) {
    if (checkType(value, "string")) {
        if (positions[axis].includes(value)) {
            theshtify_infos.config[`${axis}_pos`] = value
        } else {
            throw (getMessage(cMessages().errors.position, { axis: axis, values: positions[axis].join(',') }));

        }
    } else {
        throw (getMessage(cMessages().errors.type_error, { name: "colors.color", type: "string" }));
    }
}
/**
 * 
 * @param {*} colors 
 */
function customColors(colors) {
    if (checkType(colors, "object")) {
        if (theshtify_infos.type == "custom") {
            // box background
            configureColor(colors)
        }
    } else {
        throw (getMessage(cMessages().errors.type_error, { name: "colors", type: "object" }));
    }
}
function configureColor(colors) {
    colors.bg ? background(colors.bg) : '';
    // box text colors
    colors.color ? textColor(colors.color) : '';
    // borders
    if (colors.border && theshtify_infos.config.bordered) {
        colors.border.type ? borderType(colors.border.type) : '';
        colors.border.color ? borderColor(colors.border.color) : '';
    }
    if (colors.progress) {
        colors.progress.bg ? progressColor(colors.progress.bg) : '';
    }
}
function getColor(name) {
    return theshtify_infos.config.display.colors[name] ?? false;
}
/**
 * 
 * @param {*} bg 
 */
function background(bg) {
    if (checkType(bg, "string")) {
        currentColor().bg = bg
    } else {
        throw (getMessage(cMessages().errors.type_error, { name: "colors.bg", type: "string" }));
    }
}
/**
 * 
 * @param {*} color 
 */
function textColor(color) {
    if (checkType(color, "string")) {
        currentColor().color = color
    } else {
        throw (getMessage(cMessages().errors.type_error, { name: "colors.color", type: "string" }));
    }
}
/**
 * 
 * @param {*} borders 
 */
function borderColor(color) {
    //borders colors
    if (checkType(color, "string")) {
        currentColor().border.color = color
    } else {
        throw (getMessage(cMessages().errors.type_error, { name: "colors.border.color", type: "string" }));
    }
}
/**
 * 
 * @param {*} type 
 */
function borderType(type) {
    // border type
    if (checkType(type, "string")) {
        currentColor().border.type = type
    } else {
        throw (getMessage(cMessages().errors.type_error, { name: "colors.border.type", type: "string" }));
    }
}
/**
 * 
 * @param {*} width 
 */
function borderWidth(width) {
    if (checkType(width, "number")) {
        theshtify_infos.config.borderWidth = width
    } else {
        throw (getMessage(cMessages().errors.type_error, { name: "borderWidth", type: "number" }));
    }
}
/**
 * 
 * @param {*} width 
 */
function radius(radius) {
    if (checkType(radius, "number")) {
        theshtify_infos.config.display.radius = radius
    } else {
        throw (getMessage(cMessages().errors.type_error, { name: "radius", type: "number" }));
    }
}
/**
 * 
 * @param {*} bordered 
 */
function bordered(bordered = false) {
    if (checkType(bordered, "boolean")) {
        theshtify_infos.config.bordered = bordered
    } else {
        throw (getMessage(cMessages().errors.type_error, { name: "bordered", type: "boolean" }));
    }
}
/**
 * 
 * @param {*} progress 
 */
function haveProgress(progress = false) {
    if (checkType(progress, "boolean")) {
        theshtify_infos.config.progress = progress
    } else {
        throw (getMessage(cMessages().errors.type_error, { name: "progress", type: "boolean" }));
    }
}
/**
 * 
 * @param {*} closer 
 */
function withCloser(closer = false) {
    if (checkType(closer, "boolean")) {
        theshtify_infos.config.closer = closer
    } else {
        throw (getMessage(cMessages().errors.type_error, { name: "closer", type: "boolean" }));
    }
}
/**
 * 
 * @param {*} width 
 */
function progressHeight(height) {
    if (checkType(height, "number")) {
        theshtify_infos.config.progressHeight = height
    } else {
        throw (getMessage(cMessages().errors.type_error, { name: "progressHeight", type: "number" }));
    }
}
/**
 * 
 * @param {*} color 
 */
function progressColor(color) {
    if (checkType(color, "string")) {
        currentColor().progress.bg = color
    } else {
        throw (getMessage(cMessages().errors.type_error, { name: "progress.bg", type: "string" }));
    }
}

/**
 * set the display duration of the notification box
 * @param {*} duration 
 */
function duration(duration) {
    if (checkType(duration, "number")) {
        if (duration <= theshtify_infos.config.max_duration) {
            theshtify_infos.config.duration = duration;
        } else {
            throw (getMessage(cMessages().errors.duration, { type: cMessages().labels.max, ms: `${theshtify_infos.config.max_duration}`, sec: `${theshtify_infos.config.max_duration / 1000}` }));
        }
        if (duration >= theshtify_infos.config.min_duration) {
            theshtify_infos.config.duration = duration;
        } else {
            throw (getMessage(cMessages().errors.duration, { type: cMessages().labels.min, ms: `${theshtify_infos.config.min_duration}`, sec: `${theshtify_infos.config.min_duration / 1000}` }));
        }
    } else {
        throw (getMessage(cMessages().errors.type_error, { name: "duration", type: "number" }));

    }
}
/**
 * set or return the type of the notification type
 * @param {*} type 
 * @returns 
 */
function type(type) {
    if (type != null) {
        if (types.includes(type)) {
            theshtify_infos.type = type;
        } else {
            throw ('the given type is not supported')
        }
    } else {
        return type
    }
}
/**
 * allow you to configure the font properties
 * @param {*} font 
 * @returns 
 */
function font(font) {
    if (font) {
        // 
        if (font.size) {
            if (checkType(font.size, 'number')) {
                theshtify_infos.config.font.size = font.size;
            } else {
                throw (getMessage(cMessages().errors.type_error, { name: 'font.size', type: 'number' }))
            }
        }
        if (font.weight) {
            if (checkType(font.weight, 'number')) {
                theshtify_infos.config.font.weight = font.weight;
            } else {
                throw (getMessage(cMessages().errors.type_error, { name: 'font.weight', type: 'number' }))
            }
        }
        if (font.family) {
            if (checkType(font.family, 'string')) {
                theshtify_infos.config.font.family = font.family;
            } else {
                throw (getMessage(cMessages().errors.type_error, { name: 'font.family', type: 'string' }))
            }
        }
    } else {
        return theshtify_infos.config.font;
    }
}
/**
 * allow to get the messages of the current lang
 * @returns 
 */
function cMessages() {
    return messages[theshtify_infos.lang];
}
/**
 * allow to get the message 
 * @param {*} message 
 * @param {*} params 
 * @returns 
 */
function getMessage(message = '', params = {}) {
    let mes = message;
    for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
            mes = mes.replace(`{${key}}`, params[key])
        }
    }
    return mes;
}
/**
 * return the current colors that matches the selected type
 * @returns 
 */
function currentColor() {
    return theshtify_infos.config.display.colors[theshtify_infos.type];
}
/**
 * return the position of the notigications boxes according with the current position
 * @param {*} boxSize 
 * @returns 
 */
function getPosition(boxSize) {
    let retPos = {
        x: 0,
        y: 0
    }
    theshtify_infos.config.x_pos == 'left' ? retPos.x = theshtify_infos.config.display.margin.left : 0;
    theshtify_infos.config.x_pos == 'right' ? retPos.x = window.innerWidth - (boxSize.width + theshtify_infos.config.display.margin.right) : 0;
    theshtify_infos.config.x_pos == 'middle' ? retPos.x = (window.innerWidth - boxSize.width) / 2 : 0;
    theshtify_infos.config.y_pos == 'top' ? retPos.y = 0 + theshtify_infos.config.display.margin.top : 0;
    theshtify_infos.config.y_pos == 'bottom' ? retPos.y = window.innerHeight - (boxSize.height + theshtify_infos.config.display.margin.bottom) : 0;
    theshtify_infos.config.y_pos == 'middle' ? retPos.y = (window.innerHeight - boxSize.height) / 2 : 0;
    return retPos;
}
/**controllers */
/**
 * allow to verify element type (is mostly used to check configuration property type)
 * @param {*} value 
 * @param {*} neededType 
 * @returns 
 */
function checkType(value, neededType) {
    return typeof (value) === neededType;
}
/** builders */
/**
 * 
 * @param {*} config 
 * @returns 
 */
function buildBox(config) {
    if (configure(config)) {
        let box = mainContainer();
        theshtify_infos.config.closer ? box.append(dismiss()) : '';
        box.append(body());
        theshtify_infos.config.progress ? box.append(progress()) : '';
        return box;

    } else {
        return false;
    }
}
/**
 * 
 * @returns 
 */
function mainContainer() {
    var notif = document.createElement("div");

    notif.setAttribute("class", "Thesharsol-notifyer");
    notif.style.width = `${theshtify_infos.config.display.width}px`;
    notif.style.position = 'fixed';
    notif.style.zIndex = 999, 999;
    notif.style.opacity = 0;

    notif.style.fontFamily = `${theshtify_infos.config.font.family}`;
    notif.style.fontSize = `${theshtify_infos.config.font.size}px`;
    notif.style.fontWeight = `${theshtify_infos.config.font.weight}`;

    notif.style.borderRadius = `${theshtify_infos.config.display.radius}px`;
    notif.style.backgroundColor = theshtify_infos.config.display.colors[theshtify_infos.type].bg;
    notif.setAttribute('index', document.querySelectorAll('.Thesharsol-notifyer').length)
    if (theshtify_infos.config.bordered) {
        notif.style.border = `${theshtify_infos.config.borderWidth}px ${currentColor().border.type} ${currentColor().border.color}`
    }

    return notif;
}

/**
 * Build the boy of the notification
 * @returns 
 */
function body() {
    let body = document.createElement('div');
    let bodyContent = document.createElement('div');
    body.setAttribute('style', 'width:100%')
    // bodyContent.setAttribute('style','width:100%')    

    bodyContent.style.color = theshtify_infos.config.display.colors[theshtify_infos.type].color;
    bodyContent.style.paddingLeft = `${theshtify_infos.config.display.padding.left}px`;
    bodyContent.style.paddingRight = `${theshtify_infos.config.display.padding.right}px`;
    bodyContent.style.paddingTop = `${theshtify_infos.config.display.padding.top}px`;
    bodyContent.style.paddingBottom = `${theshtify_infos.config.display.padding.bottom}px`;
    bodyContent.innerText = theshtify_infos.message;
    body.append(bodyContent);
    return body;
}
/**
 * Buildand return the dismiss notification part
 * @returns 
 */
function dismiss() {
    let dismiss = document.createElement('div');
    let dismissContent = document.createElement('button');
    // style
    dismissContent.classList.add('close-icon');
    dismissContent.fontSize = `22px`
    dismiss.setAttribute('style', `display:flex;padding:${theshtify_infos.config.display.padding.top}px ${theshtify_infos.config.display.padding.top}px 0px ${theshtify_infos.config.display.padding.top}px;`);
    dismissContent.setAttribute('style', `font-weight:bold;margin-left:auto;background:transparent;border:0px;color:${currentColor().color}`);

    dismiss.append(dismissContent);

    dismissContent.addEventListener('click', () => {
        let boxToRemove = dismissContent.parentNode.parentNode;
        moveDisplayedNotifications(boxToRemove, "remove", parseInt(boxToRemove.getAttribute("index")));
        boxToRemove.remove()
    })
    return dismiss;
}

/**
 * Build and return the pargress bar of the notification box
 * @returns 
 */
function progress() {
    let progress = document.createElement('div');
    let progressContent = document.createElement('div');
    progress.style.width = '100%';
    progress.style.borderRadius = `${theshtify_infos.config.display.radius}px`;
    progress.style.overflow = 'hidden'
    progress.classList.add('progress');
    progressContent.setAttribute('style', 'height:2px;width:0px');

    progressContent.style.minHeight = `${theshtify_infos.config.progressHeight}px`;
    progressContent.style.width = '0px';
    progressContent.classList.add('content');
    progressContent.style.background = `${currentColor().progress ? currentColor().progress.bg : 'white'}`;
    progress.append(progressContent);
    return progress;
}
/**
 * animate the progress bar
 * @param {*} box 
 */
function animProgress(box) {
    let progressBar = box.querySelector('.progress');
    if (progressBar != undefined) {
        let progressBoxContent = box.querySelector('.content');

        // 
        let maxProgressContentWidth = progressBar.offsetWidth;
        let increment = maxProgressContentWidth / (theshtify_infos.config.duration / 30);
        let width = 0;
        let incInt = setInterval(() => {
            width += increment;
            progressBoxContent.style.width = `${width}px`;

            if (maxProgressContentWidth <= width) {
                clearInterval(incInt);
            }
        }, 30);
    }


}
/** animations */
/**
 * Move the displayed notification afer creating or destroying one
 * @param {*} createdBox 
 * @param {*} moveType 
 * @param {*} startIndex 
 */
function moveDisplayedNotifications(createdBox, moveType = "add", startIndex = 0) {
    let notifBoxes = document.querySelectorAll('.Thesharsol-notifyer');
    let offset = createdBox.offsetHeight + 20;
    // 
    let boxesCumulatedHeihgt = offset;

    switch (moveType) {
        case "add":
            for (let i = startIndex; i < notifBoxes.length; i++) {
                boxesCumulatedHeihgt = changeBoxPosition(notifBoxes, i, moveType, boxesCumulatedHeihgt, createdBox, offset);
            }
            break;
        case "remove":
            console.log('remove')
            let si = Array.prototype.indexOf.call(notifBoxes, createdBox);
            for (let i = si; i >= 0; i--) {
                boxesCumulatedHeihgt = changeBoxPosition(notifBoxes, i, moveType, boxesCumulatedHeihgt, createdBox, offset);
            }
            for (let j = (si + 1); j < notifBoxes.length; j++) {
                notifBoxes[j].setAttribute('index', j - 1);
                console.log((si))
            }
            break;
        default:
            break;
    }

    if (boxesCumulatedHeihgt > ((window.innerHeight * 50) / 100)) {
        notifBoxes[0].remove();
    }
}
/**
 * 
 * @param {*} notifBoxes 
 * @param {*} i 
 * @param {*} moveType 
 * @param {*} boxesCumulatedHeihgt 
 * @param {*} createdBox 
 * @param {*} offset 
 * @returns 
 */
function changeBoxPosition(notifBoxes, i, moveType, boxesCumulatedHeihgt, createdBox, offset) {
    let box = notifBoxes[i];

    if (createdBox != box && box != undefined) {

        if (theshtify_infos.config.y_pos == 'bottom') {
            box.style.top = moveType == "add" ? `${box.offsetTop - offset}px` : `${box.offsetTop + offset}px`;
        }
        if (theshtify_infos.config.y_pos == 'top') {
            box.style.top = moveType == "add" ? `${box.offsetTop + offset}px` : `${box.offsetTop - offset}px`;
        }
        boxesCumulatedHeihgt += box.offsetHeight;
    }
    return boxesCumulatedHeihgt;
}
/**
 * 
 * @param {*} notif 
 */
function fadeShow(notif) {
    var op = 0;
    var it = setInterval(function () {
        op = op + 0.01;
        notif.style.opacity = op;
        // console.log(notif)
        if (op > 0.9) {
            clearInterval(it);
        }
    }, 1);
}
/**
 * 
 * @param {*} notif 
 */
function fadeHide(notif) {
    setTimeout(function () {
        var op = 1;
        var it = setInterval(function () {
            op = op - 0.01;
            notif.style.opacity = op;
            // console.log(notif)
            if (op < 0.01) {
                notif.remove();
                clearInterval(it);
            }
        }, 1);
    }, theshtify_infos.config.duration);
}
