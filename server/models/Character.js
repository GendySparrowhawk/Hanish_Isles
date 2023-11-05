const { model, Schema } = require('mongoose');

const characterSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'Name must be at least 3 characters']
    },
    class: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        default: 1,
        maxLength: 20
    },
    description: {
        type: String,
        minLength: [20, 'they must have a description longer than 20 characters']
    },
    story: {
        type: String,
        minLength: [20, 'they must have a story longer than 20 characters']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
const Character = model('Character', characterSchema);
module.exports = Character;
