$(function(){
  function buildHTML(message){
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
});