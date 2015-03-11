function Comment(obj) {
    if (obj == null)
    {
        this.id_user = '';
        this.id_user_post = '';
        this.id_post = '';
        this.author = '';
        this.text = '';
        this.date = '';
        this.reply = [];
    }
    else
    {
        this.id_user = obj.id_user_master;
        this.id_user_post = obj.id_user_post;
        this.id_post = obj.id_post;
        this.author = obj.user;
        this.text = obj.content;
        this.date = obj.data;
        this.reply = new Array();
    }
}


function Reply(obj)
{
    if (obj == null)
    {
        this.id = "";
        this.id_post = "";
        this.id_user = "";
        this.id_user_post = "";
        this.id_trip = "";
        this.mitt_user = "";
        this.dest_user = "";
        this.dest_trip = "";
        this.content = "";
        this.date = "";
        this.ip = "";
    }
    else
    {
        this.id = obj.id;
        this.id_post = obj.id_post;
        this.id_user = obj.id_user;
        this.id_user_post = obj.id_user_post;
        this.id_trip = obj.id_trip;
        this.mitt_user = obj.mitt_user;
        this.dest_user = obj.dest_user;
        this.dest_trip = obj.dest_trip;
        this.content = obj.content;
        this.date = obj.date;
        this.ip = obj.ip;
    }

}

