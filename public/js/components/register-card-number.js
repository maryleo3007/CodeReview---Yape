'use strict';

const CardNumber = (update) => {
    const section = $('<section class="container card-number"></section>');

    const step = $('<div class="step"></div>');
    const icon = $('<img src="img/icons/bcp-logo.png"/>');
    const divText = $('<div class="page-text"></div>');
    const h4 = $('<h4>Registra tu tarjeta de débito BCP</h4>');
    const p = $('<p>Por ahora solo aceptamos cuentas de ahorro y/o <br>corriente en soles.</p>');
    divText.append(h4);
    divText.append(p);
    step.append(icon);
    step.append(divText);

    const form = $('<form id="card-form"></form>');

    const divInput = $('<div class="div-input"></div>');
    const iIcon = $('<img src="img/icons/card.png">');
    const cardNumber = $('<input type="text" name="card-number" id="card-number" class="form-input"  maxlength="16" required/>');
    const scan = $('<p class="scan"><img src="img/icons/scan.png">Escanear tarjeta</p>');
    divInput.append(iIcon);
    divInput.append(cardNumber);

    const divDate = $('<div class="div-date"></div>');
    const label = $('<label class="text-grey">Fecha de Vencimiento</label>');
    const month = $('<input class="card-month" min="1" max="12" maxlength="2">');
    const slash = $('<label> / </label>');
    const year = $('<input class="card-year" min="2017" max="2025" maxlength="4">');
    divDate.append(label);
    divDate.append(month);
    divDate.append(slash);
    divDate.append(year);
    form.append(divInput);
    form.append(scan);
    form.append(divDate);

    const button = $('<button type="button" class="btn" disabled>Crear cuenta</button>');
    form.append(button);
    section.append(step);
    section.append(form);

    cardNumber.NumberOnly();
    cardNumber.on('keyup', () => {
        if (cardNumber.val().length == 16 &&
            month.val() > 0 && month.val() < 13 &&
            year.val() >= 2017 && year.val() <= 2025) {
            state.cardNumber = cardNumber.val();
            state.cardMonth = month.val();
            state.cardYear = year.val();
            button.removeAttr('disabled');
        } else {
            button.attr('disabled');
        }
    });

    month.NumberOnly();
    month.on('keyup', () => {
        if (month.val() > 0 && month.val() < 13 &&
            year.val() >= 2017 && year.val() <= 2025 &&
            cardNumber.val().length == 16) {
            button.removeAttr('disabled');
            state.cardNumber = cardNumber.val();
            state.cardMonth = month.val();
            state.cardYear = year.val();
        } else {
            button.attr('disabled');
        }
    });

    year.NumberOnly();
    year.on('keyup', () => {
        if (year.val() >= 2017 && year.val() <= 2025 &&
            month.val() > 0 && month.val() < 13 &&
            cardNumber.val().length == 16) {
            button.removeAttr('disabled');
            state.cardNumber = cardNumber.val();
            state.cardMonth = month.val();
            state.cardYear = year.val();
        } else {
            button.attr('disabled');
        }
    });

    button.on('click', (e) => {
        e.preventDefault();
        state.page = 6;
        console.log(state.cardNumber);
        update();
    });

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