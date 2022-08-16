// Default template if page blocks is not defined
if (customPageBlocks.length == 0) {
  customPageBlocks = [
    {
      "id": "p3HqN3ued0",
      "type": "header",
      "data": {
        "text": "Ceci est un titre h1 centré",
        "level": 2
      },
      "tunes": {
        "textAlignement": {
          "alignment": "right"
        },
        "classHandler": {
          "classes": "bg-danger text-white"
        }
      }
    },
    {
      "id": "NyzcE1EWed",
      "type": "list",
      "data": {
        "style": "ordered",
        "items": [
          "Ceci est une liste",
          "Ceci est un el de la liste<br>"
        ]
      }
    },
    {
      "id": "-7zx_bnwlI",
      "type": "table",
      "data": {
        "withHeadings": false,
        "content": [
          [
            "Cool on a ",
            "meme "
          ],
          [
            "des ",
            "tableaux"
          ]
        ]
      }
    },
    {
      "id": "GAkPInwb2E",
      "type": "paragraph",
      "data": {
        "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam quia quo, cum minus suscipit, quam, debitis ipsam consequatur earum perferendis sapiente quas animi impedit sed asperiores vel aperiam aut dolore.<br>"
      },
      "tunes": {
        "textAlignement": {
          "alignment": "left"
        }
      }
    }
  ];
}

var editor = null;

function renderBlockStyles(){
  customPageBlocks.forEach(block => {
    // get holder
    // if (editor.blocks.getById(block.id) != null) {
      let wrapper = editor.blocks.getById(block.id).holder;
      let el = false;
      if (block.type == 'header') {
        el = wrapper.querySelector('.ce-header');
      }
      if (block.type == 'paragraph') {
        el = wrapper.querySelector('.ce-paragraph');
      }
      if (block.type == 'table') {
        el = wrapper.querySelector('.tc-table');
      }
      if (el && block.tunes.classHandler.classes != "" && typeof block.tunes.classHandler.classes == "string") {
        block.tunes.classHandler.classes.split(' ').forEach(cls => {
          el.classList.add(cls);
        });
      }
  
      if (el && block.tunes != "undefined") {
        el.setAttribute("style", block.tunes.classHandler.style);
      }
    // }
  });
}

function initiateEditor(){
  editor = new EditorJS({
    /**
    * Wrapper of Editor
    */
    holder: 'editorjs',
    /**
    * Tools list
    * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
    */
    tools: editorJsTools,
    // Traductions
    i18n: editorJsTranslations,
    // TEST DATA
    data: {
      blocks: customPageBlocks
    }
  });
  
  editor.isReady.then(() => {
    renderBlockStyles();
  })
}


initiateEditor();

/**
 * Saving example
 */
const parser = new edjsParser(); // Parser
let saveButton = document.getElementById('saveEditorBtn');

// Go to cms page
function goToCmsPageList(){
  $('#back-link-admin')[0].click();
}

saveButton.addEventListener('click', function () {
  $('#error-titre').addClass("d-none");
  $('#error-content').addClass("d-none");
  // traitement erreurs
  if ($('#pageTitle').val() == "") {
    $('#error-titre').removeClass("d-none");
    return;
  }

  editor.save().then((savedData) => {
    let blocks = savedData.blocks;
    console.log('saving blocks..');
    if (blocks.length == 0) {
      $('#error-content').removeClass("d-none");
      return;
    }

    let blogImage = $('#blogImage')[0].files[0] == 'undefined' ? false : $('#blogImage')[0].files[0];

    // image blog définie
    if (typeof blogImage !== 'undefined') {
      let formData = new FormData();
      formData.append('blogImage', blogImage);
      console.log(blogImage);
      // save blog image then save page
      $.ajax({
        type: "POST",
        url: PATH_SAVE_CUSTOM_PAGE_IMAGE_BLOG,
        processData: false,
        contentType: false,
        data: formData,
        success: function (retour) {
          if (retour.code == 1) {
            savePage(blocks, retour.filename);
          }
        },
        error: function (response) {
          savePage(blocks);
        }
      })
    // si image blog pas définie
    } else {
      savePage(blocks);
    }
    // const markup = parser.parse(savedData); // Parsing
    // console.log(markup);
    // cPreview.show(savedData, document.getElementById("output"));
  });

  function savePage(blocks, imageName = false){
    // saving
    let title = $('#pageTitle').val();
    let metaKeywords = $('#metaKeywords').val();
    let metaDescription = $('#metaDescription').val();
    let id = $('#pageId').val();
    let updatedAt = $('#updatedAt').val();
    // ajax
    $.ajax({
      type: "POST",
      url: PATH_SAVE_CUSTOM_PAGE,
      data: {
        'id': id,
        'title': title,
        'metaKeywords': metaKeywords,
        'metaDescription': metaDescription,
        'blocks': JSON.stringify(blocks),
        'updatedAt': updatedAt,
        'isBlog': getIsBlog(),
        'isPrivate': getIsPrivate(),
        'isVisibileGoogle': getIsVisibleGoogle(),
        'blogDescription': getBlogDescription(),
        'blogImage': imageName,
      },
      success: function (retour) {
        var retour = JSON.parse(retour);
        if (retour.code == 2) {
            retour.data.forEach(element => {
                document.getElementById(element).style.borderColor = "#fd0000"
            });
        }
        document.getElementById("back").innerHTML = "<div class='d-flex justify-content-center position-fixed alert alert-" + arrayInfo[retour
                .code] + "' id='alert' style='z-index: 99999999;' role='alert'><strong>" + arrayMsg[retour.code] + " " + retour.message +
            "!</strong></div>";
        window.setTimeout(function () {
            $(".alert").fadeTo(500, 0).slideUp(500, function () {
                $(this).remove();
                goToCmsPageList();
            });
        }, 1000);
        if (id == "0") {
          $('#pageId').val(retour.data);
        }
      },
      error: function (response) {
        console.log(response);
      }
    });
  }

});