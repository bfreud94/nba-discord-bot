import { model, Schema } from 'mongoose';

const requiredNumber = {
    type: Number,
    required: true
};

const requiredString = {
    type: String,
    required: true
};

const CommandSchema = Schema({
    invocations: requiredNumber,
    name: requiredString
});

export default model('commands', CommandSchema);