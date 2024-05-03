let theshtify_basic_infos = {
    type: '',
    message: '',
    config: {
        x_pos: 'right',
        y_pos: 'top',
        duration: 5000,
        bordered: false,
        display: {
            width: 300,
            colors: {
                custom: {
                    color: 'white',
                    bg: '#000'
                },
                success: {
                    color: 'white',
                    bg: 'rgba(1, 191, 102, 0.822)'
                },
                danger: {
                    bg: 'red',
                    color: 'white'
                },
                info: {
                    bg: 'rgba(7, 133, 250, 0.822)',
                    color: 'white'
                },
                warning: {
                    bg: '#f89406',
                    color: 'black'
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
            radius: 10
        }
    }
};

function theshtify(infos = theshtify_basic_params) {
    var notif = document.createElement("div");
    configure(infos);
    notif.setAttribute("class", "Thesharsol-notifyer");
    notif.innerHTML = infos.message;
    notif.style.width = `${theshtify_basic_infos.config.display.width}px`;
    notif.style.position = 'absolute';
    notif.style.opacity = 0;
    notif.style.backgroundColor = theshtify_basic_infos.config.display.colors[theshtify_basic_infos.type].bg;
    notif.style.color = theshtify_basic_infos.config.display.colors[theshtify_basic_infos.type].color;
    notif.style.paddingLeft = `${theshtify_basic_infos.config.display.padding.left}px`;
    notif.style.paddingRight = `${theshtify_basic_infos.config.display.padding.right}px`;
    notif.style.paddingTop = `${theshtify_basic_infos.config.display.padding.top}px`;
    notif.style.paddingBottom = `${theshtify_basic_infos.config.display.padding.bottom}px`;
    // console.log((window.innerWidth * 35) / 100)
    notif.style.borderRadius = `${theshtify_basic_infos.config.display.radius}px`;
    document.querySelector("body").before(notif);

    // console.log({ width: notif.offsetWidth, height: notif.offsetHeight });
    let pos = getPosition({ width: notif.offsetWidth, height: notif.offsetHeight });
    // let event = new CustomEvent('Thesharsol-notify', { detail: { height: notif.offsetHeight } })
    notif.style.left = `${pos.x}px`;
    notif.style.top = `${pos.y}px`;
    moveDisplayedNotifications(notif)
    // alert(notif.offsetTop)
    // console.log(pos)

    // notif.style.left = window.innerWidth - (window.innerWidth * 35) / 100 + "px";
    // notif.style.top = window.innerHeight - (notif.offsetHeight + 30) + "px";
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
        }, 5);
    }, theshtify_basic_infos.config.duration);

}
function configure(config) {
    config.message ? theshtify_basic_infos.message = config.message : '';
    config.type ? theshtify_basic_infos.type = config.type : '';
    (config.colors != undefined && config.type == 'custom') ? theshtify_basic_infos.config.display.colors.custom = config.colors : '';
    config.duration ? theshtify_basic_infos.config.duration = config.duration : '';
    config.x_align ? theshtify_basic_infos.config.x_pos = config.x_align : '';
    config.y_align ? theshtify_basic_infos.config.y_pos = config.y_align : '';
    config.bordered ? theshtify_basic_infos.config.bordered = config.bordered : '';
}
function getPosition(boxSize) {
    let retPos = {
        x: 0,
        y: 0
    }

    theshtify_basic_infos.config.x_pos == 'left' ? retPos.x = theshtify_basic_infos.config.display.margin.left : 0;
    theshtify_basic_infos.config.x_pos == 'right' ? retPos.x = window.innerWidth - (boxSize.width + theshtify_basic_infos.config.display.margin.right) : 0;
    theshtify_basic_infos.config.x_pos == 'middle' ? retPos.x = (window.innerWidth - boxSize.width) / 2 : 0;
    theshtify_basic_infos.config.y_pos == 'top' ? retPos.y = 0 + theshtify_basic_infos.config.display.margin.top : 0;
    theshtify_basic_infos.config.y_pos == 'bottom' ? retPos.y = window.innerHeight - (boxSize.height + theshtify_basic_infos.config.display.margin.bottom) : 0;
    theshtify_basic_infos.config.y_pos == 'middle' ? retPos.y = (window.innerHeight - boxSize.height) / 2 : 0;

    return retPos;
}

function moveDisplayedNotifications(createdBox) {
    let notifBoxes = document.querySelectorAll('.Thesharsol-notifyer');
    let offset = createdBox.offsetHeight + 20;
    // 
    let boxesCumulatedHeihgt = offset;
    notifBoxes.forEach(box => {

        if (createdBox != box) {

            if (theshtify_basic_infos.config.y_pos == 'bottom') {
                box.style.top = `${box.offsetTop - offset}px`;
            }
            if (theshtify_basic_infos.config.y_pos == 'top') {
                box.style.top = `${box.offsetTop + offset}px`;
            }
            boxesCumulatedHeihgt += box.offsetHeight;
        }
    });
    console.log(boxesCumulatedHeihgt + '-----' + ((window.innerHeight * 70) / 100))
    if (boxesCumulatedHeihgt > ((window.innerHeight * 50) / 100)) {
        console.log(boxesCumulatedHeihgt)
        notifBoxes[0].remove();
    }
}