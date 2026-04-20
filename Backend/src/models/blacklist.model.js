const mongoose = require("mongoose")

const blacklistTokenSchema = new  mongoose.Schema({
    token:{
        type:String,
        required:[true, "token is required to be added to the blacklist"]
    },
},{
    timestamps : true
})

const TokenBlacklistModel = mongoose.model("blacklistTokens", blacklistTokenSchema)

module.exports = TokenBlacklistModel 