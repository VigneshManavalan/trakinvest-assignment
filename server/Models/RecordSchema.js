const RecordSchema = new mongoose.Schema(
	{
		email: { type: String, required: true },
		name: { type: String, required: true }
	}
)

const model = mongoose.model('Records', RecordSchema)
module.exports = model