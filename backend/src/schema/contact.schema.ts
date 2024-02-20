import { Schema } from 'mongoose';
import { Icontact } from "../interfaces/contacts.interface";

const contactSchema: Schema = new Schema <Icontact>({
    id: {type: String, required: true, unique: true},
    name: { type: String, required: true },
    number: { type: String, required: true, unique: true },
    more:{type:String, required:true}
    
  });

export {contactSchema};
