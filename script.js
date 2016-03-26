var BookSearchApp = function () {
  var createBook = function (title, author, description, image, pages) {
    var book = {
      title: title,
      author: author,
      description: description,
      image: image,
      pages: pages
    }

    var source = $("#book-template").html();
    var template = Handlebars.compile(source);
    var context = book;
    var html = template(book);

    $('.book').html(html);
  }

  var validateEntry = function (title, author, description, image, pages) {
    var errors = [];

    if (title.length < 1) errors.push('title');
    if (author.length < 1) errors.push('author');
    if (description.length < 1) errors.push('description');
    if (image.length < 1) errors.push('image');
    if (pages.length < 1) errors.push('pages');

    if (errors.length > 0) {
      for (var i = 0; i < errors.length; i += 1) {
        $('.' +  errors[i] + '').toggleClass('show');
      }
    } else {
      $('.errors-container').children().removeClass('show');

      createBook(title, author, description, image, pages);
    }
  }

  return {
    validateEntry: validateEntry
  }
}

var app = BookSearchApp();

$('.search-book').on('click', function (e) {
  e.preventDefault();

  var title = $('#title').val();
  var author = $('#author').val();
  var description = $('#description').val();
  var image = $('#image').val();
  var pages = $('#pages').val();

  app.validateEntry(title, author, description, image, pages);
});
