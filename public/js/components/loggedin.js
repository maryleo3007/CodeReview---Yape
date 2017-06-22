'use strict';

const Logged = () => {
    const section = $('<section class="container logged"></section>');
    const div = $('<div class="div-logged"></div>');
    const img = $('<img src="img/icons/happy-face.png">');
    const h4 = $('<h4 class="text-darkgrey">Hola</h4>');
    const p = $('<p class="text-green"><img src="img/icons/eye.png">Mostrar saldo</p>');
    div.append(img);
    div.append(h4);
    div.append(p);

    section.append(div);

    return section;
}