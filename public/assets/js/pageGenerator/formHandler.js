const getIsBlog = () =>  $('#isBlog').is(':checked')
const getIsPrivate = () =>  $('#isPrivate').is(':checked')
const getIsVisibleGoogle = () =>  $('#isVisibleGoogle').is(':checked')
const getBlogDescription = () => $('#blogDescription').val()

// afficher/cacher le form blog
function isBlogSwitchHandler(e){
  let isBlogSwitchState = e.target.checked;
  // si blog
  if (isBlogSwitchState) {
    $('.blog-form').removeClass('d-none');
    $('#pageTitleLabel').addClass('d-none');
    $('#blogTitleLabel').removeClass('d-none');
    return;
  }
  // si page normale
  $('.blog-form').addClass('d-none');
  $('#pageTitleLabel').removeClass('d-none');
  $('#blogTitleLabel').addClass('d-none');
}

// aperçu de l'image blog choisie 
function blogImagePreviewHandler(e){
  const [file] = e.target.files
  if (file) {
    $('#blogImagePreview').attr('src', URL.createObjectURL(file));
  }
}

function initUpdatedAt(){
  new Litepicker({
    element: document.getElementById('updatedAt'),
    tooltipText: {
      one: 'night',
      other: 'nights'
    },
    tooltipNumber: (totalDays) => {
      return totalDays - 1;
    }
  })
  
}

$( document ).ready(() => {
  $('#isBlog').change(isBlogSwitchHandler);
  $('#blogImage').change(blogImagePreviewHandler);
  initUpdatedAt();
})

