import mongoose ,{Schema, model, models} from "mongoose";

const itemSchema = new Schema({
    _id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required : true,
    },
    description: {
        type: String,
        required : true,
    }
},{ timestamps: true });

const Item = models.Item || model('Item', itemSchema);

export default Item;