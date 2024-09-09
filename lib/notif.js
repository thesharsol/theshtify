
class Notif {
  #config = {
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
  };
  #type;
  #message;
  constructor(config) {
    this.config = config;
    this.type = "danger";
    this.message = "notification";
  }
  get config() {
    return this.#config;
  }
  set config(config) {
    for (const key in config) {
      if (Object.hasOwnProperty.call(this.#config, key)) {
        this.#config[key] == config[key];
      }
    }
  }
  set duration(duration) {
    let c_duration = parseInt(duration);
    if (c_duration != NaN) {
      c_duration <= this.config.max_duration ?
        this.config.duration = c_duration :
        console.error('the max duration has to be 5the duration of the notification provided is longer than the maximum posting duration and has therefore been set at the maximum value.');
    }
  }
  configure(config) {
    config.message ? this.message = config.message : '';
    config.type ? this.type = config.type : '';
    (config.colors != undefined && config.type == 'custom') ? this.config.display.colors.custom = config.colors : '';
    config.duration ? this.duration = config.duration : '';
    config.x_align ? this.config.x_pos = config.x_align : '';
    config.y_align ? this.config.y_pos = config.y_align : '';
    config.bordered ? this.config.bordered = config.bordered : '';
    config.closer ? this.config.closer = config.closer : '';
    config.progress ? this.config.progress = config.progress : '';
    (config.bordered && config.colors != undefined && config.type == 'custom' && config.colors.border != undefined) ? this.config.display.colors.custom.border = config.colors.border : '';

  }
  get message() {
    return this.#message;
  }
  set message(message) {
    this.#message = message;
  }
  get type() {
    return this.#type;
  }
  set type(type) {
    this.#type = type;
  }

  getPosition(boxSize) {
    let retPos = {
      x: 0,
      y: 0
    }
    this.config.x_pos == 'left' ? retPos.x = this.config.display.margin.left : 0;
    this.config.x_pos == 'right' ? retPos.x = window.innerWidth - (boxSize.width + this.config.display.margin.right) : 0;
    this.config.x_pos == 'middle' ? retPos.x = (window.innerWidth - boxSize.width) / 2 : 0;
    this.config.y_pos == 'top' ? retPos.y = 0 + this.config.display.margin.top : 0;
    this.config.y_pos == 'bottom' ? retPos.y = window.innerHeight - (boxSize.height + this.config.display.margin.bottom) : 0;
    this.config.y_pos == 'middle' ? retPos.y = (window.innerHeight - boxSize.height) / 2 : 0;
    return retPos;
  }
  moveDisplayedNotifications(createdBox, moveType = "add", startIndex = 0) {
    let notifBoxes = document.querySelectorAll('.Thesharsol-notifyer');
    let offset = createdBox.offsetHeight + 20;
    // 
    let boxesCumulatedHeihgt = offset;

    switch (moveType) {
      case "add":
        for (let i = startIndex; i < notifBoxes.length; i++) {
          boxesCumulatedHeihgt = this.changeBoxPosition(notifBoxes, i, moveType, boxesCumulatedHeihgt, createdBox, offset);
        }
        break;
      case "remove":
        console.log('remove')
        let si = Array.prototype.indexOf.call(notifBoxes, createdBox);
        for (let i = si; i >= 0; i--) {
          boxesCumulatedHeihgt = this.changeBoxPosition(notifBoxes, i, moveType, boxesCumulatedHeihgt, createdBox, offset);
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
  changeBoxPosition(notifBoxes, i, moveType, boxesCumulatedHeihgt, createdBox, offset) {
    let box = notifBoxes[i];

    if (createdBox != box && box != undefined) {

      if (this.config.y_pos == 'bottom') {
        box.style.top = moveType == "add" ? `${box.offsetTop - offset}px` : `${box.offsetTop + offset}px`;
      }
      if (this.config.y_pos == 'top') {
        box.style.top = moveType == "add" ? `${box.offsetTop + offset}px` : `${box.offsetTop - offset}px`;
      }
      boxesCumulatedHeihgt += box.offsetHeight;
    }
    return boxesCumulatedHeihgt;
  }
  get currentColor() {
    return this.config.display.colors[this.#type];
  }
  notify(infos) {
    let notif = this.buildBox(infos);
    document.querySelector("body").before(notif);

    let pos = this.getPosition({ width: notif.offsetWidth, height: notif.offsetHeight });
    notif.style.left = `${pos.x}px`;
    notif.style.top = `${pos.y}px`;
    this.animProgress(notif);
    this.moveDisplayedNotifications(notif)

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
    }, this.config.duration);
  }
  buildBox(infos) {
    this.configure(infos);
    let box = this.mainContainer();
    this.config.closer ? box.append(this.dismiss()) : '';
    box.append(this.body());
    this.config.progress ? box.append(this.progress()) : '';

    return box;
  }
  container() {
    let box = document.createElement('div');
    let content = document.createElement('div');

    box.append(content);
    return box;
  }
  mainContainer() {
    var notif = document.createElement("div");

    notif.setAttribute("class", "Thesharsol-notifyer");
    notif.style.width = `${this.config.display.width}px`;
    notif.style.position = 'absolute';
    notif.style.opacity = 0;

    notif.style.fontFamily = `${this.config.font.family}`;
    notif.style.fontSize = `${this.config.font.size}px`;
    notif.style.fontWeight = `${this.config.font.weight}`;

    notif.style.borderRadius = `${this.config.display.radius}px`;
    notif.style.backgroundColor = this.config.display.colors[this.#type].bg;
    notif.setAttribute('index', document.querySelectorAll('.Thesharsol-notifyer').length)
    if (this.config.bordered) {
      notif.style.border = `${this.config.borderWidth}px ${this.currentColor.border.type} ${this.currentColor.border.color}`
    }

    return notif;
  }
  body() {
    let body = document.createElement('div');
    let bodyContent = document.createElement('div');
    body.setAttribute('style', 'width:100%')
    // bodyContent.setAttribute('style','width:100%')    

    bodyContent.style.color = this.config.display.colors[this.#type].color;
    bodyContent.style.paddingLeft = `${this.config.display.padding.left}px`;
    bodyContent.style.paddingRight = `${this.config.display.padding.right}px`;
    bodyContent.style.paddingTop = `${this.config.display.padding.top}px`;
    bodyContent.style.paddingBottom = `${this.config.display.padding.bottom}px`;
    bodyContent.innerText = this.message;
    body.append(bodyContent);
    return body;
  }
  dismiss() {
    let dismiss = document.createElement('div');
    let dismissContent = document.createElement('button');
    // style
    dismissContent.classList.add('close-icon');
    dismissContent.fontSize = `22px`
    dismiss.setAttribute('style', `display:flex;padding:${this.config.display.padding.top}px ${this.config.display.padding.top}px 0px ${this.config.display.padding.top}px;`);
    dismissContent.setAttribute('style', 'font-weight:bold;margin-left:auto;background:transparent;border:0px');

    dismiss.append(dismissContent);

    dismissContent.addEventListener('click', () => {
      let boxToRemove = dismissContent.parentNode.parentNode;
      this.moveDisplayedNotifications(boxToRemove, "remove", parseInt(boxToRemove.getAttribute("index")));
      boxToRemove.remove()
    })
    return dismiss;
  }
  progress() {
    let progress = document.createElement('div');
    let progressContent = document.createElement('div');
    progress.style.width = '100%';
    progress.style.borderRadius = `${this.config.display.radius}px`;
    progress.style.overflow = 'hidden'
    progress.classList.add('progress');
    progressContent.setAttribute('style', 'height:2px;width:0px');

    progressContent.style.minHeight = `${this.config.progressHeight}px`;
    progressContent.style.width = '0px';
    progressContent.classList.add('content');
    progressContent.style.background = `${this.currentColor.progress ? this.currentColor.progress.bg : 'white'}`;
    progress.append(progressContent);
    return progress;
  }

  animProgress(box) {
    let progressBar = box.querySelector('.progress');
    let progressBoxContent = box.querySelector('.content');

    // 
    let maxProgressContentWidth = progressBar.offsetWidth;
    let increment = maxProgressContentWidth / (this.config.duration / 30);
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
// alert()
export let theshtify = new Notif();