const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const Schema = mongoose.Schema;


const EmblemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gods: [{
        type: Schema.Types.ObjectId,
        refs: "god"
    }]
})

module.exports = mongoose.model("emblem", EmblemSchema);