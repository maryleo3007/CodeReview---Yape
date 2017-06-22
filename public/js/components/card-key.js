'use strict';

const CardPass = (update) => {
    const arr = state.cardNumber;
    const four = arr.toString().split('');
    console.log(four[12]);

    const section = $('<section class="container card-pass"></section>');

    const step = $('<div class="step"></div>');
    const icon = $('<img src="img/icons/bcp-logo.png"/>');
    const divText = $('<div class="page-text"></div>');
    const h4 = $('<h4>Ingresa la clave de tu tarjeta</h4>');
    const p = $('<p>Tarjeta ****' + four[12] + four[13] + four[14] + four[15] + '</p>');
    divText.append(h4);
    divText.append(p);
    step.append(icon);
    step.append(divText);

    const form = $('<form id="card-code"></form>');
    const divInput = $('<div class="div-input"></div>');
    const iIcon = $('<img src="img/icons/lock.png">');
    const input = $('<input type="password" name="cardpass" id="cardpass" class="form-input" maxlength="4" required/>');
    const button = $('<button type="button" class="btn" disabled>Registrar</button>');
    divInput.append(iIcon);
    divInput.append(input);
    form.append(divInput);
    form.append(button);
    section.append(step);
    section.append(form);

    input.NumberOnly();

    input.on('keyup', () => {
        if (input.val().length == 4) {
            state.cardPass = input.val();
            button.removeAttr('disabled');
        } else {
            button.attr('disabled');
        }
    });

    button.on('click', (e) => {
        e.preventDefault();

        $.post('./api/registerCard', {
            "phone": state.phone,
            "cardNumber": state.cardNumber,
            "cardMonth": state.cardMonth,
            "cardYear": state.cardYear,
            "cardPassword": state.cardPass
        }, (result) => {
            if (result.succes != false) {
                state.page = 7;
                console.log(state.cardPass);
                update();
            }
        });
    })

    return section;
}

//En consola se indica error cuando se escribe con ES6. Verificar.
jQuery.fn.NumberOnly = function() {
    return this.each(function() {
        $(this).keydown(function(e) {
            const key = e.charCode || e.keyCode || 0;
            return (
                key == 8 || key == 9 ||
                key == 13 || key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    });
};