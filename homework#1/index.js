var action = {
    table: document.querySelector('.table'),

    setupListener: function() {
        var __this = this;

        this.table.addEventListener('click', function(event) {
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
            value = document.querySelector('td[data-value="'+ id +'"]').innerHTML;

        document.cookie = key +'=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        this.getCookies();
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