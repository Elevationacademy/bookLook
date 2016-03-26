var BookSearchApp = function () {
  var calculateReading = function (pages, minutes) {
    var averagePagePerMinute = 1;

    return averagePagePerMinute * pages / minutes;
  }

  var validateEntry = function (title, author, description, image, pages, minutes) {
    var errors = [];

    if (title.length < 1) errors.push('title');
    if (author.length < 1) errors.push('author');
    if (description.length < 1) errors.push('description');
    if (image.length < 1) errors.push('image');
    if (typeof pages !== "number" || !pages) errors.push('pages');
    if (typeof minutes !== "number" || !minutes) errors.push('minutes');

    console.log(errors);

    if (errors.length > 0) {
      for (var i = 0; i < errors.length; i += 1) {
        $('.' +  errors[i] + '').toggleClass('show');
      }
    } else {
      $('.errors-container').children().removeClass('show');

      var timeToFinish = calculateReading(pages, minutes);

      createBook(title, author, description, image, pages, minutes, timeToFinish);
    }
  }

  var createBook = function (title, author, description, image, pages, minutes, timeToFinish) {
    var book = {
      title: title,
      author: author,
      description: description,
      image: image,
      pages: pages,
      minutes: minutes,
      timeToFinish: timeToFinish
    }

    var source = $("#book-template").html();
    var template = Handlebars.compile(source);
    var context = book;
    var html = template(book);

    $('.book').html(html);
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
  var pages = parseInt($('#pages').val(), 10);
  var minutes = parseInt($('#minutes').val(), 10)

  app.validateEntry(title, author, description, image, pages, minutes);
});
