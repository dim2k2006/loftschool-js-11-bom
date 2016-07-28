var action = {
    wrapper: document.querySelector('.wrapper'),
    table: document.querySelector('.table'),
    form: document.querySelector('.addCookie__form'),
    inputName: document.querySelector('input[name="name"]'),
    inputData: document.querySelector('input[name="data"]'),
    inputTime: document.querySelector('input[name="time"]'),

    setupListener: function() {
        var __this = this;

        this.wrapper.addEventListener('click', function(event) {
            event.preventDefault();

            var target = event.target,
                action = target.getAttribute('data-action');

            if (action) {
                __this[action](target);
            }
        });
    },
    delete: function(target) {
        var id = target.getAttribute('data-button'),
            key = document.querySelector('td[data-key="'+ id +'"]').innerHTML,
            value = document.querySelector('td[data-value="'+ id +'"]').innerHTML,
            remove = confirm(`Удалить cookie с именем ${key}?`);

        if (remove) {

            document.cookie = key +'=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

            this.getCookies();

        }
    },
    add: function(target) {
        var name = this.inputName.value,
            value = this.inputData.value,
            time = this.inputTime.value;

        if (name !== '' && value !== '' && time !== '') {

            document.cookie = `${name}=${value}`;
            this.getCookies();
            this.form.reset();

        } else {

            alert('Заполните все поля формы');

        }
    },
    getCookies: function() {
        var cookie = document.cookie;

        if (cookie !== '') {

            cookie = cookie.split('; ');
            this.generateData(cookie);

        } else {

            this.table.innerHTML = '';

        }
    },
    generateData: function(cookie) {
        var dataLength = cookie.length,
            i = 0,
            item = '',
            key = '',
            value = '',
            string = '';

        if (dataLength > 0) {

            for (i; i < dataLength; i++) {

                item = cookie[i].split('=');
                key = item[0];
                value = item[1];

                string += `<tr><td data-key="item-${i}">${key}</td><td data-value="item-${i}">${value}</td><td><button data-action="delete" data-button="item-${i}">Удалить</button></td></tr>`;

            }

        }

        this.render(string);
    },
    render: function(string) {
        this.table.innerHTML = '';
        this.table.innerHTML = string;
    },
    init: function() {
        this.getCookies();
        this.setupListener();
    }
};

action.init();