let theshtify_infos = {
    message: '',
    type: '',
    config: {
        x_pos: 'right',
        y_pos: 'top',
        font: {
            family: 'arial',
            size: 14,
            weight: ''
        },
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

export function theshtify(infos) {
    let notif = buildBox(infos);
    document.querySelector("body").before(notif);

    let pos = getPosition({ width: notif.offsetWidth, height: notif.offsetHeight });
    notif.style.left = `${pos.x}px`;
    notif.style.top = `${pos.y}px`;
    animProgress(notif);
    moveDisplayedNotifications(notif)

    var op = 0;
    var it = setInterval(function () {
      op = op + 0.01;
      notif.style.opacity = op;
      // console.log(notif)
      if (op > 0.9) {
        clearInterval(it);
      }
    }, 1);

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
function configure(config) {
    // trying to set message
    try {
        config.message ? message(config.message) : '';
        config.duration ? duration(config.duration) : '';
        config.type ? type(config.type) : '';
        (config.colors != undefined && config.type == 'custom') ? theshtify_infos.config.display.colors.custom = config.colors : '';
        config.x_align ? theshtify_infos.config.x_pos = config.x_align : '';
        config.y_align ? theshtify_infos.config.y_pos = config.y_align : '';
        config.bordered ? theshtify_infos.config.bordered = config.bordered : '';
        config.closer ? theshtify_infos.config.closer = config.closer : '';
        config.progress ? theshtify_infos.config.progress = config.progress : '';
        (config.bordered && config.colors != undefined && config.type == 'custom' && config.colors.border != undefined) ? theshtify_infos.config.display.colors.custom.border = config.colors.border : '';
    } catch (error) {
        console.error(error);
    }


}
function buildBox(config) {
    configure(config);
    let box = mainContainer();
    theshtify_infos.config.closer ? box.append(dismiss()) : '';
    box.append(body());
    theshtify_infos.config.progress ? box.append(progress()) : '';

    return box;
}
function container() {
    let box = document.createElement('div');
    let content = document.createElement('div');

    box.append(content);
    return box;
}
function mainContainer() {
    var notif = document.createElement("div");

    notif.setAttribute("class", "Thesharsol-notifyer");
    notif.style.width = `${theshtify_infos.config.display.width}px`;
    notif.style.position = 'absolute';
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
function currentColor() {
    return theshtify_infos.config.display.colors[theshtify_infos.type];
}
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
function dismiss() {
    let dismiss = document.createElement('div');
    let dismissContent = document.createElement('button');
    // style
    dismissContent.classList.add('close-icon');
    dismissContent.fontSize = `22px`
    dismiss.setAttribute('style', `display:flex;padding:${theshtify_infos.config.display.padding.top}px ${theshtify_infos.config.display.padding.top}px 0px ${theshtify_infos.config.display.padding.top}px;`);
    dismissContent.setAttribute('style', 'font-weight:bold;margin-left:auto;background:transparent;border:0px');

    dismiss.append(dismissContent);

    dismissContent.addEventListener('click', () => {
        let boxToRemove = dismissContent.parentNode.parentNode;
        moveDisplayedNotifications(boxToRemove, "remove", parseInt(boxToRemove.getAttribute("index")));
        boxToRemove.remove()
    })
    return dismiss;
}
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

    if (boxesCumulatedHeihgt > ((window.innerHeight * 50) / 100)) {
        notifBoxes[0].remove();
    }
}
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

function animProgress(box) {
    let progressBar = box.querySelector('.progress');
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
/**
 * 
 * @param {*} message 
 * @returns 
 */
function message(message = null) {
    if (message != null) {
        switch (true) {
            case message == '':
                throw ('the given message is Empty');
            case message == undefined:
                throw ('the given message is undefined');
            case typeof (message) != 'string':
                throw new Error(`the message type hqve to be String and not ${typeof (message)}`);

            default:
                theshtify_infos.message = message;
                break;
        }
    } else {
        return message
    }
}


function duration(duration) {
    let c_duration = parseInt(duration);
    if (c_duration != NaN) {
        c_duration <= theshtify_infos.config.max_duration ?
            theshtify_infos.config.duration = c_duration :
            console.error('the max duration has to be 5the duration of the notification provided is longer than the maximum posting duration and has therefore been set at the maximum value.');
    } else {
        throw ('the duration have to be a number')
    }
}

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