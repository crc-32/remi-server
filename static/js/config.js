$(function () {
    $('select[name="type"]').change(function () {
        if (this.value == 'text')
        {
            $('#text').show();
            $('#json').hide();
        }else {
            $('#text').hide();
            $('#json').show();
        }
    });

    $('input#savebtn').click(function () {
         var type = $('select[name="type"]').val();
         var json = $('textarea[name="json"]').val();
         var clientid = $('input[name="clientid"]').val();
         var clientsecret = $('input[name="clientsecret"]').val();
         var clientrefresh = $('input[name="clientrefresh"]').val();

         if (type == 'text')
         {
            var options = {clientid: clientid, clientsecret: clientsecret, clientrefresh: clientrefresh};
            console.log(options);
            document.location = `pebblejs://close#${encodeURIComponent(JSON.stringify(options))}`;
         }else {
            var credentials;
             try {
                credentials = JSON.parse(json);
                var options = {clientid: credentials.client_id, clientsecret: credentials.client_secret, clientrefresh: credentials.refresh_token};
                console.log(options);
                document.location = `pebblejs://close#${encodeURIComponent(JSON.stringify(options))}`;
             } catch (SyntaxError)
             {
             }
         }
    });
});