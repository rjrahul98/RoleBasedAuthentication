const mongoose = require('mongoose')

export class Database{
    private mongoUrl: string = "mongodb+srv://rahul:Rahul123@cluster0.pqvke.mongodb.net/RoleBasedAuth?retryWrites=true&w=majority";

    public connectMongooseServer(){
        mongoose.connect(this.mongoUrl, {useUnifiedTopology: true, useNewUrlParser: true})
        .then(()=>{
            console.log('mongo server connected');
        })
        .catch((error: any)=>{
            console.log(error);
            console.log('mongo server connection failed');
        });

    }
}