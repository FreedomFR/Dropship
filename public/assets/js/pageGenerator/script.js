const TEMPLATES = {
    'card': `
            <div class="card" style="width: 18rem;">
                <img src="/assets/imagesTENDANCE/logo-site.webp" class="card-img-top" alt="">
                <div class="card-body">
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
            `,
    '3cards': `
    <div class="row">
        <div class="card col-sm-6" style="">
            <img src="/assets/imagesTENDANCE/logo-site.webp" class="card-img-top" alt="">
            <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>

        <div class="card col-sm-6" style="">
            <img src="/assets/imagesTENDANCE/logo-site.webp" class="card-img-top" alt="">
            <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>

        <div class="card col-sm-6" style="">
            <img src="/assets/imagesTENDANCE/logo-site.webp" class="card-img-top" alt="">
            <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
    </div>
    `
};
class MapElements {
    elements = [];
    constructor(elements = []) {
        this.elements = elements;
    }
    getElements() {
        return this.elements;
    }
    AddElement(addElement) {
        this.elements.push(addElement);
    }
    updateElement(posElement, element) {
        this.elements[posElement] = element;
    }
    removeElement(posElement) {
        this.elements.splice(posElement, 1);
    }
    getNextPosition() {
        return this.elements[this.elements.length - 1].position + 1;
    }
}

class ElementPage {
    id;
    taille;
    height;
    type;
    position;
    elements = [];
    constructor(id = "", taille = "", type = "", height = "", position = "") {
        this.id = id;
        this.taille = taille;
        this.type = type;
        this.height = height;
        this.position = position;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getTaille() {
        return this.taille;
    }
    setTaille(taille) {
        this.taille = taille;
    }
    getType() {
        return this.type;
    }
    setType(type) {
        this.type = type;
    }
    getHeight() {
        return this.height;
    }
    setHeight(height) {
        this.height = height;
    }
}
class Type {
    id;
    type;
    text;
    image;
    href;
    constructor(id = "", type = "", text = "", image = "", href = "") {
        this.id = id;
        this.type = type;
        this.text = text;
        this.image = image;
        this.href = href;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getType() {
        return this.type;
    }
    setType(type) {
        this.type = type;
    }
    getText() {
        return this.text;
    }
    setText(text) {
        this.text = text;
    }
    getImage() {
        return this.image;
    }
    setImage(image) {
        this.image = image;
    }
    getHref() {
        return this.href;
    }
    setHref(href) {
        this.href = href;
    }
}

function addElement(elementParent) {
    let position = 1;
    if (mapElements.elements.length > 0) {
        // position du dernier element + 1
        position = mapElements.elements[mapElements.elements.length - 1].position + 1;
    }
    var element = new ElementPage("", elementParent.childNodes[1].value, "", elementParent.childNodes[2].value, position);
    mapElements.AddElement(element);
    printElementsWithElement();
}

function printElementsWithElement() {
    var HTMLreturn = "";
    document.getElementById("elements").innerHTML = "";
    var elementMax = 12;
    var posElement = 0;
    mapElements.getElements().forEach(element => {

        var arrayElementOption = {
            "": "",
            "h1": "Très grand titre",
            "h2": "Grand titre",
            "h3": "Text moyen grand",
            "h4": "Text moyen",
            "h5": "Text petit",
            "h6": "Text très petit",
            "p": "Text",
            "img": "Image",
            "a": "lien",
            "div": "div"
        };

        var div = document.createElement("div");
        div.classList.add("col-" + element.getTaille());
        div.style.height = element.getHeight() + "px";
        div.style.border = "1px solid #e6e6e6";
        div.innerHTML = element.getTaille() + "/" + element.getHeight();

        var select = document.createElement("select");
        select.setAttribute('onchange', 'addTypeElement(this.parentNode, this.value, ' + posElement + ')');

        select.id = "type-select";
        select.name = "type";

        for (const [key, value] of Object.entries(arrayElementOption)) {

            var option = document.createElement("option");
            if (element.getType() != "") {
                if (key == element.getType().getType()) {
                    option.selected = true;
                }
            }
            option.value = key;
            option.text = value;

            select.add(option);
        }

        div.appendChild(select);

        var inputText = document.createElement("input");
        inputText.type = "text";
        inputText.value = element.getTaille();
        inputText.setAttribute('onchange', 'changeTailleInElement(this.parentNode, this.value, ' + posElement + ')');
        inputText.style.width = "50px";
        inputText.style.textAlign = "center";
        div.appendChild(inputText);

        var inputText = document.createElement("input");
        inputText.type = "text";
        inputText.value = element.getHeight();
        inputText.setAttribute('onchange', 'changeHeightInElement(this.parentNode, this.value, ' + posElement + ')');
        inputText.style.width = "50px";
        inputText.style.textAlign = "center";
        div.appendChild(inputText);

        var button = document.createElement("button");
        button.setAttribute('onclick', 'deleteElement(' + posElement + ')');
        button.type = 'button';
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
        button.style.setProperty('width', '50px', 'important');
        button.style.textAlign = "center";
        button.classList.add("simple-button");
        div.appendChild(button);




        if (element.getType() && element.getType().getType() == "img") {
            if (element.getType().getImage()) {
                if (typeof element.getType().getImage() == "string") {
                    var inputImg = document.createElement("input");

                    inputImg.type = "file";
                    inputImg.name = "filesElement";
                    inputImg.id = "filesElement";
                    if (element.getType() != "") {
                        if (element.getType().getImage()) {
                            // inputImg.value = element.getType().getImage();
                        }
                    }
                    inputImg.classList.add("col-12");

                    inputImg.setAttribute('onchange', 'changeFileInElement(this.parentNode, this, ' + posElement + ')');
                    div.appendChild(inputImg);
                } else {
                    div.appendChild(element.getType().getImage());
                }
                var img = document.createElement("img");
                if (typeof element.getType().getImage() == "string") {
                    img.classList.add("col-3");
                    img.style.height = "50px";
                    img.src = ASSET_IMAGES_FOLDER + element.getType().getImage();
                    div.appendChild(img); // En admettant que "elementParent" est l'élément div qui contiendra le contenu affiché.
                } else {
                    file = element.getType().getImage().files[0];
                    img.classList.add("col-3");
                    img.file = file;
                    img.style.height = "50px";
                    div.appendChild(img); // En admettant que "elementParent" est l'élément div qui contiendra le contenu affiché.
                    var reader = new FileReader();
                    reader.onload = (function (aImg) { return function (e) { aImg.src = e.target.result; }; })(img);
                    if (file) {
                        reader.readAsDataURL(file);
                    }
                }
            } else {
                var inputImg = document.createElement("input");

                inputImg.type = "file";
                inputImg.name = "filesElement";
                inputImg.id = "filesElement";
                if (element.getType() != "") {
                    if (element.getType().getImage()) {
                        inputImg.value = element.getType().getImage();
                    }
                }
                inputImg.classList.add("col-12");

                inputImg.setAttribute('onchange', 'changeFileInElement(this.parentNode, this, ' + posElement + ')');
                div.appendChild(inputImg);

            }

        } else if (element.getType() != "") {

            var inputText = document.createElement("input");
            if (element.getType().getType() == "p" || element.getType().getType() == "div") {
                var inputText = document.createElement("textarea");
                inputText.innerHTML = element.getType().getText();
            } else {
                inputText.type = "text";
                if (element.getType() != "") {
                    if (element.getType().getType() != "") {
                        if (element.getType().getText()) {
                            inputText.value = element.getType().getText();
                        }
                    }
                }
            }
            inputText.classList.add("col-12", "input-element");
            inputText.setAttribute('onchange', 'changeTextInElement(this.parentNode, this.value, ' + posElement + ')');
            inputText.placeholder = "Text";
            div.appendChild(inputText);

            if (element.getType().getType() == "a") {
                var inputText = document.createElement("input");

                inputText.type = "text";
                if (element.getType() != "") {
                    if (element.getType().getHref()) {
                        inputText.value = element.getType().getHref();
                    }
                }
                inputText.classList.add("col-12");
                inputText.setAttribute('onchange', 'changeHrefInElement(this.parentNode, this.value, ' + posElement + ')');
                inputText.placeholder = "Url";

                div.appendChild(inputText);
            }

            if (element.getType() != "") {
                if (element.getType().getText()) {
                    var text = document.createElement(element.getType().getType());
                    text.innerHTML = element.getType().getText();
                    if (element.getType().getType() == "a") {
                        text.href = element.getType().getHref();
                    }
                    div.appendChild(text);

                }
            }


        }


        document.getElementById("elements").appendChild(div);

        elementMax = (elementMax - parseInt(element.getTaille()));
        if (elementMax <= 0) {
            elementMax = 12;
        }
        posElement = posElement + 1;
    });

    var div = document.createElement("div");
    div.classList.add("col-" + elementMax);
    div.id = "element";

    var button = document.createElement("button");
    button.setAttribute('onclick', 'addElement(this.parentNode)');
    button.innerHTML = "<svg xmlns='http://www.w3.org/2000/svg' width='24'"
        + "height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'"
        + "stroke-linecap='round' stroke-linejoin='round' class='feather feather-plus'>"
        + "<line x1='12' y1='5' x2='12' y2='19'></line>"
        + "<line x1='5' y1='12' x2='19' y2='12'></line>"
        + "</svg>";

    button.classList.add("col-12");
    button.classList.add("simple-button");

    div.appendChild(button);

    var inputText = document.createElement("input");
    inputText.type = "hidden";
    inputText.placeholder = "Taille (1-" + elementMax + ")";
    inputText.value = elementMax;
    inputText.classList.add("col-12");
    div.appendChild(inputText);

    var inputText = document.createElement("input");
    inputText.type = "hidden";
    inputText.placeholder = "Hauteur (px)";
    inputText.classList.add("col-12");
    div.appendChild(inputText);
    document.getElementById("elements").appendChild(div);
}

function TotalVue(ev) {
    $('#page-element-edition').addClass('d-none');
    $('#element').removeClass('element-wrapper');
    $('#element-parent').addClass('element-parent-wrapper');
    ev.preventDefault();
    document.getElementById("simpleBTN").style.color = "";
    document.getElementById("updateBTN").style.color = "black";
    printElementsWithElement();
    hideAddTemplateButton();
    hideEditElement();
    hideEditImg();
    hideTemplateMenu();
}

function printElementsVueSimple() {
    var HTMLreturn = "";
    var elementMax = 12;
    var posElement = 0;
    document.getElementById("elements").innerHTML = "";
    var div = document.createElement("div");
    document.getElementById("elements").appendChild(div);
    mapElements.getElements().forEach(element => {

        div.classList.add("col-" + element.getTaille());
        div.style.height = element.getHeight() + "px";

        if (element.getType() && element.getType().getType() == "img") {
            var img = document.createElement("img");
            if (typeof element.getType().getImage() == "string") {
                img.classList.add("col-12");
                img.style.width = "100%";
                img.style.height = "100%";
                img.src = "{{ asset('/assets/images/') }}" + element.getType().getImage();
                div.appendChild(img); // En admettant que "elementParent" est l'élément div qui contiendra le contenu affiché.
            } else {
                file = element.getType().getImage().files[0];
                img.classList.add("col-12");
                img.file = file;
                img.style.width = "100%";
                img.style.height = "100%";
                div.appendChild(img); // En admettant que "elementParent" est l'élément div qui contiendra le contenu affiché.
                var reader = new FileReader();
                reader.onload = (function (aImg) { return function (e) { aImg.src = e.target.result; }; })(img);
                if (file) {
                    reader.readAsDataURL(file);
                }
            }
        } else if (element.getType() != "") {
            var text = document.createElement(element.getType().getType());
            text.innerHTML = element.getType().getText();
            if (element.getType().getType() == "a") {
                text.href = element.getType().getHref();
            }
            div.appendChild(text);
        }
        elementMax = (elementMax - parseInt(element.getTaille()));
        if (elementMax <= 0) {
            elementMax = 12;
        }
        posElement = posElement + 1;
    });
    var button = document.createElement("button");
    button.setAttribute('onclick', 'addElementHTML(event)');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#exampleModalCenter');
    button.innerHTML = 'Ajouter un nouvel element 🙂';
    button.style.textAlign = "center";
    button.classList.add("simple-button"); 
    button.classList.add("col-12");
    div.appendChild(button);

    // if (mapElements.getElements().length == 1) {
    //     elementParent.parentNode.parentNode.innerHTML = HTMLreturn;
    // } else {
    //     elementParent.parentNode.innerHTML = HTMLreturn;
    // }
}

function addElementHTML(ev) {
    $('#exampleModalCenter').modal('show');
    ev.preventDefault()
}

var lastModel = "";
function addModel(model) {
    var element = new ElementPage("", 12, "", "");
    var type = new Type("", "div", document.getElementById(model).innerHTML, "");
    element.setType(type);
    mapElements.AddElement(element);
    document.getElementById("back-page").innerHTML = "<div class='position-fixed alert alert-" + arrayInfo[1] + "' id='alert' role='alert'><strong>" + arrayMsg[1] + " Élément ajouté 🙂!</strong></div>";
    window.setTimeout(function () {
        $("#alert").fadeTo(500, 0).slideUp(500, function () {
            $(this).remove();
        });
    }, 1000);
    printElementsVueSimple();
    addEditVueSimple();
    if (lastModel != "") {
        getModele(lastModel);
    }
}

function getModele(model) {
    lastModel = model;
    var HTML = "<div class='row d-flex justify-content-center' style='margin-top: 150px;' id='compte'>" +
        "<svg class='snurra' width='200' height='200' viewBox='0 0 200 200'>" +
        "<defs>" +
        "<linearGradient id='linjärGradient'>" +
        "<stop class='stopp1' offset='0' />" +
        "<stop class='stopp2' offset='1' />" +
        "</linearGradient>" +
        "<linearGradient y2='160' x2='160' y1='40' x1='40' gradientUnits='userSpaceOnUse'" +
        "id='gradient' xlink:href='#linjärGradient' />" +
        "</defs>" +
        "<path class='halvan'" +
        "d='m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64' />" +
        "<circle class='strecken' cx='100' cy='100' r='64' />" +
        "</svg>" +
        "<svg class='skugga' width='200' height='200' viewBox='0 0 200 200'>" +
        "<path class='halvan'" +
        "d='m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64' />" +
        "<circle class='strecken' cx='100' cy='100' r='64' />" +
        "</svg>" +
        "</div>";
    document.getElementById("models-download").innerHTML = HTML;

    var param = JSON.stringify({
        x: {
            'model': model,
        }
    });
    $.ajax({
        type: "POST",
        url: PATH_GET_MODEL,
        dataType: 'html',
        data: {
            PARAM: param
        },
        success: function (retour) {
            document.getElementById("models-download").innerHTML = retour;
        }
    });
}

// Fonction récursive (vérifie si l'élément actuel contient du text), 
// sinon si l'élémént a des enfant, parcours ses enfant jusqu'a qu'on trouve du texte
function findChildrenUntilText(el) {
    let listChildren = el.querySelectorAll("*:not(br):not(i):not([position-wrapper])");
    if (listChildren.length > 0) {
        // Pour les iframes
        if($(el).find(">:first-child").hasClass('youtube-embed-wrapper')){
            $('.youtube-embed-wrapper iframe').css('pointer-events', 'none');
            el.addEventListener("click", editYoutubeLinkHandler);
            $(el).addClass('editable');
        }
        // Nécessaire pour les accordions
        if (listChildren.length == 1) {
            // Si element a du texte
            if (el.textContent != "" && listChildren[0].tagName == "I") {
                el.addEventListener("click", editElementHandler);
                $(el).addClass('editable');
            }
        } else {
            for (let i = 0; i < listChildren.length; i++) {
                findChildrenUntilText(listChildren[i]);
            }
        }
    } else {
        if ($(el).hasClass('position-wrapper')) {
            return;
        }
        // Si element a du texte
        if (el.textContent != "") {
            el.addEventListener("click", editElementHandler);
            $(el).addClass('editable');
        }
        // Si element est une image
        if (el.tagName == "IMG") {
            $(el).addClass('img-editable');
            el.addEventListener("click", editImgHandler);
        }
    }
}


/**
 * Youtube iframe functions
 */
var oldYoutubeLink = "";
var currentEditableIframe = null;
//Lancer l'éditition
function editYoutubeLinkHandler(){
    // Si modification d'élément en cours, annuler
    if (isEditionOn) {
        cancelEditElement();
        cancelEditImg();
    }
    $('#page-youtube-edition').removeClass('d-none');
    oldYoutubeLink = $(this).find('iframe').attr('src');
    $('#inputYoutubeLink').val(oldYoutubeLink);
    currentEditableIframe = $(this);
    isEditionOn = true;
}
// Annuler édition
function cancelYoutubeLinkEdit(){
    if (isEditionOn) {
        oldYoutubeLink = "";
        currentEditableIframe = null;
        $('#page-youtube-edition').addClass('d-none');
        isEditionOn = false;
    }
};
// Appliquer édition
function applyYoutubeLinkEdit(){
    let oldSource = currentEditableIframe.find('iframe').attr('src');
    let newSource = $('#inputYoutubeLink').val();

    if (newSource.includes("watch?v=")) {
        newSource = newSource.replace('watch?v=', 'embed/');
        newSource = newSource.split('&')[0];
    }
    if (newSource.includes("youtu.be/")) {
        newSource = newSource.replace('youtu.be/', 'www.youtube.com/embed/');
    }
    currentEditableIframe.find('iframe').attr('src', newSource);



    // edit src in elements list
    findAndReplaceMapElements(false, newSource, oldSource, false, "iframe");
    printElementsVueSimple();
    addEditVueSimple();
};

function cancelEditElement() {
    if (isEditionOn) {
        let el = currentEditable;
        $(currentEditable).html('');
        $(currentEditable).html(oldContent);
        isEditionOn = false;
        currentEditable = null;
        oldContent = "";
        if (el) { el.addClass('editable'); }
        SimpleVue(false);
        $('#edit-element-textarea').val('');
        $('#page-element-edition').addClass('d-none');
    }
}

function confirmEditElement() {
    if (isEditionOn) {
        let el = currentEditable;
        let newValue = $('#edit-element-textarea').val();
        $(currentEditable).html('');
        $(currentEditable).html(newValue);
        newValue = newValue.replace(/\n/g, "<br>");  // \n --> <br>
        findAndReplaceMapElements(currentEditable.attr('id'), newValue, oldContent);
        oldContent = "";
        currentEditable = null;
        isEditionOn = false;
        el.addClass('editable');
        // SavePage();
        SimpleVue(false);
        $('#edit-element-textarea').val('');
        $('#page-element-edition').addClass("d-none");
    }
}

var oldImageSource = "";
var currentEditableImg = null;
function editImgHandler() {
    // Si modification d'élément en cours, annuler
    if (isEditionOn) {
        cancelEditElement();
        cancelYoutubeLinkEdit();
    }
    hideTemplateMenu();
    currentEditableImg = $(this);
    let cp = this.cloneNode(true);
    $(cp).removeClass('img-editable');
    // Créer un preview dans #page-img-edition
    $('#page-img-edition').removeClass('d-none');
    $('#img-edition-display').html('');
    $('#img-edition-display').append(cp);
    // Attacher l'event pour afficher le preview quand on load une image
    document.getElementById("page-img-input").addEventListener("change", loadNewPageImagePreview);
    isEditionOn = true;
}

function cancelImgEdit() {
    oldImageSource = "";
    currentEditableImg = null;
    $('#img-edition-display').html('');
    $('#page-img-edition').addClass('d-none');
    document.getElementById("page-img-input").removeEventListener("change", loadNewPageImagePreview, { passive: true });
    isEditionOn = false;
}

var isEditionOn = false;
var currentEditable = null;
var oldContent = "";
//rendre l'élément actuel modifiable
// function addEditToElement(el){
function editElementHandler() {
    // si modification d'image en cours, annuler
    if (currentEditableImg) { 
        cancelImgEdit(); 
    }
    cancelYoutubeLinkEdit();
    hideTemplateMenu();
    $('#page-element-edition').removeClass('d-none');

    let el = $(this);
    // retirer les espaces du contenu actuel
    let content = el.html().trim();
    oldContent = content;
    // <br> --> \n
    content = content.replace(/<br ?\/?>/ig, "\n");
    $('#edit-element-textarea').val(content);
    currentEditable = el;
    isEditionOn = true;
}

// afficher le preview quand on load une image
function loadNewPageImagePreview() {
    if (this.files && this.files[0]) {
        var FR = new FileReader();
        FR.addEventListener("load", function (e) {
            oldImageSource = document.getElementById('img-edition-display').querySelector('img').getAttribute('src');
            document.getElementById('img-edition-display').querySelector('img').src = e.target.result;
            document.getElementById("page-img-buttons").classList.add("d-flex");
            document.getElementById("page-img-buttons").classList.remove("d-none");
        });
        FR.readAsDataURL(this.files[0]);
    }
}

function cancelEditImg() {
    document.getElementById("page-img-buttons").classList.remove("d-flex");
    document.getElementById("page-img-buttons").classList.add("d-none");
    //remettre l'ancienne img
    if(document.getElementById('img-edition-display').querySelector('img')){
        document.getElementById('img-edition-display').querySelector('img').src = oldImageSource;
    }
    oldImageSource = "";
}


function confirmEditImg() {
    //remplacer l'img origine par celle uploadée
    saveImgPreview();
    // TODO Sauvegarder l'image en bdd et mettre son nom dans src
    currentEditableImg.src = document.getElementById('img-edition-display').querySelector('img').src;
    //vider le preview
    document.getElementById("img-edition-display").innerHTML = '';
    document.getElementById("page-img-buttons").classList.remove("d-flex");
    document.getElementById("page-img-buttons").classList.add("d-none");
    //cacher
    document.getElementById("page-img-edition").classList.add("d-none");
}

function addEditVueSimple() {
    const myElement = document.getElementById('elements');
    var listElements = myElement.querySelectorAll("*");
    // Si l'élément n'est pas vide, le rendre modifiable
    for (let i = 0; i < listElements.length; i++) {
        findChildrenUntilText(listElements[i]);
    }
}

//Ajouter les boutons de position pour chaque élément
function addPositionArrows() {
    // let elementsNodeList = document.querySelectorAll("[data-position]");
    // elementsNodeList.forEach(el => {
    //     el.classList.add('relative');
    //     el.innerHTML += `
    //     <div id="position-wrapper-${el.getAttribute('data-position')}" data-elementId="${el.getAttribute('data-position')}" class="d-flex flex-column position-wrapper" style="
    //         font-size:13px;
    //         width:22px;
    //         position: absolute;
    //         top: ${el.offsetTop};
    //         transform: translateX(-34px);
    //         ">
    //         <i onclick="position(this, 'up', this.parentElement.parentElement.previousSibling)" class="fa-solid fa-arrow-up p-1 rounded btn-arrow-deplacer border"></i>
    //         <i onclick="position(this, 'down', this.parentElement.parentElement.nextSibling)" class="fa-solid fa-arrow-down p-1 rounded btn-arrow-deplacer border"></i>
    //     </div>
    //     `;
    //     document.getElementById(`position-wrapper-${el.getAttribute('data-position')}`).addEventListener("mouseenter", addFrameToElementOnHover);
    //     document.getElementById(`position-wrapper-${el.getAttribute('data-position')}`).addEventListener("mouseleave", removeFrameFromElementOnHover);
    // });
}

//Cadre sur l'élément quand on survole les btn de positionnement
function addFrameToElementOnHover() {
    let id = this.getAttribute('data-elementId');
    $(`[data-position=${id}]`).css("border", "1px solid gray");
}

function removeFrameFromElementOnHover() {
    let id = this.getAttribute('data-elementId');
    $(`[data-position=${id}]`).css("border", "none");
}

function position(el, direction, sibling) {
    let element = el.parentElement.parentElement;

    if (sibling) {
        let currentElementPosition = element.getAttribute('data-position');
        let currentElPositionWrapper = el.parentElement;
        let siblingId = sibling.getAttribute('data-position');
        let positionWrapperSibling = $(`#position-wrapper-${siblingId}`);

        if (direction == 'up') {
            $(sibling).insertAfter(element);
            // Switch form position (edit) - modification position form
            // ($(`#element-form-${currentElementPosition}`)[0].previousSibling).insertAfter($(`#element-form-${currentElementPosition}`)[0]);
        }
        if (direction == 'down') {
            $(sibling).insertBefore(element);
            // Switch form position (edit) - modification position form
            // ($(`#element-form-${currentElementPosition}`)[0].nextSibling).insertBefore($(`#element-form-${currentElementPosition}`)[0]);
        }

        $(currentElPositionWrapper).css("top", element.offsetTop);
        positionWrapperSibling.css("top", sibling.offsetTop);
        // Switch data-position && mapElements Index
        // position-wrapper - gen
        $(el.parentElement).attr("id", `position-wrapper-${siblingId}`);
        el.parentElement.setAttribute("data-elementid", siblingId);
        // data-position - gen
        element.setAttribute("data-position", siblingId);

        // position-wrapper - sibling
        positionWrapperSibling[0].setAttribute("data-elementid", currentElementPosition);
        positionWrapperSibling.attr("id", `position-wrapper-${currentElementPosition}`);
        // data-position - sibling
        sibling.setAttribute("data-position", currentElementPosition);

        switchMapElementsPositions(currentElementPosition, siblingId);
        // SavePage();
    }
}

function switchMapElementsPositions(pos1, pos2) {
    let tmp = mapElements.elements[pos1].position;
    mapElements.elements[pos1].position = mapElements.elements[pos2].position;
    mapElements.elements[pos2].position = tmp;
}

function printElementsWithElementForType(elementParent, value) {
    var HTMLreturn = "";
    HTMLreturn += "<" + value + ">TEST</" + value + ">";
    elementParent.innerHTML += HTMLreturn;
}

function addTypeElement(elementParent, value, posElement) {
    var element = mapElements.getElements()[posElement];
    var type = new Type("", value, "", "");
    element.getType();
    if (element.getType() != "") {
        type = element.getType();
        type.setType(value);
    }
    element.setType(type);
    mapElements.updateElement(posElement, element);
    printElementsWithElement();
}
function changeTailleInElement(elementParent, value, posElement) {
    mapElements.getElements()[posElement].setTaille(value);
    printElementsWithElement();
}
function changeHeightInElement(elementParent, value, posElement) {
    mapElements.getElements()[posElement].setHeight(value);
    printElementsWithElement();
}
function deleteElement(posElement) {
    mapElements.removeElement(posElement);
    printElementsWithElement();
}
function changeTextInElement(elementParent, value, posElement) {
    mapElements.getElements()[posElement].getType().setText(value);
    printElementsWithElement();
}
function changeHrefInElement(elementParent, value, posElement) {
    mapElements.getElements()[posElement].getType().setHref(value);
    printElementsWithElement();
}
function changeFileInElement(elementParent, file, posElement) {
    mapElements.getElements()[posElement].getType().setImage(file);
    printElementsWithElement();
}

function SimpleVue(ev = false) {
    $('#element').addClass('element-wrapper');
    $('#element-parent').addClass('element-parent-wrapper');
    if (ev) { ev.preventDefault(); }
    document.getElementById("simpleBTN").style.color = "black";
    document.getElementById("updateBTN").style.color = "";
    printElementsVueSimple();
    addPositionArrows();
    addEditVueSimple();
    addTemplateButton();
}

function addTemplateButton() {
    // Ajouter btn si inexistant
    if (!$('#btn-add-template').length) {
        // $('#element').append(`<div class="col-12 d-flex justify-content-center" id="element-template"><button type="button" id="btn-add-template" class="btn btn-primary d-flex justify-content-center" data-toggle="modal" data-target="#exampleModalLong">Ajouter un element 🙂</button></div>`);
        $('#element-template').append(`<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>`);
    }
}

function addTemplate(templateName) {
    let type = new Type("", "div", TEMPLATES[templateName]);
    let el = new ElementPage("", 12, type, "", mapElements.getNextPosition());
    mapElements.AddElement(el);
    SimpleVue();
}

function showTemplateMenu() {
    $('#page-template-list').removeClass('d-none');
}
function hideTemplateMenu() {
    $('#page-template-list').addClass('d-none');
}
function hideEditElement() {
    $('#page-element-edition').addClass('d-none');
}

function hideEditImg() {
    $('#page-img-edition').addClass('d-none');
}

function hideAddTemplateButton() {
    $('#btn-add-template').addClass('d-none');
}

function getFormPage(idPage = "") {
    loader();
    var param = JSON.stringify({
        x: {
            'idPage': idPage
        }
    });
    $.ajax({
        type: "POST",
        url: PATH_ADD_NEW_PAGE,
        dataType: 'html',
        data: {
            PARAM: param
        },
        success: function (retour) {
            document.getElementById("compte").innerHTML = retour;
            document.getElementById("element").innerHTML = "<div class='col row' id='elements' style='border: 1px solid #e6e6e6;'>"
                + "<button type='submit' class='col-12 simple-button'"
                + "onclick='addElement(this.parentNode);'><svg xmlns='http://www.w3.org/2000/svg' width='24'"
                + "height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'"
                + "stroke-linecap='round' stroke-linejoin='round' class='feather feather-plus'>"
                + "<line x1='12' y1='5' x2='12' y2='19'></line>"
                + "<line x1='5' y1='12' x2='19' y2='12'></line>"
                + "</svg></button>";
            + "</div>";

            mapElements = new MapElements();
            var savePage = document.getElementById("savePage").innerHTML;
            document.getElementById("savePage").innerHTML = "";
            if (savePage != "") {
                if (savePage.trim() != "") {
                    savePage = JSON.parse(savePage);
                    savePage.elements.forEach(element => {
                        var type = "";
                        if (element.ElementType) {
                            var type = new Type(element.ElementType.id, element.ElementType.type, element.ElementType.text, element.ElementType.image, element.ElementType.href);
                        }
                        var element = new ElementPage(element.id, element.taille, type, element.height, element.position);
                        mapElements.AddElement(element);
                    });
                }
            }
            printElementsWithElement();
            var updateText = document.getElementsByTagName("textarea");
            for (i = 0; i < updateText.length; ++i) {
                try {
                    textarea = updateText[i];
                    textarea.onchange();
                } catch (error) {

                }
            }
        }
    });
}

function getFormArticle(idArticle = "") {
    loader();
    var param = JSON.stringify({
        x: {
            'idPage': idArticle
        }
    });
    $.ajax({
        type: "POST",
        url: PATH_ADD_NEW_ARTICLE,
        dataType: 'html',
        data: {
            PARAM: param
        },
        success: function (retour) {
            document.getElementById("compte").innerHTML = retour;
            document.getElementById("element").innerHTML = "<div class='col row' id='elements' style='border: 1px solid #e6e6e6;'>"
                + "<button type='submit' class='col-12 simple-button'"
                + "onclick='addElement(this.parentNode);'><svg xmlns='http://www.w3.org/2000/svg' width='24'"
                + "height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'"
                + "stroke-linecap='round' stroke-linejoin='round' class='feather feather-plus'>"
                + "<line x1='12' y1='5' x2='12' y2='19'></line>"
                + "<line x1='5' y1='12' x2='19' y2='12'></line>"
                + "</svg></button>";
            + "</div>";

            mapElements = new MapElements();
            var savePage = document.getElementById("savePage").innerHTML;
            document.getElementById("savePage").innerHTML = "";
            if (savePage != "") {
                if (savePage.trim() != "") {
                    savePage = JSON.parse(savePage);
                    savePage.elements.forEach(element => {
                        var type = "";
                        if (element.ElementType) {
                            var type = new Type(element.ElementType.id, element.ElementType.type, element.ElementType.text, element.ElementType.image, element.ElementType.href);
                        }
                        var element = new ElementPage(element.id, element.taille, type, element.height, element.position);
                        mapElements.AddElement(element);
                    });
                }
            }
            printElementsWithElement();
            var updateText = document.getElementsByTagName("textarea");
            for (i = 0; i < updateText.length; ++i) {
                try {
                    textarea = updateText[i];
                    textarea.onchange();
                } catch (error) {

                }
            }
        }
    });
}

function newPage(ev, idPage = "") {
    ev.preventDefault();
    document.getElementById("updateBTN").onclick(ev);
    var myForm = document.getElementById('newPage');
    formData = new FormData(myForm);
    var images = 0;
    mapElements.getElements().forEach(Element => {
        if (Element.getType() != "") {
            if (Element.getType().getType() == "img") {
                if (typeof Element.getType().getImage() != "string") {
                    formData.append("images" + images, Element.getType().getImage().files[0]);
                    Element.getType().setImage(Element.getType().getImage().files[0].name);
                    images = images + 1;
                } else {
                    if (Element.getType().getImage() != "") {
                        images = images + 1;
                    }
                }
            }
        }
    });
    formData.append('mapElements', JSON.stringify(mapElements));
    formData.append('idPage', idPage);
    // debug formData
    // for (var [key, value] of formData.entries()) { 
    //     console.log(key, value);
    // }
    $.ajax({
        type: "POST",
        url: PATH_UPDATE_PAGE,
        data: formData,
        processData: false,
        contentType: false,
        success: function (retour) {
            var retour = JSON.parse(retour);
            if (retour.code == 2) {
                retour.data.forEach(element => {
                    document.getElementById(element).style.borderColor = "#fd0000"
                });
            }
            document.getElementById("back").innerHTML = "<div class='position-fixed alert alert-" + arrayInfo[retour
                .code] + "' id='alert' role='alert'><strong>" + arrayMsg[retour.code] + " " + retour.message +
                "!</strong></div>";
            window.setTimeout(function () {
                $(".alert").fadeTo(500, 0).slideUp(500, function () {
                    $(this).remove();
                    getAllPage();
                });
            }, 1000);
        }
    });
}

function newArticle(ev, idPage = "") {
    ev.preventDefault();
    document.getElementById("updateBTN").onclick(ev);
    var myForm = document.getElementById('newPage');
    formData = new FormData(myForm);
    var images = 0;
    mapElements.getElements().forEach(Element => {
        if (Element.getType() != "") {
            if (Element.getType().getType() == "img") {
                if (typeof Element.getType().getImage() != "string") {
                    formData.append("images" + images, Element.getType().getImage().files[0]);
                    Element.getType().setImage(Element.getType().getImage().files[0].name);
                    images = images + 1;
                } else {
                    if (Element.getType().getImage() != "") {
                        images = images + 1;
                    }
                }
            }
        }
    });
    formData.append('mapElements', JSON.stringify(mapElements));
    formData.append('idPage', idPage);
    // debug formData
    // for (var [key, value] of formData.entries()) { 
    //     console.log(key, value);
    // }
    $.ajax({
        type: "POST",
        url: PATH_UPDATE_PAGE,
        data: formData,
        processData: false,
        contentType: false,
        success: function (retour) {
            var retour = JSON.parse(retour);
            if (retour.code == 2) {
                retour.data.forEach(element => {
                    document.getElementById(element).style.borderColor = "#fd0000"
                });
            }
            document.getElementById("back").innerHTML = "<div class='position-fixed alert alert-" + arrayInfo[retour
                .code] + "' id='alert' role='alert'><strong>" + arrayMsg[retour.code] + " " + retour.message +
                "!</strong></div>";
            window.setTimeout(function () {
                $(".alert").fadeTo(500, 0).slideUp(500, function () {
                    $(this).remove();
                    getAllArticles();
                });
            }, 1000);
        }
    });
}

// remplacer l'ancienne valeur par la nouvelle valeur dans MapElements
// PS: mapElements contient le nb d'éléménts enregistré en bdd (element != element HTML)
// on peut avoir que 1 element qui contient PLEIN d'éléménts HTML
function findAndReplaceMapElements(id = false, newValue, oldValue, isImage = false, type = false) {
    let found = false;
    let idPosition = -1;
    mapElements.getElements().forEach(el => {
        if (id) { idPosition = el.getType().text.indexOf(id); }
        // remplacement iframe
        if(type == "iframe"){
            let strpos = el.getType().text.indexOf(oldValue);
            if (strpos != -1) {
                el.getType().text = el.getType().text.replace(oldValue, newValue);
                found = true;
            }
        }
        // remplacement text
        if (!isImage) {
            if (found) { return };
            if (el.getType() != "") {
                // Si Id est défini, remplacer la valeur qui vient apres Id
                let strpos = el.getType().text.indexOf(oldValue);
                if (strpos != -1) {
                    if (idPosition != -1){
                        let oldSubstringId = el.getType().text.substring(idPosition);
                        newSubstringId = oldSubstringId.replace(oldValue, newValue);
                        el.getType().text = el.getType().text.replace(oldSubstringId, newSubstringId);
                        found = true;
                    }else{
                        el.getType().text = el.getType().text.replace(oldValue, newValue);
                        found = true;
                    }
                }
            }
        // remplacement image
        } else {
            if (found) { return };
            if (el.getType() != "") {
                let oldImgName = oldValue.split('/');
                oldImgName = oldImgName[oldImgName.length - 1];
                let strpos = el.getType().text.indexOf(oldValue);
                // Si l'image est incluse en tant que texte
                if (strpos != -1) {
                    el.getType().text = el.getType().text.replace(oldValue, newValue);
                    found = true;
                    // Sinon, l'image est insérée en tant qu'élémént dans mapElements
                } else if (el.getType().type == "img" && el.getType().image == oldImgName) {
                    //  "route/to/image.jpg" ---> "image.jpg"
                    let newImgName = newValue.split('/');
                    newImgName = newImgName[newImgName.length - 1];
                    el.getType().image = newImgName;
                    //update img name in bdd
                    updateImgName(el.getType().id, newImgName);
                }
            }
        }
    });
}

//update img name in bdd
function updateImgName(id, name) {
    //update img name in bdd
    $.ajax({
        type: "POST",
        url: PATH_UPDATE_IMAGE_NAME,
        data: {
            imageId: id,
            imageName: name
        },
        success: function (res) {
            console.log(res);
        }
    });
}

function saveImgPreview() {
    let input = 'page-img-input';
    // Loading icon
    let fichier = document.getElementById(input).files[0];
    let formData = new FormData();
    formData.append("pageImage", input);
    formData.append(input, fichier);
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4) {
            let res = JSON.parse(req.response);
            let imgSrc = res.imgSrc; // nouveau chemin de l'image sauvegardée
            let newSource = imgSrc.replace(/\\/g, ''); // "\/" --> "/"
            newSource = newSource.replace(/['"]+/g, ''); // '"Hello.jpg"' -> 'Hello.jpg'
            findAndReplaceMapElements(false, newSource, oldImageSource, true);
            let imgid = $(currentEditableImg).attr('id');
            $('#'+imgid).attr('src', newSource + "?" + new Date().getTime());
            currentEditableImg = null;
        }
        printElementsVueSimple();
        addEditVueSimple();
    }
    req.open("POST", PATH_UPLOAD_PAGE_IMAGE);
    req.send(formData);
}

function SavePage() {
    formData = new FormData();
    formData.append('mapElements', JSON.stringify(mapElements));
    formData.append('idPage', document.getElementById('pageId').value);
    $.ajax({
        type: "POST",
        url: PATH_UPDATE_PAGE,
        data: formData,
        processData: false,
        contentType: false,
        success: function (res) {
            // console.log(res);
        }
    });
}

var mapElements = new MapElements();