var BookSearchApp = function () {
  var book = null;

  var createBook = function (data) {
    if (data.totalItems) {
      var book = {
        title: data.items[0].volumeInfo.title,
        author: data.items[0].volumeInfo.authors[0],
        description: data.items[0].volumeInfo.description,
        image: data.items[0].volumeInfo.imageLinks["thumbnail"],
      }

      var source = $("#book-template").html();
      var template = Handlebars.compile(source);
      var context = book;
      var html = template(book);

      $('.book').html(html);
    }
  }

  var fetch = function (isbn) {
    $.ajax({
      method: "GET",
      url: 'https://www.googleapis.com/books/v1/volumes?q=' + isbn,
      dataType: "jsonp",
      jsonp: "callback",
      success: function(data) {
        console.log('success!');
        createBook(data);
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    }); 
  }

  return {
    fetch: fetch
  }
}

var app = BookSearchApp();

$('.search-book').on('click', function (e) {
  e.preventDefault();

  var isbn = $('#isbn-number').val();
  $('#isbn-number').val('');


  app.fetch(isbn)
});
