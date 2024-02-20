import { model } from "mongoose";
import { contactSchema } from "../schema/contact.schema";

const contactModel = model('contact', contactSchema);

export { contactModel };