'use strict';

const render = (root) => {
    root.empty();

    const wrapper = $('<div class="wrapper"></div>');
    const update = () => {
        render(root);
    }

    if (state.page == null) {
        wrapper.append(Home(update));
    } else if (state.page == 1) {
        wrapper.append(RegOne(update));
    } else if (state.page == 2) {
        wrapper.append(Code(update));
    } else if (state.page == 3) {
        wrapper.append(RegUser(update));
    } else if (state.page == 4) {
        wrapper.append(Yellow(update));
        setTimeout(_ => {
            state.page = 5;
            update();
        }, 3000);
    } else if (state.page == 5) {
        wrapper.append(CardNumber(update));
    } else if (state.page == 6) {
        wrapper.append(CardPass(update));
    } else if (state.page == 7) {
        wrapper.append(Logged());
    }

    root.append(wrapper);
}

const state = {
    page: null,
    phone: null,
    term: false,
    code: null,
    name: null,
    email: null,
    password: null,
    cardNumber: null,
    cardMonth: null,
    cardYear: null,
    cardPass: null
}

$(_ => {
    const root = $('.root');
    render(root);
});