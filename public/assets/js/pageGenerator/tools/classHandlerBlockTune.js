class classHandlerBlockTune {

  /**
   * 
   * @param {*} data :  passed from editorjs -> blocks[i] -> tunes-> classhandler
   *  contains classes string
   */
  constructor({ api, data, config, block }) {
    this.data = data;
    this.api = api;
    this.block = block;
    this.actions = document.createElement("div");
    this.currentClasses = data ? data.classes : "";
    this.style = data ? data.style == "undefined" ? "" : data.style : "";
    // add classes to holder block
    this.loadClasses();
  }

  static get isTune() {
    return true;
  }

  // add classes to holder block
  loadClasses(){
    // console.log(`block id`, this.block.id);
    // console.log(this.block.id);
    // console.log(this.api.blocks);
    // console.log(this.api.blocks.getById("p3HqN3ued0"));
    // this.getBlockHolder().classList.add(this.data.classes);
    // console.log(this.block.id);
    // console.log(this.block);
    // console.log(this.block.holder);
    // console.log(this.getBlockHolder());
  }

  getBlock() {
    return this.block.name
  }

  render() {
    const button = document.createElement('button');
    button.classList.add(this.api.styles.button);
    button.innerHTML = `
      <svg class="icon" height="24" viewBox="0 0 24 24" width="24">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M2.53 19.65l1.34.56v-9.03l-2.43 5.86c-.41 1.02.08 2.19 1.09 2.61zm19.5-3.7L17.07 3.98c-.31-.75-1.04-1.21-1.81-1.23-.26 0-.53.04-.79.15L7.1 5.95c-.75.31-1.21 1.03-1.23 1.8-.01.27.04.54.15.8l4.96 11.97c.31.76 1.05 1.22 1.83 1.23.26 0 .52-.05.77-.15l7.36-3.05c1.02-.42 1.51-1.59 1.09-2.6zM7.88 8.75c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-2 11c0 1.1.9 2 2 2h1.45l-3.45-8.34v6.34z"/>
      </svg>`;
    button.style.padding = "3px";

    button.addEventListener('click', () => {
      this.showActions();
    });


    return button; 
  }

  showActions(){
    this.actions.innerHTML = `
      <div class="shadow rounded w-50 p-3 bg-light" style="position:fixed;top:50%;right:0; max-width:200;">
        <div style="display: flex; align-items: center; justify-content: space-between; ">
          <div style="font-weight:500">Paramètres classe/style</div>
          <button class="btn delete-button" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
              <path stroke="black" stroke-width="2.3" stroke-linecap="round" d="M5,5 L15,15 M15,5 L5,15"/>
            </svg>
          </button>
        </div>
        <!--
          <label style="display: flex; align-items: center; justify-content: space-between;font-size:.8rem;">
            <span>ID</span>
            <input class="id-input" style="width: 80%; ">
          </label>
        -->
        <label style="display: flex; align-items: center; justify-content: space-between; font-size:.8rem;">
          <span>Classe(s)</span>
          <input class="class-input" style="width: 80%;" value="${this.getBlockClasses()}">
        </label>
        <label style="display: flex; align-items: center; justify-content: space-between; font-size:.8rem;">
          <span>Style</span>
          <textarea
            class="style-textarea"
            style="resize: none; width: 80%;">${this.style}</textarea>
        </label>
        <button id="save-style-settings-button" class="btn btn-sm btn-primary float-end fw-light mt-2" type="button">Enregistrer</button>
      </div>
    `;

    let deleteButton = this.actions.querySelector(
      '.delete-button'
    );

    let saveButton = this.actions.querySelector(
      '#save-style-settings-button'
    );

    deleteButton.addEventListener('click', () => {
      this.hideActions();
    });

    saveButton.addEventListener('click', () => {
      this.updateDom(this.block.id);
      // this.hideActions();
    })

    this.api.ui.nodes.wrapper.append(this.actions);
  }

  
  wrap(blockContent) {
    // add class to childrens children (blockholder)
    let classArray = this.data.classes.split(' ');
    classArray.forEach(element => {
      blockContent.children[0].children[0].classList.add(element);
    });
    return blockContent;
  }

  hideActions(){
    this.actions.innerHTML = "";
  }

  /**
   * update le visuel du composant (DOM) en lui ajoutant les classes saisies
   * @param {*} id identifiant du composant dans editorjs.data
   */
  updateDom(id){
    let holder = this.getBlockHolder();
    // classes
    let newClasses = this.getInputClasses();
    newClasses.forEach(newClass => {
      if(newClass == ""){ return; }
      if (! holder.classList.contains(newClass)) {
        holder.classList.add(newClass);
      }
    });
    this.currentClasses = newClasses.join(' ');
    // style
    let styleInput = this.getInputStyle() == "" ? "" : ";" + this.getInputStyle();
    let oldStyleValue = holder.getAttribute('style');
    let newStyle = oldStyleValue == null ? '' : oldStyleValue;
    newStyle += styleInput;
    holder.setAttribute('style', newStyle);
    this.style = newStyle;
    this.hideActions();
  }

  // liste des classes insérées en input
  getInputClasses(){
    let input = document.querySelector('.class-input').value;
    // remplacer les espaces muliples par un seul
    input = input.replace(/\s\s+/g, ' ');
    return input.split(' ');
  }

  // style saisi dans l'input
  getInputStyle(){
    let input = document.querySelector('.style-textarea').value;
    // enlever les ""
    input = input.replace(/['"]+/g, '');
    console.log('style', input);
    return input;
  }

  getBlockClasses(){
    let array = Array.from(this.getBlockHolder().classList);
    if (array == 0) { return []; }
    // Ignorer les classes qui commencent par "ce-"
    array = array.filter(function (item) {
      return item.indexOf("ce-") !== 0;
    });
    array = array.filter(function (item) {
      return item.indexOf("cdx") !== 0;
    });
    return array.join(' ');
  }

  getBlockStyle(){
    let a = this.getBlockHolder().getAttribute('style');
    if (a == null) {
      return '';
    }
    return a;
  }

  // retourne le DOM qui représente le composant
  getBlockHolder(){
    // this would work if the DOM element had the this.block.id
    if (this.api.blocks.getById(this.block.id).holder.querySelector(".ce-block__content").children.length > 0){
      return this.api.blocks.getById(this.block.id).holder.querySelector(".ce-block__content").children[0];
    }
    // console.log(this.block.type);
    // let list = [];
    // if (this.block.type == 'header') {
    //   list = document.querySelectorAll('.ce-header');
    // }
    // if (this.block.type == 'paragraph') {
    //   list = document.querySelectorAll('.ce-paragraph');
    // }
    // if (this.block.type == 'table') {
    //   list = document.querySelectorAll('.tc-table');
    // }

    // list.forEach(el => {
    //   if (!el.classList.contains('classHandler__added')) {
    //     el.classList.add('classHandler__added');
    //     return el;
    //   }
    // });
  }

  save() {
    return {
        classes: this.currentClasses,
        style: this.style
    }
  }

}