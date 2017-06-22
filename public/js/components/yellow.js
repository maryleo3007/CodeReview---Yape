'use strict';

const Yellow = (update) => {
    const section = $('<section class="container yellow"></section>');
    const div = $('<div class="div-yellow"></div>');
    const img = $('<img src="img/icons/check.png">');
    const h4 = $('<h4 class="text-darkgrey">¡Bien!</h4>');
    const p = $('<p class="text-darkgrey">Ahora ya puedes usar Yape</p>');

    div.append(img);
    div.append(h4);
    div.append(p);
    section.append(div);

    return section;
}