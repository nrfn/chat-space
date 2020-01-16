$(function(){
  var buildHTML = function(message) {
    if ( message.image ) {
      var html =  `
        <div class="messages__index" data-message-id=${message.id}>
          <div class="messages__index__user">
            <div class="messages__index__user__name">
              ${message.user_name}
            </div>
            <div class="messages__index__user__time">
              ${message.created_at}
            </div>
          </div>
          <div class="messages__index__message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
        return html;
    } else {
      var html =  `
        <div class="messages__index" data-message-id=${message.id}>
          <div class="messages__index__user">
            <div class="messages__index__user__name">
              ${message.user_name}
            </div>
            <div class="messages__index__user__time">
              ${message.created_at}
            </div>
          </div>
          <div class="messages__index__message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    }
  }
  $("#new_message").on("submit", function(e){
    e.preventDefault();
    $(".messages__bottom__new__send").prop( 'disabled', true );
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $(".messages__bottom__new__send").prop( 'disabled', false );
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
      $(".messages__bottom__new__send").prop( 'disabled', false );
    })
  })
  var reloadMessages = function() {
    last_message_id = $('.messages__index:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if(messages.length !== 0) {
        console.log(last_message_id)
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".form__submit").prop("disabled", false);
      }
    })
    .fail(function() {
      console.log('error');
    });
  };

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});