const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
    Company_name: String,
    Position: String,
    Contract: String,
    Location: String
})

const JobModel = mongoose.model("job", jobSchema)

module.exports = { JobModel }