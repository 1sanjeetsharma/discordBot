import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    original_Url: { type: String, required: true },
    short_Id:{type:String, unique:true, required:true},
    visit_history: [{ type: Date }],
}, {timestamps: true});

const Url_Model = mongoose.model('Url', urlSchema);
export default Url_Model;