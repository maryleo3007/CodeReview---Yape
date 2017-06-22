'use strict';

const Code = (update) => {
    const section = $('<section class="container code"></section>');

    const step = $('<div class="step"></div>');
    const icon = $('<img src="img/icons/message.png"/>');
    const divText = $('<div class="page-text"></div>');
    const h4 = $('<h4>Ahora ingresa tu código/h4>');
    const p = $('<p>Enviamos un SMS con el código de validación <br>al número <strong>' + state.phone + '</strong></p>');
    divText.append(h4);
    divText.append(p);
    step.append(icon);
    step.append(divText);

    const form = $('<form id="send-code"></form>');
    const divInput = $('<div class="div-input"></div>');
    const iIcon = $('<img src="img/icons/lock.png">');
    const input = $('<input type="tel" name="reg-phone" id="tel" class="form-input" placeholder="- - - - - -" maxlength="6"/>');
    const timer = $('<p id="timer-text" class="text-grey">Reintentar en  <img src="img/icons/clock.png">  <span id="timer-clock"></span></p>');

    divInput.append(iIcon);
    divInput.append(input);

    form.append(divInput);
    form.append(timer);

    section.append(step);
    section.append(form);

    //Solo números en input y función de validación
    input.NumberOnly();

    //Contador para el intervalo
    let count = 21;

    //setInterval -1 cada segundo y reiniciando
    const countdown = setInterval(_ => {
        count -= 1;
        if (count == 0) {
            count = 21;
        }
        $('#timer-clock').text(count);
    }, 1000);

    //POST para nuevo código
    const resend = () => {
        $.post('./api/resendCode', {
            "phone": state.phone
        }, (result) => {
            if (result.succes != false) {
                state.code = result.data;
                console.log(state.code);
            }
        });
    }

    const getNewCode = setInterval(_ => {
        resend();
    }, 21000);

    //Validación
    input.on('keyup', () => {
        if (input.val() == state.code) {
            clearInterval(getNewCode);
            state.page = 3;
            update();
        }
    });

    return section;
}

//En consola otra vez indica error cuando se escribe con ES6. Verificar...
jQuery.fn.NumberOnly = function() {
    return this.each(function() {
        $(this).keydown(function(e) {
            const key = e.charCode || e.keyCode || 0;
            return (
                key == 8 || key == 9 ||
                key == 110 || key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
        });
    });
};