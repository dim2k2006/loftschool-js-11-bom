var start = {
    menu: document.querySelector('.menu'),
    container: document.querySelectorAll('.content'),
    wrapper: document.querySelectorAll('.content__wrapper'),
    limitX: 0,
    limitY: 0,
    offsetX: 0,
    offsetY: 0,
    createdContainer: '',
    createdContainerWidth: 0,
    createdContainerHeight: 0,
    activeElement: null,

    setupListener: function() {
        var __this = this;

        this.menu.addEventListener('click', function(event) {
            event.preventDefault();

            var target = event.target,
                action = target.getAttribute('data-action');

            if (action) {
                __this.hideButton();
                __this.showContainer();

                setTimeout(function() {

                    __this[action]();

                }, 500);
            }
        });

        this.createdContainer.addEventListener('mousedown', this.mDown);

        this.createdContainer.addEventListener('mouseup', this.mUp);

        this.wrapper[0].addEventListener('mousemove', this.mMove);

        this.container[0].addEventListener('mousedown', this.active);

        this.container[0].addEventListener('mouseup', this.default);

        window.onresize = this.setup;
    },
    start: function() {
        this.setup();
        this.setupRectangle();
    },
    restore: function() {
        this.setup();
        this.setupRectangle();
    },
    checkRestore: function() {
        var color = this.getCookie('color'),
            createdContainerHeight = this.getCookie('createdContainerHeight'),
            createdContainerWidth = this.getCookie('createdContainerWidth'),
            left = this.getCookie('left'),
            limitX = this.getCookie('limitX'),
            limitY = this.getCookie('limitY'),
            top = this.getCookie('top');

        if (color && createdContainerHeight && createdContainerWidth && left && limitX && limitY && top) {

            this.menu.classList.toggle('canRestore');

        }
    },
    save: function(name, value) {
        var expires = '',
            date = new Date();

        date.setTime(date.getTime()+(360*24*60*60*1000));
        expires = "; expires="+date.toGMTString();

        document.cookie = `${name}=${value}${expires}; path=/`;
    },
    getCookie: function(name) {
        var matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));

        return matches ? decodeURIComponent(matches[1]) : undefined;
    },
    setup: function() {
        var caller = arguments.callee.caller.name;

        if (caller === 'start') {

            start.limitX = start.wrapper[0].offsetWidth;
            start.limitY = start.wrapper[0].offsetHeight;

            this.save('limitX', start.limitX);
            this.save('limitY', start.limitY);

        } else {

            start.limitX = this.getCookie('limitX');
            start.limitY = this.getCookie('limitY');

        }
    },
    hideButton: function() {
        var __this = this;

        this.menu.style.opacity = 0;

        setTimeout(function() {
            __this.menu.style.display = 'none';
        }, 300);
    },
    showContainer: function() {
        this.container[0].classList.toggle('inited');
    },
    createRectangle: function() {
        this.createdContainer = document.createElement('div');
        this.wrapper[0].appendChild(this.createdContainer);
    },
    setupRectangle: function() {
        var caller = arguments.callee.caller.name,
            color = '',
            left = '',
            top = '';

        if (caller === 'start') {

            this.createdContainerWidth = parseInt(Math.random() * (this.limitX / 4 - 100) + 100);
            this.createdContainerHeight = parseInt(Math.random() * (this.limitY / 4 - 100) + 100);

            color = this.createColor();
            left = parseInt(Math.random() * (this.limitX - this.createdContainerWidth - 1) + 1);
            top = parseInt(Math.random() * (this.limitY - this.createdContainerHeight - 1) + 1);

            this.save('createdContainerWidth', this.createdContainerWidth);
            this.save('createdContainerHeight', this.createdContainerHeight);
            this.save('color', color);
            this.save('left', left);
            this.save('top', top);

        } else {

            this.createdContainerWidth = this.getCookie('createdContainerWidth');
            this.createdContainerHeight = this.getCookie('createdContainerHeight');

            color = this.getCookie('color');
            left = this.getCookie('left');
            top = this.getCookie('top');

        }

        this.createdContainer.classList.toggle('dragBox');
        this.createdContainer.style.width = this.createdContainerWidth + 'px';
        this.createdContainer.style.height = this.createdContainerHeight + 'px';
        this.createdContainer.style.transform = 'translate3d('+ left +'px, '+ top +'px, 0px)';
        this.createdContainer.style.backgroundColor = color;
    },
    mDown: function(event) {
        start.activeElement = event.target;
        start.offsetX = event.offsetX;
        start.offsetY = event.offsetY;
    },
    mUp: function(event) {
        start.activeElement = null;
    },
    mMove: function(event) {
        var left = event.layerX - start.offsetX,
            top = event.layerY - start.offsetY;

        if (left < 0) {
            left = 0;
        }

        if (left > start.limitX - start.createdContainerWidth) {
            left = start.limitX - start.createdContainerWidth;
        }

        if (top < 0) {
            top = 0;
        }

        if (top > start.limitY - start.createdContainerHeight) {
            top = start.limitY - start.createdContainerHeight;
        }

        if (start.activeElement) {

            start.createdContainer.style.transform = 'translate3d('+ left +'px, '+ top +'px, 0px)';

            start.save('left', left);
            start.save('top', top);

        }
    },
    createColor: function() {
        return '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
    },
    active: function(event) {
        event.currentTarget.classList.toggle('active');
    },
    default: function(event) {
        event.currentTarget.classList.toggle('active');
    },
    init: function() {
        this.createRectangle();
        this.checkRestore();
        this.setupListener();
    }
};

start.init();